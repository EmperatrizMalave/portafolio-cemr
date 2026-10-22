import { useTranslation } from "react-i18next";
import personalInfothumb from "../../assets/img/about/personal-infothumb.webp";

const Skills = ({ isTabActive }) => {
  const { t } = useTranslation();
  const skills = t("resume.skills", { returnObjects: true });

  return (
    <div className={`tabitem ${isTabActive === "skills" ? "active" : ""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div className="about__onethumb">
              <img src={personalInfothumb} alt={t("common.portraitAlt")} />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>{t("about.skills.title")}</h2>
              <p>{t("about.skills.text")}</p>
              <div className="about__contactwrap">
                <div className="row g-4">
                  {skills.map((group) => (
                    <div key={group.label} className="col-12">
                      <div className="abox myskill__item">
                        <div className="mys">
                          <span className="skill-name">{group.label}</span>
                          <p className="cv-skill-items">{group.items}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
