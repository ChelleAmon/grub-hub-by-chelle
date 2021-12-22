import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const adminInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});
const restoAdminSchema = new Schema({
    restoName: String,
    adminInfo: adminInfoSchema
});
export const RestoAdminModel = model('RestoAdmin', restoAdminSchema);
//# sourceMappingURL=restoAdmin.schema.js.map