import { DocumentDefinition } from "mongoose";
import Icecream from "../model/icecream.model";
import icecreamType from "../types/icecreamType";

export const createIcecream = async (
  input: DocumentDefinition<icecreamType>
) => {
  try {
    return await Icecream.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getIcecreams = async (limit: number) => {
  try {
    return await Icecream.find().limit(limit);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getIcecreamByIndex = async (index: number) => {
  try {
    return await Icecream.findOne({ index });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateIcecream = async (index: number, data: icecreamType) => {
  try {
    return await Icecream.findOneAndUpdate({ index }, data, { new: true });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const deleteIcecream = async (index: number) => {
  try {
    return await Icecream.findOneAndDelete({ index });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const searchIcecream = async (query: object, limit: number) => {
  try {
    return await Icecream.find(query).limit(limit);
  } catch (err: any) {
    throw new Error(err);
  }
};
