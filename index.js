const cheerio = require('cheerio');
const superagent = require('superagent');

const getHtml = async url => {
  let html = await superagent.get(url);
  return html.res.text;
};

const formatFriday = string => {
  let fixedString = string.split(/(Kött|Fisk|Veggi)\b/g);
  console.log(fixedString, 'FIXED');
  return fixedString;
};

const findMeny = async () => {
  const data = await getHtml('http://kista.eatery.se');
  let $ = cheerio.load(data);
  let fullSidebar = $('.sidebar').text();
  let sideBar = fullSidebar.split(/(Måndag|Tisdag|Onsdag|Torsdag|Fredag)\b/g);
  const weekDays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];
  let fullJson = {};
  for (let i = 0; i < sideBar.length; i++) {
    fullJson[weekDays[i]] = {};
    if (i % 2 === 0 && i !== 0) {
      let weekday = i - 2;
      let formatedDay = sideBar[i].split('\n', 6);
      formatedDay = formatedDay.filter(e => e !== '');
      formatedDay.shift();
      formatedDay.pop();

      for (var j = 0; j < formatedDay.length; j++) {
        formatedDay[j].split(': ', 3);
        // fullJson[weekday] = {
        //   Fisk: formatedDay[j].split(' ', 1)
        //
        // };
      }
      console.log(formatedDay);
    }
  }
  console.log(JSON.stringify(fullJson, null, 2));
  let lastLine = sideBar[8].split(/(Kött|Fisk|Veggi)\b/g);
  // console.log(lastLine[2].split(':', 2));
  // console.log(lastLine[6].split('\n', 1));
  return sideBar;
};

console.log(findMeny());
