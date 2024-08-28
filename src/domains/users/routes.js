import express from 'express';
import controllers from '../users/controllers.js';

const router = express();


router.put('/login', controllers.refreshToken);
// router.post('/', controllers.create);
router.put('/:userId', controllers.update);
router.get('/', controllers.find);
router.get('/:userId', controllers.get);
router.delete('/:userId', controllers.remove);

export default router;