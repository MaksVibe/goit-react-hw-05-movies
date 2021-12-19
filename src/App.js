import "./App.css";
import { fetchSearchFilms, fetchFilms } from "./source/api";
import React, { useState, useEffect, lazy, Suspense } from "react";
import HomePage from "./components/HomePage/HomePage";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import NotFound from "./components/common/404NotFound";

function App() {
  const [q, setQ] = useState("");
  const [movieId, setMovieId] = useState(null);
  const [films, setFilms] = useState([]);
  const [film, setFilm] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movieIsOpen, setMovieIsOpen] = useState(false);

  const REQUESTS = {
    TRANDING: "/trending/movie/day",
    INFO: `/movie/${movieId}`,
    CREDITS: `/movie/${movieId}/credits`,
    REVIEWS: `/movie/${movieId}/reviews`,
  };

  useEffect(() => {
    const getFilms = async () => {
      setIsLoading(true);
      try {
        const { results } = await fetchFilms(REQUESTS.TRANDING);
        setFilms([...results]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getFilms();
  }, [REQUESTS.TRANDING]);

  useEffect(() => {
    fetchFilms(REQUESTS.INFO);
    // return () => {
    //   cleanup
    // }
  }, [REQUESTS.INFO]);

  const openMovie = (e) => {
    e.preventDefault();
    setMovieIsOpen(true);
    const film = films.find(({ original_title, id }) =>
      original_title === e.target.textContent ? id : false
    );
    setFilm(film);
  };

  const closeMovie = (e) => {
    setMovieIsOpen(false);
  };

  return (
    <div className="App">
      <AppBar />
      <Switch>
        {/* <Route path="/" exact component={HomePage} /> */}
        <Route path="/" exact>
          <HomePage films={films} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {/* 
          <HomePage films={films} openMovie={openMovie} />

      {movieIsOpen && <MovieDetailsPage closeMovie={closeMovie} film={film} />} */}
    </div>
  );
}

export default App;
