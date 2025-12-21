import express from 'express';
import Review from "../../models/reviewModel.js";
import authenticate from '../../authenticate/index.js';

const router = express.Router(); // eslint-disable-line

//create a review
router.post("/", authenticate, async (req, res) => {
  try {
    const review = await Review.create({
      ...req.body,
      userId: req.user._id,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
//get reviews for logged in user
router.get("/me", authenticate, async (req, res) => {
  const reviews = await Review.find({ userId: req.user._id });
  res.json(reviews);
});

//get reviews for a movie
router.get("/movie/:id", async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.id });
  res.json(reviews);
});

export default router;