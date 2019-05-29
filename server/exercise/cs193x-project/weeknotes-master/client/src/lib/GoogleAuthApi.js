/* @flow */

export default function loadGoogleApi(callback: (auth: Object) => void) {
  // Lolz inject the Google API script element so that we can access the global
  // gapi object after the initial document load.
  let script = document.createElement('script');
  document.body.appendChild(script);

  // Lolz Google API login stuffs.
  script.onload = () => {
    // eslint-disable-next-line
    window.gapi.load('auth2', () => {
      // eslint-disable-next-line
      let auth = window.gapi.auth2.init({
        client_id: '813404364581-8dma5mlhtfu2stg75d3niotiup4h57lv.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
      });
      auth.then(() => {
        callback(auth);
      });
    });
  };

  script.src = 'https://apis.google.com/js/platform.js';
  script.async = true;
}
