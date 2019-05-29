/*
The App() class serves as the mainframe for the entire Music Box. The Menu Screen
and Music Screen will be generated from the App class.
*/
class App {
  constructor() {
    this._goToMusic = this._goToMusic.bind(this);
    this._showErrorScreen = this._showErrorScreen.bind(this);
    this._onMenuLoad = this._onMenuLoad.bind(this);
    this.menu = new MenuScreen(this._onMenuLoad, this._goToMusic);
    this.musicScreen = new MusicScreen(this._showErrorScreen);
    this.musicScreen.hide();
    this.menu.hide();
    this.menu.loadOptions();
  }

/*
The _goToMusic() function will serve as a callback that will be passed into the
MenuScreen class. This function will fire once the user clicks submit. The music url
associated with the music selection will be found as will the themeSelection. Both
will then be passed to the musicScreen queryGIPHY function. The menu will also
hide during this process
*/
  _goToMusic(event){
    event.preventDefault();
    this.menu.hide();
    const musicSelection = document.querySelector("#song-selector").value;
    const musicUrl = this.menu.accessMusicSelection(musicSelection);
    const themeSelection = this._getThemeSelection();
    this.musicScreen.queryGIPHY(themeSelection, musicUrl);
  }

  /*
  The _getThemeSelection() function will make sure that the user has not left the
  theme field blank. If so, a random theme will be inserted in that place
  */
  _getThemeSelection(){
    let themeSelection = document.querySelector("#query-input").value;
    if(themeSelection.replace(/\s/g,"") == "") themeSelection = this.menu.blankInput();
    return themeSelection;
  }

  /*
  The _showErrorScreen() function will serve as a callback that will be passed into the
  MusicScreen class. This function will fire if the data length of the json file generated
  from the giphy query is less than 2
  */
  _showErrorScreen(){
    this.menu.show();
    this.menu.showErrorScreen();
  }

  /*
  The _onMenuLoad() function will serve as a callback that will be passed into the
  MenuScreen class. This function will fire once all of the options are added to
  the song-selector
  */
  _onMenuLoad(){
    const loadingContainer = document.querySelector("#loading");
    loadingContainer.classList.add('inactive');
    this.menu.show();
  }
}
