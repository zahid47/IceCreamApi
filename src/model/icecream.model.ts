import mongoose from "mongoose";

const icecreamSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: String,
    subhead: String,
    description: String,
    rating: Number,
    ingredients: [String],
  },
  { timestamps: true }
);

const Icecream = mongoose.model("Icecream", icecreamSchema);

export default Icecream;
