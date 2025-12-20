import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null); //eslint-disable-line

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState(() => {
  const stored = localStorage.getItem("favorites");
  return stored ? JSON.parse(stored) : [];
});
    const [myReviews, setMyReviews] = useState( {} ) 
    const [mustWatch, setMustWatch] = useState( [] )
  
    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };
 
  const addToMustWatch = (movie) => {
    setMustWatch((prevList) => {
      if (!prevList.includes(movie.id)) {
        const updatedList = [...prevList, movie.id];
        console.log("Must Watch List:", updatedList);
        return updatedList;
      }
      return prevList;
    });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};


export default MoviesContextProvider;
