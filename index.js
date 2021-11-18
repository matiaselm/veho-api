// server.js
import dotenv from 'dotenv';
import express from 'express';
import connectMongo from './db/db.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import carRoute from './routes/carRoute.js';
import orderRoute from './routes/orderRoute.js';
import bodyParser from 'body-parser';

dotenv.config({ path: '.env' });

const currentDate = new Date();
const time = currentDate.getHours() + ":" + currentDate.getMinutes();

(async () => {
  try {
    const conn = await connectMongo();
    const app = express();
    app.use(cors())
    app.use(bodyParser.json());

    if (conn) {
      console.log(`[${time}] Mongo connected`);
    } else {
      console.error({ message: `[${time}] Connection to mongo failed` })
    }

    app.use('/users',  userRoute);
    app.use('/cars',   carRoute);
    app.use('/orders', orderRoute);
    app.listen({ port: 3000 });
    console.log(`[${time}] Server ready at localhost:3000`);
  } catch (e) {
    console.error(`[${time}]`, e)
  }
})();