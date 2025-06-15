import { Router } from "express";
import e from "express";
import { bookSearch, searchBookList } from "../controllers/bookFetch.js";

const router=e.Router();

router.get("/book/:id",bookSearch);
router.get("/search",searchBookList);

export default router;