//Import necessary models and packages
import mongoose from 'mongoose';
import { logger } from '../api/utils/index.util'
import dotenv from 'dotenv';
dotenv.config();


//Mongodb setup
export default (function database() {
  const startdb = () => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(<string>process.env.MONGODB_URI, {//MONGODB_URI details can be found in dotenv file
        dbName: process.env.DB_NAME,//DB_NAME details can be found in dotenv file
      })
      .then(() => {
        logger.info('Successfully connected to the database...');
      })
      .catch((err) => {
        logger.error('There was an error connecting to the database:', err.message);
        logger.info('Reconnecting to database...');
        startdb();
      });
  };

  startdb();
})();
