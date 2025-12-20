import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies } from '../tmdb-api'; 
import { getUpcomingMovies } from '../tmdb-api';
import { getGenres } from '../tmdb-api';


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const upcoming = await getUpcomingMovies();
    res.status(200).json(upcoming);
  })
);

router.get(
  "/genres",
  asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
  })
);


// movie routes to be added

export default router;
