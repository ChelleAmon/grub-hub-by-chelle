import 'express';
import { menuModel } from '../schemas/menu.schema.js';
export function menusByAdminId(req, res) {
    menuModel.find({ restoAdmin: req.body.name })
        .populate({
        path: 'inventory',
        populate: {
            path: "storeNumber",
            model: 'restoAdmin'
        }
    })
        .then((data) => {
        res.json({ data });
    })
        .catch((err) => {
        res.status(501).json({ error: err });
    });
}
//# sourceMappingURL=menu.helper.js.map