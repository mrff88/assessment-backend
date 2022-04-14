import express from 'express';
import { userCtrl } from '../controllers/index.js';

const { createUser } = userCtrl;

const router = express.Router();

const userRoutes = {
  CREATE: '/users/create',
};

router.post(userRoutes.CREATE, createUser);

export default router;
