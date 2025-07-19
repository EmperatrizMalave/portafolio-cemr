import { ScrollRestoration } from "react-router-dom";
import Pricing from "../Components/Pricing/Pricing";
import PageHeader from "../Components/Shared/PageHeader/PageHeader";

const AllServices = () => {
  return (
    <>
      <PageHeader heading={"Services All"} page={"Services All"} />
      <Pricing />
      <ScrollRestoration />
    </>
  );
};

export default AllServices;
