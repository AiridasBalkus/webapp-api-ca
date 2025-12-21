import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    movieId: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
