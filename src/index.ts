import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import connectDB from './db';
import {
  globalErrorHandler,
  routeNotFoundErrorHandler,
} from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

(async () => {
  // Connect to MongoDB
  await connectDB();

  // Middleware
  app.use(express.json());

  // Welcome message
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the CRM Service' });
  });

  // Global error handler (must be last)
  app.use(globalErrorHandler);

  // Route not found error handler
  app.use(routeNotFoundErrorHandler);

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`http://localhost:${port}`);
    // Log on production only
    if (process.env.NODE_ENV === 'production') {
      process.stdout.write(
        `⚠️ Server started on http://localhost:${port} [Production Build]`,
      );
    }
  });
})();
