/* @flow */

import React, { Component } from 'react';

import WeekNote from './WeekNote'
import WeekNoteEditor from './WeekNoteEditor'

class WeekNoteForm extends Component {
  state: {
    editorActive: boolean
  }
  onUpdateText: () => void;
  handleFormBlur: () => void;
  handleEditorActivate: () => void;

  constructor() {
    super();

    this.state = {
      editorActive: false
    };
    this.onUpdateText = this.onUpdateText.bind(this);
    this.handleFormBlur = this.handleFormBlur.bind(this);
    this.handleEditorActivate = this.handleEditorActivate.bind(this);
  }

  // Override
  render() {
    return (
      <form onBlur={this.handleFormBlur} onSubmit={this.handleFormSubmit}>
        <WeekNote
          contents={this.props.contents}
          active={!this.state.editorActive}
          onActivate={this.handleEditorActivate}
        />
        <WeekNoteEditor
          contents={this.props.contents}
          active={this.state.editorActive}
          onUpdateText={this.onUpdateText}
          isContentSaved={this.props.isContentSaved}
        />
      </form>
    );
  }

  onUpdateText(text: string) {
    this.props.onUpdateEntry(text);
  }

  handleFormBlur() {
    this.setState({ editorActive: false });
  }

  handleEditorActivate() {
    this.setState({ editorActive: true });
  }

  handleFormSubmit() {
    this.setState({ editorActive: false });
  }
}

export default WeekNoteForm;

