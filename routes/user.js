import express from 'express';
import * as user from '../controllers/user.js';

const router = express.Router();

router.get('/register', user.register);
router.post('/register', user.registerNew);

export default router;