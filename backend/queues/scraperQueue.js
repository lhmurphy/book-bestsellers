const Queue = require("bull");
const cheerio = require("cheerio");
const rp = require("request-promise");
const models = require("../models");
const scraperQueue = new Queue("web scraping");

scraperQueue.process(async (job, done) => {
  const deal = job.data.deal;
  const response = await rp(deal.url);
  const $ = cheerio.load(response);
  const items = $(".list_item");
  let deals = [];
  Object.keys(items).forEach(key => {
    const dealer = $(items[key])
      .find(".offer_dealer")
      .text();
    const title = $(items[key])
      .find(".offer_title")
      .text();
    let link = $(items[key])
      .find(".offer_title a")
      .attr("href");
    link = `https://www.redflagdeals.com${link}`;
    deals.push({ dealer, title, link });
  });
  await models.Deal.update(
    {
      content: JSON.stringify(deals),
    },
    {
      where: {
        id: deal.id,
      },
    }
  );
  done();
});
export { scraperQueue };