import axios from "axios";
import { Response } from "miragejs";
/**
 * All the routes related to Category are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/categories
 * */

export const getAllCategoriesHandler = async function () {
  try {
    const resp = await axios.get(
      "https://www.googleapis.com/youtube/v3/videoCategories?key=AIzaSyBaT8WNXObDqAs_qVJFhogZGoHW2AjpXAY&regionCode=IN&maxResults=10"
    );
    console.log(resp);
    return new Response(200, {}, { categories: resp.data.items });
  } catch (error) {
    console.log({ error });
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/user/category/:categoryId
 * */

export const getCategoryHandler = function (schema, request) {
  const { categoryId } = request.params;
  try {
    const category = schema.categories.findBy({ _id: categoryId }).attrs;
    return new Response(200, {}, { category });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
