import Header from "../Components/Shared/Header/Header";
import Footer from "../Components/Shared/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Banner from "../Components/Banner/Banner";

const Root = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <div className={`banner__section`}>
          <Header />
          <Banner />
        </div>
      ) : (
        <Header />
      )}

      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
