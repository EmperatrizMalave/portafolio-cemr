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
              <p>{t("resume.summary")}</p>
              <div className="exprience__box mt-30">
                {t("resume.jobs", { returnObjects: true }).map((job) => (
                  <div className="exri__item" key={job.role}>
                    <div className="expri__cont">
                      <h4>{job.role}</h4>
                      <p className="exri__org">{job.org}</p>
                      <p className="exri__date">{job.date}</p>
                      {job.note ? <p className="exri__note">{job.note}</p> : null}
                      <ul className="cv-duties">
                        {job.duties.map((duty) => (
                          <li key={duty}>{duty}</li>
                        ))}
                      </ul>
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

export default Experience;
