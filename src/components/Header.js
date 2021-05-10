import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setFilters } from '../actions/filters'; 

export const Header = (props) => {
  const [text, setText] = useState("");
  
  const onSubmit = (e) => {
    e.preventDefault();
    props.setFilters({ text });
    props.history.push('/');
  }

  return (
    <div className="header">
      <div className="header-flex">
        <Link to="/">
          <h1 className="header-title">Vancouver<br></br>Cinema</h1>
        </Link>
        <form onSubmit={onSubmit} className="search-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="search-text"
          >
          </input>
          <button className="search-icon">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters))
})

export default connect(undefined, mapDispatchToProps)(Header);