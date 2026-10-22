import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import cori from "../../assets/cori-pixel.png";

const scrollY = () =>
  window.scrollY ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

const preview = (text) => {
  const clean = String(text).replace(/\s+/g, " ").trim();
  const words = clean.split(" ").slice(0, 2).join(" ");
  return words.length < clean.length ? `${words}…` : words;
};

const Caminante = () => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [bubble, setBubble] = useState("");

  useEffect(() => {
    if (window.__coriLine) setBubble(window.__coriLine);
    const onSay = (event) => {
      setBubble(event.detail || "");
      const el = ref.current;
      if (!el) return;
      el.classList.remove("caminante--jump");
      void el.offsetWidth;
      el.classList.add("caminante--jump");
    };
    window.addEventListener("cori-say", onSay);
    return () => window.removeEventListener("cori-say", onSay);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let last = scrollY();
    let idleTimer = 0;
    let jumping = false;
    let manualY = null;

    const syncLane = () => {
      const sample =
        document.querySelector(".footer__section .container") ||
        document.querySelector("#home .container");
      const avatarRight = 12 + el.offsetWidth + 12;
      const left = sample ? sample.getBoundingClientRect().left : 0;
      const need = Math.max(0, Math.round(avatarRight - (left + 12)));
      document.documentElement.style.setProperty("--caminante-lane", `${need}px`);
    };

    const limits = () => {
      const header = document.querySelector(".header-section");
      let minY = header ? Math.round(header.getBoundingClientRect().bottom + 12) : 130;
      const label = document.querySelector(".banner__leftinfo .scroll");
      if (label) {
        const style = getComputedStyle(label);
        const box = label.getBoundingClientRect();
        if (style.display !== "none" && box.height > 8 && box.bottom < window.innerHeight * 0.85) {
          minY = Math.max(minY, Math.round(box.bottom + 12));
        }
      }
      if (el.querySelector(".caminante__bubble")) minY += 22;
      const maxY = Math.max(window.innerHeight - el.offsetHeight - 8, minY);
      return { minY, maxY };
    };

    const yFromScroll = () => {
      const { minY, maxY } = limits();
      const max = Math.max(
        (document.scrollingElement || document.documentElement).scrollHeight -
          window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollY() / max, 0), 1);
      return minY + progress * (maxY - minY);
    };

    const paint = (y) => {
      el.style.transform = `translate3d(12px, ${Math.round(y)}px, 0)`;
    };

    const walk = (dir) => {
      if (reduceMotion.matches || jumping) return;
      el.classList.toggle("caminante--left", dir < 0);
      el.classList.add("caminante--walk");
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => el.classList.remove("caminante--walk"), 420);
    };

    const place = () => {
      syncLane();
      if (manualY !== null) return;
      paint(yFromScroll());
    };

    const onScroll = () => {
      const y = scrollY();
      const delta = y - last;
      last = y;
      place();
      if (Math.abs(delta) < 1) return;
      walk(delta);
    };

    const onWheel = () => {
      manualY = null;
    };

    const onKey = (event) => {
      const target = event.target;
      const esCampo =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (esCampo) return;

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const dir = event.key === "ArrowDown" ? 1 : -1;
        const { minY, maxY } = limits();
        const current = manualY === null ? el.getBoundingClientRect().top : manualY;
        let next = current + dir * 150;
        const scroller = document.scrollingElement || document.documentElement;
        if (next > maxY) {
          scroller.scrollTop += Math.round(window.innerHeight * 0.6);
          next = maxY;
        } else if (next < minY) {
          scroller.scrollTop = Math.max(0, scroller.scrollTop - Math.round(window.innerHeight * 0.6));
          next = minY;
        }
        manualY = next;
        paint(next);
        walk(dir);
        return;
      }

      if ((event.key === " " || event.code === "Space") && !jumping) {
        event.preventDefault();
        jumping = true;
        el.classList.remove("caminante--walk");
        el.classList.remove("caminante--jump");
        void el.offsetWidth;
        el.classList.add("caminante--jump");
      }
    };

    const onAnimationEnd = (event) => {
      if (event.animationName !== "caminante-saltar" && event.animationName !== "caminante-saltar-left") {
        return;
      }
      el.classList.remove("caminante--jump");
      jumping = false;
    };

    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", place);
    document.addEventListener("keydown", onKey);
    el.addEventListener("animationend", onAnimationEnd);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", place);
      document.removeEventListener("keydown", onKey);
      el.removeEventListener("animationend", onAnimationEnd);
      window.clearTimeout(idleTimer);
    };
  }, []);

  const openChat = () => {
    if (location.pathname === "/contact") {
      document.querySelector(".chatbot__card")?.scrollIntoView({ behavior: "smooth", block: "center" });
      document.querySelector("#contact-message")?.focus();
      return;
    }
    navigate("/contact", { state: { talk: true } });
  };

  return (
    <div className="caminante" ref={ref}>
      {location.pathname === "/contact" && bubble && (
        <p className="caminante__bubble">{preview(bubble)}</p>
      )}
      <button type="button" className="caminante__hit" onClick={openChat} aria-label={t("contact.talk")}>
        <img src={cori} alt="" />
        <span className="caminante__ask" aria-hidden="true">?</span>
      </button>
    </div>
  );
};

export default Caminante;
