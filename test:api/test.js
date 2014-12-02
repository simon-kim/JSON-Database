var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../server');

var expect = chai.expect;

describe('Simple JSON DB', function() {
  it('should be able to create a new drink', function(done) {
    chai.request('http://localhost:3000')
    .post('/Laphroaig')
    .send({
      drink: 'Laphroaig',
      kind: 'Whisky'
    })
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.drink).to.eql('Laphroaig');
      expect(res.body.kind).to.eql('Whisky');
      done();
    });
  });

  it('should receive a specific drink', function(done) {
    chai.request('http://localhost:3000')
    .get('/Laphroaig')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.kind).to.eql('Whisky');
      done();
    });
  });
});
