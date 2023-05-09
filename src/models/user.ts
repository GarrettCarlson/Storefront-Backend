import client from '../database';
import bcrypt from 'bcrypt';

if (process.env.SALT_ROUNDS === undefined) {
  throw new Error('Missing environment variable: SALT_ROUNDS');
}
if (process.env.PEPPER === undefined) {
  throw new Error('Missing environment variable: PEPPER');
}

const SALT_ROUNDS = process.env.SALT_ROUNDS as string;
const PEPPER = process.env.PEPPER as string;

export type User = {
  id: Number;
  firstName: string;
  lastName: string;
  password: string;
  password_digest: string;
};

export class UserStore {
  // CRUD operations
  // CREATE
  async create(u: User): Promise<User> {
    try {
      //@ts-ignore
      const sql =
        'INSERT INTO users (id, firstName, lastName, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
      const password_digest = bcrypt.hashSync(
        u.password + PEPPER,
        parseInt(SALT_ROUNDS)
      );
      const conn = await client.connect();
      const result = await conn.query(sql, [
        u.id,
        u.firstName,
        u.lastName,
        password_digest,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create user ${u.firstName}. Error: ${err}.`);
    }
  }
  // READ
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM users';
      const conn = await client.connect();
      const result = await conn.query(sql);
      const user = result.rows;
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not index users. Error: ${err}.`);
    }
  }
  async show(id: string): Promise<User> {
    try {
      //@ts-ignore
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not show user ${id}. Error: ${err}.`);
    }
  }
  // UPDATE
  async update(u: User): Promise<User> {
    try {
      //@ts-ignore
      const sql =
        'UPDATE users SET (firstName, lastName, password_digest) = ROW($2, $3, $4) WHERE id=($1) RETURNING *';
      const password_digest = bcrypt.hashSync(
        u.password + PEPPER,
        parseInt(SALT_ROUNDS)
      );
      const conn = await client.connect();
      const result = await conn.query(sql, [
        u.id,
        u.firstName,
        u.lastName,
        password_digest,
      ]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not update user ${u.firstName}. Error: ${err}.`);
    }
  }
  // DELETE - does not work if user has any orders associated
  async delete(id: string): Promise<User> {
    try {
      //@ts-ignore
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create user ${id}. Error: ${err}.`);
    }
  }
}
