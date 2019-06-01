/* @flow */

import React, { Component } from 'react';

import EditorMain from './editor/EditorMain'
import Home from './info/Home'
import subscribeToStore from './../lib/Subscribe'

class Main extends Component {
  // Override
  render() {
    const { store } = this.context;
    let state = store.getState();

    // TODO(vrk): Return splash screen when not logged in.
    if (!state.auth || !state.currentUser)
      return <Home/>;

    return <EditorMain />;
  }
}

Main.contextTypes = {
  store: React.PropTypes.object
};

Main = subscribeToStore(Main);
export default Main;

