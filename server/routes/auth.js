// server/routes/auth.js

import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import multer from 'multer';

// Multer setup for profile picture upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', verifyToken, getProfile);
router.put('/profile/:id', verifyToken, upload.single('picture'), updateProfile);

export default router;
