import personalInfothumb from "../../assets/img/about/personal-infothumb.webp"

const Education = ({isTabActive}) => {
  return (
    <div className={`tabitem ${isTabActive === "education" ? "active":""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div className="about__onethumb">
              <img src={personalInfothumb} alt="img" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>Mi Educacion</h2>
              <p>
              Formación sólida en Contaduría Pública, complementada con Desarrollo Web, Análisis de Datos y fundamentos de IA en Google. Esta trayectoria me permite aplicar una visión analítica al diseño de soluciones tecnológicas innovadoras.
              </p>
              <div className="exprience__box mt-30">
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>2025</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Programming Course</h4>
                    <p className="fz-18 pra d-block"> Acelere su búsqueda de empleo con IA-google</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>2025</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Web Design Course</h4>
                    <p className="fz-18 pra d-block">Analisis de datos de google</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>2024</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">University of Design</h4>
                    <p className="fz-18 pra d-block">Fundamentos de IA de Google</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>2024</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Web Design Course</h4>
                    <p className="fz-18 pra d-block">Mendix developer</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500"  style={{ color: "#38A3D6" }}>2024</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Web Design Course</h4>
                    <p className="fz-18 pra d-block">Desarrollador Java Full Stack</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>2012-2018</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Web Design Course</h4>
                    <p className="fz-18 pra d-block">Contadora Pública. UDO Venezuela</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
