import express from 'express';

import imageController  from '../controllers/image';

const router = express.Router();

router.get('/:id', imageController.getImage);

export default router;