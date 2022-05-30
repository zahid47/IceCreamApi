import request from "supertest";
import app from "../utils/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { icecreamService } from "../service/icecream.service";
import Icecream from "../model/icecream.model";

describe("icecream", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(async () => {
    await Icecream.deleteMany({});
  });

  afterAll(async () => {
    Icecream.deleteMany({});
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("GET /api/v1/icecreams", () => {
    describe("given the icecreams exist", () => {
      it("should return a 200 and '<=limit' number of icecreams", async () => {
        await icecreamService.createIcecream({
          index: 99999,
          name: "test icecream 1",
        });
        await icecreamService.createIcecream({
          index: 99998,
          name: "test icecream 2",
        });
        await icecreamService.createIcecream({
          index: 99997,
          name: "test icecream 3",
        });

        const limit = 2;
        const { statusCode, body } = await request(app).get(
          `/api/v1/icecreams?limit=${limit}`
        );
        expect(statusCode).toBe(200);
        expect(body.length).toBeLessThanOrEqual(limit);
      });
    });
  });

  describe("GET /api/v1/icecreams/:index", () => {
    describe("given an icecream does not exist with that index", () => {
      it("should return a 404", async () => {
        const index = -1;
        await request(app).get(`/api/v1/icecreams/${index}`).expect(404);
      });
    });
  });

  describe("GET /api/v1/icecreams", () => {
    describe("given an icecream does exist with that index", () => {
      it("should return a 200", async () => {
        const icecream = await icecreamService.createIcecream({
          index: 0,
          name: "test icecream",
        });
        const { statusCode, body } = await request(app).get(
          `/api/v1/icecreams/${icecream.index}`
        );

        expect(statusCode).toBe(200);
        expect(body.index).toEqual(icecream.index);
      });
    });
  });

  describe("POST /api/v1/icecreams", () => {
    describe("given the icecreamInput is invalid", () => {
      it("should return a 400", async () => {
        const { statusCode } = await request(app)
          .post("/api/v1/icecreams")
          .send(); //sending nothing, thus invalid

        expect(statusCode).toBe(400);
      });
    });
  });

  describe("POST /api/v1/icecreams", () => {
    describe("given the icecreamInput is valid", () => {
      it("should return a 201 and return the icecream", async () => {
        const { statusCode, body } = await request(app)
          .post("/api/v1/icecreams")
          .send({ name: "test icecream", ingredients: "milk, butter, nuts" });

        expect(statusCode).toBe(201);
        expect(body.ingredients).toEqual(["MILK", "BUTTER", "NUTS"]);
      });
    });
  });

  describe("PUT /api/v1/icecreams/:index", () => {
    describe("given the icecream exist", () => {
      it("should return a 200 and updated icecream", async () => {
        const index = 99999;
        await icecreamService.createIcecream({
          index: index,
          name: "test icecream",
        });

        const updatedName = "updated icecream";
        const { statusCode, body } = await request(app)
          .put(`/api/v1/icecreams/${index}`)
          .send({ name: updatedName });

        expect(statusCode).toBe(200);
        expect(body.name).toEqual(updatedName);
      });
    });
  });

  describe("DELETE /api/v1/icecreams/:index", () => {
    describe("given the icecream exist", () => {
      it("should return a 200 and delete the icecream", async () => {
        const index = 99999;
        await icecreamService.createIcecream({
          index: index,
          name: "test icecream",
        });

        const { statusCode } = await request(app).delete(
          `/api/v1/icecreams/${index}`
        );

        expect(statusCode).toBe(200);
      });
    });
  });

  //FIXME incomplete test?
  describe("POST /api/v1/icecreams/search", () => {
    describe("given the icecreams exist", () => {
      it("should return a 200 and 2 icecreams", async () => {
        await icecreamService.createIcecream({
          index: 99999,
          name: "good icecream 1",
          rating: 5,
          brand: "joe",
          subhead: "yum",
          description: "tasty",
          ingredients: ["MILK", "BUTTER", "NUTS"],
        });
        await icecreamService.createIcecream({
          index: 99998,
          name: "mid icecream 2",
          rating: 3,
          brand: "dragon",
          subhead: "ok",
          description: "meh",
          ingredients: ["BERRIES", "MILK", "LEMON", "WATER"],
        });
        await icecreamService.createIcecream({
          index: 99997,
          name: "bad icecream 3",
          rating: 1,
          brand: "dragon",
          subhead: "eww",
          description: "yuck",
          ingredients: ["POTATO", "ONIONS", "LEMON", "WATER"],
        });

        const { statusCode, body } = await request(app)
          .get(`/api/v1/icecreams/search`)
          .query({
            brand: "dragon",
            minRating: 1,
            maxRating: 4,
            ingredients: "lemon",
          });

        expect(statusCode).toBe(200);
        expect(body.length).toEqual(2);
      });
    });
  });
});
