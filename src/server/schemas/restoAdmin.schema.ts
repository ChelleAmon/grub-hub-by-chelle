import mongoose from 'mongoose';
import type { RestoAdmin } from "../../shared/models/restoAdmin.model";

const{ Schema, model } = mongoose;

const adminInfoSchema = new Schema({
    firstName: {type: String, required: true, validate: {
        validator: (firstName: string) => {
            const doesItContainANumber = /\d/g;
            return !doesItContainANumber.test(firstName)
        }, 
        message: (props:any) => `${props.value} contains a number!`
    }},
    lastName: {type: String, required: true, validate: {
        validator: (lastName: string) => {
            const doesItContainANumber = /\d/g;
            return !doesItContainANumber.test(lastName)
        },
        message: (props: any) => `${props.value} contains a number!`
    }},
    email:  {type: String, required: true, validate : {
        validator: (email: string) => {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return regex.test(email)
        },
        message: (props: any) => `${props.value} is not a valid email!`
    }},
    password: {type: String, required: true, minlength: 5 },
    isAdmin: {type: Boolean}
})

const restoAdminSchema = new Schema<RestoAdmin>({
    restoName: {type: String, required: true}, 
    storeNumber: {type: String, required: true},
    adminInfo: adminInfoSchema,
    timestamp: {type: Date}
})


export const RestoAdminModel = model('RestoAdmin', restoAdminSchema)
