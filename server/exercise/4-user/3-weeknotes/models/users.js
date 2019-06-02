/* @flow */

var assert = require('assert');

import type { MongoClient } from 'mongodb';
import type { ObjectId } from 'mongodb';

type UserInfo = {
  gmail_id: string;
  email: string; 
};
export class Users {
  db: MongoClient;

  constructor(db: MongoClient) {
    this.db = db;
  }

  getUser(user_info: UserInfo) {
    var collection = this.db.collection('users');
    var query = {'gmail_id': user_info.gmail_id};
    var doc = {
      $set: {
        'gmail_id': user_info.gmail_id,
        'email': user_info.email
      }
    };
    var options = {
      upsert: true,
      returnOriginal: false 
    };
    return collection.findOneAndUpdate(query, doc, options);
  }
};
