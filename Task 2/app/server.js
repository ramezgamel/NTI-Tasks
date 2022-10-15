const express = require("express");
const hbs = require('hbs');
const path = require('path');
const tasksRouter= require('./tasks.routes');

require('dotenv').config();

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'../frontend/views'));

hbs.registerPartials(path.join(__dirname,'../frontend/layouts'))

app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.urlencoded({extended:true}));
app.use(tasksRouter)

app.all("*", (req, res) =>
  res.render("error404", { pageTitle: "page not found" })
);


module.exports = app