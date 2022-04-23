import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ message: 'You need to send both email and password' });

  const user = await User.find({ email });
  const userFound = user[0];

  if (!userFound)
    return res.status(401).send({ message: 'Invalid email or password' });

  if (password !== userFound.password)
    return res.status(401).send({ message: 'Invalid email or password' });

  jwt.sign(
    { email: userFound.email },
    process.env.SECRET_KEY,
    (error, token) => {
      if (!error) {
        res.status(200).json({
          token,
        });
      } else {
        res.status(401).send();
      }
    }
  );
};
