describe.only('promises', () => {
  it('promise.all', (done) => {

    const p1 = Promise.resolve({ field: 'value1'});
    const p2 = Promise.resolve({ field: 'value2'});
    const p3 = Promise.resolve({ field: 'value3'});
    const p4 = Promise.resolve({ field: 'value4'});

    const pIn = Promise.all([ p3, p4 ]);

    Promise.all([ p1, p2, pIn ])
      .then((res) => {
        console.log(res);

        const flatArray = [].concat( ...res );
        console.log(flatArray);

        const redArray = res.reduce((accumulator, item) => accumulator.concat(item), []);
        console.log(redArray);
        done();
      })
      .catch(done);
  });
});
