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
setupDB("ExploreRoutes-Test");
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

describe("Test all routes of Explore", () => {
  //remove data after describe block
  afterDesc();

  let explore;

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

  it("Should not be able to create an explore for the admin - Unauthorized", async done => {
    const res = await request
      .post("/explore")
      .send({
        region: "X",
        title: "Y",
        imageUrl: "www.ysv.com",
        explanation: "xysskfj"
      })
      .expect(401);
    done();
  });

  it("Should create an explore - Authorized", async done => {
    const res = await request
      .post("/explore")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        region: "X",
        title: "Y",
        imageUrl: "www.ysv.com",
        explanation: "xysskfj"
      })
      .expect(200);
    done();
  });

  it("Should get the specified explore by query", async done => {
    const res = await request
      .get("/explore")
      .query({
        region: "X",
        title: "Y"
      })
      .expect(200);

    explore = res.body[0];
    expect(res.body.length).toBe(1);
    done();
  });

  it("Delete an explore - Authorized", async done => {
    const res = await request
      .delete("/explore/" + explore._id)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);
    done();
  });
});
