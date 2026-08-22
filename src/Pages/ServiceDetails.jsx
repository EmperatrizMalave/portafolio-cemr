import { PlayFill, ArrowRight } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import PageHeader from "../Components/Shared/PageHeader/PageHeader";
import Accordion from "../Components/Accordion/Accordion";

import serDv1 from "../assets/img/project/ser-dv1.png";
import serDv2 from "../assets/img/project/ser-dv2.png";
import detialcontact from "../assets/img/contact/ser-detialcontact.png";
import { ScrollRestoration } from "react-router-dom";

const ServiceDetails = () => {
  const { t } = useTranslation();
  const accordionItems = t("serviceDetails.accordion", { returnObjects: true });
  const serviceItems = t("serviceDetails.serviceItems", { returnObjects: true });

  return (
    <>
 
      <PageHeader heading={t("serviceDetails.heading")} page={t("serviceDetails.page")} />
      <section className="service__details overhid pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="ser__left__details">
                <div className="thumb">
                  <img src={serDv1} alt="img" />
                </div>
                <div
                  className="text__box mb__cus60"
                  data-aos="fade-up"
                  data-aos-duration="1400"
                >
                  <h3 className="textt36 d-block">
                    {t("serviceDetails.aboutTitle")}
                  </h3>
                  <p className="fz-16 pra ttext__one">
                    {t("serviceDetails.aboutText1")}
                  </p>
                  <p className="fz-16 pra">
                    {t("serviceDetails.aboutText2")}
                  </p>
                </div>
                <div
                  className="text__box mb__cus60"
                  data-aos="fade-up"
                  data-aos-duration="1400"
                >
                  <h3 className="textt36 d-block">
                    {t("serviceDetails.specialTitle")}
                  </h3>
                  <p className="fz-16 pra">
                    {t("serviceDetails.specialText")}
                  </p>
                </div>
                <div className="paythumb position-relative">
                  <img src={serDv2} alt="img" />
                  <a
                    href="https://www.youtube.com/watch?v=zFuJgOiUEso&amp;ab_channel=SujithRajendran"
                    className="video__80 video-btn"
                  >
                    <i>
                      <PlayFill/>
                    </i>
                  </a>
                </div>
                <div className="ser__components">
                  <h2 className="whites mb-5">{t("serviceDetails.questions")}</h2>
                  <div className="accordion" id="accordionExample">
                    {accordionItems.map(({ heading, para }, index) => (
                      <Accordion key={index} id={`cmnid${index + 4}`} heading={heading} para={para} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="service__right__wrap">
                <div className="service__rightbox mb-30">
                  <h3>{t("serviceDetails.serviceList")}</h3>
                  {serviceItems.map((item, index) => (
                    <a
                      key={index}
                      href="#0"
                      className={`link__box ${index < serviceItems.length - 1 ? "mb-15" : ""}`}
                    >
                      {item}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                  ))}
                </div>
                <div className="service__rightbox">
                  <div className="thumb">
                    <img
                      src={detialcontact}
                      alt="img"
                    />
                    <a href="#0" className="cmn--btn">
                      <span>{t("serviceDetails.contactMe")}</span>
                      <span>
                        <i>
                          <ArrowRight/>
                        </i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollRestoration/>
    </>
  );
};

export default ServiceDetails;
