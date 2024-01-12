import express from "express";
const router = express.Router();

import { verifyUser } from "../middleware/verifyUser";
import { getAnalyticsHandler, getTimeBasedAnalyticsHandler } from "../controller/analyticsHandler";


router.route('/:shortURL/:userId').get(verifyUser, getAnalyticsHandler);
router.route('/time/:shortURL/:userId').get(verifyUser, getTimeBasedAnalyticsHandler);


export default router;