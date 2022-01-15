import express from "express";
import "../middleware/auth.middleware.js";
import * as restoAdminHelper from "../helpers/restoAdmin.helper.js";
const Router = express.Router();
export const getRestoAdmin = Router.get("/RestoAdmin", restoAdminHelper.getRestoAdminFn);
// export const getRestoAdmin = Router.get("/RestoAdmin", authHandler, restoAdminHelper.getRestoAdminFn);
export const postRestoAdmin = Router.post("/RestoAdmin", restoAdminHelper.addRestoAdminFn);
export const loginRestoAdmin = Router.post("/login", restoAdminHelper.loginRestoAdminFn);
//# sourceMappingURL=restoAdmin.routes.js.map