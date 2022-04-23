import mongoose from 'mongoose';
import validator from 'validator';

const { isEmail, isStrongPassword } = validator;

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please, enter an email'],
    validate: [isEmail, 'Please, enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please, enter a password'],
    validate: [
      isStrongPassword,
      'Please, enter a valid password (at least: 8 characters long, 1 lowercase, 1 uppercase, 1 number, 1 symbol)',
    ],
  },
});

const User = mongoose.model('Users', usersSchema, 'users');

export default User;
