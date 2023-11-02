// Cargamos las variables de entorno
import { CorsOptions } from 'cors';


const whiteList = ['http://localhost:5173', undefined];
export const origins: CorsOptions = { origin: (origin, callback) => {
    if ( whiteList.includes(origin as string) ) {
        callback(null, true);
    } else {
        callback( new Error('Not allowed by CORS') );
    }
}}
export const PORT = process.env.PORT || 4000;
export const BASE_URL = '/api/v1';