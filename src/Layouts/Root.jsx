import Header from "../Components/Shared/Header/Header";
import Footer from "../Components/Shared/Footer/Footer";
import DocumentHead from "../Components/Shared/DocumentHead";
import { Outlet, useLocation } from "react-router-dom";
import Banner from "../Components/Banner/Banner";
import Caminante from "../Components/Enfoque/Caminante";

const Root = () => {
  const location = useLocation();

  return (
    <>
      <DocumentHead />
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
      <Caminante />
    </>
  );
};

export default Root;
