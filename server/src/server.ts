import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://nlw-return-impulse-track.vercel.app")
    app.use(cors());
    next();
});

app.use(bodyParser.json({limit: '1mb'}))

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333,  () => {
    console.log('HTTP server running!');
});