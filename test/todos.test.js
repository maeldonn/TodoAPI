const request = require('supertest');
const { expect } = require('chai');

const todos = require('../src/api/todos/todos.model');
const app = require('../src/app');

let id = '';

describe('GET /api/v1/todos', () => {
  before(async () => {
    await todos.remove({});
  });

  it('should respond with an array', async () => {
    const response = await request(app)
      .get('/api/v1/todos')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(response.body));
  });
});

describe('GET /api/v1/todos/completed', () => {
  it('should respond with an array', async () => {
    const response = await request(app)
      .get('/api/v1/todos/completed')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(response.body));
  });
});

describe('GET /api/v1/todos/tocomplete', () => {
  it('should respond with an array', async () => {
    const response = await request(app)
      .get('/api/v1/todos/tocomplete')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(response.body.message));
  });
});

describe('POST /api/v1/todos/', () => {
  it('should require a title', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid todo title');
  });

  it('should not allow a invalid title', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({
        title: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid todo title');
  });

  it('should not allow a invalid completed field', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'New task created',
        completed: 'New task created',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid completed field');
  });

  it('should create a new completed todo', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'Task1',
        completed: true,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('completed');
    // eslint-disable-next-line no-underscore-dangle
    id = response.body._id;
  });

  it('should create a new to complete todo', async () => {
    const response = await request(app)
      .post('/api/v1/todos')
      .send({
        title: 'Task2',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('completed');
  });
});

describe('GET /api/v1/todos/:id', () => {
  it('should respond with a message error', async () => {
    const response = await request(app)
      .get('/api/v1/todos/aaaaaa')
      .expect('Content-Type', /json/)
      .expect(500);
    expect(response.body.message).to.equal('Please enter a valid id');
  });

  it('should respond with a todo', async () => {
    const response = await request(app)
      .get(`/api/v1/todos/${id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('completed');
  });
});

describe('PATCH /api/v1/todos/:id', () => {
  it('should respond with a message error', async () => {
    const response = await request(app)
      .patch('/api/v1/todos/aaaaaa')
      .expect('Content-Type', /json/)
      .expect(500);
    expect(response.body.message).to.equal('Please enter a valid id');
  });

  it('should not allow a invalid title', async () => {
    const response = await request(app)
      .patch(`/api/v1/todos/${id}`)
      .send({
        title: '',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid todo title');
  });

  it('should not allow a invalid completed field', async () => {
    const response = await request(app)
      .patch(`/api/v1/todos/${id}`)
      .send({
        completed: 'New task created',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422);
    expect(response.body.message).to.equal('Invalid completed field');
  });

  it('should respond with the modified todo', async () => {
    const response = await request(app)
      .patch(`/api/v1/todos/${id}`)
      .send({
        title: 'Task0',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202);
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('completed');
  });
  it('should respond with the modified todo', async () => {
    const response = await request(app)
      .patch(`/api/v1/todos/${id}`)
      .send({
        completed: false,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202);
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('completed');
  });
  it('should respond with the modified todo', async () => {
    const response = await request(app)
      .patch(`/api/v1/todos/${id}`)
      .send({
        title: 'Task1',
        completed: true,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(202);
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('completed');
  });
});

describe('DELETE /api/v1/todos/:id', () => {
  it('should respond with a message error', async () => {
    const response = await request(app)
      .patch('/api/v1/todos/aaaaaa')
      .expect('Content-Type', /json/)
      .expect(500);
    expect(response.body.message).to.equal('Please enter a valid id');
  });

  it('should respond with a message', async () => {
    const response = await request(app)
      .delete(`/api/v1/todos/${id}`)
      .expect('Content-Type', /json/)
      .expect(202);
    expect(response.body).to.have.property('n');
    expect(response.body).to.have.property('ok');
    expect(response.body.n).to.equal(1);
    expect(response.body.ok).to.equal(1);
  });
});

describe('DELETE /api/v1/todos/', () => {
  it('should delete all todos', async () => {
    const response = await request(app)
      .delete('/api/v1/todos')
      .expect('Content-Type', /json/)
      .expect(202);
    expect(response.body).to.have.property('n');
    expect(response.body).to.have.property('ok');
    expect(Number.isInteger(response.body.n));
    expect(response.body.ok).to.equal(1);
  });
});
