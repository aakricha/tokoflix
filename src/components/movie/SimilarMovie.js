import React, { Component } from 'react';
import Movie from './Movie';

class SimilarMovie extends Component {
  render() {
    const { movies } = this.props;
    return (
      <React.Fragment>
        <div>
          <h3>Similar Movie</h3>
          {
            movies.map(movie => (
              <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} vote_average={movie.vote_average} popularity={movie.popularity} buy_status={movie.buy_status} url={movie.url}></Movie>
            ))
          }
        </div>
      </React.Fragment>
    )
  }
}

export default SimilarMovie;