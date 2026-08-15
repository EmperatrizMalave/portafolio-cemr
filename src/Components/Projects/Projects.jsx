import { useState } from "react";
import { useTranslation } from "react-i18next";

import Title from "../Shared/Title/Title";
import Lightbox from "../Shared/LightBox/LightBox";
import ProjectCard from "../Shared/ProjectCard/ProjectCard";
import { projectList } from "../../Utlits/projectList";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useTranslation();
  const [currentId, setCurrentId] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentId(index);
    setLightboxOpen(true);
  };

  return (
    <section className="project__section pt-120 pb-120" id="projects">
      <div className="container">
        <Title
          mainTitle={t("projects.title")}
          sortTitle={t("projects.sub")}
        />

        <div className={`project__wrapone`}>
          {projectList.map(({ heading, headingKey, id, image, subHeading, subHeadingKey, navigate }, index) => (
            <ProjectCard
              key={id}
              image={image}
              heading={t(headingKey) !== headingKey ? t(headingKey) : heading}
              subHeading={t(subHeadingKey) !== subHeadingKey ? t(subHeadingKey) : subHeading}
              openLightbox={openLightbox}
              index={index}
              navigate={navigate}
            />
          ))}
        </div>

        <div className="custom__hover">
          <Link to={"/protfolio"}
            className="hover__circle mauto"
            data-aos="zoom-out-down"
            data-aos-duration="2000"
          >
            <span className="box">
              <i className="bi bi-arrow-up-right"></i>
              <span className="textmore"> {t("projects.moreWork")} </span>
            </span>
          </Link>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox
          images={projectList[currentId].imagesList}
          setLightboxOpen={setLightboxOpen}
          currentId={currentId}
        />
      )}
    </section>
  );
};

export default Projects;
