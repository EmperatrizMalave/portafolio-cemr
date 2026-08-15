import { useEffect, useRef, useState } from "react";
import spriteCori from "../../assets/cemr-walking.png.png";

const niveles = [
  { id: 0, nombre: "Análisis" },
  { id: 1, nombre: "Diseño UI" },
  { id: 2, nombre: "Frontend" },
  { id: 3, nombre: "QA & Testing" },
  { id: 4, nombre: "Documentación" },
];

const Enfoque = () => {
  const [nivelActivo, setNivelActivo] = useState(0);
  const [estaCaminando, setEstaCaminando] = useState(false);
  const [desplazamiento, setDesplazamiento] = useState(0);
  const caminoRef = useRef(null);

  const moverA = (index) => {
    const camino = caminoRef.current;
    if (!camino) return;
    setNivelActivo(index);
    setDesplazamiento((index / (niveles.length - 1)) * camino.clientWidth);
    setEstaCaminando(true);
    setTimeout(() => setEstaCaminando(false), 800);
  };

  useEffect(() => {
    const camino = caminoRef.current;
    if (!camino) return;
    const actualizarPosicion = () =>
      setDesplazamiento((nivelActivo / (niveles.length - 1)) * camino.clientWidth);
    actualizarPosicion();
    window.addEventListener("resize", actualizarPosicion);
    return () => window.removeEventListener("resize", actualizarPosicion);
  }, [nivelActivo]);

  return (
    <section className="enfoque__section pt-120 pb-120" id="enfoque">
      <div className="container">
        <div className="project__head text-center">
          <span className="common__sub" data-aos="fade-up" data-aos-duration="1000">
            Enfoque
          </span>
          <h2 className="fw-500" data-aos="fade-down" data-aos-duration="1000">
            Mi Enfoque de Trabajo
          </h2>
        </div>
        <div className="enfoque-contenedor" data-aos="zoom-in">
          <p className="instruccion">
            Haz clic en una etapa del camino y mira cómo avanza por su
            metodología de trabajo.
          </p>
          <div className="camino-tech" ref={caminoRef}>
            <div
              className={`cori-personaje ${estaCaminando ? "caminando" : ""}`}
              style={{
                transform: `translateX(${desplazamiento}px)`,
                backgroundImage: `url(${spriteCori})`,
              }}
            ></div>
          </div>
          <div className="niveles-contenedor">
            {niveles.map((nivel, index) => (
              <button
                key={nivel.id}
                type="button"
                className={`nivel-marca ${nivelActivo === index ? "activo" : ""}`}
                onClick={() => moverA(index)}
              >
                {nivel.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enfoque;
