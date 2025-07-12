import { Router } from "express";
import  {workEntry}  from "../controller/work-controller.js";
import { getWeekData } from "../controller/work-controller.js";
import { monthlyData } from "../controller/work-controller.js";
import userMiddleware from "../middleware/auth-middleware.js";

const workRouter = Router()

workRouter.route("/workEntry").post(userMiddleware,workEntry)
workRouter.route("/getWeekData").get(userMiddleware,getWeekData)
workRouter.route("/monthlyData").get(userMiddleware,monthlyData)

export default workRouter