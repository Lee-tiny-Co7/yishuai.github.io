/* @flow */

const https = require('https');
const querystring = require('querystring');

type UserInfo = {
  gmail_id: string;
  email: string;
};
export function validateToken(id_token: string): Promise<UserInfo> {
  var postData = querystring.stringify({
    id_token: id_token 
  });

  var options = {
    hostname: 'www.googleapis.com',
    path: '/oauth2/v3/tokeninfo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve, reject) => {
    var req = https.request(options, (res) => {
      var status = res.statusCode;

      res.setEncoding('utf8');
      var json_string = '';
      res.on('data', (chunk) => {
        json_string += chunk;
      });
      
      res.on('end', () => {
        var response_json = JSON.parse(json_string);
        if (response_json.error_description) {
          reject({
            error: response_json.error_description
          });
          return;
        } 
        if (!isValid(response_json)) {
          reject({
            error: 'token id is invalid'
          });
          return;
        }

        resolve({
          gmail_id: response_json.sub,
          email: response_json.email
        });
      });
    });

    req.on('error', (e) => {
      reject({
        error: e.message
      });
    });

    // write data to request body
    req.write(postData);
    req.end();
  });
}

function isValid(response_json) {
  // Based on "Calling the tokeninfo endpoint":
  // https://developers.google.com/identity/sign-in/web/backend-auth
  const CLIENT_ID =
    '813404364581-8dma5mlhtfu2stg75d3niotiup4h57lv.apps.googleusercontent.com';
  var aud = response_json.aud;
  return aud == CLIENT_ID;
}
