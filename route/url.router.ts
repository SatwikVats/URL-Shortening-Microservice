import express from "express";
const router = express.Router();

import urlHandler from "../controller/urlHandler";

router.route('/shorten').post(urlHandler);

export default router;