import emailjs from "@emailjs/browser";
import { emailAddress } from "./socialIcons";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim();
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim();

export const canSendDirect = Boolean(serviceId && templateId && publicKey);

export const isValidEmail = (value) => {
  const email = value.trim();
  if (email.length < 6 || email.length > 120) return false;
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) return false;
  if (email.includes("..")) return false;
  const [local] = email.split("@");
  if (!local || local.startsWith(".") || local.endsWith(".")) return false;
  return true;
};

const hasLetters = (value, min) => (value.match(/\p{L}/gu) || []).length >= min;
const namePattern = /^[\p{L}][\p{L}\s'.-]*$/u;
const textPattern = /^[\p{L}\p{N}\s.,;:!?¿¡'"“”()\-_/&@#%+*]+$/u;

export function nameError(value) {
  const name = value.trim();
  if (!hasLetters(name, 2) || name.length > 80) return "contact.nameInvalid";
  if (!namePattern.test(name)) return "contact.invalidChars";
  return "";
}

export function subjectError(value) {
  const subject = value.trim();
  if (subject.length < 3 || subject.length > 120 || !hasLetters(subject, 2)) return "contact.subjectInvalid";
  if (!textPattern.test(subject)) return "contact.invalidChars";
  return "";
}

export function messageError(value) {
  const message = value.trim();
  if (message.length < 5 || message.length > 2000 || !hasLetters(message, 2)) return "contact.messageInvalid";
  if (!textPattern.test(message)) return "contact.invalidChars";
  return "";
}

export function chatError(value) {
  const message = value.trim();
  if (message.length < 2 || message.length > 1000 || !hasLetters(message, 2)) return "contact.chatInvalid";
  if (!textPattern.test(message)) return "contact.invalidChars";
  return "";
}

export function letterErrors(fields) {
  return {
    name: nameError(fields.name),
    email: isValidEmail(fields.email) ? "" : "contact.invalidEmail",
    subject: subjectError(fields.subject),
    message: messageError(fields.message),
  };
}

export function handoffErrors(fields) {
  return {
    name: nameError(fields.name),
    email: isValidEmail(fields.email) ? "" : "contact.invalidEmail",
  };
}

export const hasFieldErrors = (errors) => Object.values(errors).some(Boolean);

export async function sendPortfolioForm(form) {
  const data = new FormData(form);
  const fromName = String(data.get("from_name") || "");
  const fromEmail = String(data.get("from_email") || "");
  const subject = String(data.get("subject") || "");
  const message = String(data.get("message") || "");
  const errors = letterErrors({ name: fromName, email: fromEmail, subject, message });
  if (hasFieldErrors(errors)) {
    console.error("EmailJS: el formulario tiene datos que no se pueden enviar");
    throw new Error("invalid");
  }
  if (!canSendDirect) {
    console.error("EmailJS: faltan las variables VITE_EMAILJS en el entorno");
    const body = encodeURIComponent(`Nombre: ${fromName}\nCorreo: ${fromEmail}\n\n${message}`);
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${body}`;
    return "mailto";
  }

  try {
    const result = await emailjs.sendForm(serviceId, templateId, form, { publicKey });
    console.log("EmailJS: correo enviado", result.status);
    return "emailjs";
  } catch (error) {
    console.error("EmailJS: no se pudo enviar el correo", error);
    throw error;
  }
}
