import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

let authToken = '';
export default function authTest() {
  describe('POST request to /api/v1/auth/signup', () => {
    it('it should create a user and return a token', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'andela@test.com',
          firstName: 'Andela',
          lastName: 'Samuel',
          dept: 'Technical Services',
          password: 'password',
          passwordConfirmation: 'password',
          employeeCode: 'US006',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('it should return error message and a status 400 if there are validation errors', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send({
          email: 'andelacom',
          firstName: 'Andela',
          lastName: 'Samuel',
          dept: 'Technical Services',
          password: 'password',
          passwordConfirmation: 'password',
          employeeCode: 'US006',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('POST request to /api/v1/auth/login', () => {
    it('it should login the user and return a token', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'innocent@test.com',
          password: 'password',
        })
        .end((err, res) => {
          authToken = res.body.token; // eslint-disable-line prefer-destructuring
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('it should return error and 401 if the password is wrong', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'innocent@test.com',
          password: 'passworded',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('it should return error and 401 if the email is wrong', (done) => {
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'lovelteueue@test.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
}
const token = authToken;

export { token };
