import Tour from "../models/toursModel.js";
import Category from "../models/categoriesModel.js";
import APIError from "../utils/APIError.js";

export const getTourbyId = (id) => {
  return Tour.findById(id);
};

export const checkIdTourExist = async (id) => {
  const tourFindById = await Tour.findById(id);
  if (!tourFindById) {
    throw new APIError(400, "ID Tour not exsist!");
  }
  return tourFindById;
};

export const checkIdCategoryExist = async (id) => {
  const categoryFindById = await Category.findById(id);
  if (!categoryFindById) {
    throw new APIError(400, "ID Category not exsist!");
  }
  return categoryFindById;
};
