import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";
import { TextField, Container, Typography } from "@mui/material";
import { searchMovies } from "../api/tmdb-api";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const handleChange =(e,type,value) => {
    e.preventDefault();
    if(type === "search") setQuery(value);
  };
  const handleSearchChange = (e) => {
    handleChange(e, "search", e.target.value);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["searchMoives", { query }],
    queryFn: searchMovies,
    enabled: !!query,
  });
  return (
    <Container sx={{ mt: 5, p: 3, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.03)", boxShadow: 2 }}>
  <Typography variant="h5" gutterBottom fontWeight={600}>
    Search Movies
  </Typography>
  <TextField
    label="Search for a movie..."
    fullWidth
    variant="outlined"
    value={query}
    onChange={handleSearchChange}
    sx={{
      mb: 3,
      input: { color: "white" },
      label: { color: "rgba(255,255,255,0.7)" },
    }}
    />
      {isLoading && <Spinner />}
      {data?.results && <MovieList movies={data.results} />}
    </Container>
  );
}
