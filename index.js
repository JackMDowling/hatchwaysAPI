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
  // Destructuring query string, declaring valid variables
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
    // This wasn't super DRY, but it would have been a messy conditional statement if I used a var and template literals
  }

  // Setting default values
  if (!sortBy) {
    sortBy = "id";
  }
  if (!direction) {
    direction = "asc";
  }
  const tags = tag.split(",");
  // Promise.all for concurrent get requests from the API
  const results = await Promise.all(
    tags.map((tag) => {
      let queryString =
        url + "?tag=" + tag + "&sortBy=" + sortBy + "&direction=" + direction;
      return axios.get(queryString);
    })
  );

  // Merging the data and removing duplicates
  // Calling helper functions to sort array, bundling it up and sending it to the client
  let accumulatedPosts = arrayFilter(results);
  arraySort(sortBy, direction, accumulatedPosts);

  let dataResponse = {
    posts: accumulatedPosts,
  };
  res.status(200);
  res.send(dataResponse);
});

// Helper function to filter and sort
function arrayFilter(array) {
  let postStore = [];

  for (let collection of array) {
    if (collection.data.posts.length > 0) {
      postStore.push(collection.data.posts);
    }
  }

  let accumulatedPosts = postStore.flat(1);
  const idMap = new Map();

  for (let i = 0; i < accumulatedPosts.length; i++) {
    let post = accumulatedPosts[i];
    let id = post.id;
    if (!idMap.get(id)) {
      idMap.set(id, 1);
    } else if (idMap.get(id) === 1) {
      accumulatedPosts.splice(i, 1);
    }
  }

  return accumulatedPosts;
}

function arraySort(sortBy, direction, array) {
  if (direction === "asc") {
    array.sort((a, b) => {
      return a[sortBy] - b[sortBy];
    });
  } else {
    array.sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
  }
}

module.exports = app;
