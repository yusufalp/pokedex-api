require('dotenv').config();
const express = require('express');
const morgan = require('morgan')

const app = express();

// console.log(process.env.API_TOKEN);

app.use(morgan('common'));

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

app.use(function validateBearerToken(req, res, next) {
  console.log(req.get('Authorization'))
  // const bearerToken = req.get('Authorization').split(' ')[1]
  const apiToken = process.env.API_TOKEN

  // if(bearerToken !== apiToken){
  //   res.status(400).json({error: 'Unauthorized request'})
  // }

  next()
})

function handleGetTypes(req, res) {
  res.json(validTypes);
}

app.get('/types', handleGetTypes)

function handleGetPokemon(req, res) {
  res.send('Hello Pokemon')
}

app.get('/pokemon', handleGetPokemon);

const PORT = 8000;

app.listen(PORT, () => {
  console.log('Server is running on port 8000')
})
