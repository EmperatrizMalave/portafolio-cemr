import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import es from "../../../i18n/es";
import en from "../../../i18n/en";
import { downloadResume } from "../../../Utils/resumeDownload";

const copies = { es: es.resume, en: en.resume };

const ResumeModal = ({ resume, onClose }) => {
  const titleId = useId();
  const [zoom, setZoom] = useState(1);
  const changeZoom = (delta) => {
    setZoom((current) => Math.min(1.8, Math.max(0.9, Math.round((current + delta) * 10) / 10)));
  };

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "+" || event.key === "=") changeZoom(0.1);
      if (event.key === "-" || event.key === "_") changeZoom(-0.1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="resume-modal" onMouseDown={onClose}>
      <div
        className="resume-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="resume-modal__bar">
          <div className="resume-modal__zoom" role="group" aria-label={resume.zoomLabel}>
            <button
              type="button"
              onClick={() => changeZoom(-0.1)}
              disabled={zoom <= 0.9}
              aria-label={resume.zoomOut}
            >
              −
            </button>
            <button
              type="button"
              className="resume-modal__zoom-value"
              onClick={() => setZoom(1)}
              aria-label={resume.zoomReset}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => changeZoom(0.1)}
              disabled={zoom >= 1.8}
              aria-label={resume.zoomIn}
            >
              +
            </button>
          </div>
          <div className="resume-modal__actions">
            <button type="button" className="resume-modal__download" onClick={() => downloadResume(resume)}>
              {resume.download}
            </button>
            <button type="button" className="resume-modal__close" onClick={onClose}>
              {resume.close}
            </button>
          </div>
        </div>
        <article className="resume-modal__body" style={{ "--resume-zoom": zoom }}>
          <h2 id={titleId}>{resume.fullName}</h2>
          <p className="resume-modal__short">({resume.shortName})</p>
          <p className="resume-modal__headline">{resume.headline}</p>
          <p className="resume-modal__meta">
            {resume.location}
            <br />
            {resume.email}
            <br />
            {resume.linkedinLabel}: {resume.linkedin}
            <br />
            {resume.githubLabel}: {resume.github}
          </p>
          <h3>{resume.summaryTitle}</h3>
          <p>{resume.summary}</p>
          <h3>{resume.experienceTitle}</h3>
          {resume.jobs.map((job) => (
            <section key={job.role}>
              <h4>
                {job.role} | {job.org}
              </h4>
              <p className="resume-modal__date">{job.date}</p>
              {job.note ? <p>{job.note}</p> : null}
              <ul>
                {job.duties.map((duty) => (
                  <li key={duty}>{duty}</li>
                ))}
              </ul>
            </section>
          ))}
          <h3>{resume.educationTitle}</h3>
          <ul>
            {resume.education.map((item) => (
              <li key={item.course}>
                {item.course} — {item.place} ({item.date})
              </li>
            ))}
          </ul>
          <h3>{resume.skillsTitle}</h3>
          <ul>
            {resume.skills.map((group) => (
              <li key={group.label}>
                <strong>{group.label}:</strong> {group.items}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>,
    document.body
  );
};

const ResumeMenu = ({ compact = false, inline = false }) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [box, setBox] = useState(null);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const placeMenu = () => {
    const button = rootRef.current?.querySelector(".resume-menu__trigger");
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const height = listRef.current?.offsetHeight || 96;
    const below = rect.bottom + 8;
    const top = below + height > window.innerHeight ? Math.max(8, rect.top - height - 8) : below;
    setBox({ top, left: rect.left });
  };

  const floating = menuOpen && !inline && compact;
  const flow = menuOpen && !inline && !compact;

  useEffect(() => {
    if (!flow) return undefined;
    const onPointer = (event) => {
      if (rootRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [flow]);

  useEffect(() => {
    if (!floating) return undefined;
    placeMenu();
    const onPointer = (event) => {
      if (rootRef.current?.contains(event.target) || listRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onMove = () => placeMenu();
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onMove);
    window.addEventListener("scroll", onMove, true);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove, true);
    };
  }, [floating]);

  const choose = (lang) => {
    setResume(copies[lang]);
    setMenuOpen(false);
  };

  return (
    <div className={`resume-menu${compact ? " resume-menu--compact" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="resume-menu__trigger"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {t("resume.trigger")}
      </button>
      {menuOpen && inline && (
        <div className="resume-menu__langs" role="menu">
          <button type="button" role="menuitem" onClick={() => choose("es")}>
            🇪🇸 Español
          </button>
          <button type="button" role="menuitem" onClick={() => choose("en")}>
            🇺🇸 English
          </button>
        </div>
      )}
      {menuOpen && !inline && !compact && (
        <ul className="resume-menu__list resume-menu__list--flow" role="menu">
          <li role="none">
            <button type="button" role="menuitem" onClick={() => choose("es")}>
              🇪🇸 Español
            </button>
          </li>
          <li role="none">
            <button type="button" role="menuitem" onClick={() => choose("en")}>
              🇺🇸 English
            </button>
          </li>
        </ul>
      )}
      {menuOpen && !inline && compact &&
        createPortal(
          <ul
            className="resume-menu__list resume-menu__list--floating"
            role="menu"
            ref={listRef}
            style={box ? { top: box.top, left: box.left } : { top: -9999, left: 0 }}
          >
            <li role="none">
              <button type="button" role="menuitem" onClick={() => choose("es")}>
                🇪🇸 Español
              </button>
            </li>
            <li role="none">
              <button type="button" role="menuitem" onClick={() => choose("en")}>
                🇺🇸 English
              </button>
            </li>
          </ul>,
          document.body
        )}
      {resume && <ResumeModal resume={resume} onClose={() => setResume(null)} />}
    </div>
  );
};

export default ResumeMenu;
