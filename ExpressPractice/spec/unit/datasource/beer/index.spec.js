'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const Promise = require('bluebird');

const BeerDataSource = require('../../../../lib/datasource/beer');
const Database = require('../../../../lib/database');

describe('BeerDataSource', () => {
  let databaseMock;
  let beer;
  let dbResult;

  const collectionName = 'beers';

  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    databaseMock = sinon.mock(Database);

    beer = {
      beerId: 'Some UUID',
      name: 'Some Beer',
      style: 'Some Style',
      abv: 5.5,
      ibu: 35.5,
      description: 'Some description',
    };

    dbResult = {
      beerId: 'Some UUID',
      name: 'Some Beer',
      style: 'Some Style',
      abv: 5.5,
      ibu: 35.5,
      description: 'Some description',
      meta: { revision: 0, created: 1511134154296, version: 0 },
      $loki: 1
    };
  });

  afterEach(() => {
    databaseMock.verify();
    this.sandbox.restore();

    beer = null;
    dbResult = null;
  });

  context('#insertBeer', () => {
    it('should successfully insert and return the inserted beer', (done) => {
      databaseMock.expects('insert')
        .once()
        .withArgs(beer, collectionName)
        .returns(Promise.resolve(dbResult));

      BeerDataSource.insertBeer(beer)
        .then((res) => {
          expect(res).to.deep.equal(beer);
          done();
        })
        .catch(done);
    });

    it('should throw an error when save fails', (done) => {
      const expectedError = new Error('Something went wrong!');

      databaseMock.expects('insert')
        .once()
        .withArgs(beer, collectionName)
        .returns(Promise.reject(expectedError));

      BeerDataSource.insertBeer(beer)
        .then(() => done(new Error('Expected error but not thrown')))
        .catch(() => done());
    });
  });

  context('#getBeerById', () => {
    it('should successfully return the beer with the given id', (done) => {
      databaseMock.expects('findOne')
        .once()
        .withArgs({ beerId: beer.beerId }, collectionName)
        .returns(Promise.resolve(dbResult));

      BeerDataSource.getBeerById(beer.beerId)
        .then((res) => {
          expect(res).to.deep.equal(beer);
          done();
        })
        .catch(done);
    });

    it('should throw an error when read fails', (done) => {
      const expectedError = new Error('Something went wrong!');

      databaseMock.expects('findOne')
        .once()
        .withArgs({ beerId: beer.beerId }, collectionName)
        .returns(Promise.reject(expectedError));

      BeerDataSource.getBeerById(beer.beerId)
        .then(() => done(new Error('Expected error but not thrown')))
        .catch(() => done());
    });
  });

  context('#updateBeer', () => {
    it('should successfully update the given beer', (done) => {
      databaseMock.expects('update')
        .once()
        .withArgs({ beerId: beer.beerId }, beer, collectionName)
        .returns(Promise.resolve(dbResult));

      BeerDataSource.updateBeer(beer)
        .then((res) => {
          expect(res).to.deep.equal(beer);
          done();
        })
        .catch(done);
    });

    it('should throw an error when update fails', (done) => {
      const expectedError = new Error('Something went wrong!');

      databaseMock.expects('update')
        .once()
        .withArgs({ beerId: beer.beerId }, beer, collectionName)
        .returns(Promise.reject(expectedError));

      BeerDataSource.updateBeer(beer)
        .then(() => done(new Error('Expected error but not thrown')))
        .catch(() => done());
    });
  });

  context('#deleteBeer', () => {
    it('should successfully delete beer for given id', (done) => {
      databaseMock.expects('remove')
        .once()
        .withArgs({ beerId: beer.beerId }, collectionName)
        .returns(Promise.resolve());

      BeerDataSource.deleteBeer(beer.beerId)
        .then(() => done())
        .catch(done);
    });

    it('should throw an error when delete fails', (done) => {
      const expectedError = new Error('Something went wrong!');

      databaseMock.expects('remove')
        .once()
        .withArgs({ beerId: beer.beerId }, collectionName)
        .returns(Promise.reject(expectedError));

      BeerDataSource.deleteBeer(beer.beerId)
        .then(() => done(new Error('Expected error but not thrown')))
        .catch(() => done());
    });
  });
});