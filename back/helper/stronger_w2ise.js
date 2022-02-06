const { SocksProxyAgent } = require("socks-proxy-agent");
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");

const agent = new SocksProxyAgent("socks5h://127.0.0.1:9050");

const getInfo = async function () {
  try {
    //? Axios request
    let body = await axios.get(
      "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
      { httpAgent: agent }
    );

    //? get all data from file
    const rawData = fs.readFileSync("./assets/stronger_w2ise.json");
    let fileData = [];
    if (rawData.length !== 0) {
      fileData = JSON.parse(rawData);
    }

    //? set up
    const $ = cheerio.load(body.data);
    let info = [];

    //? get all Titles, push to array
    $("div.row > .col-sm-12 > .pre-header").each((index, element) => {
      info.push({
        Title: $(element).text().replace(/\s\s+/g, "").slice(0, -10),
      });
    });

    //? get all Contents, change array objects
    $("div.row > .col-sm-12 > .pre").each((index, element) => {
      info[index] = {
        ...info[index],
        Content: $(element).text().replace(/\s\s+/g, ""),
      };
    });

    //? get all Dates and Authors, change array objects
    $("div.row > .col-sm-12 > .pre-footer > .row > div:nth-child(1)").each(
      (index, element) => {
        let arr = $(element).text().replace(/\s\s+/g, "").split(" at ");
        let obj = {};
        obj["Author"] = arr[0].slice(10);
        obj["Date"] = arr[1];
        let id = info[index]["Content"].slice(0, 25) + arr[1];
        id = id.replace(/\s/g, "");
        obj["id"] = id;
        info[index] = {
          ...info[index],
          ...obj,
        };
      }
    );

    //? compare info to file data, and adding to file data if does not exists
    for (let i = 0; i < info.length; i++) {
      if (!fileData.find((post) => info[i]["id"] === post.id)) {
        fileData.push(info[i]);
      }
    }

    fs.writeFileSync("./assets/stronger_w2ise.json", JSON.stringify(fileData));
    console.log(fileData.length);
    return fileData;
  } catch (error) {
    console.log(error);
    throw "Could not get data";
  }
};

module.exports = { getInfo };
