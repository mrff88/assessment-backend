import axios from 'axios';

describe('Fav list test', () => {
  let token;
  let favListId;

  beforeAll(async () => {
    const login = await axios.post('http://localhost:5000/auth/local/login', {
      email: 'mrff88@gmail.com',
      password: 'Melanthios1088@',
    });

    const { token: tokenUser } = login.data;
    token = tokenUser;
  });

  it('Should create a fav list when provided with the correct data', async () => {
    const favList = {
      name: 'Movies',
      ownerID: '62632d1d46a06f2da9bd83db',
      favs: [
        {
          title: 'Independence day',
          description: "best sci-fy movie from the 90's",
          link: 'https://www.imdb.com/title/tt0116629/?ref_=nv_sr_srsg_0',
        },
        {
          title: 'Inception',
          description: 'My favorite Leonardo Di Caprio movie',
          link: 'https://www.imdb.com/title/tt1375666/?ref_=nv_sr_srsg_0',
        },
      ],
    };

    const url = 'http://localhost:5000/api/favs';

    const result = await axios.post(url, favList, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    favListId = result.data._id;

    expect(result.status).toEqual(201);
    expect(result.data).toBeDefined();
    expect(result.data.favs.length).toEqual(2);
  });

  it('Should throw error 403 when the token is not provided in the header of the request', async () => {
    const favList = {
      name: 'Movies',
      ownerID: '62632d1d46a06f2da9bd83db',
      favs: [
        {
          title: 'Independence day',
          description: "best sci-fy movie from the 90's",
          link: 'https://www.imdb.com/title/tt0116629/?ref_=nv_sr_srsg_0',
        },
        {
          title: 'Inception',
          description: 'My favorite Leonardo Di Caprio movie',
          link: 'https://www.imdb.com/title/tt1375666/?ref_=nv_sr_srsg_0',
        },
      ],
    };

    const url = 'http://localhost:5000/api/favs';
    try {
      await axios.post(url, favList);
    } catch (error) {
      expect(error.response.status).toEqual(403);
    }
  });

  it('Should throw error 400 when provided with an empty name for the fav list', async () => {
    const favList = {
      name: '',
      ownerID: '62632d1d46a06f2da9bd83db',
      favs: [
        {
          title: 'Independence day',
          description: "best sci-fy movie from the 90's",
          link: 'https://www.imdb.com/title/tt0116629/?ref_=nv_sr_srsg_0',
        },
        {
          title: 'Inception',
          description: 'My favorite Leonardo Di Caprio movie',
          link: 'https://www.imdb.com/title/tt1375666/?ref_=nv_sr_srsg_0',
        },
      ],
    };

    const url = 'http://localhost:5000/api/favs';
    try {
      await axios.post(url, favList, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.errors.name).toEqual(
        'Please, enter a name for the list'
      );
    }
  });

  it('Should throw error 400 when provided with an non existing owner id', async () => {
    const favList = {
      name: 'Movies',
      ownerID: '62632d1d46a06f2da9bd83dc',
      favs: [
        {
          title: 'Independence day',
          description: "best sci-fy movie from the 90's",
          link: 'https://www.imdb.com/title/tt0116629/?ref_=nv_sr_srsg_0',
        },
        {
          title: 'Inception',
          description: 'My favorite Leonardo Di Caprio movie',
          link: 'https://www.imdb.com/title/tt1375666/?ref_=nv_sr_srsg_0',
        },
      ],
    };

    const url = 'http://localhost:5000/api/favs';

    try {
      await axios.post(url, favList, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual("List's owner not found");
    }
  });

  it("Should get all of user's fav lists", async () => {
    const userId = '62632d1d46a06f2da9bd83db';
    const url = `http://localhost:5000/api/favs/users/${userId}`;

    const result = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(result.status).toEqual(200);
    expect(result.data.length).toBeGreaterThanOrEqual(0);
  });

  it('Should throw error 403 when the token is not provided in the header of the request', async () => {
    const userId = '62632d1d46a06f2da9bd83db';
    const url = `http://localhost:5000/api/favs/users/${userId}`;

    try {
      await axios.get(url);
    } catch (error) {
      expect(error.response.status).toEqual(403);
    }
  });

  it('Should throw error 400 when providing a non existing user id', async () => {
    const userId = '62632d1d46a06f2da9bd83dc';
    const url = `http://localhost:5000/api/favs/users/${userId}`;

    try {
      await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual("List's owner not found");
    }
  });

  it('Should get a fav list', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    const result = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(result.status).toEqual(200);
  });

  it('Should throw error 403 when the token is not provided in the header of the request', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    try {
      await axios.get(url);
    } catch (error) {
      expect(error.response.status).toEqual(403);
    }
  });

  it('Should throw error 404 when providing a non existing fav list id', async () => {
    const url = 'http://localhost:5000/api/favs/62632d1d46a06f2da9bd83dc';
    try {
      await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual('List not found');
    }
  });

  it('Should add items to a fav list', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    const items = [
      {
        title: 'Kung Fu Hustle',
        description: 'Favorite Stephen Chow movie',
        link: 'https://www.imdb.com/title/tt0373074/?ref_=nv_sr_srsg_0',
      },
      {
        title: 'Shaolin Soccer',
        description: '2nd favorite Stephen Chow movie',
        link: 'https://www.imdb.com/title/tt0286112/?ref_=fn_al_tt_1',
      },
    ];

    const result = await axios.put(url, items, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(result.status).toEqual(200);
    expect(result.data.favs.length).toEqual(4);
  });

  it('Should throw error 403 when the token is not provided in the header of the request', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    const items = [
      {
        title: 'Kung Fu Hustle',
        description: 'Favorite Stephen Chow movie',
        link: 'https://www.imdb.com/title/tt0373074/?ref_=nv_sr_srsg_0',
      },
      {
        title: 'Shaolin Soccer',
        description: '2nd favorite Stephen Chow movie',
        link: 'https://www.imdb.com/title/tt0286112/?ref_=fn_al_tt_1',
      },
    ];

    try {
      await axios.put(url, items);
    } catch (error) {
      expect(error.response.status).toEqual(403);
    }
  });

  it('Should throw error 404 when providing a non existing fav list id', async () => {
    const url = 'http://localhost:5000/api/favs/62632d1d46a06f2da9bd83db';

    const items = [
      {
        title: 'Kung Fu Hustle',
        description: 'Favorite Stephen Chow movie',
        link: 'https://www.imdb.com/title/tt0373074/?ref_=nv_sr_srsg_0',
      },
      {
        title: 'Shaolin Soccer',
        description: '2nd favorite Stephen Chow movie',
        link: 'https://www.imdb.com/title/tt0286112/?ref_=fn_al_tt_1',
      },
    ];

    try {
      await axios.put(url, items, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual('List not found');
    }
  });

  it('Should delete a fav list', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    const result = await axios.delete(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(result.data.deletedCount).toEqual(1);
  });

  it('Should throw error 403 when the token is not provided in the header of the request', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      expect(error.response.status).toEqual(403);
    }
  });

  it('Should throw error 404 when providing a non existing fav list id', async () => {
    const url = 'http://localhost:5000/api/favs/62632d1d46a06f2da9bd83dc';
    try {
      await axios.delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      expect(error.response.status).toEqual(404);
      expect(error.response.data.message).toEqual('List not found');
    }
  });
});
