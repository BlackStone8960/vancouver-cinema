import React from 'react';
import { Link } from 'react-router-dom';
import Genre from './Genre';

const Movie = ({ movie }) => {
  return (
    <div className="movie-box">
      <Link to={`/item/${movie.id}`}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          >
          </img>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-genre">
            {
              movie.genre && movie.genre.map((genre) => (
                <Genre key={genre} genre={genre} />
              ))
            }
          </div>
        </div>
      </Link>
    </div>
  )
}

export {Movie as default};