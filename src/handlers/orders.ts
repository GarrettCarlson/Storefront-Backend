import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

const store = new OrderStore()

// CRUD operations
// Create
const create = async (req: Request, res: Response) => {
    const newOrder = await store.create(req.body.order)
    res.json(newOrder)
}

// Read
const index = async (req: Request, res: Response) => {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.id)
    res.json(order)
}

// Update
const update = async (req: Request, res: Response) => {
    const updatedOrder = await store.update(req.body.order)
    res.json(updatedOrder)
}

// Delete
const remove = async (req: Request, res: Response) => {
    const deletedOrder = await store.delete(req.params.id)
    res.json(deletedOrder)
}

// Build & Export routes
const order_routes = (app: express.Application) => {
    app.post('/orders', create)
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.put('/orders/:id', update)
    app.delete('/orders/:id', remove)
}

export default order_routes;