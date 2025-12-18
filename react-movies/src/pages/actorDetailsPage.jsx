import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";

export default function ActorDetailsPage() {
  const { id } = useParams();

 const {data: actor, isLoading, } = useQuery({
  queryKey: ["person", { id }],
  queryFn: getPersonDetails,
});

const {
  data: credits, isLoading: creditsLoading, } = useQuery({
  queryKey: ["personMovieCredits", { id }],
  queryFn: getPersonMovieCredits,
});

const navigate = useNavigate();

  if (isLoading || creditsLoading) return <Spinner />;
  const movies = credits?.cast ?? [];
  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar
            alt={actor.name}
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : undefined
            }
            sx={{ width: 96, height: 96 }}
          />
          <div>
            <Typography variant="h4">{actor.name}</Typography>
            {actor.known_for_department && (
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                {actor.known_for_department}
              </Typography>
            )}
            {actor.birthday && (
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Born:{" "}
                {new Date(actor.birthday).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Typography>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1}>
          {actor.homepage && (
            <Chip
              label="Homepage"
              component="a"
              href={actor.homepage}
              clickable
              color="primary"
              variant="outlined"
            />
          )}
          <Chip
            label="Back to movies"
            component={Link}
            to="/"
            clickable
            variant="outlined"
          />
          <Button variant= "outlined" onClick={() => navigate(-1)}>
    BACK
</Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Filmography
        </Typography>
        <Grid container>
          <MovieList
            movies={movies}
            action={(m) => <AddToFavoritesIcon movie={m} />}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}