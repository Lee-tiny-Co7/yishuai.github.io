/* @flow */

import React, { Component } from 'react';

export default function subscribe<Config>(ChildComponent: ReactClass<Config>) {
  class Subscriber extends Component {
    unsubscribe: () => void;

    componentWillMount() {
      const { store } = this.context;
      this.unsubscribe = store.subscribe(() =>
          this.forceUpdate()
      );
    }
    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return <ChildComponent {...this.props} {...this.state} />;
    }
  }

  Subscriber.contextTypes = {
    store: React.PropTypes.object
  };

  return Subscriber;
};

