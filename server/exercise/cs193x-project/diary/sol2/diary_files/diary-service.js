/* The DiaryService() class controls the functionality for how the database
is called and rendered
*/

class DiaryService{
  constructor(resetPromptsCallback, noEntryCallback){
    this.createEntry = this.createEntry.bind(this);
    this._turnDateToString = this._turnDateToString.bind(this);
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
    this.alreadyWritten = this.alreadyWritten.bind(this);

    this._resetPrompts = resetPromptsCallback;
    this._noEntryCallback = noEntryCallback;

    this._dateContainer = document.querySelector('#date');
    this._promptContainer = document.querySelector('#subtitle');
    this._entryContainer = document.querySelector('#journalEntry');
  }

/* The function will get the correct entry by first, calling fetch on the
journalID. This will return an array of entries associated with that journal.
Next, the array will be looked through for an entry that contains the date
we're looking for. If no entry is found, the no entry callback will be performed */
  async get(journalID,date){
    date = this._turnDateToString(date);
    const response = await fetch('/getEntries/' + journalID);
    const results = await response.json(); // array of entries with the journalID
    let entryID;
    for(let result of results){
      if(result.date.trim() === date.trim()){ // found correct entry
      entryID = result._id;
      break;
    }
  }
    if(entryID !== undefined){
      const response = await fetch('/renderEntry/' + journalID + '/' + entryID);
      const result = await response.json();
      this._dateContainer.textContent = result.date;
      this._promptContainer.textContent = result.prompt;
      this._entryContainer.value = result.entry;
    } else{
     this._noEntryCallback();
    }
}

/* Fetch will be called to post an entry to the database with the journalID,
date, prompt associated with the index, and message the user is sending in.
*/
  async post(journalID, date, index, message){
    date = this._turnDateToString(date);
    const prompt = arrayOfPrompts[index];
    if(prompt === arrayOfPrompts[arrayOfPrompts.length - 1]){ // last day of month
      this._resetPrompts();
    }
    const entry = {
      id : journalID,
      date : date ,
      prompt : prompt ,
      entry : message
    }

    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    };
    date = date.replace(/\//g, 'ForwardSlash'); // remove whitespaces for the url
    await fetch('/postEntry/' + date, fetchOptions);
  }

/* Will create an entry by first posting the entry and respective contents to the
database. The entry that was just posted will then be retrieved and rendered with
GET*/
   createEntry(journalID, date, index, message){
    this.post(journalID, date, index, message);
    this.get(journalID, date);
  }

/* Turn date to readable format */
  _turnDateToString(date){
    date = date.toLocaleDateString();
    return date;
  }

/* Will check to see if an entry with the respective content has already been
entered into the database
*/
  async alreadyWritten(journalID, date){
    date = this._turnDateToString(date);
    const response = await fetch('/getEntries/' + journalID);
    const results = await response.json();
    let entryID;
    for(let result of results){
      if(result.date.trim() === date.trim()){
      entryID = result._id;
      break;
    }
  }
    if(entryID === undefined){
      return false;
    } else{
      return true;
    }
  }

}
