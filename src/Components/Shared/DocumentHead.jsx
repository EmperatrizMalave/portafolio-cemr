import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const setMeta = (selector, attribute, value) => {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
};

const DocumentHead = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t("seo.title");
    const description = t("seo.description");
    document.title = title;
    document.documentElement.lang = i18n.language;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:locale"]', "content", i18n.language === "en" ? "en_US" : "es_MX");
  }, [i18n.language, t]);

  return null;
};

export default DocumentHead;
