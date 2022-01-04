import { Date } from "mongoose";
import * as mongoose from "mongoose";
import { RestoAdmin } from "./restoAdmin.model.js";

export interface Menu {
    name: string,
    imgUrl: string, 
    description: string,
    price: number,
    quantity: number,
    isAvailable: boolean,
    dateCreated: Date,
    restoAdmin?: {type: mongoose.Types.ObjectId | RestoAdmin}
    
}