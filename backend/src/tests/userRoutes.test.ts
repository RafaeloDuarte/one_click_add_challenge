import request from "supertest";
import { app } from "../app";
import { sequelize } from "../database";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("User Routes", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        username: "testuser",
        password: "password123",
        email: "testuser@example.com",
        isAdmin: false,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.username).toBe("testuser");
  });

  it("should fetch all users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
  });
});
