import express from 'express';
import { getPaperListByGroup } from '../Controller/paper';

const router = express.Router();
const path = '/paper';
router.get(`${path}/getPaperList`, getPaperListByGroup);

export default router;
