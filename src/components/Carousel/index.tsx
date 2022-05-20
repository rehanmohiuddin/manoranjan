import React from "react";
import "./index.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getVideoSuccessPayload } from "../../types/videos";

function Index({ items }: { items: Array<getVideoSuccessPayload> }) {
  return (
    <Carousel
      className="carousel-container"
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
    >
      {items.map((item) => (
        <>
          <img
            className="featured-img"
            src={item.snippet.thumbnails.high.url}
          />
          <div className="title">{item.snippet.title}</div>
        </>
      ))}
    </Carousel>
  );
}

export default Index;
