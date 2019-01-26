import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/layout/Header';
import MovieList from './components/movie/MovieList';
import MovieDetail from './components/movie/MovieDetail';
import MyMovie from './components/movie/MyMovie';
import NotFound from './pages/NotFound';
import { parseMoney } from './utils';
import { NavItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0
    };
    // this.onRenderBalance = this.onRenderBalance.bind(this);
  }
  componentDidMount(){
    this.GetBalance();
  }
  GetBalance(){
    this.setState({
      balance: localStorage.getItem('balance')
    });    
  }
  onRenderBalance(){
    let html;
    if (this.state.balance) {
      html = (
        <NavItem>
          <span className="nav-link">{parseMoney(this.state.balance)}</span>
        </NavItem>
      )
    } else {
      html = (
        <NavItem>
          <span className="nav-link">{parseMoney(0)}</span>
        </NavItem>
      )
    }

    return html;
  }
  render() {
    const { balance } = this.state;
    return (
      <Provider store={store}>
        <div className="App">
          <Header balance={balance}></Header>
          <div className="container-list" style={{ marginTop: '30px' }}>
            <Router>
              <Switch>
                <Route exact path="/" component={MovieList} />
                <Route exact path="/:id-:slug" component={MovieDetail} />
                <Route exact path="/mymovie" component={MyMovie} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;