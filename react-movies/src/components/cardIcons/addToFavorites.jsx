import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [clicked, setClicked] = useState(false);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(movie);
    setClicked(true);
    setTimeout(()=>setClicked(false),200)
  };

   return (
    <IconButton
      aria-label="add to favorites"
      onClick={handleAddToFavorites}
      sx={{
        transform: clicked ? "scale(1.3)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
    >
      <FavoriteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;
