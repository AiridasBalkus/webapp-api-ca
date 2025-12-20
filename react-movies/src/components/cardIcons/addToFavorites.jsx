import React, { useContext, useState } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "../../contexts/AuthContext";

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const authContext = useContext(AuthContext);

  const [clicked, setClicked] = useState(false);

  const handleAddToFavorites = (e) => {
    e.preventDefault();

    if (!authContext.isAuthenticated) return;
    context.addToFavorites(movie);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };
  const isLoggedIn = authContext.isAuthenticated;
  return (
    <Tooltip
      title={!isLoggedIn ? "You need to log in to add favorites" : ""}
      arrow
      slotProps={{
    tooltip: {sx: {fontSize: "1rem", padding: "10px 14px" },},}}>
      <span>
        <IconButton
          aria-label="add to favorites"
          disabled={!isLoggedIn}
          onClick={handleAddToFavorites}
          sx={{
            transform: clicked ? "scale(1.3)" : "scale(1)",
            transition: "transform 0.2s ease",
            opacity: isLoggedIn ? 1 : 0.4,
            cursor: isLoggedIn ? "pointer" : "not-allowed",
          }}
        >
          <FavoriteIcon color="error" fontSize="large" />
       </IconButton>
      </span>
    </Tooltip>
  );
};

export default AddToFavoritesIcon;