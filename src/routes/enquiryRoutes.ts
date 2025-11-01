import express from 'express';
import { enquiryControllers } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const enquiryRouter = express.Router();

enquiryRouter.post('/', enquiryControllers.addNewEnquiry);
enquiryRouter.patch('/:id/claim', verifyToken, enquiryControllers.claimLead);
enquiryRouter.get(
  '/getAllUnclaimed',
  verifyToken,
  enquiryControllers.getUnclaimedEnquries,
);
enquiryRouter.get(
  '/getMyAllClaimed',
  verifyToken,
  enquiryControllers.getMyClaimedEnquries,
);

export default enquiryRouter;
