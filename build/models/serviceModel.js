"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Para crear los modelos
const mongoose_1 = require("mongoose");
// Creamos un schema
const serviceSchema = new mongoose_1.Schema({
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
const Service = (0, mongoose_1.model)('Service', serviceSchema);
exports.default = Service;
