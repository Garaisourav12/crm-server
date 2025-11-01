import express from 'express';
import authRouter from './authRoutes';
import enquiryRouter from './enquiryRoutes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/enquiry', enquiryRouter);

export default apiRouter;
