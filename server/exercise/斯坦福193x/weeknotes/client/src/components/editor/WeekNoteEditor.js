/* @flow */

import React, { Component } from 'react';
import assert from 'assert';

import './WeekNoteEditor.css';

class WeekNoteEditor extends Component {
  handleTextChange: () => void;
  _onFocus: () => void;

  constructor() {
    super();

    this.handleTextChange = this.handleTextChange.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }

  render() {
    if (!this.props.active) return null;
    return (
      <div id="week-note">
        <textarea
          onFocus={this._onFocus}
          onChange={this.handleTextChange}
          ref={(input) => { if (input != null) { input.focus(); } }}
          defaultValue={this.props.contents} />
        <span className="status">{this._getText()}</span>
      </div>
    );
  }

  handleTextChange(e: Event) {
    assert(e.target instanceof HTMLTextAreaElement);
    if (e.target instanceof HTMLTextAreaElement) {
      var value = e.target.value;
      this.props.onUpdateText(value);
    }
  }

  _onFocus(e: Event) {
    assert(e.target instanceof HTMLTextAreaElement);
    const element = e.target;
    if (element instanceof HTMLTextAreaElement) {
      element.setSelectionRange(0,0);
      element.scrollTop = 0;
    }
  }

  _getText(): string {
    if (this.props.isContentSaved) {
      return 'Saved';
    } else {
      return 'Saving...';
    }
  }
}

export default WeekNoteEditor;

