export class ShippingDto {
    constructor(
        public customer?: string, 
        public descrip?: string,
        public status?: string, 
        public aprox_distance?: number
    ) { }

    setDto(customer: string, descrip: string, status: string, aprox_distance: number) {
        this.customer = customer;
        this.descrip = descrip;
        this.status = status;
        this.aprox_distance = aprox_distance;
    }
}