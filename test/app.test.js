const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('GET /*/*', () => {
  it('should respond with a 404', async () => {
    const response = await request(app)
      .get('/jevhizrbvz/rfzefrzfz')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
    expect(response.body).to.have.property('message');
    expect(response.body).to.have.property('stack');
  });
});
