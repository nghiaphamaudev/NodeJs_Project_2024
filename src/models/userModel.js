import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },

    confirmPassword: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
