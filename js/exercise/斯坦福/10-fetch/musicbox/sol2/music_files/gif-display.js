/*
The GifDisplay class will function as the screen which the user sees once there are
enough gifs in the associated json file and at least two gifs have been preloaded. The
showMusicScrenCallback in the function allows this functionality to occur
*/

class GifDisplay{
  constructor(showMusicScrenCallback){
    this._onLoad = this._onLoad.bind(this);
    this._getRandomIndex = this._getRandomIndex.bind(this);
    this._loadTwo = this._loadTwo.bind(this);
    this._preload = this._preload.bind(this);
    this.swapGifPlace = this.swapGifPlace.bind(this);
    this.imageArray = [];
    this._showMusicScreenCallback = showMusicScrenCallback;
    this.numberOfGifs = 0;
  }

/*
The provideJSON() takes in a json file, saves it to a field, and begins loading the
first element
*/
  provideJSON(json){
    this.json = json;
    this._preload(0);
  }

/*
The _preload() function takes in an index and preloads the image associated with
the json.data of that index. This will occur for all elements of the json.data.
A gif will be generated based on the data url. An event listener will be added to
the gif which will alert the class once the respective gif finishes loading. The gif
will then be pusehd to the imageArray of the class.
*/
  _preload(index){
    if(index !== this.json.data.length){
      const gif = new Image();
      gif.src = this.json.data[index].images.downsized.url;
      gif.addEventListener("load",this._onLoad);
      this.imageArray.push(gif);
    }
  }

/*
The _onLoad() takes in an event, which is an image being loaded. In this function
the number of gifs will be incremented and ocne the number of gifs is equal to two,
the music screen will show and the first two images will display.
*/
  _onLoad(event){
    this.numberOfGifs ++;
    if(this.numberOfGifs == 2){ // 2 gifs have completely loaded
      this._showMusicScreenCallback();
      this._loadTwo(); // load the first two gifs
    }
    this._preload(this.numberOfGifs); // preload the next index
  }

  /*
  The _loadTwo() function will set a foreground and background container field for the
  class. Foreground and background images will also be generated for the class. The
  foreground image will be set to that of the foreground image src and the same
  process will be done for the background image
  */
  _loadTwo(){
    const foreground = document.querySelector("#foreground");
    const background = document.querySelector("#background");
    this.foregroundContainer = foreground;
    this.backgroundContainer = background;
    this.foregroundImage = this.imageArray[0];
    this.backgroundImage = this.imageArray[1];
    this.foregroundContainer.style.backgroundImage = "url( "+ this.foregroundImage.src + ")";
    this.backgroundContainer.style.backgroundImage = "url( "+ this.backgroundImage.src + ")";
  }

/*
The swapGifPlace() function will fire when the audio player kicks. This function
will change the foregroundBackgroundImage to that of the backgroundImage src. It will
then try to find a new backroundImage. Once a new backgroundImage is found, the
backgroundImage field of the class will be set to it.
*/
  swapGifPlace(){
    this.foregroundContainer.style.backgroundImage = "url( "+ this.backgroundImage.src + ")";
    this.foregroundImage = this.backgroundImage;
    let backgroundImage = this.imageArray[this._getRandomIndex()]
    while(backgroundImage === this.foregroundImage){ // while the background and foreground image are the same
    backgroundImage = this.imageArray[this._getRandomIndex()]; // find a new background image
  }
    this.backgroundImage = backgroundImage;
    this.backgroundContainer.style.backgroundImage = "url( "+ this.backgroundImage.src + ")";
    this.backgroundContainer.style.zIndex = "0";
    this.foregroundContainer.style.zIndex = "1";
  }

/*
The _getRandomIndex() function will find a randomIndex for which an image will
be queried from the imageArray of the class
*/
  _getRandomIndex(){
    const minValue = Math.ceil(0);
    const maxValue = Math.floor(this.imageArray.length);
    const randomIndex = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    return randomIndex;
  }

}
