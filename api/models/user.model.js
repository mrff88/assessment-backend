import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

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

usersSchema.statics.verifyUsersCredentials = async function (email, password) {
  const result = {};
  // find user
  const users = await User.find({ email });
  result.userFound = !!users[0];
  // verify password
  result.passwordMatch = users[0]?.password === password;

  return result;
};

usersSchema.statics.jwt = function (email) {
  return jwt.sign({ email }, process.env.SECRET_KEY);
};

const User = mongoose.model('Users', usersSchema, 'users');

export default User;
