import Tour from "../models/toursModel";

export const getTourbyId = (id) => {
  return Tour.findById(id);
};
