import React from 'react';
import Header from './Header';
import Genre from './Genre';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const MovieDetail = ({ movie, history }) => (
  <section className="main-container">
    <Header history={history}/>
    <div className="detail-wrapper">
      <img
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
        alt={movie.title}
        className="detail-poster"
      >
      </img>
      <div className="detail-describe">
        <div className="detail-headline">
          <div className="detail-title">{movie.title}</div>
          <div className="detail-vote_average"><b>{movie.vote_average}</b> / 10 <span>({movie.vote_count})</span></div>
        </div>
        <div className="detail-releaseDate">Released at: {movie.release_date}</div>
        <p className="detail-overview">{movie.overview}</p>
        <div className="movie-genre">
          {
            movie.genre && movie.genre.map((genre) => (
              <Genre key={genre} genre={genre} />
            ))
          }
        </div>
        <Link to={`/reservation/${movie.id}`} className="reservation-link">
          <div className="button reservation">MAKE A RESERVATION</div>
        </Link>
      </div>
    </div>
  </section>
);

const mapStateToProps = (state, props) => ({
  movie: state.movies.filter((movie) => movie.id === Number(props.match.params.id))[0]
})

export default connect(mapStateToProps)(MovieDetail);