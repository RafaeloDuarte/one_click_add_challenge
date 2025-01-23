import { Router } from "express";
import { Video } from "../models/Video";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (_, res) => {
  try {
    const videos = await Video.findAll();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Video.update(req.body, {
      where: { id: id }
    });

    if (updated) {
      const updatedVideo = await Video.findOne({ where: { id: id } });
      res.status(200).json(updatedVideo);
    } else {
      res.status(404).json({ error: "Video not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
