import { useState } from "react";
import { useTranslation } from "react-i18next";

import { projectList } from "../../Utlits/projectList";
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
const Protfolio = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
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

  const openLightbox = (index) => {
    setCurrentId(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <PageHeader heading={t("portfolio.heading")} page={t("portfolio.page")} />
      <section className="project__section pb-120">
        <div className="container">
          <div className="singletab protfolio__filter">
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
                ({ heading, headingKey, id, image, subHeading, subHeadingKey }, index) => (
                  <ProjectCard
                    key={id}
                    image={image}
                    heading={t(headingKey)}
                    subHeading={t(subHeadingKey)}
                    openLightbox={openLightbox}
                    index={index}
                    navigate="/protfolio-details"
                  />
                )
              )}
            </div>
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
      <ScrollRestoration />
    </>
  );
};

export default Protfolio;
