import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import * as dbMigrate from 'db-migrate';
import jwtDecode from 'jwt-decode';
import { User } from '../../models/user';

// Generate a JWT for endpoints requiring authentication
const TOKEN_SECRET: Secret = process.env.TOKEN_SECRET || '';
const testUser = {
  id: '666',
  firstName: 'Lucifer',
  lastName: 'the Magnanimous',
  password_digest:
    'gaeorigjeorigjsroitgjoairjgoiaqwjrogijaerlotibghjsertrgasd...sdf.gs54587656',
};

const testToken = jwt.sign(testUser, TOKEN_SECRET);
const request = supertest(app);

describe('User endpoint tests', () => {
  it('should return all users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${testToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(jasmine.any(Array));
  });

  it('should return a single user with the correct properties', async () => {
    const testUser = {
      id: 1,
      firstName: 'Spongebob',
      lastName: 'Squarepants',
      password_digest: 'aerghsertbhsdrtnhsetrn',
    };
    const res = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${testToken}`);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(testUser);
  });

  it('should create a new user with the given input data', async () => {
    const testUser: User = {
      id: 4,
      firstName: 'Eugene',
      lastName: 'Krabs',
      password: 'money',
      password_digest: '',
    };

    const payload = {
      user: testUser,
    };

    const res = await request
      .post('/users')
      .set('Authorization', `Bearer ${testToken}`)
      .send(payload);

    expect(res.status).toEqual(200);
    const decodedBody = jwtDecode(res.body) as { user: User };
    expect(decodedBody.user.id).toEqual(testUser.id);
    expect(decodedBody.user.firstName).toEqual(testUser.firstName);
    expect(decodedBody.user.lastName).toEqual(testUser.lastName);
  });
});
