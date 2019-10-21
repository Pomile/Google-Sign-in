import request from 'supertest';
import chai from 'chai';
import Browser from 'zombie';
import dotEnv from 'dotenv';
import '@babel/polyfill';
import http from 'http';
import app from '../index';

dotEnv.config();
const { GOOGLE_EMAIL, GOOGLE_PASS } = process.env;
const { expect } = chai;

describe('TEST SUITE', () => {
  const browser = new Browser();
  describe('GET /test', async () => {
    before(async () => {
      await http.createServer(app).listen(8000);
    });
    it('should test route', (done) => {
      request(app)
        .get('/api/v1/auth')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('/auth is a valid route');
          done();
        });
    });
    it('should login with google', (done) => {
      request(app)
        .get('/api/v1/auth/fake/google')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.user.displayName).to.equal('Ogedengbe Babatunde');
          done();
        });
    });
    it('should return 401 for authorize google login', (done) => {
      request(app)
        .get('/api/v1/auth/google/failure')
        .set('Accept', 'application/json')
        .expect(401)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.msg).to.equal('google auth failure');
          done();
        });
    });
  });
});
