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
setupDB("VideoRoutes-Test");
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

describe("Test all routes of video", () => {
  //remove data after describe block
  afterDesc();

  let video;

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

  it("Should not be able to create a video for the admin - Unauthorized", async done => {
    const res = await request
      .post("/video")
      .send({})
      .expect(401);
    done();
  });

  it("Should not create a video - Bad Request", async done => {
    const res = await request
      .post("/video")
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

  it("Should create a video - Success", async done => {
    const res = await request
      .post("/video")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        title: "Lecture1",
        link: "www.youtube.com/3539",
        region: "Head&Neck"
      })
      .expect(200);
    video = res.body;
    done();
  });

  it("Should not create a video (Similar data exists in the DB) - Bad Request", async done => {
    const res = await request
      .post("/video")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send({
        title: "Lecture1",
        link: "www.youtube.com/3539",
        region: "Head&Neck"
      })
      .expect(400);
    done();
  });

  it("Should get all videos", async done => {
    const res = await request.get("/video").expect(200);

    expect(res.body.length).toBe(1);
    done();
  });

  it("Should delete the specified video by id", async done => {
    const res = await request
      .delete("/video/" + video._id)
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);

    done();
  });
});
