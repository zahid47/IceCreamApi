import { Request, Response } from "express";
import Icecream from "../model/icecream.model";

export const getIcecreamsHandler = async (req: Request, res: Response) => {
  const limit = req.query["limit"] as unknown as number || 0;

  try {
    const icecreams = await Icecream.find().limit(limit);
    res.status(200).json(icecreams);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createIcecreamHandler = async (req: Request, res: Response) => {
  const data = req.body;

  if (!data.name) return res.status(400).json({ error: "no name provided" });

  const newIcecream = new Icecream(data);

  try {
    const previousIcecream = await Icecream.find().sort({ _id: -1 }).limit(1);

    if (!previousIcecream) {
      newIcecream.index = 0;
    } else {
      newIcecream.index = previousIcecream[0].index + 1;
    }
  } catch {
    res.status(500).send("error");
  }

  try {
    const savedIcecream = await newIcecream.save();
    res.status(201).json(savedIcecream);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getIcecreamHandler = async (req: Request, res: Response) => {
  const { index } = req.params;

  try {
    const icecream = await Icecream.findOne({ index });
    if (!icecream) return res.status(404).json({ error: "icecream not found" });

    res.status(200).json(icecream);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateIcecreamHandler = async (req: Request, res: Response) => {
  const { index } = req.params;
  const data = req.body;

  try {
    const icecream = await Icecream.findOneAndUpdate({ index }, data, {
      new: true,
    });

    if (!icecream) return res.status(404).json({ error: "icecream not found" });

    res.status(200).json(icecream);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteIcecreamHandler = async (req: Request, res: Response) => {
  const { index } = req.params;

  try {
    const icecream = await Icecream.findOneAndDelete({ index });
    if (!icecream) return res.status(404).json({ error: "icecream not found" });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const searchIcecreamHandler = async (req: any, res: Response) => {
  const limit = (req.query.limit as unknown as number) || 0;

  const searchTerm: string = req.query.query || req.query.q;
  const brand: string = req.query.brand?.toLowerCase();

  let minRating = req.query.minRating;
  if (minRating) minRating = parseFloat(minRating);

  let maxRating = req.query.maxRating;
  if (maxRating) maxRating = parseFloat(maxRating);

  let ingredients: string[] = req.query.ingredients?.split(",");
  ingredients = ingredients?.map((ingredient) => {
    return ingredient.toUpperCase();
  });

  //building the query
  let query: any = {};

  if (brand) {
    query = {
      ...query,
      brand: brand,
    };
  }

  if (ingredients?.length > 0) {
    query = {
      ...query,
      ingredients: { $all: ingredients },
    };
  }

  if (minRating || maxRating) {
    query = {
      ...query,
      rating: { $gte: minRating || 0, $lte: maxRating || 5 },
    };
  }

  if (searchTerm) {
    query = {
      ...query,
      $or: [
        { name: { $regex: searchTerm, $options: "ie" } },
        { subhead: { $regex: searchTerm, $options: "ie" } },
        { description: { $regex: searchTerm, $options: "ie" } },
      ],
    };
  }

  // res.json(query);

  try {
    const icecream = await Icecream.find(query).limit(limit);
    res.status(200).json(icecream);
  } catch (err) {
    res.status(500).json(err);
  }
};
