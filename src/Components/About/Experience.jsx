import personalInfothumb from "../../assets/img/about/personal-infothumb.webp"
import { useTranslation } from "react-i18next";

const Experience = ({isTabActive}) => {
  const { t } = useTranslation();
  return (
    <div className={`tabitem ${isTabActive === "experience" ? "active":""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div className="about__onethumb">
              <img src={personalInfothumb} alt={t("common.portraitAlt")} />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>{t("about.experience.title")}</h2>
              <p>{t("about.experience.text")}</p>
              <div className="exprience_box mt-30">
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.experience.items.qa.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.experience.items.qa.role")}</h4>
                    <p className="fz-18 pra d-block">{t("about.experience.items.qa.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.experience.items.treasury.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.experience.items.treasury.role")}</h4>
                    <p className="fz-18 pra d-block">{t("about.experience.items.treasury.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.experience.items.software2024.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.experience.items.software2024.role")}</h4>
                    <p className="fz-18 pra d-block">{t("about.experience.items.software2024.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.experience.items.designer2023.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.experience.items.designer2023.role")}</h4>
                    <p className="fz-18 pra d-block">{t("about.experience.items.designer2023.desc")}</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.experience.items.ui2022.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.experience.items.ui2022.role")}</h4>
                    <p className="fz-18 pra d-block">{t("about.experience.items.ui2022.desc")}</p>
                  </div>
                </div>
              </div>
              <div className="exprience__box mt-30">
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>{t("about.experience.items.crc.date")}</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">{t("about.experience.items.crc.role")}</h4>
                    <p className="fz-18 pra d-block">{t("about.experience.items.crc.desc")}</p>
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

export default Experience;
