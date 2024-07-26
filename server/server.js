import express from "express";
import cors from "cors";
import mapRouter from "./router/mapRouter.js";
import memberRouter from "./router/memberRouter.js";

const server = express();
const port = 8080;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use("/map", mapRouter);
server.use("/member", memberRouter);

server.listen(port, () => {
  console.log(`welcome ${port} server start!`);
});
