import express from "express";
const router = express.Router();

import {urlHandler} from "../controller/urlHandler";
import { fetchLongURLHandler } from "../controller/urlHandler";
import URL from "../model/url.model";
import { verifyUser } from "../middleware/verifyUser";

router.route('/shorten/:userId').post(verifyUser, urlHandler);
router.route('/long/:shortURL/:userId').get(verifyUser, fetchLongURLHandler);

export default router;