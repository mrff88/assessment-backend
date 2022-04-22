import mongoose from 'mongoose';

const { Schema, SchemaTypes } = mongoose;

const favsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, enter a title'],
    },
    description: {
      type: String,
      required: [true, 'Please, enter a description'],
    },
    link: {
      type: String,
      required: [true, 'Please, enter a link'],
    },
  },
  {
    _id: false,
  }
);

const favListSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please, enter a name for the list'],
  },
  ownerID: SchemaTypes.ObjectId,
  favs: [favsSchema],
});

const favList = mongoose.model('FavLists', favListSchema, 'favLists');

export default favList;
