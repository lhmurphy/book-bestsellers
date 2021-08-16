const express = require("express");
const models = require("../models");
const router = express.Router();
import { scraperQueue } from "../queues/scraperQueue";

router.post("/scrape", async (req, res, next) => {
  const { name, description, url } = req.body;
  const deal = await models.Deal.create({
    name,
    description,
    url,
  });
  scraperQueue.add({ deal });
  res.json(deal);
});
router.delete("/job/:id", async (req, res, next) => {
  const id = req.params.id;
  await models.Deal.destroy({ where: { id } });
  res.json({ id });
});
router.get("/jobs", async (req, res, next) => {
  const deals = await models.Deal.findAll();
  res.json(deals);
});
router.get("/job/:id", async (req, res, next) => {
  const id = req.params.id;
  const deals = await models.Deal.findAll({ where: { id } });
  const deal = deals[0];
  deal.content = JSON.parse(deal.content);
  res.json(deal);
});
module.exports = router;