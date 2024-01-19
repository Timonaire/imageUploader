import 'express-async-errors';
import '../configs/index.config';
import app from './app';
import { logger } from './utils/index.util';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
  logger.info(`listening on port ${PORT}`)
})