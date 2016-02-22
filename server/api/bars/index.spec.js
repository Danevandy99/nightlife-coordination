'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var barsCtrlStub = {
  index: 'barsCtrl.index',
  show: 'barsCtrl.show',
  create: 'barsCtrl.create',
  update: 'barsCtrl.update',
  destroy: 'barsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var barsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bars.controller': barsCtrlStub
});

describe('Bars API Router:', function() {

  it('should return an express router instance', function() {
    barsIndex.should.equal(routerStub);
  });

  describe('GET /api/bars', function() {

    it('should route to bars.controller.index', function() {
      routerStub.get
        .withArgs('/', 'barsCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bars/:id', function() {

    it('should route to bars.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'barsCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bars', function() {

    it('should route to bars.controller.create', function() {
      routerStub.post
        .withArgs('/', 'barsCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bars/:id', function() {

    it('should route to bars.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'barsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bars/:id', function() {

    it('should route to bars.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'barsCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bars/:id', function() {

    it('should route to bars.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'barsCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
