/*
The PlayButton class will shape the functinality of the play and pause buttons.
*/
class PlayButton{
  constructor(playMusicCallback, pauseMusicCallback){
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this._hidePause = this._hidePause.bind(this);
    this._hidePlay = this._hidePlay.bind(this);
    this._playMusicCallback = playMusicCallback;
    this._pauseMusicCallback = pauseMusicCallback;
    const playButton = document.querySelector("#play");
    const pauseButton = document.querySelector("#pause");
    this.playButton = playButton;
    this.pauseButton = pauseButton;
    this._hidePlay();

  }

/*
The play() function will call the _hidePlay() function and will call the
_playMusicCallback to play the music.
*/
  play(event){
    this._hidePlay();
    this._playMusicCallback();
  }

/*
The pause() function will call the _hidePause() function and will call the
_pauseMusicCallback to pause the music
*/
  pause(event){
    this._hidePause();
    this._pauseMusicCallback();
  }

/*
The _hidePause() function will remove event listeners from the pause button and
hide it. After, it will add event listeners to the play button, and display it.
*/
  _hidePause(){
    this.pauseButton.classList.add('inactive');
    this.pauseButton.removeEventListener("click", this.pause);
    this.playButton.classList.remove('inactive');
    this.playButton.addEventListener("click", this.play);
  }

  /*
  The _hidePlay() function will remove event listeners from the play button and 
  hide it. After, it will add event listeners to the pause button, and display it.
  */
  _hidePlay(){
    this.playButton.classList.add('inactive');
    this.pauseButton.removeEventListener("click", this.play);
    this.pauseButton.classList.remove('inactive');
    this.pauseButton.addEventListener("click", this.pause);

  }


}
