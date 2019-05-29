/*
The MusicScreen class shows the gif content and the play/pauseButton.
*/
class MusicScreen{
  constructor(showErrorScreenCallback){
    this._getKeyWordForGiphy = this._getKeyWordForGiphy.bind(this);
    this._showMusicScreenCallback = this._showMusicScreenCallback.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._onFail = this._onFail.bind(this);
    this._onKick = this._onKick.bind(this);
    this._playMusicCallback = this._playMusicCallback.bind(this);
    this._onStreamProcessed = this._onStreamProcessed.bind(this);
    this._cacheMusicSelection = this._cacheMusicSelection.bind(this);
    this._pauseMusicCallback = this._pauseMusicCallback.bind(this);
    this.gifDisplay = new GifDisplay(this._showMusicScreenCallback);
    this.playButton = new PlayButton(this._playMusicCallback, this._pauseMusicCallback);
    this.musicContainer = document.querySelector("#musicScreen");
    this._showErrorScreen = showErrorScreenCallback;
  }

/*
The show() function shows the menu-screen
*/
  show(){
    this.musicContainer.classList.remove('inactive');
  }

/*
The hide() function hides the menu-screen
*/
  hide(){
    this.musicContainer.classList.add('inactive');
  }

/*
The queryGIPHY() function takes in a theme and music as parameters. The music
selection will be cached. After this, the url which is necessary for fetch()
will be constructed. After the url is constructed, it will be fetched.
*/
  queryGIPHY(theme, music){
    this._cacheMusicSelection(music);
    let api = "https://api.giphy.com/v1/gifs/search?q=";
    let keyword = this._getKeyWordForGiphy(theme);
    let apiKey = "&api_key=dc6zaTOxFJmzC&limit=25&rating=g";
    const url = api + keyword + apiKey;
    fetch(url).then(this._onSuccess, this._onFail);
  }

/*
The _getKeyWordForGiphy() will take in a theme as a paramter, encode it, and
created a keyword based on the search.
*/
  _getKeyWordForGiphy(theme){
    theme = encodeURIComponent(theme);
    let keyword = theme.split(' ').join('+');
    return keyword;
  }

/*
The _onStreamProcessed() function will take in json as a parameter. If the data
associated with json has a length of less than two, then the error screen
will show. Otherwise, the gifDisplay, will be provided this data and the loading
page will show
*/
  _onStreamProcessed(json){
    if(json.data.length < 2){
    this._showErrorScreen();
  } else{
    this.gifDisplay.provideJSON(json);
    const loadingContainer = document.querySelector("#loading");
    loadingContainer.classList.remove('inactive'); // display the loading screen
  }
}

/*
The _onSuccess() funciton will pass the json associated with the success parameter
to the _onStreamProcessed() function.
*/
  _onSuccess(success){
    success.json().then(this._onStreamProcessed);
  }

/*
The _onFail() function will fire if there was an error in the fetch process
*/
  _onFail(fail){
    console.log("music screen: failure");
  }

/*
The _showMusicScreenCallback() will be passed into the gifDisplay class. This
will fire once two gifs have loaded. The music will then be played.
*/
  _showMusicScreenCallback(){
    const loadingContainer = document.querySelector("#loading");
    loadingContainer.classList.add('inactive');
    this.show();
    this._playMusicCallback();
  }

/*
The _playMusicCallback() will play the audioPlayer. It will be passed to the
playButton class.
*/
  _playMusicCallback(){
    this.audioPlayer.play();
  }

/*
The _cacheMusicSelection() function will set the musicSelection field of the class
to the music parameter. It will then create an audio player and set the song of the
audioplayer to this.musicSelection. It also sets the kickCallback fo the audioplayer.
*/
  _cacheMusicSelection(music){
    this.musicSelection = music;
    this.audioPlayer = new AudioPlayer();
    this.audioPlayer.setKickCallback(this._onKick);
    this.audioPlayer.setSong(this.musicSelection);
  }

/*
The _onKick() function will take in a kick event and change the gif of the gifDisplay
*/
  _onKick(event){
    this.gifDisplay.swapGifPlace();
  }

  /*
  The _pauseMusicCallback() will pause the audioPlayer. It will be passed to the
  playButton class.
  */
  _pauseMusicCallback(){
    this.audioPlayer.pause();
  }

}
