const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('tardigram routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should sign up a user via POST', async() => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'dumb@derp.com',
        password: 'grblbrbl'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      email: 'dumb@derp.com',
    });
  });
});
