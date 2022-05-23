import { Router } from "express";
import { Request, Response } from "express";
import {
  getIcecreamsHandler,
  createIcecreamHandler,
  getIcecreamHandler,
  updateIcecreamHandler,
  deleteIcecreamHandler,
  searchIcecreamHandler,
} from "../../../controllers/icecream.controller";

const router = Router();

// @route  GET api/v1/icecreams/search
// @desc   get icecream by search
// @access public
router.get("/search", (req: Request, res: Response) => {
  searchIcecreamHandler(req, res);
});

// @route  GET api/v1/icecreams
// @desc   get all icecreams
// @access public
router.get("/", (req: Request, res: Response) => {
  getIcecreamsHandler(req, res);
});

// @route  POST api/v1/icecreams/index
// @desc   create icecream
// @access public
router.post("/", (req: Request, res: Response) => {
  createIcecreamHandler(req, res);
});

// @route  GET api/v1/icecreams/index
// @desc   get icecream by index
// @access public
router.get("/:index", (req: Request, res: Response) => {
  getIcecreamHandler(req, res);
});

// @route  PUT api/v1/icecreams/index
// @desc   update icecream by index
// @access public
router.put("/:index", (req: Request, res: Response) => {
  updateIcecreamHandler(req, res);
});

// @route  DELETE api/v1/icecreams/index
// @desc   get icecream by index
// @access public
router.delete("/:index", (req: Request, res: Response) => {
  deleteIcecreamHandler(req, res);
});

export default router;
