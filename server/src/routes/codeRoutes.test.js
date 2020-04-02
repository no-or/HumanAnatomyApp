const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);
const registerAdmin = require("../services/registerAdmin");
const seedData = require("../utils-tests/seedData");
const CodeModel = require("../models/code");
const AdminModel = require("../models/admins");
const {
  setupDB,
  afterDesc,
  afterEverything
} = require("../utils-tests/test-setup");

// Setup a Test Database
setupDB("CodeRoutes-Test");
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

describe("Test all routes of code", () => {
  //remove data after describe block
  afterDesc();

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

  it("Should not be able to create a code for the admin - Unauthorized", async done => {
    const res = await request
      .post("/code")
      .send({
        code: "1122334455",
        createdBy: seedData[0].name
      })
      .expect(401);
    done();
  });

  it("Should create a code for the admin", async done => {
    const res = await request
      .post("/code")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        code: "1122334455",
        createdBy: seedData[0].name
      })
      .expect(200);

    const code = await CodeModel.findOne();
    expect(code).toBeTruthy();

    done();
  });

  it("Should get all the codes from the db", async done => {
    const res = await request
      .get("/code")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);
    done();

    expect(res.body.length).toBe(1);
  });

  it("Should Compare the code and return 200", async done => {
    const res = await request
      .post("/code/compare")
      .send({
        code: "1122334455",
        authorizedBy: seedData[0].name,
        name: seedData[1].name,
        email: seedData[1].email,
        password: seedData[1].password
      })
      .expect(200);

    const admin = await AdminModel.findOne({ email: seedData[1].email });
    expect(admin).toBeTruthy();
    done();
  });

  it("Should Compare the code and return 200", async done => {
    const res = await request
      .delete("/code")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .query({
        createdBy: seedData[0].name
      })
      .expect(200);

    const code = await CodeModel.findOne({ email: seedData[0].email });
    expect(code).toBeFalsy();
    done();
  });
});
