const request = require("supertest");
import app from "./index";

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});
// test the ping route
describe("Hitting the ping route", () => {
  describe("Upon sending a get request to the ping route", () => {
    test("should get status 200", async () => {
      const response = await request(app).get("/api/ping");
      expect(response.statusCode).toBe(200);
    });
  });
});

// test the post route
// 400 error tests
describe("Hitting the posts route", () => {
  describe("When no tag parameter is included", () => {
    describe("Upon sending a get request to the post route with no tag", () => {
      test("should get status 400", async () => {
        const response = await request(app).get("/api/posts?");
        expect(response.statusCode).toBe(400);
      });
    });
  });
  describe("When sortBy is not valid", () => {
    describe("Upon sending a get request to the post route with an invalid sortBy", () => {
      test("should get status 400", async () => {
        const response = await request(app).get(
          "/api/posts?tag=tech&sortBy=left"
        );
        expect(response.statusCode).toBe(400);
      });
    });
  });
  describe("When direction is not valid", () => {});
  describe("Upon sending a get request to the post route with an invalid direction", () => {
    test("should get status 400", async () => {
      const response = await request(app).get(
        "/api/posts?tag=tech&direction=up"
      );
      expect(response.statusCode).toBe(400);
    });
  });
  // 200 Status tests
  describe("When all the parameters are valid", () => {
    describe("Upon sending a get request to the post route with proper params", () => {
      test("should get status 200", async () => {
        const response = await request(app).get("/api/posts/?tag=science,tech");
        expect(response.statusCode).toBe(200);
      });
    });
    test("should send json response", async () => {
      const response = await request(app).get("/api/posts/?tag=science,tech");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("should contain posts in the response body", async () => {
      const response = await request(app).get("/api/posts/?tag=science,tech");
      expect(response.body.posts).toBeDefined();
    });
  });
});
describe("When ascending order is selected", () => {
  test("each ID value should be lower than the next when direction is ascending", async () => {
    const response = await request(app).get(
      "/api/posts/?tag=science,tech&sortBy=id&direction=asc"
    );
    let { posts } = response.body;
    let firstID = posts[0].id;
    let allIDs = [];
    let boolTest = true;
    for (let post of posts) {
      allIDs.push(post.id);
    }
    for (let i = 1; i < allIDs.length; i++) {
      if (firstID > allIDs[i]) {
        boolTest = false;
      }
      firstID = allIDs[i];
    }
    expect(boolTest).toEqual(true);
  });

  // sortBy value should be the lowest
});
describe("When descending order is selected", () => {
  test("each ID value should be lower than the next when direction is ascending", async () => {
    const response = await request(app).get(
      "/api/posts/?tag=science,tech&sortBy=id&direction=desc"
    );
    let { posts } = response.body;
    let firstID = posts[0].id;
    let allIDs = [];
    let boolTest = true;
    for (let post of posts) {
      allIDs.push(post.id);
    }
    for (let i = 1; i < allIDs.length; i++) {
      if (firstID < allIDs[i]) {
        boolTest = false;
      }
      firstID = allIDs[i];
    }
    expect(boolTest).toEqual(true);
  });
});

