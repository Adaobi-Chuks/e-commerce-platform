import { Router } from "express";
const router = Router();

router.use("/docs", (req, res) => {
    res.redirect("");
})

export default router;