import { ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Pricing from "../Components/Pricing/Pricing";
import PageHeader from "../Components/Shared/PageHeader/PageHeader";

const AllServices = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={t("services.heading")} page={t("services.page")} />
      <Pricing />
      <ScrollRestoration />
    </>
  );
};

export default AllServices;
