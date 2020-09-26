"use strict";

var express = require('express');

var app = express();
var port = 3000;

var exphbs = require('express-handlebars');

var restaurantList = require('./restaurant.json'); //express template engine


app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); //setting static files

app.use(express["static"]('public')); // routes setting

app.get('/', function (req, res) {
  res.render('index', {
    restaurant: restaurantList.results
  });
});
app.get('/search', function (req, res) {
  // console.log('req',req.query.keyword)
  var restaurants = restaurantList.results.filter(function (restaurant) {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase());
  }); // console.log(restaurants)

  res.render('index', {
    restaurant: restaurants,
    keyword: req.query.keyword
  });
});
app.get('/restaurants/:restaurant_id', function (req, res) {
  // console.log('restaurant_id',req.params.restaurant_id)
  var restaurant = restaurantList.results.filter(function (restaurant) {
    return restaurant.id === Number(req.params.restaurant_id);
  });
  res.render('show', {
    restaurant: restaurant[0]
  });
}); // start and listen on the Express server

app.listen(port, function () {// console.log(`Express is listening on localhost:${port}`)
});