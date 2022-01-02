import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const adminInfoSchema = new Schema({
    firstName: { type: String, required: true, validate: {
            validator: (firstName) => {
                const doesItContainANumber = /\d/g;
                return !doesItContainANumber.test(firstName);
            },
            message: (props) => `${props.value} contains a number!`
        } },
    lastName: { type: String, required: true, validate: {
            validator: (lastName) => {
                const doesItContainANumber = /\d/g;
                return !doesItContainANumber.test(lastName);
            },
            message: (props) => `${props.value} contains a number!`
        } },
    email: { type: String, required: true, validate: {
            validator: (email) => {
                const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return regex.test(email);
            },
            message: (props) => `${props.value} is not a valid email!`
        } },
    password: { type: String, required: true, minlength: 5 },
    isAdmin: { type: Boolean }
});
const restoAdminSchema = new Schema({
    restoName: { type: String, required: true },
    storeNumber: { type: String, required: true },
    adminInfo: adminInfoSchema,
    timestamp: { type: Date },
    inventories: [{ type: mongoose.Types.ObjectId, ref: "Inventory" }]
});
export const RestoAdminModel = model('RestoAdmin', restoAdminSchema);
//# sourceMappingURL=restoAdmin.schema.js.map