import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'


const TemplateMoviePage = ({ movie, children }) => {
    const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters 


  return (
    <>
      <MovieHeader movie={movie} />
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{ xs: 3 }}>
          <div
          style={{
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          }}>
            <ImageList
                sx={{
                    height: "100vh",
                }}
                cols={1}
            >
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          </div>
        </Grid>
        <Grid size={{xs: 9}}>
         <div
         style={{
          padding: 16,
          borderRadius: 12,
          background: "rgba(255,255,255,0.02)",
        }}>
          {children}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
