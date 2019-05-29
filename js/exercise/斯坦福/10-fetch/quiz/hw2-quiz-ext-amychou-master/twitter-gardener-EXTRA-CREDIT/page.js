const POSITIVE_MESSAGES = [
  'You are worthy.',
  'You are enough.',
  'Be kind and forgiving to yourself.',
  'You are amazing.',
  'It\'s okay not to be okay.',
  'It\'s enough to just breathe.',
  'You are loved.',
  'I believe in you.',
  'You can do it!',
  'You are not a failure.',
  'You matter.',
  'Your life matters.'
];

const CURSOR_IMG = chrome.runtime.getURL('images/rose-cursor.gif');
const BACKGROUND_IMG = chrome.runtime.getURL('images/sparkle.gif');

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(onMessage);
});

function startGardening(){
  const tweets = document.querySelectorAll(".tweet");
  for (let tweet of tweets){
    tweet.style.cursor = 'url(' + CURSOR_IMG + ') 4 12, auto';
    tweet.addEventListener('mouseover', onmouseover);
    tweet.addEventListener('mouseout', onmouseout);
    tweet.addEventListener('click', onclick);
  }
}

function stopGardening(){
  const tweets = document.querySelectorAll(".tweet");
  for (let tweet of tweets){
    tweet.style.cursor = '';
    tweet.removeEventListener('mouseover', onmouseover);
    tweet.removeEventListener('mouseout', onmouseout);
    tweet.removeEventListener('click', onclick);
  }
}

function onclick(event){
  const tweet = event.currentTarget;
  event.stopPropagation();
  const tweetText = tweet.querySelector('.tweet-text');
  let randInd = Math.floor(Math.random() * POSITIVE_MESSAGES.length);
  tweetText.textContent = POSITIVE_MESSAGES[randInd];
}

function onmouseover(event){
  const tweet = event.currentTarget;
  tweet.style.backgroundImage = 'url(' + BACKGROUND_IMG + ')';
  tweet.style.opacity = '0.8';
}

function onmouseout(event){
  const tweet = event.currentTarget;
  tweet.style.backgroundImage = '';
  tweet.style.opacity = '';
}


function onMessage(gardeningInProgress) {
  // If `gardeningInProgress` is true, that means "Start Gardening" was clicked.
  // If `gardeningInProgress` is false, that means "Stop Gardening" was clicked.
  if (gardeningInProgress) {
    startGardening();
  }
  else{
    stopGardening();
  }
}
