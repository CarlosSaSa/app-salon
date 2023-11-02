// Para crear los modelos
import { Schema, model } from "mongoose";

// Interface para definir la estructura de un service
interface serviceI {
    name: string,
    price: number
}

// Creamos un schema
const serviceSchema = new Schema<serviceI>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
});

// Creamos el modelo
const Service = model<serviceI>('Service', serviceSchema );
export default Service;