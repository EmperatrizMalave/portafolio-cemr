import basic from "../../assets/img/project/basic.png";
import warranty from "../../assets/img/project/warranty.png";
import premium from "../../assets/img/project/premium-quality.png";
import { useTranslation } from "react-i18next";
import Price from "./Price";
import Title from "../Shared/Title/Title";
const planData = [
  {
    id: 1,
    planName: "pricing.basic",
    price: "$35",
    time: "pricing.perMonth",
    image: basic,
  },
  {
    id: 2,
    planName: "pricing.ultra",
    price: "$65",
    time: "pricing.perMonth",
    image: warranty,
  },
  {
    id: 3,
    planName: "pricing.gold",
    price: "$95",
    time: "pricing.perMonth",
    image: premium,
  },
];
const Pricing = () => {
  const { t } = useTranslation();
  const fetcher = t("pricing.features", { returnObjects: true });
  return (
    <section className="pricing__section pt-120 pb-120">
      <div className="container">
        <Title
          mainTitle={t("pricing.title")}
          sortTitle={t("pricing.sub")}
        />
        <div className="row g-4 justify-content-center">
          {planData.map(({ id, image, planName, price, time }) => (
            <Price
              key={id}
              image={image}
              planName={t(planName)}
              price={price}
              time={t(time)}
              fetcher={fetcher}
              id={id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
