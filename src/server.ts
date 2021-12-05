import "dotenv/config";
import http from "http";
import express from 'express';

import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);

const server = http.createServer(app);
server.listen(process.env.PORT, () =>
  console.log('Server is running on PORT ' + process.env.PORT)
);

