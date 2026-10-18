import { useState } from "react";
import { useTranslation } from "react-i18next";

import { projectList } from "../../Utils/projectList";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import ProjectCard from "../../Components/Shared/ProjectCard/ProjectCard";
import Lightbox from "../../Components/Shared/LightBox/LightBox";
import { ScrollRestoration } from "react-router-dom";

const categoryList = [
  {
    id: 1,
    categoryName: "portfolio.categories.all",
    value: "all",
  },
  {
    id: 2,
    categoryName: "portfolio.categories.branding",
    value: "branding_app",
  },
  {
    id: 3,
    categoryName: "portfolio.categories.los",
    value: "los_app",
  },
  {
    id: 4,
    categoryName: "portfolio.categories.landing",
    value: "landing_page",
  },
  {
    id: 5,
    categoryName: "portfolio.categories.website",
    value: "website",
  },
];
const Portfolio = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  // ---------- Filer project by category
  let filterProject = [];

  for (const iterator of projectList) {
    for (const cet of iterator.category) {
      if (cet === currentCategory) {
        filterProject.push(iterator);
      }
    }
  }

  const openLightbox = (images) => {
    setGallery(images);
    setLightboxOpen(true);
  };

  return (
    <>
      <PageHeader heading={t("portfolio.heading")} page={t("portfolio.page")} />
      <section className="project__section pb-120">
        <div className="container">
          <div className="singletab portfolio__filter">
            <ul
              className="tablinks"
              data-aos="fade-down"
              data-aos-duration="2000"
            >
              {categoryList.map(({ id, categoryName, value }) => (
                <li
                  key={id}
                  className={`nav-links ${
                    currentCategory === value ? "active" : ""
                  } `}
                >
                  <button
                    className="tablink"
                    onClick={() => setCurrentCategory(value)}
                  >
                    {t(categoryName)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tabcontents project__wrapone">
              {filterProject.map(
                (project, index) => (
                  <ProjectCard
                    key={project.id}
                    image={project.image}
                    heading={t(project.headingKey)}
                    subHeading={t(project.subHeadingKey)}
                    onOpen={
                      project.imagesList?.length
                        ? () => openLightbox(project.imagesList)
                        : undefined
                    }
                    index={index}
                    navigate={`/portfolio/${project.slug}`}
                  />
                )
              )}
            </div>
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
      <ScrollRestoration />
    </>
  );
};

export default Portfolio;
