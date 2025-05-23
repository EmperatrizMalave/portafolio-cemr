import "react";
import manimg from "../../../assets/img/banner/banner-man.png";
const Preloader = () => {
  return (
    <div className="preloader__matias">
      <div className="box text-center">
        <div className="matias mb-10">
          <img src={manimg} alt="img" />
        </div>
        <span className="fz-30 coro fw-600 text-uppercase">CEMR</span>
      </div>
    </div>
  );
};

export default Preloader;
