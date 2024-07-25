import express from "express";
import * as controller from "../controller/mapController.js";

const router = express.Router();
router.post("/", controller.getMap);

export default router;
