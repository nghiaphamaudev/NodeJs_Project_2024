import Tour from "../models/toursModel.js";

export const getTourbyId = (id) => {
  return Tour.findById(id);
};
