import { ShippingRepository } from '../repositories/shipping.repository';
import {ShippingDto} from '../dto/shipping.dto';

//Utils
import { TRACKING } from '../../../utils/const.utils';
import { calculateDistance } from '../../../utils/helpers.utils';


//Logistic Operator Class
export class ShippingBusinessController {
    private shippingRepository: ShippingRepository;

    constructor(shippingRepository: ShippingRepository = new ShippingRepository()) {
        this.shippingRepository = shippingRepository;
    };

    public async getStatus(shippingId: string): Promise<ShippingDto> {
        const sToReturn = await this.shippingRepository.getStatusFromDb(shippingId) 
        const shDto = new ShippingDto();
        shDto.setDtoManually(sToReturn.customer,sToReturn.descrip,sToReturn.status,sToReturn.aprox_distance);
        return shDto;
    };

    public async addNewShipping(shipping: any): Promise<ShippingDto>{

        //Organizing our shipping info
        shipping.current_lat = shipping.origin_lat,
        shipping.current_long = shipping.origin_long,
        shipping.aprox_distance = await calculateDistance(
            shipping.current_lat, shipping.current_long, shipping.end_lat, shipping.end_long);
        
        const sToReturn = await this.shippingRepository.addNewShippingToDb(shipping);
        const shDto = new ShippingDto();
        shDto.setDtoManually(
            sToReturn.customer,
            sToReturn.descrip,
            sToReturn.status,
            sToReturn.aprox_distance,
            sToReturn.origin_lat,
            sToReturn.origin_long,
            sToReturn.current_lat,
            sToReturn.current_long,
            sToReturn.end_lat,
            sToReturn.end_long,
        );

        
        return shDto;
    };

    public async editShipping(sToModify: any) {

        switch (sToModify.type) {
            case TRACKING.TYPE.FIRST_TYPE: {

                if (sToModify.status === TRACKING.CANCELED || sToModify.status === TRACKING.IN_PROCESS) 
                    return this.shippingRepository.shipmentChangeStatus(sToModify.id,sToModify.status);
                if (sToModify.status === TRACKING.DELIVERED){
                    const finalDto = await this.deliveredAction(sToModify.id)
                    return finalDto;
                }
                
                throw new Error('We only accept 4 options for status');
            }
            case TRACKING.TYPE.SECOND_TYPE: {

                if (sToModify.status === TRACKING.DELIVERED){
                    const finalDto = await this.deliveredAction(sToModify.id)
                    return finalDto;
                }

                if (sToModify.status === TRACKING.CANCELED){
                    return this.shippingRepository.shipmentChangeStatus(sToModify.id,sToModify.status)
                }

                if(this.testStatus(sToModify.status)){
                    return this.shippingRepository.updateShipping({
                        id: sToModify.id,
                        current_lat: sToModify.current_lat,
                        current_long: sToModify.current_long,
                        status: TRACKING.IN_PROCESS,
                    });
                }
                throw new Error ('Error in the status of the shipment')
            }

        }
    };

    private async deliveredAction(id: string){
        const sToConvert = await this.shippingRepository.shippingDelivered(id); 
        const shDto = new ShippingDto();
        shDto.setDto(sToConvert);
        return shDto;
    }

    private  testStatus(status: string): Boolean{
        const statusArr = Object.values(TRACKING)
        console.log(status)
        if(statusArr.indexOf(status) === 0 || !status) return true;
        return false;
    }



};