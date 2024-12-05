"use server";

import { sendMail } from "@/lib/send-email";

export type State = {
  status: "success";
  message: string;
} | null;

export async function sendContactMessage(
  prevState: {
    success: boolean;
    message?: string;
  },
  formData: FormData
) {
  const mailText = `
  <h1>Nueva solicitud de contacto</h1>
  <p>Hemos recibido una nueva solicitud de contacto a traves del formulario de la web.</p>
  <ul>
    <li>Nombre: ${formData.get("name")?.toString()}</li>
    <li>Telefono: ${formData.get("Phone")?.toString()}</li>
    <li>Email: ${formData.get("email")?.toString()}</li>
    <li>Mensaje: ${formData.get("message")?.toString()}</li>
  </ul>`;
  try {
    await sendMail({
      sendTo: ["br.cuspide@gmail.com"],
      subject: "Nueva solicitud de contacto",
      html: mailText,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: (err as { message: string }).message };
  }
}
