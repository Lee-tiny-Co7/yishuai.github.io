/* @flow */

import { OAUTH_LOADED, LOGIN, LOGOUT, LOCAL_NOTE_UPSERT } from '../actions/WeekNoteActions'
import WeekDate from '../lib/WeekDate'

// TODO(vrk): Change notes to a Map?
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

type Note = {
  contents: string,
  week_id: string
}

type Action = {
  type: string,
  user: ?Object,
  note: Note,
  notes: Note[],
  auth: Object
};

type State = {
  auth: ?Object,
  currentUser: ?Object,
  notes: Map<string, string>
};

const initialState = {
  // Whether the week note editor is active.
  auth: null,
  currentUser: null,
  notes: new Map()
};

function getDefaultNote() {
  return {
    week_id: new WeekDate().getId(),
    contents: "# TODO\n- Click to edit your note!\n- Use [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting"
  };
}

function convertNotesToMap(state, notes_response) {
  var notes_map = new Map(state.notes);
  for (const note of notes_response) {
    notes_map.set(note.week_id, note.contents);
  }
  if (notes_map.size === 0) {
    let note = getDefaultNote();
    notes_map.set(note.week_id, note.contents);
  }
  return notes_map;
}
 
export default function rootReducer(
  state: State = initialState, action: Action) {
  switch (action.type) {
    case OAUTH_LOADED:
      return Object.assign({}, state, { 
        auth: action.auth,
        currentUser: action.user || null,
        notes: convertNotesToMap(state, action.notes)
      });
    case LOGIN:
      return Object.assign({}, state, {
        currentUser: action.user,
        notes: convertNotesToMap(state, action.notes)
      });
    case LOGOUT:
      return Object.assign({}, state, {
        currentUser: null
      });
    case LOCAL_NOTE_UPSERT:
      let note = action.note;
      let newNotes = new Map(state.notes);
      newNotes.set(note.week_id, note.contents);
      return Object.assign({}, state, {
        notes: newNotes 
      });
    default:
      return state;
  }
}
