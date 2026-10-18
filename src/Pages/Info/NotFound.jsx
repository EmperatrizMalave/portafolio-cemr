import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={t("notFound.heading")} page={t("notFound.page")} className="contact__pageheader" />
      <section className="info-page">
        <div className="container">
          <p>{t("notFound.text")}</p>
          <div className="info-page__actions">
            <Link to="/">{t("notFound.home")}</Link>
            <Link to="/portfolio">{t("notFound.work")}</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
