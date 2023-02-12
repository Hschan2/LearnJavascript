const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const axios = require("axios");

const getNews = () => {
    request(
    {
      url: "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100",
      method: "GET",
      encoding: null,
    },
    (error, response, body) => {
      if (error) {
        console.error(error);
        return;
      }
      if (response.statusCode === 200) {
        console.log("response ok");
        const bodyDecoded = iconv.decode(body, "euc-kr");
        const $ = cheerio.load(bodyDecoded);
  
        const list_text_inner_arr = $(
          ".type06 > li > dl > dt"
        ).toArray();
  
        const result = [];
        list_text_inner_arr.forEach((div) => {
          const aFirst = $(div).find("a").first(); // 첫번째 <a> 태그
          const path = aFirst.attr("href"); // 첫번째 <a> 태그 url
          const url = `https://news.naver.com/${path}`; // 도메인을 붙인 url 주소
          const title = aFirst.text().trim();
  
          const aLast = $(div).find("a").next(); // <두번째(마지막) <a>태그
          const author = aLast.text().trim();
          result.push({
            url,
            title,
            author,
          });
        });
        console.log(result);
      }
    });
  };

getNews();