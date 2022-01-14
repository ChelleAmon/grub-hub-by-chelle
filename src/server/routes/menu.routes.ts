import express from 'express';
import * as menuHelper from '../helpers/menu.helper.js';
import { authHandler } from '../middleware/auth.middleware.js';

const Router = express.Router();

export const getMenusByAdminId = Router.post("/Menus/:adminId", menuHelper.menusByAdminId);
export const postMenu = Router.post("/create-Menu/:adminId", menuHelper.addMenuByAdmin);
export const updateMenu = Router.put("/update-menu/:menuId", menuHelper.updateMenuByAdmin);




