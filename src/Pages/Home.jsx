import { useEffect, useState } from "react";
import { ScrollRestoration } from "react-router-dom";

import { images, images2 } from "../Utils/marqueeItems";
import About from "../Components/About/About";
import Projects from "../Components/Projects/Projects";
import Enfoque from "../Components/Enfoque/Enfoque";
import MarqueeWapper from "../Components/Shared/Marquee/MarqueeWapper";
import Awards from "../Components/About/Awards";
import Preloader from "../Components/Shared/Preloader/Preloader";


const Home = () => {
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setIsFetching(false);
    }, 1500);
  }, []);

  return (
    <>
      {isFetching && <Preloader />}
      <MarqueeWapper direction="left" images={images} />
      <About />
      <MarqueeWapper direction="right" images={images2} />
      <Awards />
      <Projects />
      <Enfoque />
      <ScrollRestoration/>
    </>
  );
};

export default Home;
