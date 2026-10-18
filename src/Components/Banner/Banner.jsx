import { useTranslation } from "react-i18next";

import bannerMan from "../../assets/img/banner/banner-man.png";
import scrollDown from "../../assets/img/banner/scroll-down.png";
import { socialIcons } from "../../Utils/socialIcons";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <section id="home">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="banner__content">
              <h1>
                <span className="hone">{t("banner.qaEngineer")}</span>
                <span className="d-block profile-heading" data-text={t("banner.profile")}>
                {t("banner.profile")}
                </span>
              </h1>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="banner__thumb right_up_animat">
              <img src={bannerMan} alt={t("common.portraitAlt")} />
            </div>
          </div>
        </div>
      </div>
      <div className="banner__leftinfo">
        <div className="right__infoscroll">
          <a className="scroll" href="#about">
            {t("banner.scrollDown")}
          </a>
          <a className="scroll__bar" href="#about" aria-label={t("banner.scrollDown")}>
            <img src={scrollDown} alt="" />
          </a>
        </div>
      </div>
      <div className="banner__rightinfo">
        <div className="right__infoscroll">
          <span className="scroll">
            {t("banner.followMe")}
          </span>
          <span className="scroll__bar">
            <img src={scrollDown} alt="" />
          </span>
        </div>
        <div className="banner__xlsocial">
          <ul className="banner__soci d-grid justify-content-center">
            {socialIcons.map(({ icon, id, href, label }) => {
              return (
                <li key={id}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <i>{icon}</i>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
