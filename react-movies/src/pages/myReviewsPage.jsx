import React from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router";
import Spinner from "../components/spinner";
import { getMyReviews } from "../api/reviews-api";
import { getMovie } from "../api/tmdb-api";

const MyReviewsPage = () => {
  const {data: reviews = [], isLoading: reviewsLoading, isError, error,} = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
  });

  const movieQueries = useQueries({
    queries: reviews.map((r) => ({
      queryKey: ["movie", { id: r.movieId }],
      queryFn: getMovie,
      enabled: !!r.movieId,
    })),
  });

  const moviesLoading = reviews.length > 0 && movieQueries.some((q) => q.isLoading);

  if (reviewsLoading || moviesLoading) {
    return <Spinner />
};
  if (isError) {
    return <h1>{error.message}</h1>
};

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Reviews
      </Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        reviews.map((r, i) => {
          const movieTitle = movieQueries[i]?.data?.title || `Movie ${r.movieId}`;
          return (
            <Paper key={r._id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">
                <Link to={`/movies/${r.movieId}`} style={{ textDecoration: "none" }}>
                  {movieTitle}
                </Link>
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Rating:</strong> {r.rating}/5
              </Typography>
              <Typography sx={{ mt: 1 }}>{r.review}</Typography>
              <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                By: {r.author}
              </Typography>
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default MyReviewsPage;
