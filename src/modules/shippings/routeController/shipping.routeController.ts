import { Request, Response } from 'express';
import { ShippingBusinessController } from '../businessController/shipping.businessController';

export class ShippingRouteController {
    private shippingBusinessController: ShippingBusinessController;

    constructor(shippingBusinessController: ShippingBusinessController = new ShippingBusinessController()) {
        this.shippingBusinessController = shippingBusinessController;
    }

    public addShipping = (req: Request, res: Response) => {

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