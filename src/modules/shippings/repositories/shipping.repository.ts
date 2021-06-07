import { Shipping } from '../models/shipping';
import { ShippingDto } from '../dto/shipping.dto';

export class ShippingRepository {
    //Register a new Shipping to db
    public addNewShippingToDb(shipping: Shipping) {

    };

    //Update a shipping lat and long || status || aprox_distance
    public updateShipping(shippingId: string) {

    };

    //See the status of the shipping || Return customer + description + status + distance
    public getStatusFromDb(shippingId: string) : ShippingDto{
        const shippingDto = new ShippingDto();
        shippingDto.setDto("John" ,"Desc" , "estado",2);
        return shippingDto;
    }
}