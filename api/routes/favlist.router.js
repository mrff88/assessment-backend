import express from 'express';
import { favListCtrl } from '../controllers/index.js';
import { isAuthenticated } from '../middlewares/index.js';

const {
  createFavList,
  getAllFavLists,
  getFavlist,
  updateFavsInList,
  deleteFavList,
} = favListCtrl;

const router = express.Router();

const favListRoutes = {
  CREATE: '/favs',
  GET_ALL: '/favs/users/:ownerID',
  GET_ONE: '/favs/:id',
  UPDATE: '/favs/:id',
  DELETE: '/favs/:id',
};

router.post(favListRoutes.CREATE, isAuthenticated, createFavList);
router.get(favListRoutes.GET_ALL, isAuthenticated, getAllFavLists);
router.get(favListRoutes.GET_ONE, isAuthenticated, getFavlist);
router.put(favListRoutes.UPDATE, isAuthenticated, updateFavsInList);
router.delete(favListRoutes.DELETE, isAuthenticated, deleteFavList);

export default router;
