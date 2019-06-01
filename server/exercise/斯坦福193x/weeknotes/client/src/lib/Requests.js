/* @flow */

class Requests {
  static fetchUserNotes(currentUser) {
      let auth_response = currentUser.getAuthResponse();
      let id_token = auth_response.id_token;
    return fetch('/api/login', {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          id_token: id_token
        })
    }).then(Requests._checkStatus)
      .then(Requests._parseJSON);
  }

  static saveUserNote(currentUser, note): Promise<Object> {
    let auth_response = currentUser.getAuthResponse();
    let id_token = auth_response.id_token;
    return fetch('/api/notes', {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          id_token: id_token,
          week_id: note.week_id,
          contents: note.contents
        })
    }).then(Requests._checkStatus)
      .then(Requests._parseJSON);
  }

  static _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.statusText}`);
      throw error;
    }
  }

  static _parseJSON(response) {
    return response.json();
  }
}

export default Requests;
