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

favListSchema.statics.addFavList = function (favList) {
  return FavList.create(favList);
};

favListSchema.statics.findAllFavLists = function (ownerId) {
  return FavList.find({ ownerID: ownerId });
};

favListSchema.statics.findFavList = function (listId) {
  return FavList.findById(listId);
};

favListSchema.statics.addItemsToFavList = function (listToUpdate, itemsToAdd) {
  listToUpdate.favs = [...listToUpdate.favs, ...itemsToAdd];
  return listToUpdate.save();
};

favListSchema.statics.removeFavList = function (listToDelete) {
  return FavList.deleteOne(listToDelete);
};

const FavList = mongoose.model('FavLists', favListSchema, 'favLists');

export default FavList;
