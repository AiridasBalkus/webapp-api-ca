import React from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingMoviesWeek } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingMoviesPage = (props) => {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['trending'],
    queryFn: getTrendingMoviesWeek,
  });
    if (isPending) {
    return <Spinner />;
    }
    const movies = data.results;

    const favorites = movies.filter(m => m.favorite);

    localStorage.setItem('favorites', JSON.stringify(favorites));
    return (
        <PageTemplate
            title="Trending Movies This Week"
            movies={movies}
            action={(movie) => <AddToFavoritesIcon movie={movie} />}
        />
    );
};
export default TrendingMoviesPage;