import { Link, ScrollRestoration } from "react-router-dom";
import { useTranslation } from "react-i18next";


import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import bblog1 from "../../assets/img/blog/bblog1.png";
import blogDetailsb2 from "../../assets/img/blog/blog-detailsb2.png";
import straightQuotes from "../../assets/img/blog/straight-quotes.png";
import Form from "../../Components/Shared/Form/Form";
import { socialIcons } from "../../Utlits/socilIcons";

const BlogDetails = () => {
  const { t } = useTranslation();
  const blogList = t("blog.list", { returnObjects: true });

  return (
    <>
      <PageHeader
        heading={t("blog.heading")}
        page={t("blog.page")}
      />
      <section className="blog__bsection pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="blog__bleft__wrapper">
                <div
                  className="blog__bitem"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Link to="" className="thumb">
                    <img src={bblog1} alt="img" />
                  </Link>
                  <div className="content__two">
                    <div
                      className="text__box mb-30"
                      data-aos="fade-up"
                      data-aos-duration="1400"
                    >
                      <span className="text__de">
                        {t("blog.meta")}
                      </span>
                      <p className="fz-16 pra ttext__one">
                        {t("blog.para1")}
                      </p>
                      <p className="fz-16 pra">
                        {t("blog.para2")}
                      </p>
                    </div>
                    <div className="quite__box mb-30">
                      <img src={straightQuotes} alt="img" />
                      <p>
                        {t("blog.quote")}
                      </p>
                      <Link to="">{t("blog.quoteAuthor")}</Link>
                    </div>
                    <p className="fz-16 pra ttext__one mb__cus60">
                      {t("blog.para3")}
                    </p>
                    <h3 className="white mb-30">
                      {t("blog.onlyTheme")}
                    </h3>
                    <div className="thumb mb-30">
                      <img src={blogDetailsb2} alt="img" />
                    </div>
                    <p className="fz-16 pra ttext__one mb-30">
                      {t("blog.para4")}
                    </p>
                    <div
                      className="text__box mb-30"
                      data-aos="fade-up"
                      data-aos-duration="1600"
                    >
                      <ul className="challenge__list">
                        {blogList.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="fz-16 pra ttext__one mb-30">
                      {t("blog.para5")}
                    </p>
                  </div>
                  <div className="post__in cmn__bg mb__cus60">
                    <div className="post__left">
                      <span className="fz-20 fw-500 white">{t("blog.postedIn")}</span>
                      <Link to="">{t("blog.business")}</Link>
                      <Link to="">{t("blog.digital")}</Link>
                    </div>
                    <div className="post__right">
                      <span className="fz-20 fw-500 white">{t("blog.share")}</span>
                      <ul className="social-cus d-flex align-items-center">
                        {socialIcons.map(({id, icon, href}) => (
                          <li key={id}>
                            <a href={href} target="_blank" rel="noopener noreferrer">
                              <i>
                                {icon}
                              </i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Form isColTwo={true} />
                </div>
              </div>
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

export default BlogDetails;
