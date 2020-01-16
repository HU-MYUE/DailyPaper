import express from 'express';
import { userToken, userSearch, userPassword } from '../Controller/users';

const router = express.Router();

router.post('/search', userSearch);
router.get('/user/login', userToken);
router.get('/encryption', userPassword);

export default router;