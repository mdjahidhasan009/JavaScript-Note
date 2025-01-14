import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import dotenv from 'dotenv';
import invoiceRouter from "./routes/invoice"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4009;

// Middleware
app.use(cors());
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", invoiceRouter)


// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Express + TypeScript Server' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error("Error",err.stack);
  res.status(500).json({ message: err?.message ?? "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
