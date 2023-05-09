import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const store = new OrderStore();

// JWT Authentication Middleware
const verifyAuthToken = async (req: Request, res: Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error(`Missing authentication header.`);
    }
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid JWT: ${err}`);
  }
};

// CRUD operations
// Create - REQUIRES TOKEN
const create = async (req: Request, res: Response) => {
  try {
    const newOrder = await store.create(req.body.order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(`Error creating order ${req.body.order}: ${err}`);
  }
};

// Read - REQUIRES TOKEN
const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(`Error indexing orders: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(`Error showing order ${req.params.id}: ${err}`);
  }
};

// Update - REQUIRES TOKEN
const update = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await store.update(req.body.order);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json(`Error updating order ${req.body.order}: ${err}`);
  }
};

// Delete - REQUIRES TOKEN
const remove = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(req.params.id);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(`Error deleting order ${req.params.id}: ${err}`);
  }
};

// Build & Export routes
const order_routes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', verifyAuthToken, remove);
};

export default order_routes;
