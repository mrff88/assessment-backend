import axios from 'axios';

describe('User tests', () => {
  it('Should create a user', async () => {
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
});
