import express from "express";
const router = express.Router();
import userRoute from "./user.routes";
import docsRoute from "./docs.routes";

router.use('/users', userRoute);
router.use('/docs', docsRoute);

export default router;