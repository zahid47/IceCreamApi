import { Request, Response } from "express";
import Icecream from "../model/icecream.model";
import { icecreamType } from "../types/icecreamType";

export const getIcecreamsHandler = async (req: Request, res: Response) => {
  try {
    const icecreams = await Icecream.find();
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
