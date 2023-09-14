import express from "express";
import { getApiResponse } from "../pages/api/BardApi.js";
const router = express.Router();

router.get("/" , getApiResponse);

export default router;