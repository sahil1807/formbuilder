let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Testing for REST API REQUEST
/*
 TEST 1: Testing for get tickets api. Will return all the tickets
 */
describe('/GET ticket', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/ticket/getAllTickets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              done();
            });
      });
  });


/*
TEST 2: Testing for get tickets by type. Will return all the tickets with the type
 */
describe('/GET ticket by type', () => {
    it('it should GET all the books by type ServiceRequest', (done) => {
        chai.request(server)
            .get('/ticket/getTicketsByType/ServiceRequest')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});