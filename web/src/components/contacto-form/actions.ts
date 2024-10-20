"use server";

import { sendMail } from "@/lib/send-email";

export type State = {
  status: "success";
  message: string;
} | null;

export async function sendContactMessage(data: FormData) {
  const mailText = `
  <h1>Nueva solicitud de contacto</h1>
  <ul>
    <li>Nombre: ${data.get("name")?.toString()}</li>
    <li>Telefono: ${data.get("Phone")?.toString()}</li>
    <li>Email: ${data.get("email")?.toString()}</li>
    <li>Mensaje: ${data.get("message")?.toString()}</li>
  </ul>
  )}`;
  try {
    await sendMail({
      sendTo: ["cuspide.br@gmail.com"],
      html: "",
      subject: "New Contact Us Form",
      text: mailText,
    });
  } catch (err) {
    console.error(err);
  }
}
