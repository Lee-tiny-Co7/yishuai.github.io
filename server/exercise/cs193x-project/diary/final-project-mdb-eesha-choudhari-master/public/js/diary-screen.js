class DiaryScreen {


  constructor(containerElement, diaryId) {
    this.containerElement = containerElement;
    this.diaryId = diaryId;
    const today = new Date();
    const options = { month: 'long', day: 'numeric' };
    this.today = today.toLocaleDateString('en-US', options);
    this.curr = this.today;

  }



  show(diaryId, entries){
    console.log('here');
    this.entries = entries;
    this.containerElement.classList.remove('inactive');

    const footer = document.querySelector('#footer');
    const text = document.querySelector('#text');
    //footer.classList.remove('inactive');
    text.classList.remove('inactive');
    const dateElement = document.querySelector('#date');
    dateElement.innerHTML = this.curr;
    const promptElement = document.querySelector('#prompt');
    promptElement.innerHTML = PROMPTS[parseInt(this.curr.slice(-2))];
    const textElement = document.querySelector('#text');
    textElement.innerHTML = entries;

  }

  hide(){
    this.containerElement.classList.add('inactive');
  }

  next(){
    const tomorrow = new Date();
    tomorrow.setDate(this.curr.getDate() + 1);
    console.log(tomorrow.toLocaleDateString('en-US', options));
    this.prompt = PROMPTS[parseInt(this.curr.slice(-2))];
    this.curr = tomorrow;

  }

  previous(){
    const yesterday = new Date();
    yesterday.setDate(this.curr.getDate() + 1);
    console.log(yesterday.toLocaleDateString('en-US', options));
    this.prompt = PROMPTS[parseInt(this.curr.slice(-2))];
    this.curr = yesterday;

  }

}
