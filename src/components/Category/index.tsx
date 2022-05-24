import React from "react";
import "./index.scss";
import { getCategoriesSuccessPayload } from "../../types/videos";
import { Link } from "react-router-dom";

function Index({
  categories,
}: {
  categories: Array<getCategoriesSuccessPayload>;
}) {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <Link to={"/?category=" + category.id} className="category">
          {category.snippet.title}
        </Link>
      ))}
    </div>
  );
}

export default Index;
