
import * as dbMigrate from 'db-migrate';
import { Product, ProductStore } from '../../models/product';

describe('Product model tests', () => {
    // Create
    it('should create a new product with the given properties', async () => {
        const store = new ProductStore();
        const testProduct = {
            id: 998,
            name: 'Product_998',
            price: 998,
            category: 'Very Special',
          };
        const res = await store.create(testProduct);
        expect(res).toEqual(testProduct);
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
        const testProduct = {
            id: 1,
            name: 'Product_1',
            price: 1.1,
            category: 'General',
          };
        const res = await store.show(String(testProduct.id));
        expect(res).toEqual(testProduct);
    });

    // Update
    it('should create a new product with the given properties', async () => {
        const store = new ProductStore();
        const updatedProduct = {
            id: 1,
            name: 'Product_1',
            price: 1.2,
            category: 'General',
          };
        const res = await store.update(updatedProduct);
        expect(res).toEqual(updatedProduct);
    });

    // Delete
    it('should delete the product with the given id', async () => {
        const store = new ProductStore();
        const testProduct = {
            id: 1,
            name: 'Product_1',
            price: 1.1,
            category: 'General',
          };
        const res = await store.delete(String(testProduct.id));
        expect(res.id).toEqual(testProduct.id);
    });
  });