import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Form = ({ isColTwo }) => {
  const { t } = useTranslation();
  return (
    <div className="replay__box cmn__bg">
      <h3>{t("form.title")}</h3>
      <p>{t("form.text")}</p>
      <form action="#" className="row g-4">
        <div className={` ${isColTwo ? "col-lg-6" : "col-lg-12"}`}>
          <input type="text" placeholder={t("form.name")} />
        </div>
        <div className={` ${isColTwo ? "col-lg-6" : "col-lg-12"}`}>
          <input type="email" placeholder={t("form.email")} />
        </div>
        <div className="col-lg-12">
          <textarea
            name="comment"
            rows="5"
            placeholder={t("form.comment")}
          ></textarea>
        </div>
        <Link
          to={""}
          className="d-flex fw-500 cmn--btn align-items-center gap-2"
        >
          <span className="get__text">{t("form.submit")}</span>
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
