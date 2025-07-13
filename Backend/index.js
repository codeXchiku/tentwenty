import express from 'express';
import authRoute from './router/auth-routes.js';
import workRouter from './router/work-routes.js'
import connectDb from './utils/db.js';
import errorMiddleWare from './middleware/error-middleware.js';
import cors from 'cors'

const app = express();
const port = 3000;

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/Work",workRouter)

app.use(errorMiddleWare)

// Connect to the database and start the server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}).catch((error) => {
  console.log("Connection failed", error);
});