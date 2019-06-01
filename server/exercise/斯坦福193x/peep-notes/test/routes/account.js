const assert = require('assert');
const request = require('supertest');

const server = require('../../server');

describe('Account Router', function() {
  describe('/account/users/', function() {
    it('Verify users api', function(done) {
      request(server)
        .get('/account/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          var expectedUsers = ['John', 'Betty', 'Hal'];
          assert.deepEqual(res.body, expectedUsers);
          done(err);
        });
    });
  });
});
