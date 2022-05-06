import axios from 'axios';

describe('User tests', () => {
  it('Should create a user when provided with a valid email and password', async () => {
    const user = {
      email: 'mrff88@gmail.com',
      password: 'Melanthios1088@',
    };

    const url = 'http://localhost:5000/api/users/create';

    const result = await axios.post(url, user);

    expect(result.data).toBeDefined();
    expect(result.status).toEqual(201);
    expect(result.data.email).toEqual('mrff88@gmail.com');
    expect(result.data.password).toEqual('Melanthios1088@');
  });

  it('Should throw error 400 when provided with an empty email', async () => {
    const user = {
      email: '',
      password: 'Melanthios1088@',
    };

    const url = 'http://localhost:5000/api/users/create';
    try {
      await axios.post(url, user);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.errors.email).toEqual(
        'Please, enter an email'
      );
    }
  });

  it('Should throw error 400 when provided with an invalid email', async () => {
    const user = {
      email: 'mrff88gmail',
      password: 'Melanthios1088@',
    };

    const url = 'http://localhost:5000/api/users/create';
    try {
      await axios.post(url, user);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.errors.email).toEqual(
        'Please, enter a valid email'
      );
    }
  });

  it('Should throw error 400 when provided with an empty password', async () => {
    const user = {
      email: 'mrff88@gmail.com',
      password: '',
    };

    const url = 'http://localhost:5000/api/users/create';
    try {
      await axios.post(url, user);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.errors.password).toEqual(
        'Please, enter a password'
      );
    }
  });

  it('Should throw error 400 when provided with an invalid/weak password', async () => {
    const user = {
      email: 'mrff88@gmail.com',
      password: 'Melanthios1088',
    };

    const url = 'http://localhost:5000/api/users/create';
    try {
      await axios.post(url, user);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.errors.password).toEqual(
        'Please, enter a valid password (at least: 8 characters long, 1 lowercase, 1 uppercase, 1 number, 1 symbol)'
      );
    }
  });
});
