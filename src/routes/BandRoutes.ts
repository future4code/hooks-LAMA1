import express from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandDatabase } from "../database/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const bandRouter = express.Router();

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const bandDatabase = new BandDatabase();
const bandBusiness = new BandBusiness(
  bandDatabase,
  idGenerator,
  tokenGenerator
);
const bandController = new BandController(bandBusiness);

bandRouter.post("/create", (req, res) => bandController.registerBand(req, res));

bandRouter.get("/return", (req, res) => bandController.getBand(req, res));