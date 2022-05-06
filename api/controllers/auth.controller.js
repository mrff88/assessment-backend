import { User } from '../models/index.js';

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ message: 'You need to send both email and password' });
  try {
    const { userFound, passwordMatch } = await User.verifyUsersCredentials(
      email,
      password
    );

    if (!userFound)
      return res.status(401).send({ message: 'Invalid email or password' });

    if (!passwordMatch)
      return res.status(401).send({ message: 'Invalid email or password' });

    return res.status(200).json({ token: User.jwt(email) });
  } catch (error) {
    res.status(500).json({ error });
  }
};
