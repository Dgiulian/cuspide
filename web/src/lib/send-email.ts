import { env } from "@/env";
import formData from "form-data";
import Mailgun from "mailgun.js";

interface SendMailProps {
  subject: string;
  sendTo: string[];
  text?: string;
  html?: string;
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
    await mg.messages.create("mail.cuspidebr.com.ar", {
      from: "Cuspide BR <contacto@mail.cuspidebr.com.ar >",
      to: sendTo,
      subject: subject,
      text: text ?? "",
      html: html ?? "",
    });
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
