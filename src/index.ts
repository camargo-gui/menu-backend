import "dotenv/config";
import express from "express";
import { DateTime } from "luxon";
import { useContainer, useExpressServer } from "routing-controllers";
import { diContainer } from "di-container";
import { StatusCodes } from "http-status-codes";

DateTime.local().setZone("America/Sao_Paulo");

const app = express();
useContainer(diContainer);
useExpressServer(app,{
  validation: true,
  defaultErrorHandler: false,
});
app.listen(3344);


app.get("/", (req, res) => res.status(StatusCodes.OK).send());