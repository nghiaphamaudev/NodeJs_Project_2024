import Tour from "../models/toursModel.js";
import { checkIdTourExist } from "../services/tour.service.js";
import processAPI from "../utils/APIFeatures.js";

export default class TourController {
  aliasTopTours = async (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = "ratingsAverage,price";
    req.query.fields =
      "name,duration,maxGroupSize,price,difficulty,ratingsAverage,ratingsQuantity,summary";
    next();
  };

  getAllTours = async (req, res, next) => {
    try {
      const queryTour = new processAPI(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .pagination();

      const tours = await queryTour.query.populate("category");
      res.status(200).json({
        status: "success",
        quantity: tours.length,
        data: tours,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
  getTour = async (req, res, next) => {
    try {
      const findTour = await checkIdTourExist(req.params.id);
      return res.status(200).json({
        status: "success",
        data: findTour,
      });
    } catch (error) {
      next(error);
    }
  };
  createTour = async (req, res, next) => {
    try {
      const tour = await Tour.create(req.body);
      res.status(200).json({
        status: "success",
        data: tour,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };
  deleteTour = async (req, res, next) => {
    try {
      await checkIdTourExist(req.params.id);
      await Tour.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      next(error);
    }
  };
  updateTour = async (req, res, next) => {
    try {
      await checkIdTourExist(req.params.id);
      const tour = await Tour.findOneAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        data: tour,
      });
    } catch (error) {
      next(error);
    }
  };

  getToursStats = async (req, res, next) => {
    try {
      const stats = await Tour.aggregate([
        { $match: { ratingsAverage: { $gte: 4.7 } } },
        {
          $group: {
            _id: { $toUpper: "$name" },
            avgRating: { $avg: "$ratingsAverage" },
            avgPrice: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
          },
        },
        {
          $sort: { avgPrice: 1 },
        },
      ]);
      res.status(200).json({
        status: "success",
        quantity: stats.length,
        data: stats,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  };

  getMonthlyPlan = async (req, res, next) => {
    try {
      const year = req.params.year * 1;

      const plans = await Tour.aggregate([
        {
          $unwind: "$startDates", // Unwind "startDates" array
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        // {
        //   $group: {
        //     _id: { $month: "$startDates" }, // Group by month
        //     numToursStart: { $sum: 1 }, // Count tours starting each month
        //   },
        // },
        // {
        //   $addFields: { month: "$_id" }, // Create "month" field based on grouped _id
        // },
        // {
        //   $project: {
        //     // Select desired fields
        //     _id: 0, // Exclude _id from the result
        //     month: 1,
        //     numToursStart: 1,
        //   },
        // },
        // {
        //   $sort: { numToursStart: -1 }, // Sort by number of tours (descending)
        // },
        // {
        //   $limit: 12, // Limit to top 12 months (optional)
        // },
      ]);

      res.status(200).json({
        status: "success",
        quantity: plans.length,
        data: plans,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(400).json({
        status: "failed",
        message: error.message || "An error occurred while retrieving plans",
      });
    }
  };
}
