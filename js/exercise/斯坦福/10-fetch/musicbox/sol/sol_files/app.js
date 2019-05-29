// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
    constructor() {
        this._createAppElements = this._createAppElements.bind(this);
        this.switchToMS = this.switchToMS.bind(this);
        this.switchToMM = this.switchToMM.bind(this);

        this._createAppElements();

        // TODO(you): Implement the constructor and add fields as necessary.
    }
    _createAppElements() {

        const menuElement = document.querySelector('#menu');

        this.menu = new MenuScreen(menuElement, this.switchToMS);
        const musicElement = document.querySelector("#music");
        this.musicScreen = new MusicScreen(musicElement, this.switchToMM);
        this.switchToMM();

        // const mainElement = document.querySelector('#main');
        // this.flashcards = new FlashcardScreen(mainElement, this._updateScore, this.switchToRS);

        // const resultElement = document.querySelector('#results');
        // this.results = new ResultsScreen(resultElement, this.switchToFS, this.switchToMS);
    }
    switchToMM(message) {
        this.menu.show(message);
        this.musicScreen.hide();
    }
    switchToMS(gifs, song) {
        this.menu.hide();
        this.musicScreen.show(gifs, song);
    }

    // TODO(you): Add methods as necessary.
}
