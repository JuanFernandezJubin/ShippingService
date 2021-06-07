import express, { Express } from 'express';
import morgan from 'morgan';

//Modules
import { ShippingModule } from './modules/shippings/shipping.module';

export class App {

    public app: Express;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.modulesInit();
    }

    private middlewares() {
        this.app.use(morgan('dev'));
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    public async listen(): Promise<void> {
        this.app.listen(this.app.get('port'));
        console.log('Express Server listening on port: ' + this.app.get('port'));
    }

    private modulesInit() {
        const shippingModule = new ShippingModule(this.app);
    }
}