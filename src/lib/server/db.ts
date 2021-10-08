import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const DB_URL: string = String(process.env.DB_URL);

mongoose.Promise = global.Promise;

try {
  mongoose.connect(DB_URL);
} catch (err) {
  mongoose.createConnection(DB_URL);
}

mongoose.connection
  .once('open', () => console.log('connected to mongodb'))
  .on('error', e => {
    console.log(`couldn't connect to mongodb`)
    throw e;
  });
