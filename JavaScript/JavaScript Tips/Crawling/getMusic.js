const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async () => {
  try {
    // 1
    const html = await axios.get("https://www.genie.co.kr/chart/top200");
    let ulList = [];
    // 2
    const $ = cheerio.load(html.data);
    // 3
    const bodyList = $("tr.list");
    bodyList.map((i, element) => {
      ulList[i] = {
        rank: i + 1,
        // 4
        id: i + 1,
        rank: $(element).find("td.number:nth-child(2)").text().replace(/\s/g, ""),
        title: $(element).find("td.info a.title").text().replace(/^\s+|\s+$/gm, ""),
        artist: $(element).find("td.info a.artist").text().replace(/^\s+|\s+$/gm, ""),
      };
    });
    console.log("bodyList : ", ulList);
  } catch (error) {
    console.error(error);
  }
};

getHtml();