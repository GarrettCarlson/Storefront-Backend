import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { User } from '../../models/user';

// Generate a JWT for endpoints requiring authentication
const TOKEN_SECRET: Secret = process.env.TOKEN_SECRET || '';
const testUser = {
  id: '777',
  firstName: 'King',
  lastName: 'Neptune',
  password_digest:
    'gaeorigjeorigjsroitgjoairjgoiaqwjrogijaerlotibghjsertrgasd...sdf.gs54587656',
};

const testToken = jwt.sign(testUser, TOKEN_SECRET);
const request = supertest(app);
const showUser = {
  id: 1,
  firstName: 'Spongebob',
  lastName: 'Squarepants',
  password_digest: 'aerghsertbhsdrtnhsetrn',
};
const createdUser: User = {
  id: 4,
  firstName: 'Eugene',
  lastName: 'Krabs',
  password: 'money',
  password_digest: '',
};

describe('User endpoint tests', () => {
  it('should return all users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${testToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(jasmine.any(Array));
  });

  it('should return a single user with the correct properties', async () => {
    const res = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${testToken}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(showUser);
  });

  it('should create a new user with the given input data', async () => {
    const payload = {
      user: createdUser,
    };

    const res = await request
      .post('/users')
      .set('Authorization', `Bearer ${testToken}`)
      .send(payload);

    expect(res.status).toEqual(200);
    const decodedBody = jwtDecode(res.body) as { user: User };
    expect(decodedBody.user.id).toEqual(createdUser.id);
    expect(decodedBody.user.firstName).toEqual(createdUser.firstName);
    expect(decodedBody.user.lastName).toEqual(createdUser.lastName);
  });
});
