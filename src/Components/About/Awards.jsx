const awardList = [
  {
    id: 1,
    awardName: "Xml reader generator",
    contest: "Python, css, html y Javascript ",
    year: "2025",
  },
  {
    id: 2,
    awardName: "Landing page queen dance",
    contest: "Javascript, css y html",
    year: "2023",
  },
  {
    id: 3,
    awardName: "Pagina Drbanner	",
    contest: "Java, spring boot, Mysql",
    year: "2022",
  },
  {
    id: 4,
    awardName: "Logotipos en CSS",
    contest: "Html & Css",
    year: "2022",
  },
];
const Awards = () => {
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
                  <span className="table__title">Proyectos Realizados</span>
                </td>
                <td className="cusnoe"></td>
                <td className="text-end">
                  <a
                    href="#0"
                    className="d-flex table__view justify-content-end align-items-center base gap-2"
                  >
                    <span style={{ color: " #1a1a1a"}} >Mis proyectos</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </td>
              </tr>
              {awardList.map(({ contest, id, year, awardName }) => {
                return (
                  <tr key={id}>
                    <td style={{ color: " #1a1a1a"}}>{awardName}</td>
                    <td style={{ color: " #1a1a1a"}}>{contest}</td>
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
