class WelcomeScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    const welcome = document.querySelector('#welcome');
    welcome.classList.remove('inactive');
    console.log('welcome');

    const create = document.querySelector('#create');
    this.create = this.create.bind(this);
    create.addEventListener('click', this.create);
    //this.welcome = new WelcomeScreen(welcomeElement);

    //this.postEntry = this.postEntry.bind(this);
    //this._loadEntry = this._loadEntry.bind(this);
    //this.welcomeClick = this.welcomeClick.bind(this);
  }





  show(){
    this.containerElement.classList.remove('inactive');
  }

  hide(){
    this.containerElement.classList.add('inactive');
  }

  create(event){
    document.dispatchEvent(new CustomEvent('create'));
    console.log('create');
  }

}
