import React from "react";
import "./index.scss";
import { getCategoriesSuccessPayload, videoState } from "../../types/videos";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Index({
  categories,
  activeCategory,
}: {
  categories: Array<getCategoriesSuccessPayload>;
  activeCategory: string;
}) {
  const { allCategories } = useSelector(
    (state: { video: videoState }) => state.video
  );
  console.log(allCategories[activeCategory] ? "category active" : "category");
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link
          to={"/?category=" + category.id}
          className={
            activeCategory === category.id ? "category active" : "category"
          }
        >
          {category.snippet.title}
        </Link>
      ))}
    </div>
  );
}

export default Index;
