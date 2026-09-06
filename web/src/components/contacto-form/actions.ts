"use server";

import { CONTACT_EMAIL } from "@/lib/contact-info";
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
  const name = formData.get("name")?.toString() ?? "";
  const phone = formData.get("phone")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const subject = formData.get("subject")?.toString() ?? "";
  const message = formData.get("message")?.toString() ?? "";

  const mailText = `
  <h1>Nueva solicitud de contacto</h1>
  <p>Hemos recibido una nueva solicitud de contacto a traves del formulario de la web.</p>
  <ul>
    <li>Nombre: ${name}</li>
    <li>Telefono: ${phone || "No indicado"}</li>
    <li>Email: ${email}</li>
    <li>Asunto: ${subject}</li>
    <li>Mensaje: ${message}</li>
  </ul>`;
  try {
    await sendMail({
      sendTo: [CONTACT_EMAIL],
      subject: subject
        ? `Nueva solicitud de contacto: ${subject}`
        : "Nueva solicitud de contacto",
      html: mailText,
      replyTo: email || undefined,
    });
    return { success: true };
  } catch (err) {
    console.error("[contacto] No se pudo enviar el email", err);
    return {
      success: false,
      message:
        "No pudimos enviar tu mensaje. Por favor intenta nuevamente o escribinos directamente.",
    };
  }
}
