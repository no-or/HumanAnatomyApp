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
setupDB("StatRoutes-Test");
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

describe("Test all routes of stat", () => {
  //remove data after describe block
  afterDesc();

  let stat;

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

  it("Should not be able to get stats - Unauthorized", async done => {
    const res = await request.get("/stat").expect(401);
    done();
  });

  it("Should create a stat - Success", async done => {
    const res = await request
      .post("/stat")
      .send({
        university: "UBC",
        degree: "CPEN",
        educationLevel: "Bachelors",
        year: "4"
      })
      .expect(200);
    done();
  });

  it("Should create a stat - Success", async done => {
    const res = await request
      .post("/stat")
      .send({
        university: "SFU",
        degree: "CPEN",
        educationLevel: "Masters",
        year: "4"
      })
      .expect(200);
    done();
  });

  it("Should get all the stats", async done => {
    const res = await request
      .get("/stat")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);

    expect(res.body.length).toBe(2);
    done();
  });
});
