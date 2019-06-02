async function loadJson() {
  const response = await fetch('albums.json');
  const json = await response.json();
}
loadJson();
console.log('after loadJson');
