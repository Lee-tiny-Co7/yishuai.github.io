// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
    constructor(containerElement, switchToMS) {
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.containerElement = containerElement;
        this.switchToMS = switchToMS;
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
        this.onKick = this.onKick.bind(this);
        this.preloadedEnough = this.preloadedEnough.bind(this);

        // TODO(you): Implement the constructor and add fields as necessary.
        this.loadScreen = document.querySelector("#load-screen");
        this.gifDisplayElem = this.containerElement.querySelector("#gif-display");
        this.audioPlayer = new AudioPlayer();
        this.playButton = new PlayButton(this.playAudio, this.pauseAudio);
        this.gifDiplay = new GifDisplay(this.gifDisplayElem, this.preloadedEnough);
    }
    preloadedEnough() {
        this.containerElement.classList.remove('inactive');
        this.loadScreen.classList.add("inactive");


        if (!this.started) {
            this.gifDiplay.firstNextImg();
            this.started = true;
            this.playButton.togglePlay();
        }


    }
    playAudio() {
        this.audioPlayer.play();

    }
    pauseAudio() {
        this.audioPlayer.pause();
    }
    show(gifs, songUrl) {
        //call new gif here.
        this.started = false;
        this.loadScreen.classList.remove("inactive");

        this.gifs = gifs;
        this.songUrl = songUrl;
        // //this.containerElement.classList.remove('inactive');
        this.audioPlayer.setSong(this.songUrl);
        this.audioPlayer.setKickCallback(this.onKick);
        //this.playButton.togglePlay();
        //From here I'm preloading the images

        this.gifDiplay.load(gifs);

    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
    onKick() {

        this.gifDiplay.nextImg();
    }


    // TODO(you): Add methods as necessary.
}
