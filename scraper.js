const axios = require("axios");
const cheerio = require("cheerio");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const get_detail_data = url => {
  let listData = [];
  axios
    .get(url)
    .then(answer => {
      return answer.data;
    })
    .then(async body => {
      const $ = cheerio.load(body);
      const title = $(body)
        .find("#itemTitle")
        .text();
      const price = $(body)
        .find("#prcIsum")
        .text()
        .split(" ")
        .slice()[1];
      const currency = $(body)
        .find("#prcIsum")
        .text()
        .split(" ")
        .slice()[0];
      const totalSold = $(body)
        .find(".vi-txt-underline")
        .text()
        .split(" ")
        .slice()[0];
      const data = {
        title: title,
        price: price,
        currency: currency,
        totalSold: totalSold
      };
      listData.push(data);
    })
    .catch(error => console.log("server respondes ", error));
  listData.map(model => save_data_csv(model));
};

const get_index_data = async url => {
  let links = [];
  let link = "";

  const body = await axios.get(url);

  const $ = cheerio.load(body.data);

  $(".clearfix").each((index, element) => {
    try {
      link = $(element)
        .find(".s-item__link")
        .attr("href");
      links.push(link.toString());
      console.log(index);
    } catch (e) {
      console.log(e.message);
    }
  });

  return links;
};

const save_data_csv = data => {
  console.log("data========", data);
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "title", title: "Title" },
      { id: "price", title: "Price" },
      { id: "currency", title: "Currency" },
      { id: "totalSold", title: "totalSold" }
    ]
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
};

const main = async () => {
  const url1 =
    "https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=watch&_sacat=0";
  const url =
    "https://www.ebay.com/itm/Women-Watch-Mesh-Band-Stainless-Stell-Quartz-Analog-Dress-Ladies-Wrist-watch/303246909674?_trkparms=ispr%3D1&hash=item469aeca0ea:m:mbKseWHh_FcAF6EmccSoEGA&enc=AQAEAAAB4BPxNw%2BVj6nta7CKEs3N0qWJtuz2%2FJ9gczMGNIJ2524KQlntUzwgInykX4LdUoQVftBU1uy9Qot%2BrpZrKUShwqnTItRJgGxNP78l4kSHBuyf8oFHUnwb8PsO%2FyFY0SjsgH2XZZOyVgjC55rd01PrLlfy0Yj2DfQglG3ND2KFJY5nY3OYHKq2McL6ZSxQZjCuYGfA7aO9xwxzid%2ByT934uIytZpNbtB0X5IkxDSeYC9Da0HPyBdQjbiVihZMw%2FDf1jQjJvlH7IvDpjD2%2BI2YIv%2Bgf6R4Qy1boPXLP17wCy42rncODEmiP%2FmHQCxduz%2BKNH%2FcTitKiZaBVBFkBE7QdHByHP3xnTHHfu%2BHiYLEPei9OdwZKex8%2BQDnu%2BJK3Zhtwbs3KCL1L5O6p4THlldI4%2BVIvW%2B7yznIQ%2BTKxDjsN5vM0i0xHRApiGaCvuCol1goU1I32fLs%2Bd9WhwZ%2BCxd5y9yxHmhZ%2Frbr2D3SzPzMM92c19nJnhwP3Xbs0JK%2FqFWZDkf1l2a7lH6Xkc%2BG6cCOm7MQcUtsxP41Dl5%2FrPkvq6qtYsCLeZjgvR8c2QfISSnNWEaIWRXKyjaRkK2daBWo8jUVX3wPhizEb%2B8BTqv7lWOQFlF7i%2BWsxI1v%2FU4lsJuEl7Q%3D%3D&checksum=3032469096745f5062d9ac8d483f9d1658f50b769edd";

  //get_detail_data(url);

  const urls = [];
  await get_index_data(url1)
    .then(res => {
      res.map(result => {
        urls.push(result);
      });
    })
    .catch(err => console.log("urls error", err.message));
  urls.map(async link => {
    await get_detail_data(link);
  });

  console.log(urls.length, "===========length");
};

main();
