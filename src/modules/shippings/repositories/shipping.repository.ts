import Shipping from '../models/shipping.model';

//Utils
import { calculateDistance } from '../../../utils/helpers.utils';
import { TRACKING } from '../../../utils/const.utils';


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
        });

        if (!newShipping) throw new Error('Error creating a new shipping');

        return newShipping;
    }

    //See the status of the shipping || Return customer + description + status + distance
    public async getStatusFromDb(shippingId: string): Promise<Shipping> {

        const shipping = await Shipping.findByPk(shippingId);

        if (!shipping) throw new Error('We cant find this shipping');

        return shipping;
    }

    //Update a shipping lat and long || status || aprox_distance
    public async updateShipping(shipping: any) {

        const { id, current_lat, current_long, status } = shipping;
        const shippingToUpdate = await Shipping.findByPk(id);

        if (!shippingToUpdate) throw new Error('We cant find the shipment');

        const aprox_distance = await calculateDistance(current_lat, current_long, shippingToUpdate.end_lat, shippingToUpdate.end_long);

        shippingToUpdate.aprox_distance = aprox_distance;
        shippingToUpdate.current_lat = current_lat;
        shippingToUpdate.current_long = current_long;
        shippingToUpdate.status = status;
        await shippingToUpdate.save();

        return 'Updated Shipping';
    }

    public async shipmentChangeStatus(id: string, status:string): Promise<String> {

        const shipping = await Shipping.update(
            { status: status },
            { where: { id } });

        if (shipping[0] === 0) throw new Error('We could not update the shipment');

        return status === TRACKING.CANCELED ?  'Shipment Canceled' :  'Status Updated';

    }

    public async shippingDelivered(shippingId: string): Promise<Shipping> {

        const shippingToUpdate = await Shipping.findByPk(shippingId);
        if (!shippingToUpdate) throw new Error('We could not find the shipment');

        shippingToUpdate.current_lat = shippingToUpdate.end_lat;
        shippingToUpdate.current_long = shippingToUpdate.end_long;
        shippingToUpdate.finish_at = new Date();
        shippingToUpdate.aprox_distance = 0;
        shippingToUpdate.status = TRACKING.DELIVERED;
        await shippingToUpdate.save();

        return shippingToUpdate;
    }


}