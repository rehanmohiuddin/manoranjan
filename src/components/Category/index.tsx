import React from "react";
import "./index.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  getCategoriesSuccessPayload,
  getVideoSuccessPayload,
} from "../../types/videos";
import { Link } from "react-router-dom";

function Index({
  categories,
}: {
  categories: Array<getCategoriesSuccessPayload>;
}) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link to="/" className="category">
          {category.snippet.title}
        </Link>
      ))}
    </div>
  );
}

export default Index;
