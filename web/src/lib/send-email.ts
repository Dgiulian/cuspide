import { env } from "@/env";
import formData from "form-data";
import Mailgun from "mailgun.js";

interface SendMailProps {
  subject: string;
  sendTo: string[];
  text: string;
  html: string;
}
export async function sendMail({
  sendTo,
  subject,
  text,
  html,
}: SendMailProps): Promise<
  { status: "success" } | { status: "error"; message: string }
> {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: env.MAILGUN_API_KEY,
  });
  try {
    await mg.messages.create(
      "sandbox53d4ca814c044886b1586b0515b71a85.mailgun.org",
      {
        from: "Cuspide BR <mailgun@sandbox53d4ca814c044886b1586b0515b71a85.mailgun.org>",
        to: sendTo,
        subject: subject,
        text: text,
        html: html,
      }
    );
    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      message: error as string,
    };
  }
}
