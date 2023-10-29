import { connectDb } from "../db";
import { servicesData } from "./services";
import path from 'path';
import dotenv from 'dotenv';
import Service from "../models/serviceModel";

// Cargamos las variables de entorno en el script
dotenv.config({ path: path.join(__dirname, '../', '.env') })

// Leemos los datos del script
const operation = process.argv[2];

// Definimos las funciones de utilidad
// Función para ingresar los datos
const insertData = async () => {
    await Service.insertMany( servicesData );
    console.log('Data inserted correctly...');
    process.exit(0);
}

// Función para eliminar los datos
const cleanData = async () => {
    await Service.deleteMany();
    console.log('Services deleted correctly');
    process.exit(0);
}

// Esperamos la conexión a la BD
connectDb(); 

// Si la operacion es --import entonces hacemos una importación masiva de los datos
if ( operation == '--import' ) {
    insertData();
} else { // --clean
    cleanData();
}