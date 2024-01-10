import express from "express";
const router = express.Router();

import {urlHandler} from "../controller/urlHandler";
import { fetchLongURLHandler } from "../controller/urlHandler";
import URL from "../model/url.model";

router.route('/shorten').post(urlHandler);
router.route('/long/:shortURL').get(fetchLongURLHandler);

export default router;