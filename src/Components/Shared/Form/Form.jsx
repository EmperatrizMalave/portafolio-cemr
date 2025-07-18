import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Form = ({ isColTwo }) => {
  return (
    <div className="replay__box cmn__bg">
      <h3>Deja una respuesta</h3>
      <p>
        Su dirección de correo electrónico no será publicada. Los campos obligatorios están marcados con *.
      </p>
      <form action="#" className="row g-4">
        <div className={` ${isColTwo ? "col-lg-6" : "col-lg-12"}`}>
          <input type="text" placeholder="Nombre" />
        </div>
        <div className={` ${isColTwo ? "col-lg-6" : "col-lg-12"}`}>
          <input type="email" placeholder="correo" />
        </div>
        <div className="col-lg-12">
          <textarea
            name="comment"
            rows="5"
            placeholder="Escribe comentarios"
          ></textarea>
        </div>
        <Link
          to={""}
          className="d-flex fw-500 cmn--btn align-items-center gap-2"
        >
          <span className="get__text">Enviar comentario</span>
          <span>
            <i className=" fz-20">
              {" "}
              <ArrowRight />{" "}
            </i>
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Form;
