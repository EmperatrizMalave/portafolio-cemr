import { useEffect, useRef, useState } from "react";
import { Linkedin } from "react-bootstrap-icons";
import { ScrollRestoration, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import avatar from "../../assets/cori-pixel.png";
import { emailLink } from "../../Utils/socialIcons";

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
  const chatBodyRef = useRef(null);
  const composerRef = useRef(null);

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
    const text = draft.trim();
    if (!text) return;

    if (emailLink) {
      const subject = encodeURIComponent(t("contact.mailSubject"));
      const body = encodeURIComponent(text);
      window.location.href = `${emailLink.href}?subject=${subject}&body=${body}`;
    }

    setMessages((prev) => [
      ...prev,
      { id: `draft-user-${prev.length}`, sender: "user", text },
      {
        id: `draft-bot-${prev.length}`,
        sender: "bot",
        key: emailLink ? "contact.sent" : "contact.noEmail",
        showLinks: !emailLink,
      },
    ]);
    setDraft("");
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

            <form className="chatbot__composer" onSubmit={sendMessage}>
              <label className="visually-hidden" htmlFor="contact-message">
                {t("contact.placeholder")}
              </label>
              <textarea
                id="contact-message"
                ref={composerRef}
                rows="3"
                value={draft}
                placeholder={t("contact.placeholder")}
                onChange={(event) => setDraft(event.target.value)}
              />
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
