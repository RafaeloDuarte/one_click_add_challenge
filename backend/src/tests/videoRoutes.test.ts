import request from "supertest";
import { app } from "../app";
import { sequelize } from "../database";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Video Routes", () => {
  it("should create a new video", async () => {
    const res = await request(app)
      .post("/videos")
      .send({
        title: "Sample Video",
        url: "http://example.com/video",
        votes: 0,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Sample Video");
  });

  it("should fetch all videos", async () => {
    const res = await request(app).get("/videos");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
