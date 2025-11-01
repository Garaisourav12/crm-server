import express from 'express';
import { enquiryControllers } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const enquiryRouter = express.Router();

enquiryRouter.post('/', enquiryControllers.addNewEnquiry);
enquiryRouter.post('/:id/claim', verifyToken, enquiryControllers.claimLead);
enquiryRouter.get(
  '/getAllUnclaimed',
  verifyToken,
  enquiryControllers.getUnclaimedEnquries,
);
enquiryRouter.get(
  '/getMyClaimed',
  verifyToken,
  enquiryControllers.getMyClaimedEnquries,
);

export default enquiryRouter;
