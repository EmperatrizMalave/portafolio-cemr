import Marquee from "react-fast-marquee";

const MarqueeWapper = ({ images, direction }) => {
  return (
    <div className="marquee-wrapper text-slider">
      <div className="marquee-inner ">
        <Marquee direction={direction}>
          {images?.map(({ id, image, text }, index) => (
            <div key={index} className="marquee-item">
              {text && <span className="marquee-text">{text}</span>}
              {image && <img src={image} alt="" />}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeWapper;
