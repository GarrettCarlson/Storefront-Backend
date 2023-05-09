import client from '../database';

export type Order = {
  id: Number;
  user_id: Number;
  status: string;
};

export class OrderStore {
  // CRUD operations
  // CREATE
  async create(o: Order): Promise<Order> {
    try {
      //@ts-ignore
      const sql =
        'INSERT INTO orders (id, user_id, status) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.id, o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order ${o.user_id}. Error: ${err}.`);
    }
  }
  // READ
  async index(): Promise<Order[]> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM orders';
      const conn = await client.connect();
      const result = await conn.query(sql);
      const order = result.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not index orders. Error: ${err}.`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not show order ${id}. Error: ${err}.`);
    }
  }
  async showByUserId(user_id: string): Promise<Order[]> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM orders WHERE user_id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [user_id]);
      const order = result.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not show order ${user_id}. Error: ${err}.`);
    }
  }
  // UPDATE
  async update(o: Order): Promise<Order> {
    try {
      //@ts-ignore
      const sql =
        'UPDATE orders SET (user_id, status) = ((SELECT id FROM users WHERE id = $2 LIMIT 1), $3) WHERE id=($1) AND EXISTS (SELECT 1 FROM users WHERE id=$2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.id, o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not update order ${o.user_id}. Error: ${err}.`);
    }
  }
  // DELETE
  async delete(id: string): Promise<Order> {
    try {
      //@ts-ignore
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order ${id}. Error: ${err}.`);
    }
  }
}
