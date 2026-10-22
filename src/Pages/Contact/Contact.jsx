import { useEffect, useRef, useState } from "react";
import { Linkedin } from "react-bootstrap-icons";
import { ScrollRestoration, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import avatar from "../../assets/cori-pixel.png";
import { chatError, handoffErrors, hasFieldErrors, sendPortfolioForm } from "../../Utils/sendEmail";

const LINKEDIN_URL = "https://www.linkedin.com/in/coromoto-malave-rengel/";

const quickOptions = [
  {
    id: "profile",
    labelKey: "contact.options.profile.label",
    responseKey: "contact.options.profile.response",
  },
  {
    id: "projects",
    labelKey: "contact.options.projects.label",
    responseKey: "contact.options.projects.response",
  },
  {
    id: "hi",
    labelKey: "contact.options.hi.label",
    responseKey: "contact.options.hi.response",
  },
];

const Contact = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", key: "contact.botIntro" },
    { id: 2, sender: "bot", key: "contact.botQuestion" },
  ]);
  const [draft, setDraft] = useState("");
  const [handoff, setHandoff] = useState({ name: "", email: "" });
  const [handoffStatus, setHandoffStatus] = useState("idle");
  const [handoffError, setHandoffError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [draftError, setDraftError] = useState("");
  const [hinted, setHinted] = useState(false);
  const chatBodyRef = useRef(null);
  const composerRef = useRef(null);
  const handoffRef = useRef(null);
  const visitorLines = messages.filter((message) => message.sender === "user" && message.text);

  useEffect(() => {
    const body = chatBodyRef.current;
    if (body) {
      body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
    }
    const lastBot = [...messages].reverse().find((message) => message.sender === "bot");
    if (!lastBot) return;
    const line = lastBot.text || t(lastBot.key);
    window.__coriLine = line;
    window.dispatchEvent(new CustomEvent("cori-say", { detail: line }));
  }, [messages, t]);

  useEffect(() => {
    if (!location.state?.talk) return;
    document.querySelector(".chatbot__card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    composerRef.current?.focus();
  }, [location.state]);

  const handleOption = (option) => {
    setMessages((prev) => [
      ...prev,
      { id: `${option.id}-user-${prev.length}`, sender: "user", key: option.labelKey },
      {
        id: `${option.id}-bot-${prev.length}`,
        sender: "bot",
        key: option.responseKey,
      },
    ]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const problem = chatError(draft);
    if (problem) {
      setDraftError(problem);
      return;
    }
    const text = draft.trim();

    setHandoffStatus("idle");
    setHandoffError("");
    setDraftError("");
    setMessages((prev) => {
      const next = [...prev, { id: `draft-user-${prev.length}`, sender: "user", text }];
      if (!hinted) {
        next.push({ id: `noted-${prev.length}`, sender: "bot", key: "contact.noted" });
      }
      return next;
    });
    setHinted(true);
    setDraft("");
  };

  const deliverConversation = async (event) => {
    event.preventDefault();
    const nextErrors = handoffErrors(handoff);
    setFieldErrors(nextErrors);
    if (hasFieldErrors(nextErrors)) {
      setHandoffError(t("contact.reviewFields"));
      const first = nextErrors.name ? "from_name" : "from_email";
      event.currentTarget.elements[first]?.focus();
      return;
    }
    const form = handoffRef.current;
    const email = handoff.email.trim();
    const transcript = visitorLines.map((line, index) => `${index + 1}. ${line.text}`).join("\n");
    form.elements.reply_to.value = email;
    form.elements.subject.value = t("contact.conversationSubject");
    form.elements.message.value = transcript;
    setHandoffStatus("sending");
    setHandoffError("");
    try {
      const channel = await sendPortfolioForm(form);
      setMessages((prev) => [
        ...prev,
        {
          id: `delivered-${prev.length}`,
          sender: "bot",
          key: channel === "mailto" ? "contact.sentConversation" : "contact.delivered",
        },
      ]);
      setHandoff({ name: "", email: "" });
      setHandoffStatus("sent");
      setFieldErrors({});
    } catch (error) {
      console.error("EmailJS: error al enviar la conversación", error);
      setHandoffStatus("idle");
      setHandoffError(t("contact.sendError"));
    }
  };

  return (
    <>
      <PageHeader heading={t("contact.heading")} page={t("contact.page")} className="contact__pageheader" />
      <section className="chatbot__section">
        <div className="container">
          <div className="chatbot__card">
            <div className="chatbot__header">
              <div className="chatbot__avatar">
                <img src={avatar} alt={t("common.portraitAlt")} />
              </div>
              <div className="chatbot__info">
                <h4 className="chatbot__name">{t("contact.name")}</h4>
                <span className="chatbot__status">
                  <span className="chatbot__dot"></span>
                  {t("contact.online")}
                </span>
              </div>
            </div>

            <div className="chatbot__body" ref={chatBodyRef}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chatbot__message chatbot__message--${message.sender}`}
                >
                  {message.sender === "bot" && (
                    <div className="chatbot__mini-avatar">
                      <img src={avatar} alt="" />
                    </div>
                  )}
                  <div className="chatbot__bubble">
                    <p>{message.text || t(message.key)}</p>
                    {message.showLinks && (
                      <div className="chatbot__links">
                        <a
                          className="chatbot__link"
                          href={LINKEDIN_URL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Linkedin /> LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="chatbot__options">
              {quickOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="chatbot__option"
                  onClick={() => handleOption(option)}
                >
                  {t(option.labelKey)}
                </button>
              ))}
              <button
                type="button"
                className="chatbot__option"
                onClick={() => composerRef.current?.focus()}
              >
                {t("contact.options.message.label")}
              </button>
            </div>

            {visitorLines.length > 0 && handoffStatus !== "sent" && (
              <form className="chatbot__handoff" ref={handoffRef} onSubmit={deliverConversation} noValidate>
                <p>{t("contact.deliverHint")}</p>
                {handoffError && (
                  <p className="field-note" role="alert">
                    {handoffError}
                  </p>
                )}
                <label>
                  {t("contact.fieldName")}
                  <input
                    name="from_name"
                    value={handoff.name}
                    autoComplete="name"
                    aria-invalid={Boolean(fieldErrors.name)}
                    className={fieldErrors.name ? "is-invalid" : undefined}
                    onChange={(event) => {
                      setHandoff((current) => ({ ...current, name: event.target.value }));
                      setFieldErrors((current) => ({ ...current, name: "" }));
                      setHandoffError("");
                    }}
                  />
                  {fieldErrors.name && (
                    <span className="field-note" role="alert">
                      {t(fieldErrors.name)}
                    </span>
                  )}
                </label>
                <label>
                  {t("contact.fieldEmail")}
                  <input
                    name="from_email"
                    value={handoff.email}
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={Boolean(fieldErrors.email)}
                    className={fieldErrors.email ? "is-invalid" : undefined}
                    onChange={(event) => {
                      setHandoff((current) => ({ ...current, email: event.target.value }));
                      setFieldErrors((current) => ({ ...current, email: "" }));
                      setHandoffError("");
                    }}
                  />
                  {fieldErrors.email && (
                    <span className="field-note" role="alert">
                      {t(fieldErrors.email)}
                    </span>
                  )}
                </label>
                <input type="hidden" name="reply_to" defaultValue="" />
                <input type="hidden" name="subject" defaultValue="" />
                <input type="hidden" name="message" defaultValue="" />
                <button type="submit" className="chatbot__send" disabled={handoffStatus === "sending"}>
                  {handoffStatus === "sending" ? t("contact.sending") : t("contact.deliver")}
                </button>
              </form>
            )}

            <form className="chatbot__composer" onSubmit={sendMessage} noValidate>
              <label className="visually-hidden" htmlFor="contact-message">
                {t("contact.placeholder")}
              </label>
              <textarea
                id="contact-message"
                ref={composerRef}
                rows="3"
                value={draft}
                placeholder={t("contact.placeholder")}
                aria-invalid={Boolean(draftError)}
                className={draftError ? "is-invalid" : undefined}
                onChange={(event) => {
                  setDraft(event.target.value);
                  setDraftError("");
                }}
              />
              {draftError && (
                <p className="field-note" role="alert">
                  {t(draftError)}
                </p>
              )}
              <button type="submit" className="chatbot__send" disabled={!draft.trim()}>
                {t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </section>
      <ScrollRestoration />
    </>
  );
};

export default Contact;
