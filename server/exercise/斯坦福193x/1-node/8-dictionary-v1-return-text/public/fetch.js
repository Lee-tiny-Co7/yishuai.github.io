async function onSearch(event) {
  event.preventDefault();
  const input = document.querySelector('#word-input');
  const word = input.value.trim();
  const result = await fetch('/print/' + word);
  const text = await result.text();

  const results = document.querySelector('#results');
  results.textContent = text;
}

const form = document.querySelector('#search');
form.addEventListener('submit', onSearch);
