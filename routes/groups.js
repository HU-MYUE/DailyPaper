import express from 'express';
import { groupSearch, groupDelete, groupAdd, groupUpdate } from '../Controller/groups';

const router = express.Router();

router.get('/groupSearch', groupSearch);
router.get('/groupDelete', groupDelete);
router.get('/groupAdd', groupAdd);
router.get('/groupUpdate', groupUpdate);

module.exports = router;
