import { useEffect, useRef, useState } from "react";
import { GeoAlt, Flag, HeartPulse } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import spriteCori from "../../assets/cemr-walking-centrado.png";

const ANCHO_PERSONAJE = 96;

const vistas = [
  {
    id: "enfoque",
    titulo: "camino.v1.titulo",
    subtitulo: "camino.v1.subtitulo",
    paradas: [
      { tipo: "banderin", nombre: "camino.v1.stops.0", color: 0 },
      { tipo: "banderin", nombre: "camino.v1.stops.1", color: 1 },
      { tipo: "banderin", nombre: "camino.v1.stops.2", color: 2 },
      {
        tipo: "banderin",
        nombre: "camino.v1.stops.3",
        color: 3,
        detalles: "camino.v1.qaDetails",
      },
      { tipo: "banderin", nombre: "camino.v1.stops.4", color: 4 },
    ],
  },
  {
    id: "origen",
    titulo: "camino.v2.titulo",
    subtitulo: "camino.v2.subtitulo",
    paradas: [
      {
        tipo: "info",
        icono: GeoAlt,
        titulo: "camino.v2.stop1.titulo",
        texto: "camino.v2.stop1.texto",
      },
      {
        tipo: "info",
        icono: Flag,
        titulo: "camino.v2.stop2.titulo",
        texto: "camino.v2.stop2.texto",
      },
    ],
  },
  {
    id: "hobbies",
    titulo: "camino.v3.titulo",
    subtitulo: "camino.v3.subtitulo",
    paradas: [
      {
        tipo: "info",
        icono: HeartPulse,
        titulo: "camino.v3.stop1.titulo",
        texto: "camino.v3.stop1.texto",
      },
    ],
  },
];

