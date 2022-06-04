import { object, string, TypeOf, any } from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateIcecreamsInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         brand:
 *           type: string
 *           default: "bj"
 *         name:
 *           type: string
 *           default: "Salted Caramel Core"
 *         subhead:
 *           type: string
 *           default: "Sweet Cream Ice Cream with Blonde Brownies & a Salted Caramel Core"
 *         description:
 *           type: string
 *           default: "Find your way to the ultimate ice cream experience with our Cores."
 *         rating:
 *           type: string
 *           default: "3.7"
 *         ingredients:
 *           type: string
 *           default: "milk, soy, water, nuts, caramel"
 */
export const createIcecreamSchema = object({
  body: object({
    index: any({
      required_error: "index required",
    }).optional(),
    name: string({
      required_error: "icecream name is required",
    }),
    brand: string().optional(),
    subhead: string().optional(),
    description: string().optional(),
    rating: string().optional(),
    ingredients: string().optional(),
  }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *    GetIcecreamsResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *          index:
 *            type: integer
 *          brand:
 *            type: string
 *          name:
 *            type: string
 *          subhead:
 *            type: string
 *          description:
 *            type: string
 *          rating:
 *            type: number
 *          ingredients:
 *            type: array
 *            items:
 *              type: string
 */
export const getIcecreamsSchema = object({
  query: object({
    limit: string().optional(),
  }),
});

export const getIcecreamSchema = object({
  params: object({
    index: any(),
  }),
});

export const updateIcecreamSchema = object({
  params: object({
    index: any(),
  }),
  body: object({
    name: string().optional(),
    brand: string().optional(),
    subhead: string().optional(),
    description: string().optional(),
    rating: string().optional(),
    ingredients: string().optional(),
  }),
});

export const deleteIcecreamSchema = object({
  params: object({
    index: any(),
  }),
});

export const searchIcecreamSchema = object({
  query: object({
    limit: string().optional(),
    searchTerm: string().optional(),
    brand: string().optional(),
    minRating: string().optional(),
    maxRating: string().optional(),
    ingredients: string().optional(),
  }),
});

export type createIcecreamInput = TypeOf<typeof createIcecreamSchema>;
export type getIcecreamsInput = TypeOf<typeof getIcecreamsSchema>;
export type getIcecreamInput = TypeOf<typeof getIcecreamSchema>;
export type updateIcecreamInput = TypeOf<typeof updateIcecreamSchema>;
export type deleteIcecreamInput = TypeOf<typeof deleteIcecreamSchema>;
export type searchIcecreamInput = TypeOf<typeof searchIcecreamSchema>;
