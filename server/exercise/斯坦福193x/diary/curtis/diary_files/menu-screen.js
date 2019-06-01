/* The MenuScreen() class contains all of the functionality for the main page
that is displayed when the user first enters the site
*/

class MenuScreen{
  constructor(containerElement, showDiaryCallback){
    this._showDiaryCallback = showDiaryCallback;
    this.containerElement = containerElement;
    this._clicked = this._clicked.bind(this);
    this.createJournalButton = document.querySelector('#createJournal');
    this.createJournalButton.addEventListener("click", this._clicked); // button clicked
  }

/* Hide the menu screen */
  hide(){
    this.containerElement.classList.add('inactive');
  }

/* Show the menu screen */
  show(){
    this.containerElement.classList.remove('inactive');
  }

/* Button has been clicked */
  _clicked(){
    this._showDiaryCallback();
    this.createJournalButton.removeEventListener("click", this._clicked);
  }
}
