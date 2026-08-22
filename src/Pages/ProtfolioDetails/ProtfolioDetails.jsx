import { useState } from "react";
import { useTranslation } from "react-i18next";

import { imagesList, projectList } from "../../Utlits/projectList";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import detailbg from "../../assets/img/protfolio/prot-detailsbig.png";
import detailbg1 from "../../assets/img/protfolio/prot-detials2.png";
import detailbg2 from "../../assets/img/protfolio/prot-detials2.png";
import ProjectCard from "../../Components/Shared/ProjectCard/ProjectCard";
import Lightbox from "../../Components/Shared/LightBox/LightBox";
import { socialIcons } from "../../Utlits/socilIcons";

const ProtfolioDetails = () => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const challengeList = t("portfolio.details.challengeList", { returnObjects: true });

  const openLightbox = (index) => {
    setCurrentId(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  return (
    <>

      <PageHeader
        heading={t("portfolio.details.heading")}
        page={t("portfolio.details.page")}
      />
      <section className="protfolio__details pb-120">
        <div className="container">
          <div
            className="details__bigthumb mb-60"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img src={detailbg} alt="img" />
            <div className="prot__detail__contact">
              <h3>{t("portfolio.details.projectInfo")}</h3>
              <div className="prot__itembox">
                <div className="prot__left">
                  <div className="items mb__cus30">
                    <h5>{t("portfolio.details.clients")}</h5>
                    <p>Nicolas Marko</p>
                  </div>
                  <div className="items">
                    <h5>{t("portfolio.details.date")}</h5>
                    <p>{t("portfolio.details.dateValue")}</p>
                  </div>
                </div>
                <div className="prot__left">
                  <div className="items mb__cus30">
                    <h5>{t("portfolio.details.category")}</h5>
                    <p>{t("portfolio.details.categoryValue")}</p>
                  </div>
                  <div className="items">
                    <h5>{t("portfolio.details.location")}</h5>
                    <p>{t("portfolio.details.locationValue")}</p>
                  </div>
                </div>
              </div>
              <ul className="social d-flex gap-3">
                {socialIcons.map(({ icon, id, href }) => (
                  <li key={id}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <i>{icon}</i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="details__textwrap">
            <div
              className="text__box mb__cus60"
              data-aos="fade-up"
              data-aos-duration="1400"
            >
              <p className="fz-16 pra ttext__one">
                {t("portfolio.details.para1")}
              </p>
              <p className="fz-16 pra">
                {t("portfolio.details.para2")}
              </p>
            </div>
            <div
              className="text__box mb__cus60"
              data-aos="fade-up"
              data-aos-duration="1600"
            >
              <h3 className="text__boxhead">{t("portfolio.details.challenge")}</h3>
              <p className="fz-16 pra ttext__one">
                {t("portfolio.details.challengeText")}
              </p>
              <ul className="challenge__list">
                {challengeList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div
              className="text__box mb__cus60"
              data-aos="fade-up"
              data-aos-duration="1800"
            >
              <h3 className="text__boxhead">{t("portfolio.details.solution")}</h3>
              <p className="fz-16 pra">
                {t("portfolio.details.solutionText")}
              </p>
            </div>
            <div
              className="details__small"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <div className="thumb">
                <img src={detailbg1} alt="img" />
              </div>
              <div className="thumb">
                <img src={detailbg2} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="protfolidetails__section cmn__bg pt-120 pb-120">
        <div className="container">
          <div className="project__head text-center">
            <span
              className="common__sub"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              {t("portfolio.sub")}
            </span>
            <h2 className="fw-500" data-aos="fade-up" data-aos-duration="1000">
              {t("portfolio.related")}
            </h2>
          </div>

          <div className=" project__wrapone">
            {projectList
              .slice(0, 2)
              .map(({ heading, headingKey, id, image, subHeading, subHeadingKey }, index) => (
                <ProjectCard
                  key={id}
                  image={image}
                  heading={t(headingKey)}
                  subHeading={t(subHeadingKey)}
                  openLightbox={openLightbox}
                  index={index}
                />
              ))}
          </div>
        </div>
        {lightboxOpen && (
          <Lightbox
            images={imagesList}
            onClose={closeLightbox}
            currentId={currentId}
          />
        )}
      </section>
    </>
  );
};

export default ProtfolioDetails;
