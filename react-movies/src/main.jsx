
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../src/components/templateMoviePage";
import MovieReview from "../src/components/movieReview";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from './pages/upcomingMoviesPage'
import TrendingMoviesPage from './pages/trendingMoviesPage'
import ActorDetailsPage from "./pages/actorDetailsPage";
import SearchPage from "./pages/searchPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const MovieReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  
  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div
      style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #1e1e2f 30%, #121212 100%)",
      color:"whitesmoke",
    }}>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="*" element={ <Navigate to="/" /> } />
          </Routes>
        </MoviesContextProvider>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);