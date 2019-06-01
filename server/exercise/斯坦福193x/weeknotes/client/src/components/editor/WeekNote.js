/* @flow */

import React, { Component } from 'react';
import Remarkable from 'remarkable';

import './WeekNote.css';

class WeekNote extends Component {
  _onClick: () => void;

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  // Override
  render() {
    if (!this.props.active) return null;

    return (
      <div id="week-note" onClick={this._onClick}>
        <div dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }

  // Helper function returning raw HTML for the contents of this component as
  // rendered by markdown.
  rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.contents);
    return { __html: rawMarkup };
  }

  _onClick(evt: Event) {
    var target = evt.target;
    // Ignore click events if it's a link.
    if (target instanceof Element && target.tagName.toLowerCase() === 'a') {
      return;
    }
    this.props.onActivate(evt);
  }
}

WeekNote.contextTypes = {
  store:  React.PropTypes.object
};

export default WeekNote;

