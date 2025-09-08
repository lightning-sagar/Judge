import express from 'express';
import { run } from '../Controller/submission.controller.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();
const cpUpload = upload.single('code');

router.post('/run',cpUpload,run)

export default router;