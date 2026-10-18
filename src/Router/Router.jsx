import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact/Contact";
import Portfolio from "../Pages/Portfolio/Portfolio";
import ProjectDetail from "../Pages/Portfolio/ProjectDetail";
import NotFound from "../Pages/Info/NotFound";
import Legal from "../Pages/Info/Legal";

const LegacyProjectRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/portfolio/${slug}`} replace />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/portfolio/:slug",
        element: <ProjectDetail />,
      },
      {
        path: "/terminos",
        element: <Legal kind="terms" />,
      },
      {
        path: "/privacidad",
        element: <Legal kind="privacy" />,
      },
      {
        path: "/protfolio",
        element: <Navigate to="/portfolio" replace />,
      },
      {
        path: "/protfolio/:slug",
        element: <LegacyProjectRedirect />,
      },
      {
        path: "/protfolio-details",
        element: <Navigate to="/portfolio" replace />,
      },
      {
        path: "/all-services",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/service-details",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/all-blog",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/blog-details",
        element: <Navigate to="/" replace />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
