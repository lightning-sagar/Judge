import express from 'express';
import cors from "cors"
import submission from './routes/submission.route.js'

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World');
});


//suspended

app.use('/api/c',submission);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Main backend server running on port 3000');
});