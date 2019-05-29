// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
    constructor(containerElement, switchToMS) {
        this.switchToMS = switchToMS;
        this.containerElement = containerElement;
        this.onResponse = this.onResponse.bind(this);
        this.onSongStreamProcessed = this.onSongStreamProcessed.bind(this);
        this.fetchSongList = this.fetchSongList.bind(this);
        this.onError = this.onError.bind(this);
        this.popQueryInput = this.popQueryInput.bind(this);
        this._changeSelection = this._changeSelection.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this.queryGiphyApi = this.queryGiphyApi.bind(this);
        this.onGifStreamProcessed = this.onGifStreamProcessed.bind(this);

        this.containerElement = containerElement;
        this.songSelector = this.containerElement.querySelector("#song-selector");
        this.queryInput = this.containerElement.querySelector("#query-input");
        this.form = this.containerElement.querySelector("form");
        this.sampleInput = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
        this.error = document.querySelector("#error");
        // this.currOption = this.songSelector.options[this.songSelector.selectedIndex].value;

        this.fetchSongList();
        this.popQueryInput();
        //this._changeSelection();

        this.form.addEventListener("submit", this._onSubmit);
        // TODO(you): Implement the constructor and add fields as necessary.
    }

    _onSubmit(e) {
        //this.error.classList.add("inactive");

        e.preventDefault();
        //e.currentTarget.removeEventListener("submit", this._onSubmit);

        if (this.queryInput.value) {
            this.currTheme = this.queryInput.value;
        }
        //console.log("this.theme: ", this.currTheme);
        this.queryGiphyApi();
        //this.switchToMS(this.currTheme, this.currSong);
    }

    _changeSelection(e) {

        const index = this.songSelector.selectedIndex;
        console.log("index: ", index);
        this.currSong = this.songSelector.options[index].value;

    }
    fetchSongList() {
        fetch('https://yayinternet.github.io/hw4-music/songs.json').then(this.onResponse, this.onError).then(this.onSongStreamProcessed);
    }

    onSongStreamProcessed(songs) {
        //console.log("onSongStreamProcessed");
        this.songSelector.addEventListener("change", this._changeSelection);
        this.allSongUrls = {};
        for (let song in songs) {
            let option = document.createElement("option");
            option.value = song;
            option.text = songs[song].artist + ": " + songs[song].title;
            let newSong = {};
            this.allSongUrls[song] = songs[song].songUrl;
            this.songSelector.appendChild(option);

        }
        this._changeSelection();

    }
    onGifStreamProcessed(json) {
        //console.log("onGifStreamProcessed");
        //console.log("json:\n", json);
        this.gifsJson = json;
        let gifs = this.gifsJson.data;
        //console.log("gifs:\n", gifs);
        if (gifs.length < 2) {
            //console.log("too few gifs");
            this.error.classList.remove("inactive");
        } else {
            for (let gif in gifs) {
                let newGif = {};
                newGif.url = gifs[gif].images.downsized.url;
                this.gifs.push(newGif);
            }
            this.switchToMS(this.gifs, this.allSongUrls[this.currSong]);
        }
    }
    onResponse(res) {
        return res.json();
    }
    onError(res) {
        console.log("Error: ", res.status);
    }
    popQueryInput() {
        let randInput = this.sampleInput[Math.floor(Math.random() * this.sampleInput.length)];
        this.currTheme = randInput;
        this.queryInput.value = randInput;

    }

    //have to query the giphy api here 
    queryGiphyApi() {
        this.gifsJson = {};
        this.gifs = [];
        let query = "https://api.giphy.com/v1/gifs/search?q=" + encodeURIComponent(this.currTheme) + "&limit=25&rating=g&api_key=dc6zaTOxFJmzC";
        //console.log(query);
        fetch(query).then(this.onResponse, this.onError).then(this.onGifStreamProcessed);
        //console.log(this.gifsJson);


    }

    show(message) {
        this.error.classList.add("inactive");
        this.containerElement.classList.remove('inactive');
        this.queryInput.addEventListener("keypress", (e) => {
            let error = document.querySelector("#error");
            error.classList.add("inactive");

        });
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }

    // TODO(you): Add methods as necessary.
}
