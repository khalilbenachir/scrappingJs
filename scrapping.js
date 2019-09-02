const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_sacat=0&_nkw=";

const searchProduct = keyword => {
  const ttt =
    "https://www.ebay.com/sch/i.html?_ftrt=901&_udlo=8&_sop=12&_sadis=15&_dmd=1&LH_ItemCondition=3&LH_BIN=1&_mPrRngCbx=1&_ftrv=1&_from=R40&_sacat=0&_fosrp=1&_nkw=toy&LH_LocatedIn=45&_ipg=200&rt=nc";
  return axios
    .get(
      "https://www.ebay.com/sch/i.html?_sacat=0&_mPrRngCbx=1&_udlo=8&_udhi=&LH_ItemCondition=3&_ftrt=901&_ftrv=1&_sabdlo=&_sabdhi=&_samilow=&_samihi=&_sadis=15&_stpos=&_sop=12&_dmd=1&_fosrp=1&_nkw=women&LH_LocatedIn=45&_pgn=2&_skc=200&rt=nc"
    )
    .then(res => {
      return res.data;
    })
    .then(body => {
      const items = [];
      const $ = cheerio.load(body);
      $(".lvresult").each((index, element) => {
        console.log(
          $("li")
            .attr("r")
            .html()
        );
        const item = {
          title: $("li")
            .attr("r")
            .text(),
          price: $(element)
            .find(".s-item__price")
            .text(),
          location: $(element)
            .find(".s-item__itemLocation")
            .text(),
          link: $(element)
            .find(".s-item__link")
            .text(),
          feedBack: $(element)
            .find(".s-item__seller-info-text")
            .text()
        };
        items.push(item);
      });
      return items;
    })
    .catch(e => console.log(e));
};

module.exports = { searchProduct };

//https://www.ebay.com/sch/i.html?_from=R40&_nkw=toys&_sacat=0&_pgn=2

const sss =
  "https://www.ebay.com/sch/i.html?_ftrt=901&_udlo=8&_sop=12&_sadis=15&_dmd=1&LH_ItemCondition=3&LH_BIN=1&_mPrRngCbx=1&_ftrv=1&_from=R40&_sacat=0&_fosrp=1&_nkw=toy&LH_LocatedIn=45&_ipg=200&rt=nc";
const ttt =
  "https://www.ebay.com/sch/i.html?_ftrt=901&_udlo=8&_sop=12&_sadis=15&_dmd=1&LH_ItemCondition=3&LH_BIN=1&_mPrRngCbx=1&_ftrv=1&_from=R40&_sacat=0&_fosrp=1&_nkw=toy&LH_LocatedIn=45&_ipg=200&rt=nc";
const nnn = "";
const mmm =
  "https://www.ebay.com/sch/i.html?_ftrt=901&_udlo=8&_sop=12&_sadis=15&_dmd=1&LH_ItemCondition=3&LH_BIN=1&_mPrRngCbx=1&_ftrv=1&_from=R40&_sacat=0&_fosrp=1&_nkw=toy&LH_LocatedIn=45&_pgn=2&_skc=200&rt=nc";
