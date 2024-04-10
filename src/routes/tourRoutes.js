import express from "express";
import TourController from "../controllers/tourController";
import checkPermisson from "../middlewares/checkPermisson";

const tourRouter = express.Router();
const tourController = new TourController();

tourRouter
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route("/stats").get(tourController.getToursStats);
tourRouter.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

tourRouter
  .route("/")
  .get(tourController.getAllTours)
  .post(checkPermisson, tourController.createTour);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(checkPermisson, tourController.updateTour)
  .delete(checkPermisson, tourController.deleteTour);

export default tourRouter;
