
import * as dbMigrate from 'db-migrate';
import { Order, OrderStore } from '../../models/order';

describe('Order model tests', () => {
    // Create
    it('should create a new order with the given properties', async () => {
        const store = new OrderStore();
        const testOrder = {
            id: 998,
            user_id: 1,
            status: 'pending'
          };
        const res = await store.create(testOrder);
        expect(res).toEqual(testOrder);
    });

    // Read - Index
    it('should show all orders', async () => {
        const store = new OrderStore();
        const res = await store.index();
        expect(res).toEqual(jasmine.any(Array));
    });

    // Read - Show
    it('should show a single order with the given id', async () => {
        const store = new OrderStore();
        const testOrder = {
            id: 1,
            user_id: 1,
            status: 'pending'
          };
        const res = await store.show(String(testOrder.id));
        expect(res).toEqual(testOrder);
    });

    // Update
    it('should update an existing order with the given properties', async () => {
        const store = new OrderStore();
        const updatedOrder = {
            id: 1,
            user_id: 1,
            status: 'complete'
          };
        const res = await store.update(updatedOrder);
        expect(res).toEqual(updatedOrder);
    });

    // Delete
    it('should delete the order with the given id', async () => {
        const store = new OrderStore();
        const deletedOrder = {
            id: 2,
            user_id: 2,
            status: 'pending'
          };;
        const res = await store.delete(String(deletedOrder.id));
        expect(res).toEqual(deletedOrder);
    });
  });