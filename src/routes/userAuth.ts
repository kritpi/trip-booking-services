import { Router } from 'express';
import { login, myProfile, refreshToken, register } from '../controllers/userAuth';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();

//Authentications
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/register", register);
router.get("/profile", authMiddleware, myProfile);


export default router;