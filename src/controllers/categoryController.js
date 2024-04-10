import Category from "../models/categoriesModel";

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
      const category = await Category.findById(req.params.id);
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
  createCategory = async (req, res, next) => {
    try {
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
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
  updateCategory = async (req, res, next) => {
    try {
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
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
}
