const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('GET /api/v1/', () => {
  it('should respond with a message', async () => {
    const response = await request(app)
      .get('/api/v1/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.message).to.equal('API is working ✅');
  });
});
