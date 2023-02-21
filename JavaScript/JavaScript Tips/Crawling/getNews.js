import fetch from "node-fetch";
import { DOMParser } from 'xmldom'

fetch(`https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=100&date=${new Date().toISOString().slice(0, 10)}&${sectionId}=001`)
  .then(response => response.text())
  .then(html => {
    const re = /<a href="([^"]+)" class="nclicks\(sdt\.[\w\.]+\)">([^<]+)<\/a>/g;
    const articles = [];

    let match;
    while (articles.length < numArticles && (match = re.exec(html))) {
      articles.push({
        title: match[2],
        link: match[1],
      });
    }

    console.log(articles);
  })
  .catch(error => console.error(error));