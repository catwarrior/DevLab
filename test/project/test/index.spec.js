import MongoTest from './../src/index';
import chai from 'chai'
global.expect = chai.expect

const mongoAddr = process.env.MONGODB_PORT_27017_TCP_ADDR;
const mongoPort = process.env.MONGODB_PORT_27017_TCP_PORT;

const mongo = new MongoTest(`mongodb://${mongoAddr}:${mongoPort}/test`);
mongo.collection = 'test';

describe('MongoTest', () => {
  describe('execute', () => {
    before(done => {
      mongo.createCollection()
        .then(() => done())
        .catch(done);
    });

    it('executes a method with args supplied', done => {
      mongo.execute('stats')
        .then(res => {
          expect(res).to.be.an.object;
          done();
        })
        .catch(done);
    });
  });
});
