import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { List, ArrowRight, House, Person, Briefcase, SignpostSplit, Envelope } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

import Drawer from "../Drawer/Drawer";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import ResumeMenu from "../Resume/ResumeMenu";
import logo from "../../../assets/img/logo/logo-portafolio-CEMR.webp";
import { socialIcons } from "../../../Utils/socialIcons";

const menuList = [
  {
    id: 1,
    path: "/",
    name: "nav.home",
    icon: House,
  },
  {
    id: 2,
    path: "/",
    section: "#about",
    name: "nav.about",
    icon: Person,
  },
  {
    id: 3,
    path: "/",
    section: "#projects",
    name: "nav.work",
    icon: Briefcase,
  },
  {
    id: 4,
    path: "/",
    section: "#enfoque",
    name: "nav.camino",
    icon: SignpostSplit,
  },
  {
    id: 6,
    path: "/contact",
    name: "nav.contact",
    icon: Envelope,
  },
];

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const headerRef = useRef(null);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState(false);
  const [dropDownId, setDropDownId] = useState(null);
  const [socialOpen, setSocialOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1199px)");
    const sync = () => {
      setIsCompactNav(media.matches);
      if (!media.matches) setMenuActive(false);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setMenuActive(false);
    setSocialOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuActive);
    return () => document.body.classList.remove("nav-open");
  }, [menuActive]);

  useEffect(() => {
    if (!menuActive) return undefined;
    const onPointer = (event) => {
      const root = headerRef.current;
      if (!root) return;
      const menu = root.querySelector(".main-menu");
      const toggle = root.querySelector(".header-bar");
      if (menu?.contains(event.target) || toggle?.contains(event.target)) return;
      if (event.target.closest(".resume-menu__list")) return;
      setMenuActive(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setMenuActive(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuActive]);

  const isSticky = () => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;

    scrollTop >= 35
      ? header.classList.add("menu-fixed", "animated", "fadeInDown")
      : header.classList.remove("menu-fixed");
  };

  const handleHeaderToggle = () => {
    setMenuActive(!menuActive);
  };

  const handleSubMenu = (id) => {
    setDropDownId(id);
  };

  const closeMenu = () => {
    setMenuActive(false);
    setSocialOpen(false);
  };

  const isCurrent = ({ path, section }) => {
    if (path === "/contact") return location.pathname === "/contact";
    if (section) return location.pathname === "/" && location.hash === section;
    return location.pathname === "/" && !location.hash;
  };

  return (
    <header
      ref={headerRef}
      className={`header-section${menuActive ? " header-section--open" : ""}`}
    >
      {menuActive && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label={t("nav.closeMenu")}
          onClick={closeMenu}
        />
      )}
      <div className="container">
        <div className="header-wrapper">
          <div className="main__logo">
            <Link to={"/"} className="logo" onClick={closeMenu}>
              <img src={logo} alt={t("common.logoAlt")} />
              <span className="brand-name">{t("nav.brand")}</span>
            </Link>
          </div>
          <ul
            id="site-nav"
            className={`main-menu ${menuActive ? "active" : ""}`}
            aria-hidden={isCompactNav && !menuActive ? true : undefined}
          >
            {menuList.map(({ id, name, path, dropDown, section, icon: Icon }) => {
              return (
                <li key={id} onClick={() => handleSubMenu(id)}>
                  <HashLink
                    smooth
                    to={`${path}${section ? section : ""}`}
                    className={isCurrent({ path, section }) ? "is-current" : undefined}
                    onClick={closeMenu}
                  >
                    <span className="nav-ico" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="nav-label">{t(name)}</span>
                  </HashLink>
                  {dropDown?.length && (
                    <ul className={`sub-menu ${dropDownId === id ? "sub-menu_active":""}`}>
                      {dropDown.map(({ id, name, path }) => {
                        return (
                          <li key={id}>
                            <HashLink smooth to={path}>
                              {name}
                            </HashLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="mobile-nav__footer">
              <button
                type="button"
                className="mobile-nav__social"
                aria-expanded={socialOpen}
                onClick={() => setSocialOpen((open) => !open)}
              >
                {t("nav.social")}
              </button>
              {socialOpen && (
                <div className="mobile-nav__social-links">
                  {socialIcons.map(({ id, icon, href, label }) => (
                    <a key={id} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      {icon}
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              )}
              <ResumeMenu compact inline />
              <Link to="/contact" className="mobile-nav__talk" onClick={closeMenu}>
                <span>{t("nav.letsTalk")}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          </ul>
          <div className="menu__components d-flex align-items-center">
            <LanguageToggle />
            {location.pathname !== "/" && <ResumeMenu compact />}
            <Link
              to="/contact"
              className="d-flex fw-500 cmn--btn align-items-center gap-2"
            >
              <span className="get__text">{t("nav.letsTalk")}</span>
              <span>
                <ArrowRight className="fz-20" />
              </span>
            </Link>
            <button
              type="button"
              onClick={handleHeaderToggle}
              className={`header-bar ${menuActive ? "active" : ""}`}
              aria-label={menuActive ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={menuActive}
              aria-controls="site-nav"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <button
              type="button"
              onClick={() => setIsSidebarActive(true)}
              className="remove__click header-drawer"
              aria-label={t("nav.openMenu")}
            >
              <List className="icon" />
            </button>
          </div>
        </div>
      </div>
      <Drawer
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />
    </header>
  );
};

export default Header;
