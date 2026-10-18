import { ArrowUpShort } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import avatar from "../../../assets/img/banner/banner-man.png";
import { cvLink, emailLink, socialIcons } from "../../../Utils/socialIcons";

const Footer = () => {
  const { t } = useTranslation();
  const footerOrder = ["LinkedIn", "Instagram", "Facebook", "GitHub"];
  const contactButtons = [
    ...footerOrder
      .map((name) => socialIcons.find((item) => item.label === name))
      .filter(Boolean)
      .map(({ id, label, icon, href }) => ({
        id,
        label,
        icon,
        href,
        target: "_blank",
      })),
    ...(emailLink
      ? [
          {
            id: "email",
            label: emailLink.label,
            icon: emailLink.icon,
            href: emailLink.href,
          },
        ]
      : []),
    ...(cvLink
      ? [
          {
            id: "cv",
            label: t("footer.cv"),
            icon: cvLink.icon,
            href: cvLink.href,
            download: true,
          },
        ]
      : []),
  ];
  return (
    <footer className="footer__section">
      <div className="container">
        <div className="footer__top pt-120 pb-120">
          <div className="fl">{t("footer.contact")}</div>
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="footer__profile">
                <div className="footer__profile-img">
                  <img src={avatar} alt="Cori Malavé" />
                </div>
                <div className="footer__profile-body">
                  <h3>{t("footer.profile")}</h3>
                  <p>{t("footer.profileText")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer__list">
                {contactButtons.map(({ id, label, icon, href, target, download }) => (
                  <a
                    key={id}
                    href={href}
                    className="footer__button"
                    target={target}
                    rel={target ? "noopener noreferrer" : undefined}
                    {...(download ? { download: true } : {})}
                  >
                    <span className="footer__arrow">&rarr;</span>
                    <span className="footer__icon">{icon}</span>
                    <span className="footer__label">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom cmn__bg">
        <div className="container">
          <div className="copyright">
            <p className="fisrtp">
              Copyright © 2026{" "}
              <Link to={"/"} className="inici">
                CEMR.
              </Link>{" "}
              {t("footer.personal")}
            </p>
            <ul className="terms">
              <li>
                <Link to="/terminos"> {t("footer.terms")} </Link>
              </li>
              <li>
                <Link to="/privacidad"> {t("footer.privacy")} </Link>
              </li>
            </ul>
            <a href="#about" className="toparrow">
              <i>
                <ArrowUpShort />
              </i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
