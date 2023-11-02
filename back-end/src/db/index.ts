// Creamos una conexión hacia la base de datos de mongo
import { connect } from "mongoose";

export const connectDb = async (): Promise<void> => {
    const host = process.env.MONGO_URL || 'mongodb://localhost:27017';
    try {
        const info = await connect( host, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, dbName: process.env.MONGO_DB || 'appsalon' }  );
        console.log(`Conecction established on ${ info.connection.host } on database: ${ info.connection.name }`);
    } catch (error) {
        throw error;
    }
}