export interface RestoAdmin{
    restoName: string,
    restoAddress?: {
        storeNumber: string,
        restoAddress1: string,
        restoAddress2?: string,
        city: string,
        state: string,
        zipcode: string,
        geolocation? : {
            longitude: number,
            latitude: number
        }
    }
    telNumber?: number,
    adminInfo: {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }
}