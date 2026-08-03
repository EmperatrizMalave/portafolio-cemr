import { ScrollRestoration } from "react-router-dom";

import PageHeader from "../../Components/Shared/PageHeader/PageHeader";


const AllBlogs = () => {

  return (
    <>
      <PageHeader heading={"Blog Standard"} page={"Blog Standard"} />
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
