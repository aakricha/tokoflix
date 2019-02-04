import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import Movie from './Movie';
import { Alert } from 'reactstrap';
// import { parseSlug } from '../../utils';
import { GET_ALL_MOVIES } from '../../actions/constants';
import { getData } from '../../actions/movieAction';
import MyPagination from '../pagination/MyPagination';

class MovieList extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      page: 1,
      prevY: 0,
      loading: false,
      hasMore: true,
      movies: [],
      total_pages: 0,
      total_results: 0,
      isFetch: false
    }
  }
  componentWillMount() {
    if (this.props.location.search !== "") {
      var que_str = new URLSearchParams(this.props.location.search);
      let page = 0;
      for (let t of que_str.entries()) page = t[1];
      if (page === '' || page === '0') page = 1;
      this.setState({
        page: parseInt(page)
      })
    } else {
      this.setState({
        page: 1
      });
    }
  }
  componentDidMount() {
    const { page } = this.state;
    this.props.getData({
      url: `3/movie/now_playing?language=en-US&page=${page}`,
      type: GET_ALL_MOVIES
    });
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    // Create an observer instance
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this), // pass the callback
      options
    );
    this.observer.observe(this.loadingRef);
    // fetchMovieList(this.props.location.search.replace('?', '')).then(
    //   res => {
    //     console.log(res);
    //     if (Array.isArray(res.results) && res.results.length > 0) {
    //       let movie_ids = localStorage.getItem('movie_ids');
    //       res.results.forEach(result => {
    //         result.buy_status = (movie_ids.indexOf(result.id) !== -1) ? true : false;
    //         result.url = result.id + '-' + parseSlug(result.title);
    //       });
    //       this.setState({
    //         movies: res.results,
    //         page: res.page,
    //         total_pages: res.total_pages,
    //         total_results: res.total_results,
    //       });
    //     }
    //   }
    // ).catch(ex => { });
  }
  async handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.hasMore) {
      if (this.state.prevY > y) {
        const curPage = this.state.page + 1;
        this.props.getData({
          url: `3/movie/now_playing?language=en-US&page=${curPage}`,
          type: GET_ALL_MOVIES
        });
        await this.setState({ page: curPage, loading: true });
        this.props.history.push(`/?page=${this.state.page}`);
      }
      this.setState({ prevY: y });
    }
  }
  componentWillReceiveProps(nextProps) {
    const { movies, isFetch, total_pages } = nextProps.movies;
    if (!movies.nextUrl && !isFetch) {
      this.setState({
        movies: movies,
        total_pages: total_pages,
        hasMore: false,
        loading: false
      })
    } else if (movies.status_code === 200 && !isFetch) {
      this.setState({
        loading: false
      })
    }
  }
  renderMovie() {
    const { movies, isFetch } = this.state;
    if (isFetch) {
      return (<h4>Loading...</h4>)
    }
    return movies.map((movie, index) => {
      return (
        // <React.Fragment>
          // {movies.map(movie => (
        <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} vote_average={movie.vote_average} popularity={movie.popularity} buy_status={movie.buy_status} url={movie.url}></Movie>
          // ))}
        // </React.Fragment>
      )
      // return <Col key={index} md={4}><a href={`/${item.id}/${this.slugify(item.title)}`}><FilmCard film={item} /></a></Col>
    });
  }
  render() {
    const loadingTextCSS = { color: '#4a4a4a', display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '0px',
      margin: '10px'
    };
    const { page, total_pages } = this.state;
    return (
      <React.Fragment>
        <div>
          <h3>Now Playing</h3>
          <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
            <Alert style={loadingTextCSS}><span>Loading...</span></Alert>
          </div>
          {this.renderMovie()}
          <MyPagination page={page} total_pages={total_pages}></MyPagination>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movieReducer
});

const mapDispatchToProps = dispatch => ({
  getData: (params) => dispatch(getData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);