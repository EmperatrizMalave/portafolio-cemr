import { useState } from "react";
import { useTranslation } from "react-i18next";

import sectionStar from "../../assets/img/about/section-star.webp";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import AboutMe from "./AboutMe";

const tabList = [
  {
    id: 1,
    name: "about.tabs.about",
    value: "about",
  },
  {
    id: 2,
    name: "about.tabs.experience",
    value: "experience",
  },
  {
    id: 3,
    name: "about.tabs.education",
    value: "education",
  },
  {
    id: 4,
    name: "about.tabs.skills",
    value: "skills",
  },
];

const About = () => {
  const { t } = useTranslation();
  const [isTabActive, setIsTabAative] = useState("about");

  const handleTabClick = (e) => {
    setIsTabAative(e);
  };

  return (
    <>
      <section className="about__section pt-120 pb-120" id="about">
        <div className="container">
          <div className="personal__head text-center">
            <img
              src={sectionStar}
              className="mb-20"
              alt="star"
              data-aos="fade-up"
              data-aos-duration="1000"
            />
            <p className="descrp" data-aos="fade-up" data-aos-duration="1500">
            {t("about.description")}
            </p>
          </div>
          <div className="singletab">
            <ul className="tablinks">
              {tabList.map(({ id, name, value }) => (
                <li
                  key={id}
                  className={`nav-links ${isTabActive === value ? "active" : ""} `}
                >
                  <button onClick={() => handleTabClick(value)} className="tablink">
                    {t(name)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="tabcontents">
              <AboutMe isTabActive={isTabActive} />
              <Experience isTabActive={isTabActive} />
              <Education isTabActive={isTabActive} />
              <Skills isTabActive={isTabActive} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
