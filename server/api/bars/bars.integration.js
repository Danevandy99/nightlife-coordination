'use strict';

var app = require('../..');
import request from 'supertest';

var newBars;

describe('Bars API:', function() {

  describe('GET /api/bars', function() {
    var barss;

    beforeEach(function(done) {
      request(app)
        .get('/api/bars')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          barss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      barss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bars', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bars')
        .send({
          name: 'New Bars',
          info: 'This is the brand new bars!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBars = res.body;
          done();
        });
    });

    it('should respond with the newly created bars', function() {
      newBars.name.should.equal('New Bars');
      newBars.info.should.equal('This is the brand new bars!!!');
    });

  });

  describe('GET /api/bars/:id', function() {
    var bars;

    beforeEach(function(done) {
      request(app)
        .get('/api/bars/' + newBars._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bars = res.body;
          done();
        });
    });

    afterEach(function() {
      bars = {};
    });

    it('should respond with the requested bars', function() {
      bars.name.should.equal('New Bars');
      bars.info.should.equal('This is the brand new bars!!!');
    });

  });

  describe('PUT /api/bars/:id', function() {
    var updatedBars;

    beforeEach(function(done) {
      request(app)
        .put('/api/bars/' + newBars._id)
        .send({
          name: 'Updated Bars',
          info: 'This is the updated bars!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBars = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBars = {};
    });

    it('should respond with the updated bars', function() {
      updatedBars.name.should.equal('Updated Bars');
      updatedBars.info.should.equal('This is the updated bars!!!');
    });

  });

  describe('DELETE /api/bars/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bars/' + newBars._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bars does not exist', function(done) {
      request(app)
        .delete('/api/bars/' + newBars._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
