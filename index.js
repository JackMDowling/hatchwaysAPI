const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const url = "https://api.hatchways.io/assessment/blog/posts";

//Route 1
app.get("/api/ping", (req, res) => {
  const pingSuccess = {
    success: true,
  };
  res.status(200);
  res.json(pingSuccess);
});

// Route 2
app.get("/api/posts", async (req, res) => {
  // Destructuring query string, declaring variables
  let { tag, sortBy, direction } = req.query;
  const validSort = ["id", "reads", "likes", "popularity"];
  const validDir = ["asc", "desc"];

  // Error handling for bad params
  if (!tag) {
    const missingTag = {
      error: "Tags parameter is required",
    };
    res.status(400);
    res.json(missingTag);
  }
  if (sortBy && !validSort.includes(sortBy)) {
    const sortError = {
      error: `sortBy parameter is invalid`,
    };
    res.status(400);
    res.json(sortError);
  }
  if (direction && !validDir.includes(direction)) {
    const dirError = {
      error: `Direction parameter is invalid`,
    };
    res.status(400);
    res.json(dirError);
    // This wasn't super DRY, but it would have been a messy if statement to do it with a var and template literals
  }

  // Successful requests
  if (!sortBy) {
    sortBy = "id";
  }
  if (!direction) {
    direction = "asc";
  }
  const tags = tag.split(",");
  const request = tags.map((tag) => {
    axios.get(url + "?tag=" + tag + sortBy + direction);
  });

  console.log(tags);

  res.send(tag);
});
