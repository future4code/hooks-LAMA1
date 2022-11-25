import express  from "express";
import { UserController } from "../controller/UserController";
import {IdGenerator} from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../database/UserDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const userRouter = express.Router()

const hashGenerator = new HashManager()
const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()

const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness (userDatabase, hashGenerator, idGenerator, tokenGenerator )
const userController = new UserController(userBusiness)

userRouter.post('/signup', (req, res) => userController.signUp (req, res))
userRouter.post('/login', (req, res) => userController.login (req, res))