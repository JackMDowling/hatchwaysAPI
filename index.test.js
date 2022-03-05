import supertest from "supertest";
import app from "./index";

// test the ping route
  // should get status 200
  // reponse should be json

// test the post route
  // should get error 400 if no tag
  // should get error 400 if sort/dir are bad
  // should get 200 if params are good
  // could test ascend and descend to see if they work

// test non-routes
