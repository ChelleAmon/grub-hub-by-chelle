import 'express';
import { menuModel } from '../schemas/menu.schema.js';
import { RestoAdminModel } from '../schemas/restoAdmin.schema.js';
export function menusByAdminId(req, res) {
    RestoAdminModel
        .find({ _id: req.params.adminId }, "-_id -timestamp")
        .populate({
        path: "inventories",
        select: ['name', 'imgUrl', 'description', 'price'],
    })
        .then((data) => {
        res.json({ data });
        console.log({ data });
    })
        .catch((err) => {
        res.status(501).json({ error: err });
    });
}
;
export function addMenuByAdmin(req, res) {
    const { name, imgUrl, description, price, quantity } = req.body;
    const admin = req.params.adminId;
    RestoAdminModel.findById({ _id: admin })
        .then((admindata) => {
        const menu = new menuModel({
            name,
            imgUrl,
            description,
            price,
            quantity,
            isAvailable: true,
            dateCreated: Date.now(),
            restoAdmin: admin
        });
        menu
            .save()
            .then((data) => {
            console.log(data, "Success");
            admindata.inventories.push(menu._id);
            admindata.save()
                .then((resto) => res.status(200).json(resto))
                .catch((err) => res.json("Error on user save: " + err));
        })
            .catch((err) => {
            console.log(err, "menu failed");
            return res.status(500);
        });
    });
}
;
export function updateMenuByAdmin(req, res) {
    const menuId = req.params.menuId;
    const { name, imgUrl, description, price, quantity } = req.body;
    menuModel.findByIdAndUpdate(menuId, {
        $set: { name: name, imgUrl: imgUrl, description: description, price: price, quantity: quantity }
    }, {
        new: true
    }, function (err, updateMenu) {
        if (err) {
            res.status(403).send("Error updating product");
        }
        else {
            res.json(updateMenu);
        }
    });
}
//# sourceMappingURL=menu.helper.js.map