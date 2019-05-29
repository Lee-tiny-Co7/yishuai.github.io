/*
The MenuScreen class will serve as the first screen the user sees when
selecting a song and image. An onMenuLoadCallback and goToMusicCallBack will
be passed into the constructor and will serve to show the menu once the options
have loaded and the goToMusicCallBack will tell the app to show the music screen.
*/

class MenuScreen{
  constructor(onMenuLoadCallback, goToMusicCallBack){
    this.possibleThemes = ['candy', 'charlie brown', 'computers', 'dance',
    'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    this._populateSongs = this._populateSongs.bind(this);
    this._populateThemes = this._populateThemes.bind(this);
    this.showErrorScreen = this.showErrorScreen.bind(this);
    this._removeErrorScreen = this._removeErrorScreen.bind(this);
    this.menuContainer = document.querySelector("#menu");
    this._onSuccess = this._onSuccess.bind(this);
    this._onFail = this._onFail.bind(this);
    this._getRandomIndex = this._getRandomIndex.bind(this);
    this._onStreamProcessed = this._onStreamProcessed.bind(this);
    this.accessMusicSelection = this.accessMusicSelection.bind(this);
    this.musicContent = null; // will be the json file associated with music selections
    this._goToMusic = goToMusicCallBack;
    this.songTitleMap = {}; // a map with key = songTitle, value = song pairs
    const queryContainer = document.querySelector("#query-input");
    this.queryContainer = queryContainer;
    this.queryContainer.addEventListener("input", this._removeErrorScreen); //will be necessary if there aren't enough gifs
    this.userError = false; // no error in finding correct number of gifs yet
    this._onMenuLoadCallback = onMenuLoadCallback;
  }

/*
The show() function will show the menu-screen
*/
  show(){
    this.menuContainer.classList.remove('inactive');
  }

/*
The hide() function will hide the menu-screen
*/
  hide(){
    this.menuContainer.classList.add('inactive');
  }

/*
The loadOptions() functions will fetch the json file from the inputted url
*/
  loadOptions(){
    fetch('https://yayinternet.github.io/hw4-music/songs.json').then(this._onSuccess, this._onFail);
  }

/*
The _onSuccess() function will take in a "success" parameter and the json file
from this parameter will be sent to to the _onStreamProcessed() function.
*/
  _onSuccess(success){
    success.json().then(this._onStreamProcessed);
  }

/*
The _onStreamProcessed() function will take in a json file and populate the song-selector. The
populateThemes() function will then be called as well as the _addEventToButton(). The _addEventToButton,
will add the event listner to the submit button.
*/
  _onStreamProcessed(json){
    this.musicContent = json;
    this._populateSongs();
    this._populateThemes();
    this._addEventToButton();
  }

/*
The _onFail() function will fire if there is an error in the fetch() process
*/
  _onFail(){
    console.log("failure");
  }

/*
The _populateSongs() function will acess the selectionContainer and append options
to it from the json data in this.musicContent. The songs will be added to the
songTitleMap with the key being the title and the valeu being the song.
Once this is loaded, the menu will show
*/
  _populateSongs(){
    const selectionContainer = document.querySelector("#song-selector");
    for(const song in this.musicContent){
      const option = document.createElement("option");
      option.value = this.musicContent[song].title
      option.innerHTML = this.musicContent[song].title
      this.songTitleMap[this.musicContent[song].title] = song;
      selectionContainer.appendChild(option);
    }
    this._onMenuLoadCallback();
}

/*
The _populateThemes() function will populate the theme field with a random theme
using the _getRandomIndex method and the possibleThemes field of the class.
*/
  _populateThemes(){
    const queryContainer = document.querySelector("#query-input");
    const randomIndex = this._getRandomIndex();
    queryContainer.value = this.possibleThemes[randomIndex];
  }

/*
The _addEventToButton() adds the go to music callback to the submit button
*/
  _addEventToButton(){
    const goButton = document.querySelector("form");
    goButton.addEventListener("submit", this._goToMusic);
  }

/*
The accessMusicSelection() function takes in a song title and returns the
song url associated with that title
*/
  accessMusicSelection(songTitle){
    return this.musicContent[this.songTitleMap[songTitle]].songUrl;
  }

/*
The blankInput() will return a random theme from the this.possibleThemes array
when called
*/
  blankInput(){
  return this.possibleThemes[this._getRandomIndex()];
  }

/*
The _getRandomIndex() function will return a randomIndex using the Math.floor function
*/
  _getRandomIndex(){
    const minValue = Math.ceil(0);
    const maxValue = Math.floor(this.possibleThemes.length);
    const randomIndex = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    return randomIndex;
  }

/*
The showErrorScreen() will show the error remove the inactive class from the error
screen and display it to the user when there aren't enough gifs in the json.data.
The userError will be set to true in this case.
*/
  showErrorScreen(){
    const errorContainer = document.querySelector("#error");
    this.errorContainer = errorContainer;
    this.errorContainer.classList.remove('inactive');
    this.userError = true;
  }

/*
The _removeErrorScreen() will fire once the user removes input from the theme
field following the number of gif error. User error will be set to false following
this action from the user. 
*/
  _removeErrorScreen(event){
    if(this.userError === true){
    this.errorContainer.classList.add('inactive');
  }
    this.userError = false;
  }


}
