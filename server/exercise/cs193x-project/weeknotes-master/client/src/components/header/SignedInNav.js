/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router'

import './Header.css';

class SignedInNav extends Component {
  render() {
    if (!this.props.currentUser) {
      return null;
    }
    let signedInUser = this.props.currentUser;
    let basicProfile = signedInUser.getBasicProfile();
    let userName = basicProfile.getGivenName();
    return (
        <nav>
          <nav className="left">
            <span className="link">
              Hi {userName}! (<Link to="/" onClick={this.props.onLogOutClick}>logout</Link>)
            </span>
          </nav>
          <nav className="right">
            <span className="link"><Link to="/about">About</Link></span>
          </nav>
        </nav>
    );
  }
}

export default SignedInNav;
