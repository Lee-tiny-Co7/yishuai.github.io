
function createAudioUrl() {
  if (!document.querySelector('#word').value) {
    return null;
  }

  var word = encodeURI(document.querySelector('#word').value);
  var token = document.querySelector('#token').value;
  var length = word.length;

  var url_start = "http://translate.google.com//translate_tts?ie=UTF-8&q=";
  var url_middle1 = '&tk=';
  var url_middle2 = '&textlen=';
  var url_end = "&tl=ko&total=1&idx=0&client=t&prev=input&ttsspeed=1";

  return url_start + word + url_middle1 + token + url_middle2 + length + url_end;
}

function appendPlayerDiv(audio_url) {
  var word = document.querySelector('#word').value;
  var containerTag = document.createElement('div');
  containerTag.className = 'one-result';
  var audioTag = document.createElement('audio');
  audioTag.src = audio_url;
  audioTag.controls = true;
  var anchorTag = document.createElement('a');
  anchorTag.href = audio_url;
  anchorTag.innerHTML = 'download';
  var labelTag = document.createElement('strong');
  labelTag.innerHTML = word;

  containerTag.appendChild(labelTag);
  containerTag.appendChild(audioTag);
  containerTag.appendChild(anchorTag);

  var allResults = document.querySelector('#result');
  allResults.insertBefore(containerTag, allResults.firstChild);
}

var inputForm = document.querySelector('form');

inputForm.onsubmit = function(event) {
  event.preventDefault();
  var url = createAudioUrl();
  if (url) {
    appendPlayerDiv(url);
  }
};
