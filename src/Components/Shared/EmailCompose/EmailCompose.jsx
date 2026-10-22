import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { letterErrors, hasFieldErrors, sendPortfolioForm } from "../../../Utils/sendEmail";
import avatar from "../../../assets/cori-pixel.png";

const emptyForm = { name: "", email: "", subject: "", message: "" };

const EmailCompose = ({ open, onClose }) => {
  const { t } = useTranslation();
  const titleId = useId();
  const formRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (open) return;
    setForm(emptyForm);
    setStatus("idle");
    setErrors({});
    setNotice("");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setNotice("");
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = letterErrors(form);
    setErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) {
      setNotice(t("contact.reviewFields"));
      const fields = { name: "from_name", email: "from_email", subject: "subject", message: "message" };
      const first = ["name", "email", "subject", "message"].find((field) => nextErrors[field]);
      event.currentTarget.elements[fields[first]]?.focus();
      return;
    }
    const email = form.email.trim();
    const letter = formRef.current;
    letter.elements.reply_to.value = email;
    letter.elements.subject.value = form.subject.trim();
    letter.elements.message.value = form.message.trim();
    setStatus("sending");
    setNotice("");
    try {
      const channel = await sendPortfolioForm(letter);
      setStatus(channel === "mailto" ? "mailto" : "sent");
      setForm(emptyForm);
      setErrors({});
    } catch (error) {
      console.error("EmailJS: error al enviar el correo", error);
      setStatus("idle");
      setNotice(t("contact.sendError"));
    }
  };

  return (
    <div className="mail-dialog" role="presentation" onMouseDown={onClose}>
      <div
        className="mail-dialog__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mail-dialog__head">
          <h2 id={titleId}>{t("contact.letterTitle")}</h2>
          <button type="button" className="mail-dialog__close" onClick={onClose}>
            {t("contact.close")}
          </button>
        </div>
        {status === "sent" || status === "mailto" ? (
          <div className="mail-dialog__done">
            <img src={avatar} alt="" />
            <p>{t(status === "sent" ? "contact.letterDelivered" : "contact.letterMailto")}</p>
          </div>
        ) : (
          <form className="mail-dialog__form" ref={formRef} onSubmit={submit} noValidate>
            {notice && (
              <p className="field-note" role="alert">
                {notice}
              </p>
            )}
            <label>
              {t("contact.fieldName")}
              <input
                name="from_name"
                value={form.name}
                onChange={update("name")}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                className={errors.name ? "is-invalid" : undefined}
              />
              {errors.name && (
                <span className="field-note" role="alert">
                  {t(errors.name)}
                </span>
              )}
            </label>
            <label>
              {t("contact.fieldEmail")}
              <input
                name="from_email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                inputMode="email"
                aria-invalid={Boolean(errors.email)}
                className={errors.email ? "is-invalid" : undefined}
              />
              {errors.email && (
                <span className="field-note" role="alert">
                  {t(errors.email)}
                </span>
              )}
            </label>
            <label>
              {t("contact.fieldSubject")}
              <input
                name="subject"
                value={form.subject}
                onChange={update("subject")}
                aria-invalid={Boolean(errors.subject)}
                className={errors.subject ? "is-invalid" : undefined}
              />
              {errors.subject && (
                <span className="field-note" role="alert">
                  {t(errors.subject)}
                </span>
              )}
            </label>
            <label>
              {t("contact.fieldMessage")}
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={update("message")}
                aria-invalid={Boolean(errors.message)}
                className={errors.message ? "is-invalid" : undefined}
              />
              {errors.message && (
                <span className="field-note" role="alert">
                  {t(errors.message)}
                </span>
              )}
            </label>
            <input type="hidden" name="reply_to" defaultValue="" />
            <button type="submit" className="mail-dialog__send" disabled={status === "sending"}>
              {status === "sending" ? t("contact.sending") : t("contact.letterSend")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailCompose;
