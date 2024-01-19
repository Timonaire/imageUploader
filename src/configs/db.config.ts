//Import necessary models and packages
import mongoose from 'mongoose';
import { logger } from '../api/utils/index.util'


//Mongodb setup
export default (function database() {
  const startdb = async () => {
    mongoose.set('strictQuery', false);
    await mongoose
      .connect(<string> process.env.MONGODB_URI)
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
