import { Order, OrderStore } from '../../models/order';

describe('Order model tests', () => {
  // Create
  it('should create a new order with the given properties', async () => {
    const store = new OrderStore();
    const createdOrder = {
      id: 998,
      user_id: 1,
      status: 'pending',
    };
    const res = await store.create(createdOrder);
    expect(res).toEqual(createdOrder);
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
    const showOrder = {
      id: 1,
      user_id: 1,
      status: 'pending',
    };

    const res = await store.show(String(showOrder.id));
    expect(res).toEqual(showOrder);
  });

  // Update
  it('should update an existing order with the given properties', async () => {
    const store = new OrderStore();
    const updatedOrder = {
      id: 1,
      user_id: 1,
      status: 'complete',
    };
    const res = await store.update(updatedOrder);
    expect(res).toEqual(updatedOrder);
  });

  it('should add a product to an existing order', async () => {
    const store = new OrderStore();
    const updatedOrder = {
      id: '1',
      user_id: 1,
      status: 'complete',
    };
    const addedProduct = {
      id: '2',
      name: '#1 Hat',
      price: 1.1,
      category: 'Apparel',
    };
    const quantityAdded = 1;
    const res = await store.addProduct(
      updatedOrder.id,
      addedProduct.id,
      quantityAdded
    );
    expect(res.order_id).toEqual(updatedOrder.id as unknown as number);
    expect(res.product_id).toEqual(addedProduct.id as unknown as number);
    expect(res.quantity).toEqual(quantityAdded);
  });

  // Delete
  it('should delete the order with the given id', async () => {
    const store = new OrderStore();
    const deletedOrder = {
      id: 2,
      user_id: 2,
      status: 'pending',
    };
    const res = await store.delete(String(deletedOrder.id));
    expect(res).toEqual(deletedOrder);
  });
});
