class Demo {
  constructor() {
    this.audioPlayer = new AudioPlayer();
    this._onSubmit = this._onSubmit.bind(this);
    this._onKick = this._onKick.bind(this);

    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', this._onSubmit);
  }

  _onSubmit(event) {
    event.preventDefault();

    const input = document.querySelector('#audio-url');
    const text = input.value;
    const formElement = document.querySelector('fieldset');
    formElement.disabled = true;

    this.audioPlayer.setSong(text);
    this.audioPlayer.setKickCallback(this._onKick);
    this.audioPlayer.play();
  }

  _onKick() {
    console.log('kick!');
  }
}
