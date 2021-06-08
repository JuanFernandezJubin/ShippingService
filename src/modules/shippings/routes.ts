import { Express } from 'express';
import { ShippingRouteController } from "./routeController/shipping.routeController";

export class Routes {
    private routeController: ShippingRouteController;
    
    constructor(app: Express, routeController: ShippingRouteController) {
        this.routeController = routeController;
        this.configRoutes(app);
    }

    private configRoutes(app: Express) {
        app.route('/shipping/:id')
            .get(this.routeController.getShipping);
        app.route('/shipping')
            .post(this.routeController.addShipping);
        app.route('/shipping/:id')
            .put(this.routeController.updateShipping)
    }
    
}