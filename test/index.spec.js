import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';
import prepTable from '../src/controllers/data';
import authTest from './auth.spec';
import usersTest from './users.spec';
import adminTest from './admin.spec';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);
describe('Test Suite', () => {
  before(() => {
    // runs before all tests in this block
    prepTable();
  });

  describe('Root route, /api/v1/', () => {
    it('redirects to /api/v1/', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.redirect;
          expect(res).to.have.status(200);
          done();
        });
    });

    it('responds with status 200', (done) => {
      chai.request(server)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Sees the response body', (done) => {
      chai.request(server)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
  authTest();
  usersTest();
  adminTest();
});
