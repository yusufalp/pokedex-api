require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const POKEDEX = require('./pokedex.json');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting));

app.use(helmet());
app.use(cors());

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
})

function handleGetTypes(req, res) {
  res.json(validTypes);
}

app.get('/types', handleGetTypes)

function handleGetPokemon(req, res) {
  const { name = '', type = '' } = req.query;

  let filterByName = POKEDEX.pokemon.filter(item =>
    item.name.toLowerCase().includes(name)
  )

  let results = []
  filterByName.filter(item =>
    item.type.map(itemType => {
      if (itemType.toLowerCase().includes(type.toLowerCase())) {
        results.push(item)
      }
    }
    )
  )
  res.send(results);
}

app.get('/pokemon', handleGetPokemon);

app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'Server Error' } }
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server is running on port 8000')
})
