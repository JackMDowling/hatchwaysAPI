const request = require("supertest");
import app from "./index";

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});
// test the ping route
describe("Hitting the ping route", () => {
  describe("Upon sending a get request to the ping rout", () => {
    test("should get status 200", async () => {
      const response = await request(app).get("/api/ping");
      expect(response.statusCode).toBe(200);
    });
  });
});
// should get status 200
// response should be json

// test the post route
describe("Hitting the posts route", () => {
  describe("When no tag parameter is included", () => {
    // should get error 400 if no tag
  });
  describe("When sortBy is not valid", () => {
    // should get error 400 if sort/dir are bad
  });
  describe("When direction is not valid", () => {});
  describe("When all the parameters are valid", () => {
    // should get 200 if params are good
  });
  describe("When ascending order is selected", () => {
    // sortBy value should be the lowest
  });
  describe("When descending order is selected", () => {
    // sortBy value should be the highest
  });
});

// test non-routes
