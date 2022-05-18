import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use((req, res, next) => {
    const allowedOrigins: string[] = ['https://nlw-return-impulse-track.vercel.app', 'https://nlw-return-impulse-track.vercel.app/', 'http://localhost:3000', 'http://192.168.15.98:3000', 'https://nlw-return-impulse-track-nicholasluz.vercel.app/', 'https://nlw-return-impulse-track-git-main-nicholasluz.vercel.app/'];
    const origin: string = req.headers.origin!;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return next();
  });


app.use(bodyParser.json({limit: '1mb'}))

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333,  () => {
    console.log('HTTP server running!');
});