import express from "express";
const router = express.Router();

import { verifyUser } from "../middleware/verifyUser";
import { getAnalyticsHandler } from "../controller/analyticsHandler";

router.route('/:shortURL/:userId').get(verifyUser, getAnalyticsHandler);

export default router;