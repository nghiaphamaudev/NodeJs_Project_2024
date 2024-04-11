import Category from "../models/categoriesModel.js";
import { checkIdCategoryExist } from "../services/tour.service.js";
import { validateHandler } from "../utils/validateHandler.js";
import {
  createCategory,
  updateCategory,
} from "../validator/product.validator.js";

export default class CategoryController {
  getAllCategories = async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.status(200).json({
        status: "success",
        data: categories,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
  getCategory = async (req, res, next) => {
    try {
      const category = await checkIdCategoryExist(req.params.id);
      res.status(200).json({
        status: "success",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };
  createCategory = async (req, res, next) => {
    try {
      await validateHandler(createCategory, req.body);
      const category = await Category.create(req.body);
      res.status(200).json({
        status: "success",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
  deleteCategory = async (req, res, next) => {
    try {
      await checkIdCategoryExist(req.params.id);
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };
  updateCategory = async (req, res, next) => {
    try {
      await checkIdCategoryExist(req.params.id);
      await validateHandler(updateCategory, req.body);
      const category = await Category.findOneAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };
}
