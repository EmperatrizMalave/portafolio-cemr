import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { List, ArrowRight } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

import Drawer from "../Drawer/Drawer";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import logo from "../../../assets/img/logo/logo-portafolio-CEMR.webp";

const menuList = [
  {
    id: 1,
    path: "/",
    name: "nav.home",
  },
  {
    id: 2,
    path: "/",
    section: "#about",
    name: "nav.about",
  },
  {
    id: 3,
    path: "/",
    section: "#projects",
    name: "nav.work",
  },

  {
    id: 4,
    path: "/",
    section: "#enfoque",
    name: "nav.camino",
  },
  {
    id: 6,
    path: "/contact",
    name: "nav.contact",
  },
];

const Header = () => {
  const { t } = useTranslation();
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [dropDownId, setDropDownId] = useState(null);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

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

  return (
    <header className={`header-section `}>
      <div className="container">
        <div className="header-wrapper">
          <div className="main__logo">
            <Link to={"/"} className="logo">
              <img src={logo} alt={t("common.logoAlt")} />
            </Link>
          </div>
          <ul className={`main-menu ${menuActive ? "active" : ""}`}>
            {menuList.map(({ id, name, path, dropDown, section }) => {
              return (
                <li key={id} onClick={() => handleSubMenu(id)}>
                  <HashLink smooth to={`${path}${section ? section : ""}`}>
                    {t(name)}
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
          </ul>
          <div className="menu__components d-flex align-items-center">
            <LanguageToggle />
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
              className={`header-bar d-lg-none ${menuActive ? "active" : ""}`}
              aria-label={menuActive ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <button
              type="button"
              onClick={() => setIsSidebarActive(true)}
              className="remove__click"
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
