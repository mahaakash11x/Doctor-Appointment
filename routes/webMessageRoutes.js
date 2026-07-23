import express from 'express';
import { createWebMessage, deleteWebMessage, getAllMessages } from '../controllers/webMessageController.js';

const router = express.Router();


//CREATE MESSAGE|| POST

router.post('/create',createWebMessage);

//GET ALL MESSAGES || GET

router.get('/getall',getAllMessages);

//DELETE MESSAGE || DELETE

router.delete('/delete/:id',deleteWebMessage);

export default router;