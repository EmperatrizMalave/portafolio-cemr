import { useEffect, useRef, useState } from "react";
import { Linkedin } from "react-bootstrap-icons";
import { ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import avatar from "../../assets/img/banner/banner-man.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/coromoto-malave-rengel/";

const Contact = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: t("contact.botIntro"),
    },
    {
      id: 2,
      sender: "bot",
      text: t("contact.botQuestion"),
    },
  ]);
  const chatBodyRef = useRef(null);

  const quickOptions = [
    {
      id: 1,
      label: t("contact.options.profile.label"),
      response: t("contact.options.profile.response"),
    },
    {
      id: 2,
      label: t("contact.options.projects.label"),
      response: t("contact.options.projects.response"),
    },
    {
      id: 3,
      label: t("contact.options.message.label"),
      response: t("contact.options.message.response"),
      showLinks: true,
    },
    {
      id: 4,
      label: t("contact.options.hi.label"),
      response: t("contact.options.hi.response"),
    },
  ];

  useEffect(() => {
    const body = chatBodyRef.current;
    if (body) {
      body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const handleOption = (option) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "user", text: option.label },
      {
        id: prev.length + 2,
        sender: "bot",
        text: option.response,
        showLinks: option.showLinks,
      },
    ]);
  };

  return (
    <>
      <PageHeader heading={t("contact.heading")} page={t("contact.page")} className="contact__pageheader" />
      <section className="chatbot__section">
        <div className="container">
          <div className="chatbot__card">
            <div className="chatbot__header">
              <div className="chatbot__avatar">
                <img src={avatar} alt="Cori Bot avatar" />
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
                      <img src={avatar} alt="Cori Bot avatar" />
                    </div>
                  )}
                  <div className="chatbot__bubble">
                    <p>{message.text}</p>
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
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ScrollRestoration />
    </>
  );
};

export default Contact;
