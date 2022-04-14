import { User } from '../models/index.js';

// create user
export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    res.status(201).json(newUser);
  } catch (error) {
    const errors = {};

    if (error.message.includes('user validation failed')) {
      Object.values(error.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
      return res.status(400).json({ errors });
    }

    res.status(500).json({ error });
  }
};
