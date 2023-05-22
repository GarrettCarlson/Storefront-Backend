import { User, UserStore } from '../../models/user';

describe('User model tests', () => {
  // Create
  it('should create a new user with the given properties', async () => {
    const store = new UserStore();
    const testUser = {
      id: 998,
      firstName: 'Larry',
      lastName: 'the Lobster',
      password: 'asdfasdf',
      password_digest: '',
    };
    const res = await store.create(testUser);
    expect(res.id).toEqual(testUser.id);
    expect(res.firstName).toEqual(testUser.firstName);
    expect(res.lastName).toEqual(testUser.lastName);
  });

  // Read - Index
  it('should show all users', async () => {
    const store = new UserStore();
    const res = await store.index();
    expect(res).toEqual(jasmine.any(Array));
  });

  // Read - Show
  it('should show a single user with the given id', async () => {
    const store = new UserStore();
    const testUser = {
      id: 1,
      firstName: 'Spongebob',
      lastName: 'Squarepants',
      password: 'asdfasdf',
      password_digest: '',
    };
    const res = await store.show(String(testUser.id));
    expect(res.id).toEqual(testUser.id);
    expect(res.firstName).toEqual(testUser.firstName);
    expect(res.lastName).toEqual(testUser.lastName);
  });

  // Update
  it('should update an existing user with the given properties', async () => {
    const store = new UserStore();
    const updatedUser = {
      id: 998,
      firstName: 'Pearl',
      lastName: 'Krabs',
      password: 'asdfasdf',
      password_digest: '',
    };
    const res = await store.update(updatedUser);
    expect(res.id).toEqual(updatedUser.id);
    expect(res.firstName).toEqual(updatedUser.firstName);
    expect(res.lastName).toEqual(updatedUser.lastName);
  });

  // Delete
  it('should delete the user with the given id', async () => {
    const store = new UserStore();
    const deletedUser = {
      id: 2,
      firstName: 'Patrick',
      lastName: 'Star',
      password: 'asdfasdf',
      password_digest: '',
    };
    const res = await store.delete(String(deletedUser.id));
    expect(res.id).toEqual(deletedUser.id);
  });
});
