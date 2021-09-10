const { Router } = require("express");
const router = Router();
const fetch = require('node-fetch');
const formatDistanceToNow = require('date-fns/formatDistanceToNow')


router.get("/", async (req, res) => {
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
    res.json({ posts })
  })
})  

router.post("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const {kids} = req.body;
  console.log('ID:', id);
  console.log('Kids:', kids);
  const commentFetch = async(com) => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${com}/.json?print=pretty`);
    let comment = await response.json();
    return comment;
  }
  const commentArr = Array(kids.length+1).fill(Array().fill());
  console.log(commentArr[0].length);
  commentArr[0] = kids.map((el) => commentFetch(el));

  Promise.all(commentArr).then((arr) => {
    console.log(arr);
    for (let i=0; i < arr[0]?.length; i++) {
      for (let j=0; j <= arr[0][i]?.kids?.length; j++) {
        arr[i+1].push(commentFetch(arr[0][i]?.kids[j]));
      }
    }
    Promise.all(arr).then((comments) => {
      console.log('>>>><<<<<', comments);
      res.json({ comments })
    })
  })
})
// Promise.all(commentArr).then((arr) => {
//   console.log(arr);
//   for (let i=0; i < arr[0]?.length; i++) {
//     for (let j=0; j <= arr[0][i]?.kids?.length; j++) {
//       arr[i+1].push(commentFetch(arr[0][i]?.kids[j]));
//     }
//   }
//   Promise.all(arr).then((comments) => {
//     // console.log(comments);
//     res.json({ comments })
//   })
// })

// const commentArr = Array(kids.length+1).fill(Array().fill());
//   console.log(commentArr[0].length);
//   for (let com of kids) {
//     commentArr[0].push(commentFetch(com));
//   }

module.exports = router;
