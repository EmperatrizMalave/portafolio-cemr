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
              <img src={personalInfothumb} alt="img" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>{t("about.education.title")}</h2>
              <p>{t("about.education.text")}</p>
              <div className="exprience__box mt-30">
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.education.items.ai.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.education.items.ai.course")}</h4>
                    <p className="fz-18 pra d-block">{t("about.education.items.ai.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.education.items.analytics.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.education.items.analytics.course")}</h4>
                    <p className="fz-18 pra d-block">{t("about.education.items.analytics.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.education.items.fundamentals.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.education.items.fundamentals.course")}</h4>
                    <p className="fz-18 pra d-block">{t("about.education.items.fundamentals.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.education.items.mendix.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.education.items.mendix.course")}</h4>
                    <p className="fz-18 pra d-block">{t("about.education.items.mendix.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500"  style={{ color: "#38A3D6" }}>{t("about.education.items.fullstack.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.education.items.fullstack.course")}</h4>
                    <p className="fz-18 pra d-block">{t("about.education.items.fullstack.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.education.items.accountant.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.education.items.accountant.course")}</h4>
                    <p className="fz-18 pra d-block">{t("about.education.items.accountant.desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
