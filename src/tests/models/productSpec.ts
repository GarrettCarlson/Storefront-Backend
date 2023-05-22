import { Product, ProductStore } from '../../models/product';

describe('Product model tests', () => {
  // Create
  it('should create a new product with the given properties', async () => {
    const store = new ProductStore();
    const createdProduct = {
      id: 991,
      name: 'Reefblower',
      price: 998,
      category: 'Home & Garden',
    };
    const res = await store.create(createdProduct);
    expect(res).toEqual(createdProduct);
  });

  // Read - Index
  it('should show all products', async () => {
    const store = new ProductStore();
    const res = await store.index();
    expect(res).toEqual(jasmine.any(Array));
  });

  // Read - Show
  it('should show a single product with the given properties', async () => {
    const store = new ProductStore();
    const showProduct = {
      id: 1,
      name: 'Jellyfishing Net',
      price: 1.1,
      category: 'Sporting Goods',
    };
    const res = await store.show(String(showProduct.id));
    expect(res).toEqual(showProduct);
  });

  // Update
  it('should create a new product with the given properties', async () => {
    const store = new ProductStore();
    const updatedProduct = {
      id: 1,
      name: 'Jellyfishing Net',
      price: 1.2,
      category: 'Sporting Goods',
    };
    const res = await store.update(updatedProduct);
    expect(res).toEqual(updatedProduct);
  });

  // Delete
  it('should delete the product with the given id', async () => {
    const store = new ProductStore();
    const testProduct = {
      id: 1,
      name: 'Jellyfishing Net',
      price: 1.1,
      category: 'Sporting Goods',
    };
    const res = await store.delete(String(testProduct.id));
    expect(res.id).toEqual(testProduct.id);
  });
});
