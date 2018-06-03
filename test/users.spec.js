import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';
import { token } from './auth.spec';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

export default function usersTest() {
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

  describe('POST request to /api/v1/users/requests', () => {
    it('it should create a request and return it', (done) => {
      chai.request(server)
        .post('/api/v1/users/requests')
        .set('x-access-token', token)
        .send({
          title: 'General repainting',
          description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
          duration: 8,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          done();
        });
    });

    it('it should return an error if token is not supplied', (done) => {
      chai.request(server)
        .post('/api/v1/users/requests')
        .send({
          title: 'General repainting',
          description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
          duration: 8,
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('GET request to /api/v1/users/requests', () => {
    it('Returns a status code of 200', (done) => {
      chai.request(server)
        .get('/api/v1/users/requests')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('Returns all requests of the logged in user', (done) => {
      chai.request(server)
        .get('/api/v1/users/requests')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.body).to.have.lengthOf.at.least(1);
          expect(res.body).to.be.an('array');
          done();
        });
    });

    it('Returns error if no token is supplied', (done) => {
      chai.request(server)
        .get('/api/v1/users/requests')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('GET request to /api/v1/users/requests/:requestId', () => {
    it('Returns the request with the given id', (done) => {
      chai.request(server)
        .get('/api/v1/users/requests/2')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('title');
          done();
        });
    });

    it('Returns error if the no token is provided', (done) => {
      chai.request(server)
        .get('/api/v1/users/requests/2')
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
      chai.request(server)
        .get('/api/v1/users/requests/20')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('PUT request to /api/v1/users/requests/:requestId', () => {
    it('it should update a requests and return it', (done) => {
      chai.request(server)
        .put('/api/v1/users/requests/2')
        .set('x-access-token', token)
        .send({
          title: 'Excellent Work',
          description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
          duration: 8,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('users_id', 2);
          expect(res.body).to.have.property('title');
          done();
        });
    });

    it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
      chai.request(server)
        .put('/api/v1/users/requests/20')
        .set('x-access-token', token)
        .send({
          title: 'General repainting',
          description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
          duration: 8,
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
}
