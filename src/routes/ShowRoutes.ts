import express  from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowController } from "../controller/ShowController";
import { ShowDatabase } from "../database/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const showRouter = express.Router()

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator()

const showDatabase = new ShowDatabase();
const showBusiness = new ShowBusiness(showDatabase, idGenerator, tokenGenerator);
const showController = new ShowController(showBusiness)

showRouter.post('/create', (req, res) => showController.createShow(req, res))

showRouter.get('/get/:day', (req, res) => showController.getShowsByDay(req, res))