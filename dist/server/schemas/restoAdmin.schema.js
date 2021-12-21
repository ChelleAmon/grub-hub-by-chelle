import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const restoAdminSchema = new Schema({
    restoName: String,
    adminInfo: {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    }
});
export const RestoAdminModel = model('RestoAdmin', restoAdminSchema);
//# sourceMappingURL=restoAdmin.schema.js.map