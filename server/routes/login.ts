import express from 'express';

import loginController  from '../controllers/login';

const router = express.Router();

router.post('/login', loginController.login);

router.post('/signUp', loginController.signUp);

router.get('/logout', loginController.logout);

export default router