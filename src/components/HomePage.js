import React from 'react';
import MovieList from './MovieList';
import Header from './Header';
import { connect } from 'react-redux';
import { resetFilters } from '../actions/filters';

export const Homepage = (props) => {  
  return (
    <section className="main-container">
      <Header history={props.history}/>
      <div className="main-wrapper">
        <MovieList />
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetFilters: () => dispatch(resetFilters())
});

export default connect(undefined, mapDispatchToProps)(Homepage);