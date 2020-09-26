const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index',{restaurant:restaurantList.results})
})

app.get('/search', (req, res) => {
  // console.log('req',req.query.keyword)
  const restaurants=restaurantList.results.filter((restaurant)=>{
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  // console.log(restaurants)
  res.render('index',{restaurant:restaurants,keyword:req.query.keyword})
})


app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log('restaurant_id',req.params.restaurant_id)
  const restaurant=restaurantList.results.filter((restaurant)=>{
    return restaurant.id===Number(req.params.restaurant_id)
  })
  res.render('show',{restaurant:restaurant[0]})
  
})

// start and listen on the Express server
app.listen(port, () => {
  // console.log(`Express is listening on localhost:${port}`)
})