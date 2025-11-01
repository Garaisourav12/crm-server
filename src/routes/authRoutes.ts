import express from 'express';
import { authControllers } from '../controllers';

const authRouter = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new employee
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateUserDto"
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 user:
 *                   $ref: "#/components/schemas/UserResponse"
 */
authRouter.post('/register', authControllers.registerUser);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login employee
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginUserDto"
 *     responses:
 *       200:
 *         description: Login successful
 */
authRouter.post('/login', authControllers.loginUser);

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     summary: Logout (clears cookie)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 */
authRouter.get('/logout', authControllers.logoutUser);

export default authRouter;
