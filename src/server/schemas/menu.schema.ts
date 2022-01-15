import mongoose from 'mongoose';
import type { Menu } from '../../shared/models/menu.model';
const {Schema, model}  = mongoose;


const menuSchema = new Schema<Menu>({
    name: {type: String, required: true},
    imgUrl: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    isAvailable: {type: Boolean},
    dateCreated: {type: Date},
    restoAdmin: {type: mongoose.Types.ObjectId, ref: "RestoAdmin"}

});


export const menuModel = model('Menu', menuSchema)