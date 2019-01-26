import React, { Component } from 'react';
import { BASE_IMAGE_URL } from '../../actions/constants';
import { parseDate, parsePrice, parseSlug, parseMoney } from '../../utils/index';

class Movie extends Component {
  render() {
    const background = (this.props.poster_path) ? BASE_IMAGE_URL + this.props.poster_path : 'https://www.genesisglobalschool.edu.in/wp-content/uploads/2016/09/noimage.jpg';
    let movie_ids = JSON.parse(localStorage.getItem('movie_ids'));
    let buy_status = (movie_ids && movie_ids.length > 0 && movie_ids.indexOf(this.props.id) !== -1) ? true : false;
    return (
      <div className="movie-card">
        <div className="movie-header" style={{ background: `url(${background})`, backgroundSize: 'cover' }}>
          <div className="header-icon-container">
            <a href={'/' + this.props.id + '-' + parseSlug(this.props.title)}>
              <i className="material-icons header-icon"></i>
              {buy_status ? (<span className="buy_status"><i className="fa fa-check-circle"></i> <span>Terbeli</span></span>) : ''}
            </a>
          </div>
        </div>
        <div className="movie-content">
          <div className="movie-content-header">
            <a href={'/' + this.props.id + '-' + parseSlug(this.props.title)}>
              <h3 className="movie-title">{this.props.title}</h3>
            </a>
          </div>
          <div className="movie-info">
            <div className="info-section">
              <label>Release Date</label>
              <span>{parseDate(this.props.release_date)}</span>
            </div>
            <div className="info-section">
              <label>Rating</label>
              <span>{(this.props.vote_average) ? this.props.vote_average + '/10' : '0/10'}</span>
            </div>
            <div className="info-section">
              <label>Popularity</label>
              <span>{this.props.popularity}</span>
            </div>
            <div className="info-section">
              <label>Price</label>
              <span style={{ fontSize: '16px', color: '#4c4ce6', textTransform: 'none' }}>{parseMoney(parsePrice(this.props.vote_average))}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie;