import { Router } from "express";
import  {workEntry}  from "../controller/work-controller.js";
import { currentWeekData } from "../controller/work-controller.js";
import { monthlyData } from "../controller/work-controller.js";
import userMiddleware from "../middleware/auth-middleware.js";
import { getWeekData } from "../controller/work-controller.js";

const workRouter = Router()

workRouter.route("/workEntry").post(userMiddleware,workEntry)
workRouter.route("/currentWeekData").get(userMiddleware,currentWeekData)
workRouter.route("/monthlyData").get(userMiddleware,monthlyData)
workRouter.route("/getWeekData").get(userMiddleware,getWeekData)

export default workRouter