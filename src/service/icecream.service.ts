import Icecream from "../model/icecream.model";
import icecreamType from "../types/icecreamType";

const createIcecream = async (input: icecreamType) => {
  try {
    return await Icecream.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};

const getIcecreams = async (limit: number) => {
  try {
    return await Icecream.find().limit(limit);
  } catch (err: any) {
    throw new Error(err);
  }
};

const getIcecreamByIndex = async (index: number) => {
  try {
    return await Icecream.findOne({ index });
  } catch (err: any) {
    throw new Error(err);
  }
};

const updateIcecreamByIndex = async (index: number, data: icecreamType) => {
  try {
    return await Icecream.findOneAndUpdate({ index }, data, { new: true });
  } catch (err: any) {
    throw new Error(err);
  }
};

const deleteIcecreamByIndex = async (index: number) => {
  try {
    return await Icecream.findOneAndDelete({ index });
  } catch (err: any) {
    throw new Error(err);
  }
};

const searchIcecream = async (query: object, limit: number) => {
  try {
    return await Icecream.find(query).limit(limit);
  } catch (err: any) {
    throw new Error(err);
  }
};

export const icecreamService = {
  createIcecream,
  getIcecreams,
  getIcecreamByIndex,
  updateIcecreamByIndex,
  deleteIcecreamByIndex,
  searchIcecream,
};
