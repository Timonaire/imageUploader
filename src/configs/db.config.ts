import mongoose from 'mongoose';
import { logger } from '../api/utils/index.util'

export default (function database() {
  const startdb = () => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(<string>process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
      })
      .then(() => {
        logger.info('Successfully connected to zha database...');
      })
      .catch((err) => {
        logger.error('There was an error connecting to zha database:', err);
        logger.info('Reconnecting to database...');
        startdb();
      });
  };

  startdb();
})();