import { Router } from "express";
import controller from "../controller/auth-controller.js"
import {signUpSchema,logInSchema} from "../validator/auth-validator.js";
import validate from "../middleware/validate-middleware.js";
import userMiddleware from "../middleware/auth-middleware.js";

const router = Router();
//rocemmended->
router.route("/").get(controller.Home)
router.route("/about").get(controller.about)
router.route("/register").post(validate(signUpSchema),controller.register)
router.route("/login").post(validate(logInSchema),controller.login)
router.route("/user").get(userMiddleware, controller.userDatas)

  export default router;