import express from 'express';
import controllers from '../categories/controller.js';

const router = express();

router.post('/', controllers.create);
router.put('/:categoryId', controllers.update);
router.get('/:userId', controllers.get);
router.get('/', controllers.find);
router.delete('/:categoryId', controllers.remove);

export default router;