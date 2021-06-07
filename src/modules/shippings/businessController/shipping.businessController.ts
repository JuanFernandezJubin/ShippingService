import { ShippingRepository } from '../repositories/shipping.repository';
import {Shipping} from '../models/shipping';

export class ShippingBusinessController {
    private shippingRepository: ShippingRepository;

    constructor(shippingRepository:ShippingRepository = new ShippingRepository()){
        this.shippingRepository = shippingRepository;
    };

    public addNewShipping(shipping: Shipping ){
        return this.shippingRepository.addNewShippingToDb(shipping)
    };

    public editShipping(){

    };

    public getStatus(shippingId : string){
        return this.shippingRepository.getStatusFromDb(shippingId);
    };

};