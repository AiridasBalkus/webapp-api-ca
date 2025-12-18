import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link} from "react-router";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getMovieCredits } from "../../api/tmdb-api";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 1,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  
const [drawerOpen, setDrawerOpen] = useState(false);
const { data: credits, isPending: creditsPending, isError: creditsError, error: creditsErr } =
  useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });
  return (
    <>
      <Typography variant="h5" component="h3" mb={2}>
        Overview
      </Typography>
      <Typography variant="h6" component="p" mb={2}>
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
  <Paper sx={{ ...root, p: 2, }}>
    <Chip label="Cast" sx={{ ...chip }} color="primary" />
    <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
      {credits?.cast?.slice(0, 12).map((c) => (
        <Link key={c.id} to={`/actors/${c.id}`} style={{ textDecoration: "none" }}>
          <Stack alignItems="center" sx={{ width: 100, m: 0.5 }}>
            <Avatar
              alt={c.name}
              src={
                c.profile_path
                  ? `https://image.tmdb.org/t/p/w200${c.profile_path}`
                  : "/avatar-placeholder.png"
              }
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="body2" align="center">
              {c.name}
            </Typography>
            <Typography variant="caption" align="center" color="text.secondary">
              as {c.character}
            </Typography>
          </Stack>
        </Link>
      ))}
    </Stack>
  </Paper>
  <Fab
      color="secondary"
      variant="extended"
      onClick={() => setDrawerOpen(true)}
      sx={{
        position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

      </>
  );
};
export default MovieDetails ;
