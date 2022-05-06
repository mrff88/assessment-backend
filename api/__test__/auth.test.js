import axios from 'axios';

describe('Auth tests', () => {
  it('Should return token when provided with the correct credentials', async () => {
    const login = await axios.post('http://localhost:5000/auth/local/login', {
      email: 'mrff88@gmail.com',
      password: 'Melanthios1088@',
    });

    const { token } = login.data;

    expect(login.status).toEqual(200);
    expect(token).toHaveLength(141);
  });

  it('Should throw error 400 when provided with empty email and/or pasword', async () => {
    try {
      await axios.post('http://localhost:5000/auth/local/login', {
        email: '',
        password: '',
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual(
        'You need to send both email and password'
      );
    }
  });

  it('Should throw error 401 when provided with an invalid email', async () => {
    try {
      await axios.post('http://localhost:5000/auth/local/login', {
        email: 'mrff@gmail.com',
        password: 'Melanthios1088@',
      });
    } catch (error) {
      expect(error.response.status).toEqual(401);
      expect(error.response.data.message).toEqual('Invalid email or password');
    }
  });

  it('Should throw error 401 when provided with an invalid password', async () => {
    try {
      await axios.post('http://localhost:5000/auth/local/login', {
        email: 'mrff88@gmail.com',
        password: 'Melanthios1089@',
      });
    } catch (error) {
      expect(error.response.status).toEqual(401);
      expect(error.response.data.message).toEqual('Invalid email or password');
    }
  });
});
