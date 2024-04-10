import mongoose, { Schema } from "mongoose";
import slugify from "slugify";
import validator from "validator";
const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    price: {
      type: Number,
      require: [true, "A tour must have a price"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a diffyculity "],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true, //Laoji bỏ khoảng trống ở đầu và cuối
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour have must a cover image"],
    },
    images: [String],
    startDates: [String],
    secretTour: {
      type: Boolean,
      default: false,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDEWARE:  runs before .save() and .create()
// // Dùng để thêm dữ liệu sử lí đầu vào mong muốn trước khi save
// tourSchema.pre("save", function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// tourSchema.pre("save", function (next) {
//   console.log("Will save document...");
//   next();
// });

// // tourSchema.post("save", function (doc, next) {
// //   console.log(doc);
// //   next();
// // });

// tourSchema.pre(/^find/, function (next) {
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} miliseconds!`);
//   console.log(docs);
//   next();
// });

// tourSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model("Tours", tourSchema);
export default Tour;
