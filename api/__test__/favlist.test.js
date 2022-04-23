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

  it('Should create a fav list', async () => {
    const favList = {
      name: 'Movies',
      ownerID: '6263333b93115a4f27eea5ea',
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

  it('Should get a fav list', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    const result = await axios.get(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(result.status).toEqual(200);
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

  it('Should delete a fav list', async () => {
    const url = `http://localhost:5000/api/favs/${favListId}`;

    const result = await axios.delete(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(result.data.deletedCount).toEqual(1);
  });
});
