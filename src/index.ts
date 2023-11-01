import "reflect-metadata"
import "dotenv/config";
import { DateTime } from "luxon";
import { diContainer } from "./di-container";
import { StatusCodes } from "http-status-codes";
import { InversifyExpressServer } from "inversify-express-utils";
import { json } from "express";

import './onboarding/adapters/controllers/onbording-controller'



DateTime.local().setZone("America/Sao_Paulo");

const server = new InversifyExpressServer(diContainer);
server.setConfig((app)=> app.use(json()))
const app = server.build();
app.listen(3344);

app.get("/", (req, res) => res.status(StatusCodes.OK).send("Olá"));