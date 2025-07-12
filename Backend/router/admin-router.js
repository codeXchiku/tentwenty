 import { Router } from "express";
 import { getAllUsers,getAllContacts, deleteUser, getUserById, updateUserById } from "../controller/admin-controller.js";
 import userMiddleware from "../middleware/auth-middleware.js";
import adminMiddleware from "../middleware/admin-middleware.js";

 const AdminRouter  = Router();

 AdminRouter.route("/users").get(userMiddleware,adminMiddleware,getAllUsers);
 AdminRouter.route("/contacts").get(userMiddleware,adminMiddleware,getAllContacts);
 AdminRouter.route("/users/delete/:id").delete(userMiddleware,adminMiddleware,deleteUser);
 AdminRouter.route("/users/:id").get(userMiddleware,adminMiddleware,getUserById)
 AdminRouter.route("/users/update/:id").patch(userMiddleware,adminMiddleware,updateUserById)


 export default AdminRouter;