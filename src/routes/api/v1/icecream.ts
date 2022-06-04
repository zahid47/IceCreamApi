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

  /**
   * @openapi
   * '/api/v1/icecreams':
   *  get:
   *     tags:
   *     - Icecream
   *     summary: Get all icecreams
   *     parameters:
   *      - name: limit
   *        in: query
   *        type: integer
   *        description: limit the number of icecreams to return
   *        default: 3
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetIcecreamsResponse'
   *       500:
   *         description: Internal Server Error
   */
  .get(
    validateResource(getIcecreamsSchema),
    icecreamController.getIcecreamsHandler
  )
  /**
   * @openapi
   * '/api/v1/icecreams':
   *  post:
   *     tags:
   *     - Icecream
   *     summary: Create a new icecream
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateIcecreamsInput'
   *     responses:
   *       201:
   *         description: Created
   *       500:
   *         description: Internal Server Error
   */
  .post(
    validateResource(createIcecreamSchema),
    icecreamController.createIcecreamHandler
  );

router
  .route("/:index")
  /**
   * @openapi
   * '/api/v1/icecreams/{index}':
   *  get:
   *     tags:
   *     - Icecream
   *     summary: Get a single icecream by index
   *     parameters:
   *      - name: index
   *        in: path
   *        description: The index of the icecream
   *        default: 1
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Icecream not found
   */
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
