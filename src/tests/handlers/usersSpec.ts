import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import * as dbMigrate from 'db-migrate';
import jwtDecode from 'jwt-decode';

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
    // dbm.silence(true);
    dbm.up();
  });

  afterAll(async () => {
    // reset the db
    const dbm = dbMigrate.getInstance(true);
    // dbm.silence(true);
    dbm.reset();
  });

  it('should return all users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${testToken}`);
          expect(res.status).toBe(200);
          expect(res.body).toEqual(jasmine.any(Array));
      });

  it('should return a single user with the correct properties', (done: DoneFn) => {
    const testUser = {
      id: 1,
      firstname: 'Spongebob',
      lastname: 'Squarepants',
      password_digest: 'aerghsertbhsdrtnhsetrn',
    };
    request
      .get('/users/1')
      .set('Authorization', `Bearer ${testToken}`)
      .end((err, res) => {
        try {
          expect(err).toBeNull();
          expect(res.status).toEqual(200);
          expect(res.body).toEqual(testUser);
          done();
        } catch (err) {
          done.fail(`${err}`);
        }
      });
  });
});

describe('POST /users', () => {
  // migrate the db down then up to set the database state
  beforeAll(async () => {
    // run the test db up migration
    const dbm = dbMigrate.getInstance(true);
    //dbm.silence(true);
    dbm.up();
  });

  afterAll(async () => {
    // reset the db
    const dbm = dbMigrate.getInstance(true);
    //dbm.silence(true);
    dbm.reset();
  });

  it('should create a new user with the given input data', async () => {
    const testUser = {
      id: 4,
      firstName: 'Eugene',
      lastName: 'Krabs',
      password_digest: 'aerghsertbhsdraffastnhsetrn',
    };
    const expectedToken = jwt.sign({ user: testUser }, TOKEN_SECRET);
    const payload = {
      user: testUser,
    };

    const res = await request
      .post('/users')
      .send(payload)
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toEqual(200);
    const decodedBody = jwtDecode(res.body);
    expect(decodedBody).toEqual(payload);
    console.log(decodedBody);
  });
});
