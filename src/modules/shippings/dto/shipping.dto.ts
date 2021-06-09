import Shipping  from '../models/shipping.model';

export class ShippingDto {
    constructor(
        public customer?: string, 
        public descrip?: string,
        public status?: string, 
        public aprox_distance?: number,
        public origin_lat?: number,
        public origin_long?: number,
        public current_lat?: number,
        public current_long?: number,
        public end_lat?: number,
        public end_long?: number,
        public finish_at?: string
    ) { }

    setDtoManually(
        customer?: string, 
        descrip?: string, 
        status?: string, 
        aprox_distance?: number,
        origin_lat?: number,
        origin_long?: number,
        current_lat?: number,
        current_long?: number,
        end_lat?: number,
        end_long?: number,
        finish_at?:string
        ) {
        this.customer = customer;
        this.descrip = descrip;
        this.status = status;
        this.aprox_distance = aprox_distance;
        this.origin_lat = origin_lat;
        this.origin_long = origin_long;
        this.current_lat = origin_lat;
        this.current_long = origin_long;
        this.end_lat = origin_lat;
        this.end_long = end_long;
        this.finish_at = finish_at;
    }

    setDto(shipping: Shipping){
        this.customer = shipping.customer;
        this.descrip = shipping.descrip;
        this.status = shipping.status;
        this.aprox_distance = shipping.aprox_distance;
        this.origin_lat = shipping.origin_lat;
        this.origin_long = shipping.origin_long;
        this.current_lat = shipping.origin_lat;
        this.current_long = shipping.origin_long;
        this.end_lat = shipping.origin_lat;
        this.end_long = shipping.end_long;
        this.finish_at =  shipping.finish_at.toUTCString();
    }
}