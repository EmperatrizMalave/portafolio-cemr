import { useTranslation } from "react-i18next";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

const Legal = ({ kind }) => {
  const { t } = useTranslation();
  const isTerms = kind === "terms";
  return (
    <>
      <PageHeader
        heading={t(isTerms ? "legal.termsTitle" : "legal.privacyTitle")}
        page={t(isTerms ? "legal.termsPage" : "legal.privacyPage")}
        className="contact__pageheader"
      />
      <section className="info-page">
        <div className="container">
          <p>{t(isTerms ? "legal.termsText" : "legal.privacyText")}</p>
        </div>
      </section>
    </>
  );
};

export default Legal;
