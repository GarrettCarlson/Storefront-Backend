//@ts-ignore
import client from '../database';

export type Product = {
  id: Number;
  name: string;
  price: Number;
  category: string;
};

export class ProductStore {
  // CRUD operations
  // CREATE
  async create(p: Product): Promise<Product> {
    try {
      //@ts-ignore
      const sql =
        'INSERT INTO products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING *';
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [p.id, p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not create product ${p.name}. Error: ${err}.`);
    }
  }
  // READ
  async index(): Promise<Product[]> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM products';
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql);
      const product = result.rows;
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not index products. Error: ${err}.`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM products WHERE id=($1)';
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not show product ${id}. Error: ${err}.`);
    }
  }
  // UPDATE
  async update(p: Product): Promise<Product> {
    try {
      //@ts-ignore
      const sql =
        'UPDATE products SET (name, price, category) = ROW($2, $3, $4) WHERE id=($1) RETURNING *';
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [p.id, p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not update product ${p.name}. Error: ${err}.`);
    }
  }
  // DELETE
  async delete(id: string): Promise<Product> {
    try {
      //@ts-ignore
      const sql = 'DELETE FROM products WHERE id=($1)';
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not create product ${id}. Error: ${err}.`);
    }
  }
}
