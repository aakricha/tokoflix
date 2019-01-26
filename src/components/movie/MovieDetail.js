import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GET_MOVIE_DETAIL, GET_SIMILAR_MOVIES, BASE_IMAGE_URL, GET_RECOMENDATION_MOVIES } from '../../actions/constants';
import { getData } from '../../actions/movieAction';
import { CardBody, Row, Col, Badge, Container, Alert, Button } from 'reactstrap';
import { parsePrice, parseDate, parseMoney } from '../../utils';
import SimilarMovie from './SimilarMovie';
import RecomendationMovie from './RecomendationMovie';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    let movie_ids = JSON.parse(localStorage.getItem('movie_ids')) || [];
    let balance = JSON.parse(localStorage.getItem('balance'));    
    this.state = {
      id: this.props.match.params.id,
      movie_ids: movie_ids,
      buy_status: (movie_ids && movie_ids.length > 0 && movie_ids.indexOf(parseInt(this.props.match.params.id)) !== -1) ? true : false,
      disable_buy: false,
      balance: balance,
      page: 1,
      prevY: 0,
      similarMovie: [],
      recomendationMovie: [],
      movieDetails: {
        genres: [],
        original_title: '',
        vote_average: '',
        vote_count: '',
        imdb_id: '',
        runtime: '',
        poster_path: '',
        release_date: ''
      }
    }
  }
  componentDidMount() {
    console.log(this.props);    
    this.getMovieDetail();
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
  }
  async handleObserver(entities, observer) {
    // const { id } = this.state;
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      // const curPage = this.state.page + 1;
      // const getSimilar = await this.props.getData({
      //   url: `3/movie/${id}/similar?language=en-US&page=${curPage}`,
      //   type: GET_SIMILAR_MOVIES
      // });
      // const { results } = getSimilar.payload.data;
      // if (results.length === 0) {
      //   this.setState({
      //     loading: false,
      //     prevY: 0
      //   })
      // } else {
      //   let lastState = this.state.similarMovie;
      //   await this.setState({
      //     page: curPage,
      //     loading: true,
      //     similarMovie: [...lastState, ...getSimilar.payload.data.results]
      //   });
      // }
    }
    this.setState({ prevY: y });
  }
  async getMovieDetail() {
    const { id } = this.state;
    const getDetail = await this.props.getData({
      url: `3/movie/${id}?language=en-US`,
      type: GET_MOVIE_DETAIL
    });
    const getSimilar = await this.props.getData({
      url: `3/movie/${id}/similar?language=en-US`,
      type: GET_SIMILAR_MOVIES
    });
    const getRecomendation = await this.props.getData({
      url: `3/movie/${id}/recommendations?language=en-US`,
      type: GET_RECOMENDATION_MOVIES
    });
    const { data } = getDetail.payload;

    await this.setState({
      movieDetails: data,
      similarMovie: getSimilar.payload.data.results,
      recomendationMovie: getRecomendation.payload.data.results
    });
  }
  clickBuy(obj){
    let b = this.state.balance - parsePrice(this.state.movieDetails.vote_average);
    console.log(this.state.balance, parsePrice(this.state.movieDetails.vote_average), this.state);
    if (b >= 0) {
      let ids = this.state.movie_ids;
      ids.push(parseInt(obj));
      this.setState({
        movie_ids: ids,
        buy_status: true,
        balance: b
      })
      let movies = [];
      movies = JSON.parse(localStorage.getItem('movies'));
      if (movies) {
        movies.push(this.state.movieDetails);
      } else {
        movies = [this.state.movieDetails];
      }
      localStorage.setItem('movie_ids', JSON.stringify(this.state.movie_ids));
      localStorage.setItem('balance', JSON.stringify(b));
      localStorage.setItem('movies', JSON.stringify(movies));
    } else {
      alert("Im Sorry! Your Balance not enough");
    }
  }
  render() {
    // console.log(this.state);
    const loadingTextCSS = { color: '#4a4a4a', display: this.state.loading ? 'block' : 'none' };
    const loadingCSS = {
      height: '0px',
      margin: '10px'
    };
    const { id, buy_status, disable_buy } = this.state;
    const { original_title, vote_average, vote_count, genres, imdb_id, runtime, release_date, overview, tagline } = this.state.movieDetails;
    const img_url = (this.state.movieDetails.poster_path) ? BASE_IMAGE_URL + this.state.movieDetails.poster_path : 'https://www.genesisglobalschool.edu.in/wp-content/uploads/2016/09/noimage.jpg';
    return (
      <React.Fragment>
        <Container className="bg-white" style={{ marginBottom: '100px' }}>
          <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
            <Alert style={loadingTextCSS}><span>Loading...</span></Alert>
          </div>
          <CardBody style={{ padding: '10px' }}>
            <Row>
              <Col md={4}><img className="img-thumbnail" src={img_url} alt="" /></Col>
              <Col md={6}><h1 style={{ textAlign: 'left' }}>{original_title}</h1>
                <div style={{ textAlign: 'left' }}>
                  <i style={{ marginLeft: '5px' }}>{tagline}</i><br />
                  {genres.map((item, index) => (
                    <Badge key={index} color="info" style={{ margin: '0 3px', padding: '5px 10px' }}>{item.name}</Badge>
                  ))}
                  <div style={{ marginTop: '10px' }}>
                    <span className="mr-4"><i className="fa fa-imdb"></i> {imdb_id !== null ? imdb_id.toUpperCase() : '-'}</span>
                    <span className="mr-4"><i className="fa fa-calendar"></i> {parseDate(release_date)}</span>
                    <span className="mr-4"><i className="fa fa-clock-o"></i> {runtime} minutes</span>
                    <span className="mr-4"><i className="fa fa-money"></i> {parseMoney(parsePrice(vote_average))}</span>
                  </div>
                </div>
                <p style={{ textAlign: 'left', marginTop: '10px' }}>{overview}</p>
                <Button size="lg" block color="primary" disabled={(buy_status || disable_buy) ? true : false} onClick={() => this.clickBuy(id)}>
                  {(buy_status) ? 'Sudah Dibeli' : 'Beli'}
                </Button>
              </Col>
              <Col md={2}>
                <Badge color="success" style={{ padding: '5px 15px' }}>
                  <h2>{vote_average}/10</h2>
                  <p>{vote_count} Voters</p>
                </Badge>
              </Col>
            </Row>
          </CardBody>
        </Container>
        <div className="container-list" style={{ marginTop: '15px' }}>
          <SimilarMovie movies={this.state.similarMovie}></SimilarMovie>
          <RecomendationMovie movies={this.state.recomendationMovie} style={{marginTop: '30px'}}></RecomendationMovie>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movieReducer,
  users: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  getData: (params) => dispatch(getData(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);