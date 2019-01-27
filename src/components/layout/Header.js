import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { parseMoney } from '../../utils';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLogged: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.SetBalance();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  SetBalance() {
    let balance = localStorage.getItem('balance');
    if (!balance) {
      localStorage.setItem('balance', 100000);
      this.setState({
        balance: 100000,
      });
    } else {
      this.setState({
        balance: balance,
      });
    }
  }
  render() {
    const { balance } = this.props;
    return (
      <div>
        <Navbar color="white" light expand="md">
          <NavbarBrand className="site-logo" href="/"></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* {this.props.onRenderBalance()} */}
              <NavItem>
                <span id="balance" className="nav-link">{parseMoney(balance)}</span>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" href="/mymovie">My Movie</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
export default Header;