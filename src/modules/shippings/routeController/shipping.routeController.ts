import { Request, Response } from 'express';
import { ShippingBusinessController } from '../businessController/shipping.businessController';
import { TRACKING } from '../../../utils/const.utils';

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
                status: TRACKING.PENDING
            });

            return res.status(200).send(newShipping);

        } catch (err) {
            return res.status(400).send({ message: err.message });
        }


    }

    public getShipping = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        if (!id) return res.status(400).send({ message: 'id is mandatory' });

        try {
            const shipping = await this.shippingBusinessController.getStatus(id)
            return res.status(200).send(shipping);
        } catch (err) {
            return res.status(400).send({ message: err.message })
        }
    }

    public updateShipping = async (req: Request, res: Response) => {

        const { id } = req.params;
        const { current_lat, current_long, status } = req.body;

        if (!current_lat && !current_long && status) {
            try {
                const shippingEdited = await this.shippingBusinessController.editShipping({
                    id, status, type: TRACKING.TYPE.FIRST_TYPE
                });

                return res.status(200).send(shippingEdited);
            } catch (err) {
                return res.status(400).send({ message: err.message })
            }
        }

        if (current_lat && current_long && !status) {
            try {
                const shippingEdited = await this.shippingBusinessController.editShipping({
                    id, current_lat, current_long, type: TRACKING.TYPE.SECOND_TYPE

                });

                return res.status(200).send(shippingEdited);
            } catch (err) {
                return res.status(400).send({ message: err.message })
            }
        }

        if (current_long && current_lat && status) {
            try {
                const shippingEdited = await this.shippingBusinessController.editShipping({
                    id, status, current_lat, current_long, type: TRACKING.TYPE.SECOND_TYPE
                });

                return res.status(200).send(shippingEdited);
            } catch (err) {
                return res.status(400).send({ message: err.message })
            }
        }

        return res.status(400).send({ message: 'Absence of required fields' });
    }


}