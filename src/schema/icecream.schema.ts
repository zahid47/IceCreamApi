import { object, string, TypeOf, array, any } from "zod";

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
