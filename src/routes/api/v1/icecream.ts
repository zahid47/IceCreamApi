import { Router, Request, Response } from "express";
import validateResource from "../../../middleware/validateResource";
import {
  createIcecreamSchema,
  getIcecreamsSchema,
  getIcecreamSchema,
  searchIcecreamSchema,
  updateIcecreamSchema,
  deleteIcecreamSchema,
} from "../../../schema/icecream.schema";
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
router.get(
  "/search",
  validateResource(searchIcecreamSchema),
  (req: Request, res: Response) => {
    searchIcecreamHandler(req, res);
  }
);

// @route  GET api/v1/icecreams
// @desc   get all icecreams
// @access public
router.get(
  "/",
  validateResource(getIcecreamsSchema),
  (req: Request, res: Response) => {
    getIcecreamsHandler(req, res);
  }
);

// @route  POST api/v1/icecreams/index
// @desc   create icecream
// @access public
router.post(
  "/",
  validateResource(createIcecreamSchema),
  (req: Request, res: Response) => {
    createIcecreamHandler(req, res);
  }
);

// @route  GET api/v1/icecreams/index
// @desc   get icecream by index
// @access public
router.get(
  "/:index",
  validateResource(getIcecreamSchema),
  (req: Request, res: Response) => {
    getIcecreamHandler(req, res);
  }
);

// @route  PUT api/v1/icecreams/index
// @desc   update icecream by index
// @access public
router.put(
  "/:index",
  validateResource(updateIcecreamSchema),
  (req: Request, res: Response) => {
    updateIcecreamHandler(req, res);
  }
);

// @route  DELETE api/v1/icecreams/index
// @desc   get icecream by index
// @access public
router.delete(
  "/:index",
  validateResource(deleteIcecreamSchema),
  (req: Request, res: Response) => {
    deleteIcecreamHandler(req, res);
  }
);

export default router;
