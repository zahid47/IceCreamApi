import { Router } from "express";
import validateResource from "../../../middleware/validateResource";
import {
  createIcecreamSchema,
  getIcecreamsSchema,
  getIcecreamSchema,
  searchIcecreamSchema,
  updateIcecreamSchema,
  deleteIcecreamSchema,
} from "../../../schema/icecream.schema";
import { icecreamController } from "../../../controllers/icecream.controller";

const router = Router();

router
  .route("/search")
  .get(
    validateResource(searchIcecreamSchema),
    icecreamController.searchIcecreamHandler
  );

router
  .route("/")
  .get(
    validateResource(getIcecreamsSchema),
    icecreamController.getIcecreamsHandler
  )
  .post(
    validateResource(createIcecreamSchema),
    icecreamController.createIcecreamHandler
  );

router
  .route("/:index")
  .get(
    validateResource(getIcecreamSchema),
    icecreamController.getIcecreamHandler
  )
  .put(
    validateResource(updateIcecreamSchema),
    icecreamController.updateIcecreamHandler
  )
  .delete(
    validateResource(deleteIcecreamSchema),
    icecreamController.deleteIcecreamHandler
  );

export default router;
