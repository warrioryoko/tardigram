const pool = require('../lib/utils/pool');
const fs = require('fs');
const User = require('../lib/models/users');

describe('User model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('should insert a new user into the database', async() => {
    const user = await User.insert({
      email: 'derp@dumb.com',
      passwordHash: 'grblbrbl'
    });

    expect(user.toJSON()).toEqual({
      is: expect.any(String),
      email: 'derp@dumb.com'
    });
  });
});
