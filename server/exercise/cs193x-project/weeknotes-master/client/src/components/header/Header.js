/* @flow */

import React, { Component } from 'react';
import { Link } from 'react-router'

import { LOGOUT } from '../../actions/WeekNoteActions'
import SignedInNav from './SignedInNav';
import SignedOutNav from './SignedOutNav';
import subscribeToStore from '../../lib/Subscribe'
import './Header.css';

class Header extends Component {
  onLogOutClick_: () => void;

  constructor() {
    super();

    this.onLogOutClick_ = this.onLogOutClick_.bind(this);
  }

  getNav_() {
    const { store } = this.context;
    let state = store.getState();

    if (!state.auth)
      return null;

    if (state.currentUser) {
      return <SignedInNav currentUser={state.currentUser}
                          onLogOutClick={this.onLogOutClick_}/>;
    }
    return <SignedOutNav />;
  }

  render() {
    return (
      <div id="header">
        <div id="logo"><Link to="/">week&middot;notes</Link></div>
        {this.getNav_()}
        <hr/>
      </div>
    );
  }

  onLogOutClick_() {
    const { store } = this.context;
    let state = store.getState();
    let auth = state.auth;

    auth.signOut().then(() => {
      store.dispatch({
        type: LOGOUT
      });
    });
  }
}

Header.contextTypes = {
  store: React.PropTypes.object
};

Header = subscribeToStore(Header);
export default Header;
