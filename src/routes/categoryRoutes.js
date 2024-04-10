import express from "express";
import CategoryController from "../controllers/categoryController";
const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default categoryRouter;
