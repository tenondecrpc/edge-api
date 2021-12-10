import "dotenv/config";
import http from "http";
import express from 'express';
import helmet from 'helmet';

import { router } from "./routes";
import { initData } from "./util";

const app = express();

// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

app.use(express.json());
app.use(router);

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  initData();
  console.log('Server is running on PORT ' + process.env.PORT);
});

