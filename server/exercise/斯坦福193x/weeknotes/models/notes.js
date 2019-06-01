/* @flow */

import type { MongoClient } from 'mongodb';
import type { ObjectId } from 'mongodb';

export class Notes {
  db: MongoClient;

  constructor(db: MongoClient) {
    this.db = db;
  }

  saveNote(user_id: string, week_id: string, contents: string) {
    var doc = {
      '$set': {
        week_id: week_id,
        contents: contents
      }
    };

    var notes_db = this.db.collection('notes');
    var users_db = this.db.collection('users');
    return async function() {
      var user_result = await users_db.findOne({ _id: user_id});
      if (!user_result) {
        return;
      }
      var note_to_update = { week_id: week_id, contents: contents };
      var update_existing = false;

      if (user_result.notes) {
        var notes = await notes_db.find({_id: { $in : user_result.notes } } ).toArray() ;
        for (var note of notes) {
          if (note.week_id == week_id) {
            update_existing = true;
            note_to_update = note;
            break;
          }
        }
      }
      var result = null;
      if (update_existing && note_to_update._id) {
        var query = { _id: note_to_update._id};
        var options = {
          upsert: false,
          returnOriginal: false 
        };
        // Save note in notes.
        result = await notes_db.findOneAndUpdate(query, doc, options);
      } else {
        result = await notes_db.insert(note_to_update);
      }

      if (!result || !note_to_update._id) {
        return;
      }
      var note_id = note_to_update._id;
      // Update user array of notes if it doesn't already exist.
      var update_user_query = { '_id': user_id };
      var update_user_doc = { '$addToSet': { 'notes':  note_id } };
      await users_db.update(update_user_query, update_user_doc);
    }();
  }

  getNotesByIds(note_ids: ObjectId[]) {
    if (!note_ids) return Promise.resolve([]);
    var notes_db = this.db.collection('notes');
    return notes_db.find({_id: { $in : note_ids } } ).toArray();
  }
};
