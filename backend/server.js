const dotenv = require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const http = require('http')
const cors = require("cors");
const postsRouter = require('./routes/posts');


const app = express();;

app.use(cors());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

console.log('в server.js');

app.use('/posts', postsRouter)

app.listen(process.env.PORT|| 5000, () => {
  console.log(`Server started on port: ${process.env.PORT}`)
})
