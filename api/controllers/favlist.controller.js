import { FavList, User } from '../models/index.js';
import errorMessageHandler from '../utils/errorMessageHandler.js';

// Create new list POST
export const createFavList = async (req, res) => {
  const { ownerID } = req.body;

  try {
    const userFound = await User.findUser(ownerID);
    if (!userFound)
      return res.status(400).json({ message: "List's owner not found" });
    const newFavList = await FavList.addFavList(req.body);
    res.status(201).json(newFavList);
  } catch (error) {
    const errors = errorMessageHandler(error);

    if (errors) {
      return res.status(400).json({ errors });
    }

    res.status(500).json({ error });
  }
};

// Get all of the user's lists GET
export const getAllFavLists = async (req, res) => {
  const { ownerID } = req.params;

  try {
    const userFound = await User.findUser(ownerID);
    if (!userFound)
      return res.status(400).json({ message: "List's owner not found" });

    const favLists = await FavList.findAllFavLists(ownerID);
    if (favLists.length === 0) res.status(204).send();
    else res.status(200).json(favLists);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get an individual lists GET
export const getFavlist = async (req, res) => {
  const { id: listId } = req.params;

  try {
    const foundList = await FavList.findFavList(listId);
    if (!foundList) res.status(404).json({ message: 'List not found' });
    else res.status(200).json(foundList);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Add items to a given list PUT
export const updateFavsInList = async (req, res) => {
  const favsToAdd = req.body;
  const { id: listId } = req.params;

  try {
    const foundList = await FavList.findFavList(listId);
    if (!foundList) return res.status(404).json({ message: 'List not found' });
    const listSaved = await FavList.addItemsToFavList(foundList, favsToAdd);
    if (listSaved) res.status(200).json(listSaved);
    else res.status(400).json({ message: 'Error saving items to lists' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete a list of favs DELETE
export const deleteFavList = async (req, res) => {
  const { id: listId } = req.params;

  try {
    const listToDelete = await FavList.findFavList(listId);
    if (!listToDelete)
      return res.status(404).json({ message: 'List not found' });
    const deletedList = await FavList.removeFavList(listToDelete);
    res.status(200).json(deletedList);
  } catch (error) {
    res.status(500).json({ error });
  }
};
