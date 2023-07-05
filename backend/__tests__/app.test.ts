const request = require("supertest");
const express = require("express");

const app = express();
import index from '../routes/index'
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", index);

describe("Index route", () => {
  test("Returning correct res.json response", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ message: "Checking if restarting is automated" })
      .expect(200, done);
  });
});
