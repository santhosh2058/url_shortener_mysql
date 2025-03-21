import express from 'express'
import { shortnedRoutes } from './routes/shortener.routes.js';


const PORT = process.env.PORT || 3000;

const app =express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.use(shortnedRoutes);

app.listen(PORT,"0.0.0.0",()=>{
  console.log(`listening on port ${PORT}`);
});