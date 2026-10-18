import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import personalInfoThumb from "../../assets/img/about/personal-infothumb.webp";
import { cvLink, emailLink, socialIcons } from "../../Utils/socialIcons";

const contactInfo = [
  {
    id: 1,
    system: "about.aboutMe.preferred",
    contact: "about.aboutMe.remote",
  },
  {
    id: 2,
    system: "about.aboutMe.address",
    contact: "about.aboutMe.location",
  },
  ...(emailLink
    ? [
        {
          id: 4,
          system: "about.aboutMe.email",
          href: emailLink.href,
          text: emailLink.label,
        },
      ]
    : []),
  ...(cvLink
    ? [
        {
          id: 5,
          system: "about.aboutMe.cv",
          href: cvLink.href,
          textKey: "about.aboutMe.cvAction",
          download: true,
        },
      ]
    : []),
  {
    id: 3,
    system: "about.aboutMe.followers",
    socalContact: socialIcons,
  },
];
const AboutMe = ({ isTabActive }) => {
  const { t } = useTranslation();
  return (
    <div className={`tabitem ${isTabActive === "about" ? "active" : ""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div
              className="about__onethumb"
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              <img src={personalInfoThumb} alt={t("common.portraitAlt")} className="personal-image"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2
                className="h2-head"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {t("about.aboutMe.title")}
              </h2>
              <p
                className="p-descrip"
                data-aos="fade-up"
                data-aos-duration="500"
              >
              {t("about.aboutMe.text")}
                </p>
              <div className="about__contactwrap">
                <div className="row g-4">
                  {contactInfo.map(({ id, contact, socalContact, system, href, text, textKey, download }) => {
                    return (
                      <div
                        key={id}
                        className="col-xxl-6 col-xl-6 col-lg-12 col-md-6"
                        data-aos="zoom-in"
                      >
                        <div className="abox">
                          <div className="about__contbox__item">
                            <span className="ptext fz-18 mb-20 d-block">
                              {t(system)}
                            </span>
                            {contact && <Link to={""}>{t(contact)}</Link>}
                            {href && (
                              <a
                                href={href}
                                {...(download
                                  ? { download: true }
                                  : href.startsWith("mailto:")
                                    ? {}
                                    : { target: "_blank", rel: "noopener noreferrer" })}
                              >
                                {text || t(textKey)}
                              </a>
                            )}
                            {socalContact && (
                              <ul className="d-flex align-items-center gap-2 gap-xl-4">
                                {socalContact.map(({ icon, href: sHref, id: sId, label }) => (
                                  <li key={sId}>
                                    <a href={sHref} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                      {icon}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
