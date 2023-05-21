import express, { Request, Response, RequestHandler } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';

const TOKEN_SECRET: Secret = process.env.TOKEN_SECRET || '';
const store = new UserStore();

// JWT Authentication Middleware
const verifyAuthToken: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
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
    const newUser = await store.create(req.body.user);
    let token = jwt.sign({ user: newUser }, TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`Error creating user ${req.body.user}: ${err}`);
  }
};

// Read - REQUIRES TOKEN
const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(`Error indexing users: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(`Error showing user ${req.params.id}: ${err}`);
  }
};

// Update - REQUIRES TOKEN
const update = async (req: Request, res: Response) => {
  try {
    const updatedUser = await store.update(req.body.user);
    res.json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json(`Error updating user ${req.body.user}: ${err}`);
  }
};

// Delete - REQUIRES TOKEN
const remove = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(`Error deleting user ${req.body.user}: ${err}`);
  }
};

// Build & Export routes
const user_routes = (app: express.Application) => {
  app.post('/users', verifyAuthToken, create);
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  //app.put('/users/:id', verifyAuthToken, update);
  //app.delete('/users/:id', verifyAuthToken, remove);
};

export default user_routes;
