import { useState } from "react";
import { GeoAlt, Flag, HeartPulse } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

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

  const elegirParada = (index, elemento) => {
    setParadaActiva(index);
    elemento.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="enfoque__section pt-120 pb-120" id="enfoque">
      <div className="container">
        <div className="project__head text-center">
          <span className="common__sub" data-aos="fade-up" data-aos-duration="1000">
            {t("camino.sectionTitle")}
          </span>
        </div>
        <div className="enfoque-contenedor" data-aos="zoom-in">
          <div className="camino-wrapper">
            <div className="camino-tech">
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
                            onClick={(event) => elegirParada(global, event.currentTarget)}
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
                            onClick={(event) => elegirParada(global, event.currentTarget)}
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
