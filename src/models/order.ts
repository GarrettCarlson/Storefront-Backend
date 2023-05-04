import client from "../database";

export type Order = {
    id: Number;
    user_id: Number;
    status: string;
}

export class OrderStore {
    // CRUD operations
    // CREATE
    async create(o: Order): Promise<Order> {
        try {
            //@ts-ignore
            const sql = 'INSERT INTO orders (id, user_id, status) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [o.id, o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not create order ${o.user_id}. Error: ${err}.`)
        }
    }
    // READ
    async index(): Promise<Order[]> {
        try {
            //@ts-ignore
            const sql = 'SELECT * FROM orders'
            const conn = await client.connect()
            const result = await conn.query(sql)
            const order = result.rows
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not index orders. Error: ${err}.`)
        }
    }
    async show(id: Number): Promise<Order> {
        try {
            //@ts-ignore
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not show order ${id}. Error: ${err}.`)
        }
    }
    // UPDATE
    async update(o: Order): Promise<Order> {
        try {
            //@ts-ignore
            const sql = 'UPDATE orders SET (user_id, status, category) = VALUES($2, $3) RETURNING * WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [o.id, o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not update order ${o.user_id}. Error: ${err}.`)
        }
    }
    // DELETE
    async delete(id: Number): Promise<Order> {
        try {
            //@ts-ignore
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not create order ${id}. Error: ${err}.`)
        }
    }
}