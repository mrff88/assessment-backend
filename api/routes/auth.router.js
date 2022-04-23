import express from 'express';
import { authCtrl } from '../controllers/index.js';

const { login } = authCtrl;

const router = express.Router();

const authRoutes = {
  LOGIN: '/local/login',
};

router.post(authRoutes.LOGIN, login);

export default router;
