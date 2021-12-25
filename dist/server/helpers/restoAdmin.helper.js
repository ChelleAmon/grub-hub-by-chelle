import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { RestoAdminModel } from '../schemas/restoAdmin.schema.js';
dotenv.config();
const app = express();
app.use(cookieParser());
const saltRounds = 10;
const access_token = process.env.ACCESS_TOKEN_SECRET;
export function getRestoAdminFn(req, res) {
    RestoAdminModel.find({}, '-password')
        .then((data) => {
        res.json(data);
    })
        .catch((err) => {
        res.status(501).json({ error: err });
    });
}
export async function addRestoAdminFn(req, res) {
    const { restoName, storeNumber, firstName, lastName, email, password, isAdmin, timestamp } = req.body;
    const isStoreNumberUnique = await RestoAdminModel.findOne({ storeNumber }).lean();
    if (isStoreNumberUnique) {
        res
            .status(302)
            .send(`Found ${storeNumber} on file. Please check with your administrator for some assistance.`);
    }
    else if (restoName == '' || storeNumber == '' || firstName == '' || lastName == '' || email == '' || password == '') {
        res.send('Fill up all required fields!');
    }
    else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                const restoAdmin = new RestoAdminModel({ restoName, storeNumber, isAdmin, timestamp: Date.now() });
                restoAdmin.adminInfo = { firstName: firstName, lastName: lastName, email: email, password: hash, isAdmin: true };
                restoAdmin
                    .save()
                    .then((data) => {
                    res.json({ data });
                })
                    .catch((err) => {
                    if (err.name === 'ValidationError') {
                        let arr = [];
                        let errors = {};
                        Object.keys(err.errors).forEach((key) => {
                            err[key] = err.errors[key].message;
                            errors = err[key];
                            arr.push(errors);
                        });
                        return res.status(400).send(arr);
                    }
                    res.status(500).json({ message: 'Something went wrong' });
                });
            });
        });
    }
}
export function loginRestoAdminFn(req, res) {
    const { storeNumber, email, password } = req.body;
    RestoAdminModel.findOne({
        storeNumber: storeNumber,
        'adminInfo.email': email,
    })
        .then((admin) => {
        bcrypt.compare(password, `${admin?.adminInfo.password}`, function (err, result) {
            if (result && admin?.adminInfo.isAdmin == true) {
                const accessToken = jwt.sign({ admin }, access_token);
                res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 100,
                    path: '/api/admin',
                });
                res.status(200).send({ message: 'Successfully logged in' });
            }
            else {
                res
                    .status(403)
                    .send({
                    message: 'Either Store number, email or password is incorrect',
                });
            }
        });
    })
        .catch((err) => {
        res.status(501).send({ Error: 'Something went wrong' });
    });
}
//# sourceMappingURL=restoAdmin.helper.js.map