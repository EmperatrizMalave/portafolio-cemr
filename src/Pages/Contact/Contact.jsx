import { useEffect, useRef, useState } from "react";
import { Linkedin } from "react-bootstrap-icons";
import { ScrollRestoration } from "react-router-dom";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import avatar from "../../assets/img/banner/banner-man.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/coromoto-malave-rengel/";

const quickOptions = [
  {
    id: 1,
    label: "Ver Perfil QA & Habilidades",
    response:
      "Cori se especializa en Aseguramiento de Calidad (QA), auditoría de interfaces, documentación técnica de sistemas y desarrollo Frontend.",
  },
  {
    id: 2,
    label: "Ver Proyectos Destacados",
    response:
      "¡Puedes revisar los proyectos en la sección Work de arriba! Incluyen desarrollos Frontend y utilidades de automatización.",
  },
  {
    id: 3,
    label: "Enviar un Mensaje",
    response:
      "¡Excelente! Puedes conectar conmigo en LinkedIn o en mis redes sociales.",
    showLinks: true,
  },
  {
    id: 4,
    label: "¡Solo pasar a saludar!",
    response: "¡Gracias por visitar el portafolio! Que tengas un excelente día. 😊",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "¡Hola! Soy Cori Bot 🤖. Estoy aquí para ayudarte a conocer más sobre la experiencia y proyectos de Cori.",
  },
  {
    id: 2,
    sender: "bot",
    text: "¿Qué te gustaría explorar hoy?",
  },
];

const Contact = () => {
  const [messages, setMessages] = useState(initialMessages);
  const chatBodyRef = useRef(null);

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
      <PageHeader heading={"Contacto"} page={"Contacto"} className="contact__pageheader" />
      <section className="chatbot__section">
        <div className="container">
          <div className="chatbot__card">
            <div className="chatbot__header">
              <div className="chatbot__avatar">
                <img src={avatar} alt="Cori Bot avatar" />
              </div>
              <div className="chatbot__info">
                <h4 className="chatbot__name">Cori Bot</h4>
                <span className="chatbot__status">
                  <span className="chatbot__dot"></span>
                  En línea
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
