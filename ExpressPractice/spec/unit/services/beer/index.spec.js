'use strict';

const sinon = require('sinon');

describe('BeerService', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#createBeer', () => {
    it('should successfully create a new beer', (done) => {
      done();
    });
  });
});