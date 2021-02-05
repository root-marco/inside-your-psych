import express from 'express';
import * as user from '../controllers/user.js';

const router = express.Router();

router.get('/');

export default router;