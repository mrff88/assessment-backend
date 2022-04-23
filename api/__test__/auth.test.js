import axios from 'axios';

describe('Auth tests', () => {
  it('Should return token with correct credentials', async () => {
    const login = await axios.post('http://localhost:5000/auth/local/login', {
      email: 'mrff88@gmail.com',
      password: 'Melanthios1088@',
    });

    const { token } = login.data;

    expect(login.status).toEqual(200);
    expect(token).toHaveLength(141);
  });
});
