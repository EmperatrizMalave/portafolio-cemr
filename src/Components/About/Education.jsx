import personalInfothumb from "../../assets/img/about/personal-infothumb.webp"
import { useTranslation } from "react-i18next";

const Education = ({isTabActive}) => {
  const { t } = useTranslation();
  return (
    <div className={`tabitem ${isTabActive === "education" ? "active":""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div className="about__onethumb">
              <img src={personalInfothumb} alt={t("common.portraitAlt")} />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>{t("about.education.title")}</h2>
              <p>{t("about.education.text")}</p>
              <div className="exprience__box mt-30">
                {t("resume.education", { returnObjects: true }).map((item) => (
                  <div className="exri__item" key={item.course}>
                    <div className="expri__cont">
                      <h4>{item.course}</h4>
                      <p className="exri__org">{item.place}</p>
                      <p className="exri__date">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
