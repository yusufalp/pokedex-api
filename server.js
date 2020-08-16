const express = require('express');
const morgan = require('morgan')

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hello')
})

const PORT = 8000;

app.listen(PORT, ()=>{
  console.log('Server is running on port 8000')
})
