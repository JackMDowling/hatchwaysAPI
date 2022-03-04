const express = require("express");

const app = express();
const port = 3000;

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
app.get("/api/posts", (req, res, next) => {
  // Destructuring query string
  let { tag, sortBy, direction } = req.query;
  // Error handling for bad params
  if (!tag) {
    const missingTag = {
      error: "Tags parameter is required",
    };
    res.status(400);
    res.json(missingTag);
  }


  console.log(tag);
  res.send(tag);
});
