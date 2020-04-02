const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);
const registerAdmin = require("../services/registerAdmin");
const seedData = require("../utils-tests/seedData");
const {
  setupDB,
  afterDesc,
  afterEverything
} = require("../utils-tests/test-setup");

// Setup a Test Database
setupDB("QuizRoutes-Test");
//remove DB after execution
afterEverything();

// Get a token to use
let token;

// Seed the database with admins
beforeAll(async () => {
  const req = {
    body: {
      name: seedData[0].name,
      password: seedData[0].password,
      email: seedData[0].email,
      authorizedBy: seedData[0].authorizedBy
    }
  };
  await registerAdmin(req);
});

describe("Test all routes of quiz", () => {
  //remove data after describe block
  afterDesc();

  let quiz;

  it("Should get a valid token for the specified admin", async done => {
    const res = await request
      .post("/admin/login")
      .send({
        email: seedData[0].email,
        password: seedData[0].password
      })
      .expect(200);
    token = res.body;
    done();
  });

  it("Should not be able to create a quiz for the admin - Unauthorized", async done => {
    const res = await request
      .post("/quiz")
      .send({
        region: "X",
        title: "Y",
        imageUrl: "www.ysv.com",
        explanation: "xysskfj"
      })
      .expect(401);
    done();
  });

  it("Should not create a quiz - Bad Request", async done => {
    const res = await request
      .post("/quiz")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        region: "X",
        title: "Y",
        imageUrl: "www.ysv.com",
        explanation: "xysskfj"
      })
      .expect(400);
    done();
  });

  it("Should create a quiz - Success", async done => {
    const res = await request
      .post("/quiz")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        region: "X",
        question: "Ydf",
        questionType: "multipleChoice",
        imageUrl: "www.ysv.com",
        options: ["a", "b", "c", "d"],
        correctAnswer: "a",
        explanation: ["asdf", "gffd", "ghtg", "uegur"]
      })
      .expect(200);
    done();
  });

  it("Should get the specified quiz by query", async done => {
    const res = await request
      .get("/quiz")
      .query({
        region: "X",
        question: "Ydf",
        questionType: "multipleChoice",
        imageUrl: "www.ysv.com"
      })
      .expect(200);

    quiz = res.body[0];
    expect(res.body.length).toBe(1);
    done();
  });

  it("Delete a quiz - Authorized", async done => {
    const res = await request
      .delete("/quiz/" + quiz._id)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);
    done();
  });
});
