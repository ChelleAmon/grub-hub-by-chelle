import "express";
import jwt from "jsonwebtoken";
import "../../shared/models/restoAdmin.model.js";
function authHandle(req, res, next) {
    const cookie = req.cookies["jwt"];
    console.log("auth", cookie);
    jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET, (err, result) => {
        console.log("Auth Result: ", result);
        if (err) {
            console.log("Error", err);
            return res.sendStatus(403);
        }
        if (result) {
            req.restoAdmin = result.restoAdmin;
        }
        next();
    });
}
export const authHandler = authHandle;
//# sourceMappingURL=auth.middleware.js.map