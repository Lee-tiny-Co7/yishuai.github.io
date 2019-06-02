class App {
  constructor() {
    const welcomeElement = document.querySelector('#welcome');
    const diaryElement = document.querySelector('#diary');
    const saveElement = document.querySelector('#save');

    this.welcome = new WelcomeScreen(welcomeElement);
    this.diary = new DiaryScreen(diaryElement);

    this.footer = document.querySelector('#footer');
    this.text = document.querySelector('#text');
    this.check = document.querySelector('#save');
    this.idnum = document.querySelector('#ID');

    this.post = this.post.bind(this);
    this._loadDiary = this._loadDiary.bind(this);
    //this.postEntry = this.postEntry.bind(this);
    //this._loadEntry = this._loadEntry.bind(this);
    this.welcomeClick = this.welcomeClick.bind(this);
    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    //this.writeEntry = this.writeEntry.bind(this);
    this.newText = '';
    this.upsertEntry = this.upsertEntry.bind(this);

    this.start = this.start.bind(this);

    document.addEventListener('create', this.welcomeClick);
    saveElement.addEventListener('click', this.save);
    this.text.addEventListener('click', this.edit);
    //console.log('hi');
    this.start();
  }


start(){
  console.log('hi');

  const urlPathString = window.location.pathname;
const parts = urlPathString.split('/');
  if (parts.length > 3 && parts[2] === 'id') {
    console.log('id detected');
    this.diaryId = parts[2];
    this._loadDiary();
  }
}

welcomeClick(event){
    console.log('created');

    this.welcome.hide();
    //this.postEntry();

    this.post(event);
  }

/*
  async postEntry(event){
    event.preventDefault();
    console.log(this.newText);
    const params = {
      entry: this.newText
    }
    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    };

    const result = await fetch('/saveEntry/', fetchOptions);
    const json = await result.json();
    this.entryId = json.entryId;
    console.log(json.diaryId);
    this._loadDiary();
  }

  async _loadEntry(event) {
      const result = await fetch('/getEntry/' + this.entryId);
      const json = await result.json();
      this.entry = json.entry;
      console.log(json.entry);
      this.diary.show(this.entryId, this.entry);
      //window.location.href = '/id/' + this.entryId;
  }
*/








async post(event){
  event.preventDefault();
  console.log(this.newText);
  const params = {
    entries: this.newText
  }

  const fetchOptions = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  };

  const result = await fetch('/id/', fetchOptions);
  const json = await result.json();
  this.diaryId = json.diaryId;
  this.idnum.innerHTML = this.diaryId;
  console.log(json.diaryId);
  //window.location.href = '/id/' + this.diaryId;




  this._loadDiary();
}

async _loadDiary() {
    const result = await fetch('/id/' + this.diaryId);
    const json = await result.json();
    this.entries = json.entries;
    this.diary.show(this.diaryId, this.entries);
    console.log(this.entries);
    console.log('hi');
}

edit(event){
  this.check.classList.remove('inactive');
//  this.footer.classList.add('inactive');
}

save(event){
  this.check.classList.add('inactive');
//  this.footer.classList.remove('inactive');
  this.newtext = this.text.value;
  console.log(this.newtext);
  this.upsertEntry();
}

async upsertEntry() {
  event.preventDefault();

  const data = {
    diaryId: this.diaryId,
    entries: this.newtext
  };

  const fetchOptions = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  console.log(fetchOptions.body);
  this.message = fetchOptions.body;
  const result = await fetch('/ups', fetchOptions);
  const json = await result.json();
  this.entries = json.entries;
  console.log(this.entries);
  this._loadDiary();
}






/*

async writeEntry(event){
  event.preventDefault();
  console.log(this.newText);
  const params = {
    entry: this.newText
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  };

  const result =   await fetch('/set/' + entry, fetchOptions);
  const json = await result.json();

  //this.diary.show(this.diaryId, this.entries);
}
*/


/*async patch(event){
  const params = {
    entries: this.newtext
  }
  const fetchOptions = {
    method: 'patch',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  };
  const result = await fetch('/patch/' + fetchOptions);
  const json = await result.json();
  console.log(result);
}*/

/*async writeEntry() {
  const diaryId = this.diaryId;
  const entry = this.newText;

  const message = {
    entry: entry
  };

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  };

  await fetch('/set/' + diaryId + '/' + entry, fetchOptions);
}*/

}
