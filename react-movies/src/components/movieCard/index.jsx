
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router";
import Avatar from '@mui/material/Avatar';
import React,  { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";



export default function MovieCard({ movie, action = () => null }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };


  return (
<Card
  sx={{
    borderRadius: 3,
    boxShadow: 2,
    border: "1px solid rgba(255,255,255,0.06)",
    transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
    "&:hover": {
      transform: "translateY(-6px) scale(1.03)",
      boxShadow: "0 10px 28px rgba(0,0,0,.22)",
      borderColor: "rgba(255,255,255,0.12)",
    },
  }}
>
<CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" noWrap>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent sx={{ background: "rgba(0,0,0,0.65)", color: "white", textAlign: "center", py: 1, borderBottomLeftRadius: 12, borderBottomRightRadius: 12,}}>
        <Grid container>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {new Date(movie.release_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </Typography>
          </Grid>
          <Grid size={{xs: 6}}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
            <CardActions disableSpacing>
      {typeof action === "function" ? action(movie):null}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}
