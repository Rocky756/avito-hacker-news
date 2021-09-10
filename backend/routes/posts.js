const { Router } = require("express");
const router = Router();
const fetch = require('node-fetch');
const formatDistanceToNow = require('date-fns/formatDistanceToNow')


router.route("/").get(async (req, res) => {
  console.log('зашел в ручку');
  // делаем запрос и получаем id новостей (приходит 500 шт.).
  const allStoriesFetch = async() => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories/.json?print=pretty');
    let storiesIdList = await response.json();
    return storiesIdList.slice(0, 100);
  }
  const storiesIdList = await allStoriesFetch(); //  Оставляем 100 самых свежих новостей.
  //Создаем функцию для запроса и получения одной истории
  const getStory = async(id) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    let oneStory = await response.json();
    const time = new Date(oneStory.time*1000);

    oneStory.time = formatDistanceToNow(time, {includeSeconds: true});
    return oneStory;
  }
  // Проходим циклом по массиву id 100 историй и делаем запрос.
  const arrayOfPromises = [];
  for (const id of storiesIdList ) {
    arrayOfPromises.push(getStory(id));
  }
  
  Promise.all(arrayOfPromises.sort((a, b) => a.time - b.time)).then((posts) => {
    console.log(Array.isArray(posts));
    
    res.json({ posts })
  })

})

module.exports = router;
