import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//grab ejs index
app.get('/', (req, res) => {
  res.render('index');
});

//post joke after submit to after grabbing from api via url
app.post('/joke', async (req, res) => {
  const { name, category } = req.body;
  const url = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw`;

  //capture result 
  try 
  {
    const response = await axios.get(url);
    const jokeData = response.data;
    res.render('result', { name, jokeData });
  } 
  
  //if there is error report error message
  catch (error) 
  {
    res.render('error', { message: 'Failed to fetch a joke. Try again!' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
