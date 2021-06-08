
import Shipping from '../models/shipping.model';
import { ShippingDto } from '../dto/shipping.dto';

export class ShippingRepository {
    //Register a new Shipping to db
    public async addNewShippingToDb(shipping: any) {
    
    console.log(shipping.aprox_distance)
        const newShipping = await Shipping.create({
            customer: shipping.customer,
            descrip: shipping.descrip,
            status: shipping.status,
            origin_lat: shipping.origin_lat,
            origin_long: shipping.origin_long,
            current_lat: shipping.origin_lat,
            current_long: shipping.origin_long,
            end_lat: shipping.end_lat,
            end_long: shipping.end_long,
            aprox_distance: shipping.aprox_distance,
        })

        return newShipping
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