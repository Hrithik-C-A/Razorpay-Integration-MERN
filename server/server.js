import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import paymentRoute from './routes/paymentRoute.js'

const app = express();

const port = process.env.PORT;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.use('/api/payment', paymentRoute);

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
});