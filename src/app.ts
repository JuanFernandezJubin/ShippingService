import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

//Modules
import { ShippingModule } from './modules/shippings/shipping.module';

export class App {

    public app: Express;

    constructor(private port?: number | string) {
        this.app = express();
        dotenv.config();
        this.settings();
        this.dbConfig();
        this.middlewares();
        this.modulesInit();
    }

    private async dbConfig (){

        const db = new Sequelize({
            database: process.env.DB_NAME,
            dialect: 'mysql',
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            models: [__dirname + '/modules/shippings/models/'],
            // logging:false
        })

        await this.dbStart(db);
    }

    private async dbStart(db: any) {
        
        try {
            await db.authenticate();
            await db.sync({force: true});
            console.log('database connected');
        } catch (err) {
            throw new Error(err);
        }
    }
    
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
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