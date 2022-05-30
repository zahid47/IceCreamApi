import { Request, Response } from "express";
import Icecream from "../model/icecream.model";
import {
  createIcecreamInput,
  deleteIcecreamInput,
  getIcecreamInput,
  getIcecreamsInput,
  searchIcecreamInput,
  updateIcecreamInput,
} from "../schema/icecream.schema";
import {
  createIcecream,
  deleteIcecream,
  getIcecreamByIndex,
  getIcecreams,
  searchIcecream,
  updateIcecream,
} from "../service/icecream.service";
import icecreamType from "../types/icecreamType";
import bodySerializer from "../utils/bodySerializer";
import logger from "../utils/logger";
import { searchQueryBuilder } from "../utils/searchQueryBuilder";

export const getIcecreamsHandler = async (
  req: Request<{}, {}, {}, getIcecreamsInput["query"]>,
  res: Response
) => {
  let limit = 0;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  try {
    const icecreams = await getIcecreams(limit);
    return res.status(200).json(icecreams);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createIcecreamHandler = async (
  req: Request<{}, {}, createIcecreamInput["body"]>,
  res: Response
) => {
  const newIcecream: icecreamType = bodySerializer(req.body);

  try {
    const previousIcecream = await Icecream.find().sort({ _id: -1 }).limit(1);

    if (previousIcecream.length < 1) {
      newIcecream.index = 0;
    } else {
      newIcecream.index = previousIcecream[0].index + 1;
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).send(err.message);
  }

  try {
    const icecream = await createIcecream(newIcecream);
    return res.status(201).json(icecream);
  } catch (err: any) {
    logger.error(err);
    return res.status(409).send(err.message);
  }
};

export const getIcecreamHandler = async (
  req: Request<getIcecreamInput["params"]>,
  res: Response
) => {
  const { index } = req.params;

  try {
    const icecream = await getIcecreamByIndex(index);
    if (!icecream) return res.status(404).json({ error: "icecream not found" });

    return res.status(200).json(icecream);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateIcecreamHandler = async (
  req: Request<updateIcecreamInput["params"], {}, updateIcecreamInput["body"]>,
  res: Response
) => {
  const { index } = req.params;
  const data: icecreamType = bodySerializer(req.body);

  try {
    const icecream = await updateIcecream(index, data);

    if (!icecream) return res.status(404).json({ error: "icecream not found" });

    return res.status(200).json(icecream);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteIcecreamHandler = async (
  req: Request<deleteIcecreamInput["params"]>,
  res: Response
) => {
  const { index } = req.params;

  try {
    const icecream = await deleteIcecream(index);
    if (!icecream) return res.status(404).json({ error: "icecream not found" });

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const searchIcecreamHandler = async (
  req: Request<{}, {}, {}, searchIcecreamInput["query"]>,
  res: Response
) => {
  let limit = 0;
  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }
  const query = searchQueryBuilder(req.query);

  try {
    const icecream = await searchIcecream(query, limit);
    return res.status(200).json(icecream);
  } catch (err) {
    return res.status(500).json(err);
  }
};
