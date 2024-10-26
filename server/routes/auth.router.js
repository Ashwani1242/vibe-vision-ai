import express from 'express'
import { login, signup } from '../controllers/auth.controller.js';
import { loginValidation, signupValidation } from '../middlewares/auth.validation.js';
const authRoute = express.Router()

authRoute.post('/login', loginValidation, login);
authRoute.post('/signup', signupValidation, signup);

export {authRoute}