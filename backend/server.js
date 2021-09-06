const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const http = require('http')
const cors = require("cors");


const app = express();;

app.use(cors());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json());

app.listen(process.PORT|| 5000, () => {
  console.log(`Server started on port: ${process.env.PORT}`)
})
