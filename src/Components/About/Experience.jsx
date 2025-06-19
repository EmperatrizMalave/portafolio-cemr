import personalInfothumb from "../../assets/img/about/personal-infothumb.webp"

const Experience = ({isTabActive}) => {
  return (
    <div className={`tabitem ${isTabActive === "experience" ? "active":""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div className="about__onethumb">
              <img src={personalInfothumb} alt="img" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2>Mi Experiencia</h2>
              <p>
                Profesional apasionada por la intersección entre finanzas y tecnología, con experiencia en contaduría. Me especializo en el desarrollo de soluciones digitales que optimizan la eficiencia y la toma de decisiones, transformando conceptos complejos en herramientas funcionales y estratégicas
              </p>
              <div className="exprience_box mt-30">
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>En 2024</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Software Engineer</h4>
                    <p className="fz-18 pra d-block">Asistente de Control de Gastos </p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>En 2023</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Product Designer</h4>
                    <p className="fz-18 pra d-block">Desarrolladora Frontend Jr</p>
                  </div>
                </div>
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>En 2022</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Senior UI Designer</h4>
                    <p className="fz-18 pra d-block">Desarrollo de sitio web publicitario — Proyecto freelance</p>
                  </div>
                </div>
              </div>
              <div className="exprience__box mt-30">
                <div className="exri__item">
                  <span className="fz-18 fw-500" style={{ color: "#38A3D6" }}>En 2020-2021</span>
                  <div className="expri__cont">
                    <h4 className="mb-15 text-white">Software Engineer</h4>
                    <p className="fz-18 pra d-block">Operador CRC</p>
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

export default Experience;
