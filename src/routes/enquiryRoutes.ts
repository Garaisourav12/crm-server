import express from 'express';
import { enquiryControllers } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const enquiryRouter = express.Router();

/**
 * @openapi
 * /api/enquiry:
 *   post:
 *     summary: Submit a public enquiry
 *     tags: [Enquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateEnquiryDto"
 *     responses:
 *       201:
 *         description: Enquiry created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/EnquiryResponse"
 */
enquiryRouter.post('/', enquiryControllers.addNewEnquiry);

/**
 * @openapi
 * /api/enquiry/{id}/claim:
 *   patch:
 *     summary: Claim an enquiry (protected)
 *     tags: [Enquiry]
 *     security:
 *       - CookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Claimed
 */
enquiryRouter.patch('/:id/claim', verifyToken, enquiryControllers.claimLead);

/**
 * @openapi
 * /api/enquiry/getAllUnclaimed:
 *   get:
 *     summary: Get all unclaimed enquiries (protected)
 *     tags: [Enquiry]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: List of unclaimed enquiries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 enquiries:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/EnquiryResponse"
 */
enquiryRouter.get(
  '/getAllUnclaimed',
  verifyToken,
  enquiryControllers.getUnclaimedEnquries,
);

/**
 * @openapi
 * /api/enquiry/getMyAllClaimed:
 *   get:
 *     summary: Get enquiries claimed by logged-in user (protected)
 *     tags: [Enquiry]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: List of claimed enquiries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 enquiries:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/EnquiryResponse"
 */
enquiryRouter.get(
  '/getMyAllClaimed',
  verifyToken,
  enquiryControllers.getMyClaimedEnquries,
);

export default enquiryRouter;
