import React from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingMoviesWeek } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMoviesWeek,
  });
  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Movies This Week"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};
export default TrendingMoviesPage;