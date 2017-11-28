'use strict';

const Promise = require('bluebird');

const BeerService = require('../../../../lib/services/beer');
const BeerDataSource = require('../../../../lib/datasource/beer');

describe('BeerService', () => {
  let beerDataSourceMock;

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
    beerDataSourceMock = sinon.mock(BeerDataSource);
  });

  afterEach(() => {
    beerDataSourceMock.verify();
    this.sandbox.restore();
  });

  context('#createBeer', () => {
    it('should successfully create a new beer', (done) => {
      beerDataSourceMock.expects('insertBeer')
          .once()
          .withArgs(beer)
          .returns(Promise.resolve(beer));

      BeerService.createBeer(beer)
        .then((res) => {
          expect(res).to.equal(beer);
          done();
        })
        .catch(done);
    });

    it('should throw an error when there is an error in the data source', (done) => {
      beerDataSourceMock.expects('insertBeer')
        .once()
        .withArgs(beer)
        .returns(Promise.reject(new Error('Something went wrong!')));

      BeerService.createBeer(beer)
        .then(() => done(new Error('Error expected but not thrown')))
        .catch(() => done());
    });
  });

  context('#getBeerById', () => {
    const beerId = 'some-uuid';
    it('should successfully a beer when given its id', (done) => {
      beerDataSourceMock.expects('getBeerById')
        .once()
        .withArgs(beerId)
        .returns(Promise.resolve(beer));

      BeerService.getBeerById(beerId)
        .then((res) => {
          expect(res).to.equal(beer);
          done();
        })
        .catch(done);
    });

    it('should throw an error when there is an error in the data source', (done) => {
      beerDataSourceMock.expects('getBeerById')
        .once()
        .withArgs(beerId)
        .returns(Promise.reject(new Error('Something went wrong!')));

      BeerService.getBeerById(beerId)
        .then(() => done(new Error('Error expected but not thrown')))
        .catch(() => done());
    });
  });

  context('#updateBeer', () => {
    it('should successfully update a beer', (done) => {
      beerDataSourceMock.expects('updateBeer')
        .once()
        .withArgs(beer)
        .returns(Promise.resolve(beer));

      BeerService.updateBeer(beer)
        .then((res) => {
          expect(res).to.equal(beer);
          done();
        })
        .catch(done);
    });

    it('should throw an error when there is an error in the data source', (done) => {
      beerDataSourceMock.expects('updateBeer')
        .once()
        .withArgs(beer)
        .returns(Promise.reject(new Error('Something went wrong!')));

      BeerService.updateBeer(beer)
        .then(() => done(new Error('Error expected but not thrown')))
        .catch(() => done());
    });
  });

  context('#updateBeer', () => {
    const beerId = 'some-uuid';
    it('should successfully delete a beer', (done) => {
      beerDataSourceMock.expects('deleteBeer')
        .once()
        .withArgs(beerId)
        .returns(Promise.resolve());

      BeerService.deleteBeer(beerId)
        .then(() => done())
        .catch(done);
    });

    it('should throw an error when there is an error in the data source', (done) => {
      beerDataSourceMock.expects('deleteBeer')
        .once()
        .withArgs(beerId)
        .returns(Promise.reject(new Error('Something went wrong!')));

      BeerService.deleteBeer(beerId)
        .then(() => done(new Error('Error expected but not thrown')))
        .catch(() => done());
    });
  });
});