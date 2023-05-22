import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';

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

describe('Product endpoint tests', () => {
  it('should return all products', (done: DoneFn) => {
    request.get('/products').end((err, res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual(jasmine.any(Array));
      done();
    });
  });

  it('should return a single product with the correct product_id', async () => {
    const showProduct = {
      id: 1,
      name: 'Jellyfishing Net',
      price: 1.1,
      category: 'Sporting Goods',
    };
    const res = await request.get('/products/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(showProduct);
  });

  it('should create a new product with the given input data', async () => {
    const createdProduct = {
      id: 999,
      name: 'Striped Sweater',
      price: 998,
      category: 'Apparel',
    };
    const payload = {
      product: createdProduct,
    };
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${testToken}`)
      .send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(createdProduct);
  });
});
