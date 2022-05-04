import { User } from '../models/index.js';
import errorMessageHandler from '../utils/errorMessageHandler.js';

// create user
export const createUser = async (req, res) => {
  try {
    const newUser = await User.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    const errors = errorMessageHandler(error);

    if (errors) {
      return res.status(400).json({ errors });
    }

    res.status(500).json({ error });
  }
};
