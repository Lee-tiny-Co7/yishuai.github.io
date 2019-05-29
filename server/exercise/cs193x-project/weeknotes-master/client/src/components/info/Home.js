/* @flow */

import { Link } from 'react-router';
import React, { Component } from 'react';

import subscribeToStore from '../../lib/Subscribe'

import './Home.css';

class Home extends Component {
  // Override
  render() {
    const { store } = this.context;
    const state = store.getState();

    if (!state.auth)
      return null;

    return (
      <div id="main" className="home">
        <div className="description">
          <p>
            Weeknotes is a free tool that lets you create a weekly log of <strong>private notes</strong>.
          </p>

          <div className="more">
            <p>
              This is a hobby project of <a href="https://github.com/vrk">vrk</a> and is completely open source!
              (<a href="https://github.com/vrk/weeknotes">See the code</a>)
            </p>
          </div>

        </div>

        <div className="sign-up">
          <Link className="home-sign-up" to="/signup">Sign up</Link>
          <p>
            Or <Link to="/about">learn more</Link> about how it works!!<br/>
            (There's...not much to it.)
          </p>
        </div>
      </div>
    );
  }
}
Home.contextTypes = {
  store: React.PropTypes.object
};

Home = subscribeToStore(Home);
export default Home;

