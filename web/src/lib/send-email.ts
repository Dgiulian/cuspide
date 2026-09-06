import { env } from "@/env";
import formData from "form-data";
import Mailgun from "mailgun.js";

const MAILGUN_DOMAIN = "mail.cuspidebr.com.ar";
const FROM = `Cuspide BR <contacto@${MAILGUN_DOMAIN}>`;

interface SendMailProps {
  subject: string;
  sendTo: string[];
  text?: string;
  html?: string;
  replyTo?: string;
}
export async function sendMail({
  sendTo,
  subject,
  text,
  html,
  replyTo,
}: SendMailProps): Promise<{ status: "success" }> {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: env.MAILGUN_API_KEY,
  });

  // Let the caller handle failures: swallowing them here made the contact
  // form report success even when nothing was delivered.
  await mg.messages.create(MAILGUN_DOMAIN, {
    from: FROM,
    to: sendTo,
    subject: subject,
    text: text ?? "",
    html: html ?? "",
    ...(replyTo ? { "h:Reply-To": replyTo } : {}),
  });

  return { status: "success" };
}
