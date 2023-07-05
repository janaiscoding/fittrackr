const request = require("supertest");
const express = require("express");

const app = express();
import index from "../routes/index";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", index);

describe("Index route", () => {
  test("Returning correct res.json response", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ array: [] })
      .expect(200, done);
  });
  test("Post test works both with Req and Res", (done) => {
    request(app)
      .post("/")
      .type("form")
      .send({ message: "TEST" })
      .expect("Content-Type", /json/)
      .expect({ message: "POST request simulation works" })
      .then(() => {
        request(app)
          .get("/")
          .expect({ array: ["TEST"] }, done);
      });
  });
});
