/* The DiaryScreen() manages the diary service(which gets info from the database)
and the ForwardBackButton() class which controls how the diary service is called*/

class DiaryScreen{
  constructor(containerElement){
    this._homeClicked = this._homeClicked.bind(this);
    this._saveData = this._saveData.bind(this);
    this._writingEntry = this._writingEntry.bind(this);
    this._forwardClicked = this._forwardClicked.bind(this);
    this._backClicked = this._backClicked.bind(this);
    this._resetPrompts = this._resetPrompts.bind(this);
    this._stringify = this._stringify.bind(this);
    this._noEntry = this._noEntry.bind(this);
    this._setInitialDate = this._setInitialDate.bind(this);

    this.containerElement = containerElement;
    this.homeContainer = document.querySelector('#home');
    this.forwardButton = document.querySelector('#forward');
    this.backButton = document.querySelector('#back');
    this.prompt = document.querySelector('#subtitle');
    this.promptIndex = 0;
    this.initialDate = new Date();
    this.date = this._setInitialDate(this.initialDate);

    this.homeContainer.addEventListener('click', this._homeClicked);
    this.diaryEntry = document.querySelector('#journalEntry');
    this.diaryEntry.addEventListener('blur', this._saveData);
    this.diaryEntry.addEventListener('focus', this._writingEntry);
    const forwardBackButton = new ForwardBackButton(this.forwardButton,
                                                    this.backButton, this.homeContainer,
                                                  this._forwardClicked, this._backClicked);
    const diaryService = new DiaryService(this._resetPrompts, this._noEntry);
    this.diaryService = diaryService;
  }

/* Hide the Diary */
  hide(){
    this.containerElement.classList.add('inactive');
  }

/* Show the Diary */
  show(){
    this.containerElement.classList.remove('inactive');
  }

/* The entry for today's date will be rendered */
  _homeClicked(){
    const initialDate = this._setInitialDate(this.initialDate);
    this.date = initialDate;
    this.diaryService.get(this.journalID, this.date);
  }

/* Once the user clicks outside of the entry area, the data will be saved
by posting to the database*/
  _saveData(){
    this.forwardButton.classList.remove('inactive');
    this.backButton.classList.remove('inactive');
    this.homeContainer.classList.remove('inactive');
    this.homeContainer.innerHTML = "HOME";
    const entry = this.diaryEntry.value;
    this.diaryService.post(this.journalID,this.date, this.promptIndex,entry);
  }

/* Called when the user is writing an entry. This prompts the home button
to become a checked image and the other images on the footer will now have
an inactive class*/
  _writingEntry(){
    this.forwardButton.classList.add('inactive');
    this.backButton.classList.add('inactive');
    this.homeContainer.classList.add('inactive');
    this.homeContainer.innerHTML = "<img src='images/checked.png'>";
    this.homeContainer.classList.remove('inactive');
  }

/* Will set the date to tomorrow(day after date that is currently displayed)
If there is alreay an entry with that date, then GET will be called an that
entry will be rendered. If the entry has not been created yet, then POST will
be called to create the entry for the next day*/
    async _forwardClicked(){
    this.date.setDate(this.date.getDate() + 1);
    const alreadyWritten = await this.diaryService.alreadyWritten(this.journalID, this.date);
    if(alreadyWritten === false){
    this.promptIndex ++;
    this.diaryService.createEntry(this.journalID,this.date, this.promptIndex, '');
  } else{
    this.diaryService.get(this.journalID, this.date);
  }
}

/* Will render the entry for yesterday's (date before entry that is
currently displayed) date */
  _backClicked(){
    this.date.setDate(this.date.getDate() - 1);
    this.diaryService.get(this.journalID,this.date);
  }

/* Will be called when all of the prompts have been used for the month. Will reset
the index back to 0 to start over
*/
  _resetPrompts(){
    this.promptIndex = 0;
  }

/* Creates a journal and an entry with today's date. From here the user will
now be able to create diary entries for future dates as well
*/
  initializeJournal(journalID){
    const date = this._stringify(this.date);
    this.journalID = journalID;
    this.diaryService.createEntry(journalID,this.date,this.promptIndex,'');
  }

/* Turn date to readable string */
  _stringify(date){
    date = date.toLocaleDateString();
    return date;
  }

/* This will only be called in the instance where the user tries to access
an entry that he or she has not created. Essentially, this will only be the
case if the user presses the back arrow too many times
 */
  _noEntry(){
    const tomorrow = this.date.getDate() + 1;
    this.date.setDate(tomorrow);
  }

/* Returns a date object of the original date. This function is used to keep
the date objects from being passed by reference
*/
  _setInitialDate(initialDate){
    const date = this._stringify(initialDate);
    const objectDate = new Date(date);
    return objectDate;
  }
}
