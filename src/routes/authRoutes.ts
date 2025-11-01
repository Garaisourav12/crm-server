import express from 'express';
import { authControllers } from '../controllers';

const authRouter = express.Router();

authRouter.post('/register', authControllers.registerUser);
authRouter.post('/login', authControllers.loginUser);
authRouter.post('/logout', authControllers.logoutUser);

export default authRouter;
