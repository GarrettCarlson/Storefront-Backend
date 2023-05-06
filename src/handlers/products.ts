import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'

const store = new ProductStore()

// CRUD operations
// Create
const create = async (req: Request, res: Response) => {
    const newProduct = await store.create(req.body.product)
    res.json(newProduct)
}

// Read
const index = async (req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}

// Update
const update = async (req: Request, res: Response) => {
    const updatedProduct = await store.update(req.body.product)
    res.json(updatedProduct)
}

// Delete
const remove = async (req: Request, res: Response) => {
    const deletedProduct = await store.delete(req.params.id)
    res.json(deletedProduct)
}

// Build & Export routes
const product_routes = (app: express.Application) => {
    app.post('/products', create)
    app.get('/products', index)
    app.get('/products/:id', show)
    app.put('/products/:id', update)
    app.delete('/products/:id', remove)
}

export default product_routes;