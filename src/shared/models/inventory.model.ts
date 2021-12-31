import { Date } from "mongoose";

export interface Inventory {
    menu: {
        name: string,
        imgUrl?: string, 
        description: string,
        price: number,
        quantity: number,
        isAvailable: boolean,
        dateCreated: Date
    }
}