const Enfoque = () => {
  const { t } = useTranslation();
  const [paradaActiva, setParadaActiva] = useState(0);
  const [estaCaminando, setEstaCaminando] = useState(false);
  const [estaCayendo, setEstaCayendo] = useState(false);
  const [estaSaltando, setEstaSaltando] = useState(false);
  const [desplazamientoY, setDesplazamientoY] = useState(0);

  const caminoRef = useRef(null);
  const sectionRef = useRef(null);
  const paradaActivaRef = useRef(paradaActiva);
  paradaActivaRef.current = paradaActiva;
  const moverARef = useRef();
  const avanzarRef = useRef();
  const estaSaltandoRef = useRef(estaSaltando);
  estaSaltandoRef.current = estaSaltando;
  const ultimoMovimientoRef = useRef(0);

  const vistaDe = (index) => {
    let acumulado = 0;
    for (let v = 0; v < vistas.length; v++) {
      acumulado += vistas[v].paradas.length;
      if (index < acumulado) return v;
    }
    return vistas.length - 1;
  };

  /* Devuelve el "top" (en px) donde debe estar Cori para pararse en el centro de una parada */
  const calcularPosicion = (index) => {
    const camino = caminoRef.current;
    if (!camino) return 0;
    const parada = camino.querySelectorAll(".parada")[index];
    if (!parada) return 0;
    const caminoRect = camino.getBoundingClientRect();
    const paradaRect = parada.getBoundingClientRect();
    return (
      paradaRect.top - caminoRect.top + paradaRect.height / 2 - ANCHO_PERSONAJE / 2
    );
  };

  const moverA = (index) => {
    const camino = caminoRef.current;
    if (!camino) return;
    const esCaida = vistaDe(index) > vistaDe(paradaActiva);
    setParadaActiva(index);
    setDesplazamientoY(calcularPosicion(index));

    const parada = camino.querySelectorAll(".parada")[index];
    if (parada) {
      parada.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (esCaida) {
      setEstaCaminando(false);
      setEstaCayendo(true);
      setTimeout(() => setEstaCayendo(false), 700);
    } else {
      setEstaCayendo(false);
      setEstaCaminando(true);
      setTimeout(() => setEstaCaminando(false), 800);
    }
  };

  moverARef.current = moverA;

  const avanzar = (direccion) => {
    const total = vistas.reduce((suma, v) => suma + v.paradas.length, 0);
    const nuevo = Math.min(Math.max(paradaActiva + direccion, 0), total - 1);
    moverA(nuevo);
  };

  avanzarRef.current = avanzar;

  useEffect(() => {
    const camino = caminoRef.current;
    if (!camino) return;
    const actualizarPosicion = () => setDesplazamientoY(calcularPosicion(paradaActiva));
    actualizarPosicion();
    window.addEventListener("resize", actualizarPosicion);
    return () => window.removeEventListener("resize", actualizarPosicion);
  }, [paradaActiva]);

  /* Teclado: flechas ↑ ↓ mueven a Cori sin importar el foco */
  useEffect(() => {
    const manejarTecla = (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== " ") return;
      const objetivo = e.target;
      const esCampoTexto =
        objetivo.tagName === "INPUT" ||
        objetivo.tagName === "TEXTAREA" ||
        objetivo.isContentEditable;
      if (esCampoTexto) return;
      e.preventDefault();
      if (e.key === "ArrowDown") {
        avanzarRef.current(1);
      } else if (e.key === "ArrowUp") {
        avanzarRef.current(-1);
      } else if (e.key === " ") {
        if (!estaSaltandoRef.current) setEstaSaltando(true);
      }
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, []);

  /* Rueda del mouse: girar hacia abajo baja, girar hacia arriba sube */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const manejarScroll = (e) => {
      const ahora = Date.now();
      if (ahora - ultimoMovimientoRef.current < 700) return;
      const direccion = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (direccion === 0) return;
      const total = vistas.reduce((suma, v) => suma + v.paradas.length, 0);
      const nuevo = paradaActivaRef.current + direccion;
      if (nuevo < 0 || nuevo >= total) return; /* sin movimiento: deja el scroll normal */
      e.preventDefault();
      ultimoMovimientoRef.current = ahora;
      moverARef.current(nuevo);
    };
    section.addEventListener("wheel", manejarScroll, { passive: false });
    return () => section.removeEventListener("wheel", manejarScroll);
  }, []);

  return (
    <section
      className="enfoque__section pt-120 pb-120"
      id="enfoque"
      ref={sectionRef}
    >
      <div className="container">
        <div className="project__head text-center">
          <span className="common__sub" data-aos="fade-up" data-aos-duration="1000">
            {t("camino.sectionTitle")}
          </span>
        </div>
        <div className="enfoque-contenedor" data-aos="zoom-in">
          <p className="instruccion">
            {t("camino.instruction")}
          </p>
          <div className="camino-wrapper">
            <div className="camino-tech" ref={caminoRef}>
              <div
                className={`cori-personaje ${estaCaminando ? "caminando" : ""} ${
                  estaCayendo ? "cayendo" : ""
                } ${estaSaltando ? "saltando" : ""}`}
                onAnimationEnd={() => setEstaSaltando(false)}
                style={{
                  top: `${desplazamientoY}px`,
                  backgroundImage: `url(${spriteCori})`,
                }}
              ></div>
              {vistas.map((vista, v) => {
                const inicio = vistas
                  .slice(0, v)
                  .reduce((suma, x) => suma + x.paradas.length, 0);
                return (
                  <div
                    className="vista"
                    id={vista.id === "origen" ? "donde-vivo" : vista.id === "hobbies" ? "ejercicio" : undefined}
                    key={vista.id}
                  >
                    <h3 className="vista__titulo">{t(vista.titulo)}</h3>
                    <p className="vista__subtitulo">{t(vista.subtitulo)}</p>
                    <div className="vista__paradas">
                      {vista.paradas.map((parada, i) => {
                        const global = inicio + i;
                        return parada.tipo === "banderin" ? (
                          <button
                            key={global}
                            type="button"
                            className={`parada tarjeta-banderin nivel-${parada.color} ${
                              paradaActiva === global ? "activo" : ""
                            }`}
                            onClick={() => moverA(global)}
                          >
                            <div className="gancho-superior"></div>
                            <h3>{t(parada.nombre)}</h3>
                            {parada.detalles && (
                              <div className="qa-detalles">
                                {t(parada.detalles, { returnObjects: true }).map((detalle) => (
                                  <p key={detalle}>• {detalle}</p>
                                ))}
                              </div>
                            )}
                          </button>
                        ) : (
                          <button
                            key={global}
                            type="button"
                            className={`parada tarjeta-info ${vista.id}-${i} ${
                              paradaActiva === global ? "activo" : ""
                            }`}
                            onClick={() => moverA(global)}
                          >
                            <div className="tarjeta-info__icon">
                              <parada.icono />
                            </div>
                            <h3>{t(parada.titulo)}</h3>
                            <p>{t(parada.texto)}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enfoque;
