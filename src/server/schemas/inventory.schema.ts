import mongoose from 'mongoose';
import type { Inventory } from '../../shared/models/inventory.model';
const {Schema, model}  = mongoose;


const menuSchema = new Schema({
    name: {type: String, required: true},
    imgUrl: {type: String},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    isAvailable: {type: Boolean},
    dateCreated: {type: Date}
});

const inventorySchema = new Schema<Inventory>({
    menu: menuSchema,
});


export const inventoryModel = model('Inventory', inventorySchema)