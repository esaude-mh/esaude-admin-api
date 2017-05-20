var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var mock = require('mock-fs');

describe('controllers', function() {

  describe('backup', function() {

    beforeEach(() => {
      mock({
        '/opt/esaude/data/backups/database': mock.directory({
          mode: 0755,
          items: {
            'backup1.sql.zip': new Buffer(123),
            'backup2.sql.zip': new Buffer(456),
            'backup3.sql.zip': new Buffer(789),
          }
        })
      });
    });

    afterEach(() => {
      mock.restore();
    });

    describe('GET /backup', function() {

      it('should return list of backups', function(done) {

        request(server)
          .get('/backup')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.have.keys(
              'database');

            res.body.database.should.have.length(3);

            done();
          });

      });

    });

    describe('GET /backup/{filename}', function() {

      it('should return file if it exists', function(done) {

        request(server)
          .get('/backup/backup1.sql.zip')
          .set('Accept', 'application/zip')
          .expect('Content-Type', /zip/)
          .expect('Content-Length', 123)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            done();
          });

      });

      it('should return an error message if it does not exist', function(done) {

        request(server)
          .get('/backup/backup99.sql.zip')
          .set('Accept', 'application/zip')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.have.keys(
              'message');

            res.body.message.should.be.exactly('Backup file not found');

            done();
          });

      });

    });

    describe('POST /backup', function() {

      it('should initiate a backup', function(done) {

        // TODO figure out a good way to mock the Docker API
        done();
        
      });

    });

  });

});
