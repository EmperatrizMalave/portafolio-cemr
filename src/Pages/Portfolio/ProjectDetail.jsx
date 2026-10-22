import { Navigate, ScrollRestoration, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import { projectList } from "../../Utils/projectList";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = projectList.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <>
      <PageHeader
        className="project-detail__header"
        heading={t(project.headingKey)}
        page={t("portfolio.page")}
      />
      <section className="project-detail pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <h2>{t("portfolio.detail.problem")}</h2>
              <p>{t(`portfolio.cases.${project.caseKey}.problem`)}</p>
              <h2>{t("portfolio.detail.role")}</h2>
              <p>{t(`portfolio.cases.${project.caseKey}.role`)}</p>
              <h2>{t("portfolio.detail.result")}</h2>
              <p>{t(`portfolio.cases.${project.caseKey}.result`)}</p>
              {project.imagesList?.length > 0 && (
                <div className="project-detail__gallery">
                  {project.imagesList.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`${t(project.headingKey)} ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <aside className="project-detail__meta">
                <span>{t("portfolio.detail.year")}</span>
                <p>{project.year}</p>
                <span>{t("portfolio.detail.stack")}</span>
                <p>{project.stack.join(", ")}</p>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <ScrollRestoration />
    </>
  );
};

export default ProjectDetail;
