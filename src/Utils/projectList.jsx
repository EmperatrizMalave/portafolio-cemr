import pro1 from "../assets/img/project/pro1.gif";
import pro2 from "../assets/img/project/pro2.png";
import pro3 from "../assets/img/project/pro3.png";
import pro4 from "../assets/img/project/pro4.png";
import pro5 from "../assets/img/project/pro5.png";
import pro6 from "../assets/img/project/pro6.png";

import qd1 from "../assets/img/project/qd1.gif";
import qd2 from "../assets/img/project/qd2.png";
import qd3 from "../assets/img/project/qd3.png";
import qd4 from "../assets/img/project/qd4.png";
import qd5 from "../assets/img/project/qd5.png";
import qd6 from "../assets/img/project/qd6.png";



export const projectList = [
    {
      id: 1,
      slug: "logotipos-css",
      caseKey: "logos",
      image: pro1,
      heading: "Logotipos en css",
      headingKey: "projects.list.logos.heading",
      subHeading: "Brand Identity & Motion Design",
      subHeadingKey: "projects.list.logos.subHeading",
      category: ["branding_app", "website", "all"],
      year: "2022",
      stack: ["HTML", "CSS"],
      featured: true,
      imagesList: [pro1, pro2, pro3, pro4, pro5, pro6],
    },
    {
      id: 2,
      slug: "queen-dance",
      caseKey: "queen",
      image: qd1,
      heading: "Landing page Queen Dance",
      headingKey: "projects.list.queen.heading",
      subHeading: "Design & Branding Mokeup",
      subHeadingKey: "projects.list.queen.subHeading",
      category: ["los_app", "landing_page", "all"],
      year: "2023",
      stack: ["JavaScript", "CSS", "HTML"],
      featured: true,
      imagesList: [qd1, qd2, qd3, qd4, qd5, qd6],
    },
    {
      id: 3,
      slug: "lector-xml",
      caseKey: "xml",
      headingKey: "projects.list.xml.heading",
      subHeadingKey: "projects.list.xml.subHeading",
      category: ["website", "all"],
      year: "2025",
      stack: ["Python", "CSS", "HTML", "JavaScript"],
      imagesList: [],
    },
    {
      id: 4,
      slug: "drbanner",
      caseKey: "drbanner",
      headingKey: "projects.list.drbanner.heading",
      subHeadingKey: "projects.list.drbanner.subHeading",
      category: ["website", "all"],
      year: "2022",
      stack: ["Java", "Spring Boot", "MySQL"],
      imagesList: [],
    },
  ];


export const imagesList = [pro1, pro3, pro5, pro2, pro4, pro6]