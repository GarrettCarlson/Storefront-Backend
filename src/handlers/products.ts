import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = process.env.TOKEN_SECRET
const store = new ProductStore()

// JWT Authentication Middleware
const verifyAuthToken = async (req: Request, res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw new Error(`Missing authentication header.`)
        }
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, TOKEN_SECRET)
        next()
    } catch (err) {
        res.status(401)
        res.json(`Invalid JWT: ${err}`)
    }
}

// CRUD operations
// Create - REQUIRES TOKEN
const create = async (req: Request, res: Response) => {
    try {
        const newProduct = await store.create(req.body.product)
        res.json(newProduct)
    } catch (err) {
        res.status(400)
        res.json(`Error creating product ${req.body.product}: ${err}`)
    }
}

// Read
const index = async (req: Request, res: Response) => {
    try {
    const products = await store.index()
        res.json(products)
    } catch (err) {
        res.status(400)
        res.json(`Error indexing products: ${err}`)
    }
}

const show = async (req: Request, res: Response) => {
    try {
    const product = await store.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.status(400)
        res.json(`Error showing product ${req.params.id}: ${err}`)
    }
}

// Update - REQUIRES TOKEN
const update = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await store.update(req.body.product)
        res.json(updatedProduct)
    } catch (err) {
        res.status(400)
        res.json(`Error updating product ${req.body.product}: ${err}`)
    }
}

// Delete - REQUIRES TOKEN
const remove = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await store.delete(req.params.id)
        res.json(deletedProduct)
    } catch (err) {
        res.status(400)
        res.json(`Error deleting product ${req.params.id}: ${err}`)
    }
}

// Build & Export routes
const product_routes = (app: express.Application) => {
    app.post('/products', verifyAuthToken, create)
    app.get('/products', index)
    app.get('/products/:id', show)
    app.put('/products/:id', verifyAuthToken, update)
    app.delete('/products/:id', verifyAuthToken, remove)
}

export default product_routes;