import http from "http";
import express from 'express';

const app = express();
app.use(express.json());

const server = http.createServer(app);
server.listen(4000, () =>
  console.log('Server is running on PORT 4000')
);

