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
setupDB("FlashcardRoutes-Test");
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

describe("Test all routes of Flashcard", () => {
  //remove data after describe block
  afterDesc();

  let flashcard;

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

  it("Should not be able to create a flashcard for the admin - Unauthorized", async done => {
    const res = await request
      .post("/flashcard")
      .send({
        region: "X",
        title: "Y",
        imageUrl: "www.ysv.com",
        explanation: "xysskfj"
      })
      .expect(401);
    done();
  });

  it("Should not create a flashcard - Bad Request", async done => {
    const res = await request
      .post("/flashcard")
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

  it("Should create a flashcard - Success", async done => {
    const res = await request
      .post("/flashcard")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        region: "X",
        question: "Ydf",
        imageUrl: "www.ysv.com",
        answer: "xysskfj"
      })
      .expect(200);
    done();
  });

  it("Should get the specified flashcard by query", async done => {
    const res = await request
      .get("/flashcard")
      .query({
        region: "X",
        question: "Ydf"
      })
      .expect(200);

    flashcard = res.body[0];
    expect(res.body.length).toBe(1);
    done();
  });

  it("Delete an flashcard - Authorized", async done => {
    const res = await request
      .delete("/flashcard/" + flashcard._id)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);
    done();
  });
});
