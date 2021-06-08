import { Request, Response } from 'express';
import { ShippingBusinessController } from '../businessController/shipping.businessController';
import Shipping from '../models/shipping.model';

export class ShippingRouteController {
    private shippingBusinessController: ShippingBusinessController;

    constructor(shippingBusinessController: ShippingBusinessController = new ShippingBusinessController()) {
        this.shippingBusinessController = shippingBusinessController;
    }

    public addShipping = async (req: Request, res: Response) => {
        
        const {
            customer,
            descrip,
            origin_lat,
            origin_long,
            end_lat,
            end_long
        } = req.body;
        console.log(req.body)

        if (!customer || !descrip || !origin_lat || !origin_long || !end_lat || !end_long) {
            return res.status(400).send({ message: 'All the fields are mandatory' });
        };

        try {
            
            const newShipping = await this.shippingBusinessController.addNewShipping({
                customer,
                descrip,
                origin_lat,
                origin_long,
                end_lat,
                end_long,
                status: 'Pending'
            });

            return res.status(200).send(newShipping);
        
        } catch (err) {
            return res.status(400).send({ message: 'Error creating a new shipping' })
        }


    }

    public getShipping = (req: Request, res: Response) => {
        const { id } = req.params;
        return res.json(this.shippingBusinessController.getStatus(id));
    }

    public updateShipping = (req: Request, res: Response) => {
        const { id } = req.params;
        const { newShipping } = req.body;
        return this.shippingBusinessController.editShipping();
    }


}