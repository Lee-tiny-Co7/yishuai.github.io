/* @flow */

import React, { Component } from 'react';

import DateHeader from './DateHeader'
import Requests from '../../lib/Requests'
import subscribeToStore from '../../lib/Subscribe'
import WeekDate from '../../lib/WeekDate'
import WeekNoteForm from './WeekNoteForm'
import { LOCAL_NOTE_UPSERT } from '../../actions/WeekNoteActions'

class EditorMain extends Component {
  state: {
    week: WeekDate,
    isContentSaved: boolean
  };

  timerId: ?number;
  onUpdateWeek: () => void;
  onUpdateEntry: () => void;

  constructor() {
    super();

    this.state = {
      week: new WeekDate(),
      isContentSaved: true
    };

    this.timerId = null;
    this.onUpdateWeek = this.onUpdateWeek.bind(this);
    this.onUpdateEntry = this.onUpdateEntry.bind(this);
  }

  // Override
  render() {
    const { store } = this.context;
    let state = store.getState();
    let entries = state.notes || new Map();

    const entry = entries.get(this.state.week.getId()) || '';
    return (
        <div id="main">
          <DateHeader week={this.state.week} onUpdateWeek={this.onUpdateWeek}/>
          <WeekNoteForm contents={entry}
            onUpdateEntry={this.onUpdateEntry} isContentSaved={this.state.isContentSaved} />
        </div>
    );
  }

  onUpdateWeek(action) {
    switch(action) {
      case 'increment':
        // TODO(vrk): fix this so I don't have to use forceUpdate
        this.state.week.incrementWeek();
        this.forceUpdate();
        break;
      case 'decrement':
        // TODO(vrk): fix this so I don't have to use forceUpdate
        this.state.week.decrementWeek();
        this.forceUpdate();
        break;
      case 'reset':
        this.setState({
          week: new WeekDate()
        });
        break;
      default:
        throw new Error('Unknown action to updateWeek: ' + action);
    }
  }

  onUpdateEntry(contents) {
    let newEntry = {
      week_id: this.state.week.getId(),
      contents: contents
    };

    const { store } = this.context;
    store.dispatch({
      type: LOCAL_NOTE_UPSERT,
      note: newEntry 
    });

    this.saveEntryToServer(newEntry);
  }

  saveEntryToServer(newEntry) {
    this.setState({
      isContentSaved: false
    });
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    const { store } = this.context;
    let state = store.getState();
    let auth = state.auth;
    let currentUser = auth.currentUser.get();
    let note = newEntry;
    this.timerId = setTimeout(async () => {
      var result = await Requests.saveUserNote(currentUser, note);
      if (result.length > 0 && result[0].success) {
        this.setState({
          isContentSaved: true
        });
      }
    }, 750);
  }
}

EditorMain.contextTypes = {
  store: React.PropTypes.object
};

EditorMain = subscribeToStore(EditorMain);
export default EditorMain;

