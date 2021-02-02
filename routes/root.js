import express from 'express';
import * as root from '../controllers/root.js';

const router = express.Router();

router.get('/', root.root);

export default router;