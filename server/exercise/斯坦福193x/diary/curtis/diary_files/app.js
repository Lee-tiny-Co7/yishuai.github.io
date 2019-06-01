/* The App() class serves as the base for the entire diary app. A menu screen and
diary screen will be created through this class.
*/

class App {
constructor(){
  this._showDiary = this._showDiary.bind(this);
  const menuContainer = document.querySelector('#menu');
  this.menu = new MenuScreen(menuContainer, this._showDiary);
  const diaryContainer = document.querySelector('#journalScreen');
  this.diary = new DiaryScreen(diaryContainer);
  this.diary.hide();
  }

/* The _showDiary() function will create a diary entry once the menu backButton
has been targeted. The menu will then hide and a journal will be created in the
database. The id of the journal will then be used for the entries that will
be associated with it. Once this id has been received, the journal entry for
today's date will show
*/
  async _showDiary(){
    this.menu.hide();
    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: ''
    };
    const response = await fetch('/createJournal/', fetchOptions); // create journal
    const journal = await response.json(); // gives a promise which is the journal
    const journalID = journal.journalId;
    this.diary.initializeJournal(journalID);
    this.diary.show();
  }
}
