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
setupDB("HierarchyRoutes-Test");
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

describe("Test all routes of Hierarchy", () => {
  //remove data after describe block
  afterDesc();

  let hierarchy;

  const data = {
    regions: [
      {
        region: "Head & Neck",
        imageUrl: "",
        subRegions: [
          {
            subRegion: "Skull & meninges"
          },
          {
            subRegion: "Cavernous Sinus"
          },
          {
            subRegion: "Orbit"
          },
          {
            subRegion: "Neck"
          },
          {
            subRegion: "Infratemporal fossa"
          },
          {
            subRegion: "Pharynx"
          },
          {
            subRegion: "Larynx"
          }
        ]
      },
      {
        region: "Upper Limb",
        imageUrl: "",
        subRegions: [
          {
            subRegion: "Scapular region"
          },
          {
            subRegion: "Axilla"
          },
          {
            subRegion: "Arm"
          },
          {
            subRegion: "Forearm"
          },
          {
            subRegion: "Hand"
          },
          {
            subRegion: "Upper limb bones"
          },
          {
            subRegion: "Upper limb Joints"
          }
        ]
      },
      {
        region: "Lower Limb",
        imageUrl: "",
        subRegions: [
          {
            subRegion: "Gluteal region"
          },
          {
            subRegion: "Thigh"
          },
          {
            subRegion: "Leg"
          },
          {
            subRegion: "Foot"
          },
          {
            subRegion: "Lower limb bones"
          },
          {
            subRegion: "Lower limb Joints"
          }
        ]
      },
      {
        region: "Trunk",
        imageUrl: "",
        subRegions: [
          {
            subRegion: "Back",
            subSubRegions: [
              {
                subSubRegion: "Trunk bones"
              },
              {
                subSubRegion: "Trunk joints"
              }
            ]
          },
          {
            subRegion: "Thorax",
            subSubRegions: [
              {
                subSubRegion: "Pectoral region"
              },
              {
                subSubRegion: "Lungs & pleura"
              },
              {
                subSubRegion: "Heart"
              },
              {
                subSubRegion: "Superior and posterior mediastinum"
              }
            ]
          },
          {
            subRegion: "Abdomen",
            subSubRegions: [
              {
                subSubRegion: "Anterior abdominal wall"
              },
              {
                subSubRegion: "Foregut organs"
              },
              {
                subSubRegion: "Midgut & hindgut organs"
              },
              {
                subSubRegion: "Posterior abdominal wall"
              }
            ]
          },
          {
            subRegion: "Pelvis",
            subSubRegions: [
              {
                subSubRegion: "Pelvic bones and muscles"
              },
              {
                subSubRegion: "Pelvic joints & ligaments"
              },
              {
                subSubRegion: "Male pelvis"
              },
              {
                subSubRegion: "Female pelvis"
              },
              {
                subSubRegion: "Perineum"
              }
            ]
          }
        ]
      }
    ]
  };

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

  it("Should not be able to post hierarchy - Unauthorized", async done => {
    const res = await request.post("/hierarchy").expect(401);
    done();
  });

  it("Should create a hierarchy - Success", async done => {
    const res = await request
      .post("/hierarchy")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send(data)
      .expect(200);
    done();
  });

  it("Should not be able to post hierarchy - More than one doc", async done => {
    const res = await request
      .post("/hierarchy")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .send(data)
      .expect(400);
    done();
  });

  it("Should get the hierarchy - Success", async done => {
    const res = await request.get("/hierarchy").expect(200);
    done();
  });

  it("Should remove the hierarchy", async done => {
    const res = await request
      .delete("/hierarchy")
      .set("Authorization", `Bearer ${token.accessToken}`)
      .expect(200);
    done();
  });
});
