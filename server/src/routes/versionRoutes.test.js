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
setupDB("VersionRoutes-Test");
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

describe("Test all routes of version", () => {
  //remove data after describe block
  afterDesc();

  let version;

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

  it("Should not be able to create a version for the admin - Unauthorized", async done => {
    const res = await request
      .post("/version")
      .send({})
      .expect(401);
    done();
  });

  it("Should not create a version - Bad Request", async done => {
    const res = await request
      .post("/version")
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

  it("Should create a version - Success", async done => {
    const res = await request
      .post("/version")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        subRegion: "Neck",
        module: "quiz"
      })
      .expect(200);
    done();
  });

  it("Should not create a version (Similar data exists in the DB) - Bad Request", async done => {
    const res = await request
      .post("/version")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        subRegion: "Neck",
        module: "quiz"
      })
      .expect(400);
    done();
  });

  it("Should update the specified version", async done => {
    const res = await request
      .put("/version")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        subRegion: "Neck",
        module: "quiz"
      })
      .expect(200);

    done();
  });
});
