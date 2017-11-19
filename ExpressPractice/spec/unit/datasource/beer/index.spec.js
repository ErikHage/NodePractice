'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Promise = require('bluebird');

const BeerDataSource = require('../../../../lib/datasource/beer');
const Database = require('../../../../lib/database');

describe('BeerDataSource', () => {
  let databaseMock;

  const beer = {
    beerId: 'Some UUID',
    name: 'Some Beer',
    style: 'Some Style',
    abv: 5.5,
    ibu: 35.5,
    description: 'Some description',
  };

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    databaseMock = sinon.mock(Database);
  });

  afterEach(() => {
    databaseMock.verify();
    this.sandbox.restore();
  });

  context('#insertBeer', () => {
    it('should successfully insert and return the inserted beer', (done) => {
      done();
    });

    it('should throw an error when save fails', (done) => {
      BeerDataSource.insertBeer(beer)
        .then(() => done(new Error('Expected error but not thrown')))
        .catch(() => done());
    });
  });

  context('#getBeerById', () => {
    it('should successfully return the beer with the given id', (done) => {
      const beerId = 'Some UUID';
      const expected = {
        beerId: 'Some UUID',
        name: 'Some Beer',
        style: 'Some Style',
        abv: 5.5,
        ibu: 35.5,
        description: 'Some description',
      };

      BeerDataSource.getBeerById(beerId)
        .then((res) => {
          expect(res).to.deep.equal(expected);
          done();
        })
        .catch(done);
    });

    it('should throw an error when read fails');
  });

  context('#updateBeer', () => {
    it('should successfully update the given beer', (done) => {
      const beerToUpdate = {
        beerId: 'Some UUID',
        name: 'Some Beer Name',
        style: 'Some Beer Style',
        abv: 10.2,
        ibu: 45.5,
        description: 'Some updated description',
      };

      const expected = {
        beerId: 'Some UUID',
        name: 'Some Beer Name',
        style: 'Some Beer Style',
        abv: 10.2,
        ibu: 45.5,
        description: 'Some updated description',
      };

      BeerDataSource.updateBeer(beerToUpdate)
        .then((res) => {
          expect(res).to.deep.equal(expected);
          done();
        })
        .catch(done);
    });

    it('should throw an error when update fails');
  });

  context('#deleteBeer', () => {
    it('should successfully delete beer for given id', (done) => {
      BeerDataSource.deleteBeer(beer.beerId)
        .then(() => done())
        .catch(done);
    });

    it('should throw an error when delete fails');
  });
});