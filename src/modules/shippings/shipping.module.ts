import { Express } from 'express';
import { ShippingRouteController } from "./routeController/shipping.routeController";
import { Routes } from "./routes";

export class ShippingModule {
    public route: Routes;

    constructor(app: Express) {
        this.route = new Routes(app, new ShippingRouteController());
    }

}