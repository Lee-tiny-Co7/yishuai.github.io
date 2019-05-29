// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
    constructor(containerElement, preloadedEnough) {
        this.containerElement = containerElement;
        this.preloadedEnough = preloadedEnough;
        this.nextImg = this.nextImg.bind(this);
        this.load = this.load.bind(this);
        this.firstNextImg = this.firstNextImg.bind(this);
        this.countLoaded = this.countLoaded.bind(this);


        // TODO(you): Implement the constructor and add fields as necessary.
    }
    load(gifs) {
        this.allImages = [];
        this.excludeGifIndex = 0;
        this.started = false;
        this.numLoaded = 0;
        for (let i = 0; i < gifs.length; i++) {

            let imgElem = new Image();
            imgElem.addEventListener("load", this.countLoaded);
            imgElem.src = gifs[i].url;
        }
    }
    countLoaded(e) {
        //console.log("this.numLoaded: ", this.numLoaded);
        if (this.numLoaded >= 2 && !this.started) {
            this.preloadedEnough();
        }
        this.allImages.push(e.currentTarget);
        e.preventDefault();
        e.currentTarget.removeEventListener("load", this.countLoaded);
        this.numLoaded++;
    }
    firstNextImg() {
        //loads first images into background and foreground divs
        if (!this.started) {
            let fore = document.querySelector(".gif-screen[data-z-index='1']");
            let back = document.querySelector(".gif-screen[data-z-index='0']");
            let randIndex = Math.floor(Math.random() * this.allImages.length);
            fore.style.backgroundImage = 'url(' + this.allImages[randIndex].src + ')';
            this.excludeGifIndex = randIndex;

            let lastImage = this.allImages[this.excludeGifIndex];
            this.allImages.splice(this.excludeGifIndex, 1);
            randIndex = Math.floor(Math.random() * this.allImages.length);
            back.style.backgroundImage = 'url(' + this.allImages[randIndex].src + ')';
            this.excludeGifIndex = randIndex;
            this.allImages.push(lastImage);
        } else {
            this.started = true;
            return;
        }




    }
    nextImg() {
        let oldFore = document.querySelector(".gif-screen[data-z-index='1']");
        let oldBack = document.querySelector(".gif-screen[data-z-index='0']");
        oldFore.dataset.zIndex = '0';
        oldBack.dataset.zIndex = '1';
        let lastImage = this.allImages[this.excludeGifIndex];
        this.allImages.splice(this.excludeGifIndex, 1);


        let randIndex = Math.floor(Math.random() * this.allImages.length);
        oldFore.style.backgroundImage = 'url(' + this.allImages[randIndex].src + ')';
        this.excludeGifIndex = randIndex;
        if (lastImage) {
            this.allImages.push(lastImage);
        }


    }

    // TODO(you): Add methods as necessary.
}
