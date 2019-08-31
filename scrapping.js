const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_sacat=0&_nkw=";

const searchProduct = keyword => {
  return axios
    .get(url + keyword + "&_udlo=2&_udhi=8")
    .then(res => {
      return res.data;
    })
    .then(body => {
      const items = [];
      const $ = cheerio.load(body);
      console.log("---index2");
      $(".s-item").each((index, element) => {
        const item = {
          title: $(element)
            .find(".s-item__title")
            .text(),
          price: $(element)
            .find(".s-item__price")
            .text(),
          location: $(element)
            .find(".s-item__itemLocation")
                .text(),
          link:$(element)
          .find(".s-item__link")
              .text()
        };
        items.push(item);
      });
      console.log("---index2");
      return items;
    })
    .catch(e => console.log(e));
};

module.exports = { searchProduct };
