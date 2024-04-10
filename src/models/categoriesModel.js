import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
