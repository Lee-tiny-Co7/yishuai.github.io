// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
    constructor(playAudio, pauseAudio) {
        this.pauseAudio = pauseAudio;
        this.playAudio = playAudio;
        this.togglePlay = this.togglePlay.bind(this);
        this.controls = document.querySelector("#controls");

        this.controls.addEventListener("click", this.togglePlay);
        this.on = false;
        // TODO(you): Implement the constructor and add fields as necessary.
    }
    togglePlay(e) {

        if (this.on) {
            this.pauseAudio();
            //change the img src to play btn
            this.controls.src = "images/play.png";
            this.on = false;
        } else {
            this.controls.src = "images/pause.png";
            this.on = true;
            //change img src to pause btn
            this.playAudio();
        }
    }

    // TODO(you): Add methods as necessary.
}
