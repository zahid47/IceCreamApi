import request from "supertest";
import app from "../utils/app";

describe("server", () => {
  describe("GET /", () => {
    describe("given the server is working", () => {
      it("should return a 200", async () => {
        const { statusCode } = await request(app).get(`/`);
        expect(statusCode).toBe(200);
      });
    });
  });
});
