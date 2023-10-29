import express, { Application, Request, Response, json } from 'express';
import { BASE_URL, PORT } from './config';
import { connectDb } from './db';
import dotenv from 'dotenv';
import path from 'path'
import serviceRouter from './routers/serviceRouter';

dotenv.config( { path: path.join(__dirname, '.env') } ); // Cargamos las variables de entorno

// Creamos una instancia de express
const app: Application = express();

// Middlewares
app.use( json() ); // Para leer los json

// Ruta de prueba
app.get(`${BASE_URL}/test`, ( req: Request, res: Response ) => res.json({ msg: 'Servidor OK' }) );

// Rutas
app.use(`${BASE_URL}/services`, serviceRouter);

// Iniciamos la conexión con la BD
connectDb().then( () => {
    // Iniciamos el servidor
    app.listen( PORT, () => {
        console.log('Server listening on port: ', PORT );
    })
})
.catch( (error) => {
    console.log('The following error has been occurred: ', error );
})