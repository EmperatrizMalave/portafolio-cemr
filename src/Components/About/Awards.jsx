import { useTranslation } from "react-i18next";

const awardList = [
  {
    id: 1,
    awardName: "about.awards.items.xml.name",
    contest: "about.awards.items.xml.contest",
    year: "2025",
  },
  {
    id: 2,
    awardName: "about.awards.items.queen.name",
    contest: "about.awards.items.queen.contest",
    year: "2023",
  },
  {
    id: 3,
    awardName: "about.awards.items.drbanner.name",
    contest: "about.awards.items.drbanner.contest",
    year: "2022",
  },
  {
    id: 4,
    awardName: "about.awards.items.logos.name",
    contest: "about.awards.items.logos.contest",
    year: "2022",
  },
];
const Awards = () => {
  const { t } = useTranslation();
  return (
    <div className="awoard__section">
      <div className="container" >
        <div
          className="award__wraper table-responsive"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <table className="table w-100">
            <tbody>
              <tr>
                <td style={{ color: " #1a1a1a"}}>
                  <span className="table__title">{t("about.awards.title")}</span>
                </td>
                <td className="cusnoe"></td>
                <td className="text-end">
                  <a
                    href="#0"
                    className="d-flex table__view justify-content-end align-items-center base gap-2"
                  >
                    <span style={{ color: " #1a1a1a"}} >{t("about.awards.link")}</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </td>
              </tr>
              {awardList.map(({ contest, id, year, awardName }) => {
                return (
                  <tr key={id}>
                    <td style={{ color: " #1a1a1a"}}>{t(awardName)}</td>
                    <td style={{ color: " #1a1a1a"}}>{t(contest)}</td>
                    <td className="text-end" style={{ color: " #1a1a1a"}}>{year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Awards;
