const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_sacat=0&_nkw=";

const searchProduct = keyword => {
  const searchURL = `https://www.ebay.com/sch/i.html?_ftrt=901&_udlo=8&_sop=12&_sadis=15&_dmd=1&LH_ItemCondition=3&LH_BIN=1&_mPrRngCbx=1&_ftrv=1&_from=R40&_sacat=0&_fosrp=1&_nkw=${keyword}&LH_LocatedIn=45&_ipg=200&rt=nc`;
  return axios
    .get(searchURL)
    .then(res => {
      return res.data;
    })
    .then(body => {
      const items = [];
      const $ = cheerio.load(body);
      $(".clearfix").each((index, element) => {
        console.log(index);
        const item = {
          title: $(element)
            .find(".lvtitle")
            .text(),
          price: $(element)
            .find(".lvprice.prc")
            .text(),
          details: $(element)
            .find(".lvdetails.left.space-zero.full-width")
            .text()
        };
        items.push(item);
      });
      return items;
    })
    .catch(e => console.log(e));
};


//Bro , here just replace sellerURL WIth new seller url 

const searchSellerDetails = () => {
  const sellerURL =
    "https://www.ebay.com/itm/TOY-STORY-SHERIFF-WOODY-JESSIE-DOLL-KID-BABY-SOFT-TALKING-ACTION-FIGURES-TOY/202730011755?hash=item2f33a67c6b:m:mn68_oDj6kFDHskzNJBE31Q";
  return axios
    .get(sellerURL)
    .then(res => {
      return res.data;
    })
    .then(body => {
      const $ = cheerio.load(body);
      const item = {
        title: $("#CenterPanel")
          .find(".it-ttl")
          .text(),
        seller: $("#CenterPanel")
          .find(".mbg-nw")
          .text(),
        feedback: $("#CenterPanel")
          .find(".mbg-l")
          .text(),
        link: $("#CenterPanel")
          .find(".s-item__link")
          .text(),
        feedBack: $("#CenterPanel")
          .find(".s-item__seller-info-text")
          .text()
      };
      return item;
    })
    .catch(e => console.log(e));
};

module.exports = { searchProduct, searchSellerDetails };
