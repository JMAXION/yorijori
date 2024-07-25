import express from "express";
import cors from "cors";
import mapRouter from "./router/mapRouter.js";

const server = express();
const port = 8080;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use("/map", mapRouter);

server.listen(port, () => {
  console.log(`welcome ${port} server start!`);
});
