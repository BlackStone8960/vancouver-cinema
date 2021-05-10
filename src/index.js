import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routers/AppRouter';
import "./scss/app.scss";
import axios from 'axios';
import configureStore from './store/configureStore';
import { populateMovies } from './actions/movies';
import { Provider } from 'react-redux';
import { startSetReservation } from './actions/reservations';

const store = configureStore();

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// Fetch data -> chain then method -> rendering
const fetchData = async () => {
  const API = {
    baseURL: "https://api.themoviedb.org/3/",
    key: "62157c10c2f3f945ca640aea2fc9b617"
  }
  const moviesData = await axios(`${API.baseURL}movie/now_playing?api_key=${API.key}&language=en-US&page=1`);
  const genre = await axios(`${API.baseURL}genre/movie/list?api_key=${API.key}&language=en-US`);
  const movies = moviesData.data.results;
  const genreData = genre.data.genres;

  movies.forEach((movie, movieIndex, movieArray) => {
    movieArray[movieIndex].genre = [];
    movie.genre_ids.forEach((movieGenreId) => {
      genreData.forEach((genre) => {
        movieGenreId === genre.id && movieArray[movieIndex].genre.push(genre.name);
      })
    })
  });

  //Use Redux to store state
  store.dispatch(populateMovies(movies));
  store.dispatch(startSetReservation());
  renderApp();
} 

fetchData();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
