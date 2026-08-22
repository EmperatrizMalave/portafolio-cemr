import { ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageHeader from "../../Components/Shared/PageHeader/PageHeader";


const AllBlogs = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader heading={t("blog.standard")} page={t("blog.standard")} />
      <section className="blog__bsection pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
            </div>
            <div className="col-lg-4">
            </div>
          </div>
        </div>
      </section>
      <ScrollRestoration />
    </>
  );
};

export default AllBlogs;
