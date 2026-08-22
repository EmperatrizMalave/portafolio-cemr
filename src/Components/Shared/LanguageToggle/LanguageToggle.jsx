import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const esActivo = i18n.language === "es";

  const cambiarIdioma = () => {
    const nuevo = esActivo ? "en" : "es";
    i18n.changeLanguage(nuevo);
    localStorage.setItem("idioma", nuevo);
  };

  return (
    <button
      type="button"
      className="idioma-toggle"
      onClick={cambiarIdioma}
      aria-label="Cambiar idioma / Change language"
      title={esActivo ? "English" : "Español"}
    >
      <span className={esActivo ? "" : "active"}>EN</span>
      <span className={esActivo ? "active" : ""}>ES</span>
    </button>
  );
};

export default LanguageToggle;
