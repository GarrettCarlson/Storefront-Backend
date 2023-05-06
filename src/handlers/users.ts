import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'

const store = new UserStore()

// CRUD operations
// Create
const create = async (req: Request, res: Response) => {
    const newUser = await store.create(req.body.user)
    res.json(newUser)
}

// Read
const index = async (req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}

// Update
const update = async (req: Request, res: Response) => {
    const updatedUser = await store.update(req.body.user)
    res.json(updatedUser)
}

// Delete
const remove = async (req: Request, res: Response) => {
    const deletedUser = await store.delete(req.params.id)
    res.json(deletedUser)
}

// Build & Export routes
const user_routes = (app: express.Application) => {
    app.post('/users', create)
    app.get('/users', index)
    app.get('/users/:id', show)
    app.put('/users/:id', update)
    app.delete('/users/:id', remove)
}

export default user_routes;