import { ShippingRepository }  from '../repositories/shipping.repository';
import Shipping from '../models/shipping.model';

//Logistic Operator Class
export class ShippingBusinessController {
    private shippingRepository: ShippingRepository;

    constructor(shippingRepository:ShippingRepository = new ShippingRepository()){
        this.shippingRepository = shippingRepository;
    };

    public async addNewShipping(shipping: any ){
        //Organizing our shipping info
        shipping.current_lat =  shipping.origin_lat,
        shipping.current_long = shipping.origin_long,
        shipping.aprox_distance = await this.calculateDistance(
            shipping.current_lat, shipping.current_long, shipping.end_lat,shipping.end_long);

        return this.shippingRepository.addNewShippingToDb(shipping)
    };

    public async editShipping(){

    };

    public async getStatus(shippingId : string){
        return this.shippingRepository.getStatusFromDb(shippingId);
    };

    //Handlres
    private async calculateDistance(x1: number, y1: number, x2: number, y2: number){        
        return Math.sqrt((Math.pow((x2 - x1),2)+ Math.pow((y2-y1),2)));
    }

};