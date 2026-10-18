import { useState } from "react";
import { useTranslation } from "react-i18next";

import Title from "../Shared/Title/Title";
import Lightbox from "../Shared/LightBox/LightBox";
import ProjectCard from "../Shared/ProjectCard/ProjectCard";
import { projectList } from "../../Utils/projectList";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (images) => {
    setGallery(images);
    setLightboxOpen(true);
  };

  return (
    <section className="project__section pt-120 pb-120" id="projects">
      <div className="container">
        <Title
          mainTitle={t("projects.title")}
          sortTitle={t("projects.sub")}
          hideTitle
        />

        <div className={`project__wrapone`}>
          {projectList.filter((project) => project.featured).map((project, index) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              heading={t(project.headingKey)}
              subHeading={t(project.subHeadingKey)}
              onOpen={() => openLightbox(project.imagesList)}
              index={index}
              navigate={`/portfolio/${project.slug}`}
            />
          ))}
        </div>

        <div className="custom__hover">
          <Link to={"/portfolio"}
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
          images={gallery}
          setLightboxOpen={setLightboxOpen}
          currentId={0}
        />
      )}
    </section>
  );
};

export default Projects;
