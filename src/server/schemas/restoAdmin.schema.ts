import mongoose from 'mongoose';
import type { RestoAdmin } from "../../shared/models/restoAdmin.model";

const{ Schema, model } = mongoose;


const restoAdminSchema = new Schema<RestoAdmin>({
    restoName: String, 
    adminInfo: {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    }
})


export const RestoAdminModel = model('RestoAdmin', restoAdminSchema)