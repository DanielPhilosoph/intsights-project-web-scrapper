const { SocksProxyAgent } = require("socks-proxy-agent");
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

const { getPostByType, addPosts } = require("../mongo/functions/queries");

const agent = new SocksProxyAgent("socks5h://127.0.0.1:9050");

const getStrongW2iseInfo = async function () {
  try {
    //? Axios request
    let body = await axios.get(
      "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
      { httpAgent: agent }
    );

    //? get all data from db
    const dbDate = await getPostByType("strongW2ise");

    //? set up
    const $ = cheerio.load(body.data);
    let info = [];

    //? get all Titles, push to array
    $("div.row > .col-sm-12 > .pre-header").each((index, element) => {
      info.push({
        type: "strongW2ise",
        title: $(element).text().replace(/\s\s+/g, "").slice(0, -10),
      });
    });

    //? get all Contents, change array objects
    $("div.row > .col-sm-12 > .pre").each((index, element) => {
      info[index] = {
        ...info[index],
        content: $(element).text().replace(/\s\s+/g, ""),
      };
    });

    //? get all Dates and Authors, change array objects
    $("div.row > .col-sm-12 > .pre-footer > .row > div:nth-child(1)").each(
      (index, element) => {
        let arr = $(element).text().replace(/\s\s+/g, "").split(" at ");
        let obj = {};
        obj["author"] = arr[0].slice(10);
        obj["date"] = arr[1];
        info[index] = {
          ...info[index],
          ...obj,
        };
      }
    );

    //? find new posts and add to db
    const newPosts = [];
    for (let i = 0; i < info.length; i++) {
      if (
        !dbDate.find(
          (post) =>
            info[i]["date"] === post.date && info[i]["content"] === post.content
        )
      ) {
        newPosts.push(info[i]);
        dbDate.push(info[i]);
      }
    }
    await addPosts(newPosts);

    console.log(dbDate.length);
    return dbDate;
  } catch (error) {
    console.log(error);
    throw "Could not get data";
  }
};

module.exports = { getStrongW2iseInfo };
