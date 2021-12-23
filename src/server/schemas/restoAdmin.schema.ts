import mongoose from 'mongoose';
import type { RestoAdmin } from "../../shared/models/restoAdmin.model";

const{ Schema, model } = mongoose;

const adminInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
})

const restoAdminSchema = new Schema<RestoAdmin>({
    restoName: String, 
    storeNumber: String,
    adminInfo: adminInfoSchema
})


export const RestoAdminModel = model('RestoAdmin', restoAdminSchema)
