import express from "express";
import { authHandler } from "../middleware/auth.middleware.js";
import * as restoAdminHelper from "../helpers/restoAdmin.helper.js";
import { RestoAdminModel } from "../schemas/restoAdmin.schema.js";
const Router = express.Router();
export const getRestoAdmin = Router.get("/RestoAdmin", authHandler, function (req, res) {
    RestoAdminModel.find()
        .then((data) => {
        res.json(data);
        console.log(data);
    })
        .catch((err) => {
        res.status(501).json({ error: err });
    });
});
// export const getRestoAdmin = Router.get("/getRestoAdmin", authHandler, restoAdminHelper.getRestoAdminFn);
export const postRestoAdmin = Router.post("/RestoAdmin", restoAdminHelper.addRestoAdminFn);
export const loginRestoAdmin = Router.post("/login", restoAdminHelper.loginRestoAdminFn);
//# sourceMappingURL=restoAdmin.routes.js.map