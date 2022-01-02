import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const inventorySchema = new Schema({
    imgUrl: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isAvailable: { type: Boolean },
    dateCreated: { type: Date },
    restoAdmin: { type: mongoose.Types.ObjectId, ref: "RestoAdmin" }
});
const menuSchema = new Schema({
    name: { type: String, required: true },
    inventory: inventorySchema,
});
export const menuModel = model('Menu', menuSchema);
//# sourceMappingURL=menu.schema.js.map