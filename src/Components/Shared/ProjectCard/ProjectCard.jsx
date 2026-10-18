import { ArrowUpRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ProjectCard = ({
  image,
  heading,
  subHeading,
  index,
  onOpen,
  navigate,
}) => {
  if (!image) {
    return (
      <Link
        to={navigate}
        className={`project__item project__item--text ${index !== 2 ? "cus__mb60" : ""}`}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span className="mb-2 d-block text-uppercase" style={{ color: "var(--buttoncolor)" }}>
          {heading}
        </span>
        <h3>{subHeading}</h3>
      </Link>
    );
  }

  return (
    <div
      className={`project__item  ${index !== 2 ? "cus__mb60" : ""}`}
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <button type="button" onClick={onOpen} className="thumb mb-30 imgc" aria-label={heading}>
        <img src={image} alt="" />
      </button>
      <div className="content d-flex align-items-center justify-content-between gap-2">
        <Link to={navigate} className="left__cont">
          <span className="mb-2 mb-xxl-3 d-block text-uppercase"
            style={{ color: "var(--buttoncolor)" }}>
            {heading}
          </span>
          <h3>{subHeading}</h3>
        </Link>
        <Link to={navigate} className="common__icon imgc" aria-label={heading}>
          <ArrowUpRight className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
