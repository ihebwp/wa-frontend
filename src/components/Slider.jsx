import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import SlideCard from "./SliderCard/SlideCard";
import { SliderData } from "../utils/products";
import { useContext } from "react";
import { DarkModeContext } from "../contexte";



function SampleNextArrow(props) {
const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",color:"black", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",color:"black", background: "gray" }}
      onClick={onClick}
    />
  );
}

const SliderHome = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  return (
    <section
      style={{ backgroundColor: darkMode ? "#fff" : "#000" }}
      className="homeSlide"
    >
      <Container>
        <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <SlideCard
                key={index}
                title={value.title}
                cover={value.cover}
                desc={value.desc}
              />
            );
          })}
        </Slider>
      </Container>
    </section>
  );
};

export default SliderHome;
