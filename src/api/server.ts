import 'express-async-errors';
import '../configs/index.config';
import app from './app';
import { logger } from './utils/index.util';


const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`)
})