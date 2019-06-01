function loadJsonDone(value) {
  console.log('loadJson complete!');
  // Prints "value: true"
  console.log('value: ' + value);
}

async function loadJson() {
  const response = await fetch('albums.json');
  const json = await response.json();
  console.log(json);
  return true;
}
loadJson().then(loadJsonDone)
console.log('after loadJson');
