
import Shipping from '../models/shipping.model';

export class ShippingRepository {
    //Register a new Shipping to db
    public async addNewShippingToDb(shipping: any) {

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

        if(!newShipping) throw new Error('Error creating a new shipping');
        
        return newShipping
    };

    //Update a shipping lat and long || status || aprox_distance
    public updateShipping(shippingId: string) {

    };

    //See the status of the shipping || Return customer + description + status + distance
    public async getStatusFromDb(shippingId: string) : Promise<Shipping> {
            const shipping = await Shipping.findByPk(shippingId);
            if(!shipping) throw new Error('We cant find this shipping');
            return shipping;
    }
}