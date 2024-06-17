export const getWatchlist = () => {
    const watchlist = localStorage.getItem('watchlist');
    return watchlist ? JSON.parse(watchlist) : [];
  };
  
  export const saveToWatchlist = (movie) => {
    const watchlist = getWatchlist();
    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  };
  
  export const removeFromWatchlist = (movieId) => {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter((movie) => movie.id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  };
  