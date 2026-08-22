import "react";
import { useTranslation } from "react-i18next";
import personalInfothumb from "../../assets/img/about/personal-infothumb.webp";
import html from "../../assets/img/about/html.png";
import css from "../../assets/img/about/css.png";
import js from "../../assets/img/about/js.png";
import react from "../../assets/img/about/react.png";
import git from "../../assets/img/about/git.png";
import boot from "../../assets/img/about/boot.png";
import mui from "../../assets/img/about/materialui.png";
import figma from "../../assets/img/about/figma.png";
import excel from "../../assets/img/about/excel.png";
import gs from "../../assets/img/about/gs.png";
import postman from "../../assets/img/about/postman.svg";



const skillsList = [
  {
    id: 1,
    skill: "Html",
    percentage: "90%",
    image: html,
  },

  {
    id: 2,
    skill: "Css",
    percentage: "85%",
    image: css,
  },
  {
    id: 3,
    skill: "Javascript",
    percentage: "97%",
    image: js,
  },
    {
    id: 4,
    skill: "React",
    percentage: "97%",
    image: react,
  },
      {
    id: 5,
    skill: "git",
    percentage: "97%",
    image: git,
  },
  {
    id: 6,
    skill: "Bootstrap",
    percentage: "97%",
    image: boot,
  },
  {
    id: 7,
    skill: "Material UI",
    percentage: "97%",
    image: mui,
  },
    {
    id: 8,
    skill: "Figma",
    percentage: "97%",
    image: figma,
  },
      {
    id: 9,
    skill: "Excel",
    percentage: "97%",
    image: excel,
  },
      {
    id: 10,
    skill: "Google sheets",
    percentage: "97%",
    image: gs,
  },
  {
    id: 11,
    skill: "Postman",
    percentage: "85%",
    image: postman,
  },
];
const Skills = ({ isTabActive }) => {
  const { t } = useTranslation();
  return (
    <div className={`tabitem ${isTabActive === "skills" ? "active" : ""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div className="about__onethumb">
              <img src={personalInfothumb} alt="img" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>{t("about.skills.title")}</h2>
              <p>{t("about.skills.text")}</p>
              <div className="about__contactwrap">
                <div className="row g-4">
                  {skillsList.map(({id, skill, image, percentage}) => {
                    return (
                      <div key={id} className="col-xxl-6 col-xl-6 col-lg-12 col-md-6">
                        <div className="abox myskill__item">
                          <div className="thumb">
                            <img src={image} alt="img" style={{ width: '80px', height: '80px' }}/>
                          </div>
                          <div className="mys">
                            <span className="ptext fz-18 mb-15 d-block">{skill}</span>
                            <h1 className="fw-600">{percentage}</h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
