import express from "express";
const router = express.Router();

import {addUser} from "../controller/userHandler";
import {fetchUser} from "../controller/userHandler";


router.route('/signup').post(addUser);
router.route('/signin').post(fetchUser);


export default router;

