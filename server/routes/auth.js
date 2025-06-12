import e from "express";
import { signUp,signIn } from "../controllers/authController.js";

const router=e.Router();

router.post("/signUp",signUp);
router.post("/signIn",signIn)
export default router;