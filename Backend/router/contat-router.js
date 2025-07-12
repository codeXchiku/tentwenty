import { Router } from "express";
import contactForm from "../controller/contact-controller.js";

const contactRouter = Router()

contactRouter.route("/contact").post(contactForm)

export default contactRouter