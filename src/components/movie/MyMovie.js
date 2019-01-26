import React, { Component } from 'react';
import Movie from './Movie';

class MyMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    }
  }
  componentDidMount() {
    let movies = (localStorage.getItem('movies')) ? JSON.parse(localStorage.getItem('movies')) : null;
    if (movies) {
      this.setState({
        movies: movies
      })
    }
  }
  render() {
    const { movies } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <h3>My Movie</h3>
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

export default MyMovie;