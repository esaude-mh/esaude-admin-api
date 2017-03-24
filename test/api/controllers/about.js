var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('about', function() {

    describe('GET /about', function() {

      it('should return expected schema', function(done) {

        request(server)
          .get('/about')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.have.keys(
              'description',
              'version',
              'homepage',
              'license',
              'bugs');

            res.body.bugs.should.have.keys(
              'url',
              'email');

            done();
          });
      });

    });

  });

});
