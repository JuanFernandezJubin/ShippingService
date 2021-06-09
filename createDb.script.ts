import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '/.env'});

const dbName = process.env.DB_NAME || 'testing';

function createDB (){
    createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }).then( conn => {
        conn.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
        .then( result => {
            console.log('db created');
            process.exit(0)
        })
    })

}

createDB();


