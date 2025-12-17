import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Link } from "react-router";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToWatch}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;