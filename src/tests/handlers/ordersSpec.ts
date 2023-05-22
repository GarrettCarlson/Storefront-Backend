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

describe('Order endpoint tests', () => {
  // migrate the db down then up to set the database state
  // beforeAll(async () => {
  //   // run the test db up migration
  //   const dbm = await dbMigrate.getInstance(true);
  //   await dbm.silence(true);
  //   await dbm.up();
  // });

  // afterAll(async () => {
  //   // reset the db
  //   const dbm = await dbMigrate.getInstance(true);
  //   await dbm.silence(true);
  //   await dbm.reset();
  // });

  it('should return all orders for a given user_id', async () => {
    const orders = {
      order1: { id: 1, user_id: 1, status: 'pending' },
      order3: { id: 3, user_id: 1, status: 'pending' },
    };

    const res = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(orders.order1);
    expect(res.body[1]).toEqual(orders.order3);
  });
});
