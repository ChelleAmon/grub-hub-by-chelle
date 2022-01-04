import express from 'express';
import * as menuHelper from '../helpers/menu.helper.js';
const Router = express.Router();
// export const getMenusByAdminId = Router.post("/Menus", menuHelper.menusByAdminId);
export const postMenu = Router.post("/create-Menu/:adminId", menuHelper.addMenuByAdmin);
//# sourceMappingURL=menu.routes.js.map