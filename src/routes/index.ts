import { Express } from "express"
import apiRouter from "./api"
import webRouter from "./web"

const setUpRouter = (app: Express) => {
  app.use("/", webRouter());
  app.use("/", apiRouter());
}


export default setUpRouter