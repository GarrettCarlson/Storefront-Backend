import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import * as dbMigrate from 'db-migrate';
import jwtDecode from 'jwt-decode';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';

if (process.env.SALT_ROUNDS === undefined) {
  throw new Error('Missing environment variable: SALT_ROUNDS');
}
if (process.env.PEPPER === undefined) {
  throw new Error('Missing environment variable: PEPPER');
}

const SALT_ROUNDS = process.env.SALT_ROUNDS as string;
const PEPPER = process.env.PEPPER as string;

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

describe('GET /users', () => {
  // migrate the db down then up to set the database state
  beforeAll(async () => {
    // run the test db up migration
    const dbm = dbMigrate.getInstance(true);
    dbm.silence(true);
    dbm.up();
  });

  afterAll(async () => {
    // reset the db
    const dbm = dbMigrate.getInstance(true);
    dbm.reset();
  });

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
      password_digest: ''
    };

    const expected_password_digest = bcrypt.hashSync(
      testUser.password + PEPPER,
      parseInt(SALT_ROUNDS)
    );

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
