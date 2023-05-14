import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import test from '../../database.json';
import * as dbMigrate from 'db-migrate';

// Generate a JWT for endpoints requiring authentication
const TOKEN_SECRET: Secret = process.env.TOKEN_SECRET || '';
const testUser = {
  id: '666',
  firstName: 'Lucifer',
  lastName: 'the Magnanimous',
  password_digest:
    'gaeorigjeorigjsroitgjoairjgoiaqwjrogijaerlotibghjsertrgasd...sdf.gs54587656',
};

const token = jwt.sign(testUser, TOKEN_SECRET);

const request = supertest(app);
describe('GET /products', () => {
  // migrate the db down then up to set the database state
  beforeAll(async () => {
    // run the test db up migration
    const dbm = dbMigrate.getInstance(true);
    dbm.up('products');
  });

  afterAll(async () => {
    // reset the db
    const dbm = dbMigrate.getInstance(true);
    dbm.reset();
  });

  it('should return all products', (done: DoneFn) => {
    request.get('/products').end((err, res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(jasmine.any(Array));
      done();
    });
  });

  it('should return a single product with the correct product_id', (done: DoneFn) => {
    request.get('/products/1').end((err, res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(jasmine.any(Array));
      expect(res.body.length).toBe(1);
      done();
    });
  });
});

describe('POST /products', () => {
  it('should create a new product with the given input data', async () => {
    const newProduct = {
      id: 999,
      name: 'Product_999',
      price: 998,
      category: 'General 9',
    };
    const payload = {
      newProduct,
      token,
    };
    const res = await request.post('/products').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newProduct);
  });
});
