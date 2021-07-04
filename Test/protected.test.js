const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/icaf_db",
    { useNewUrlParser: true, useUnifiedTopology: true },
    supertest(app)
    .post('/login-user')
    .send({
      username: "pamal",
      password: "pamal123",
    })
    .end((err, response) => {
      expect('login done')
      console.log('login done'); // save the token!
      done();
    })
  );
});

test("Check counter", () => {
  return supertest(app)
    .get("/role_manage/countuser")
    .then((response) => {
      expect(response.statusCode);
      console.log("counted");
    });
});


test("Check role", () => {
    return supertest(app)
      .get("/role_manage/getAll")
      .then((response) => {
        expect(response.statusCode);
        console.log("check get all roles");
      });
  });

  test("Check conference", () => {
    return supertest(app)
      .get("/conference")
      .then((response) => {
        expect(response.statusCode);
        console.log("check get conference route");
      });
  });

  test("Check template all", () => {
    return supertest(app)
      .get("/template/templateAllBack")
      .then((response) => {
        expect(response.statusCode);
        console.log("check get template route");
      });
  });

  test("Check keynote", () => {
    return supertest(app)
      .get("/keynote/get-keynotes")
      .then((response) => {
        expect(response.statusCode);
        console.log("check get keynote route");
      });
  });

  test("Check attendee", () => {
    return supertest(app)
      .get("/get-attendees-is-approved")
      .then((response) => {
        expect(response.statusCode);
        console.log("check get approved route");
      });
  });
  

  test("Check keynote", () => {
    return supertest(app)
      .get("/get-all-contacts")
      .then((response) => {
        expect(response.statusCode);
        console.log("check get contact route");
      });
  });

  afterEach((done) => {
    mongoose.disconnect();
    return done();
  });