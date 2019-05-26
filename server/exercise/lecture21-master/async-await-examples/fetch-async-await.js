async function loadJson() {
  const response = await fetch('albums.json');
  const json = await response.json();

  const albums = json.albums;
  console.log(albums);
  // Sort albums by year.
  albums.sort(function(a, b) {
    return a.year - b.year;
  });

  // Add album images to body.
  for (const album of albums) {
    const image = new Image();
    image.src = album.url;
    document.body.append(image);
  }

  console.log(json);
}
loadJson();
