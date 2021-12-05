import "dotenv/config";
import http from "http";
import express from 'express';

const app = express();
app.use(express.json());

const server = http.createServer(app);
server.listen(process.env.PORT, () =>
  console.log('Server is running on PORT ' + process.env.PORT)
);

