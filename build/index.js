"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const config_1 = require("./config");
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const serviceRouter_1 = __importDefault(require("./routers/serviceRouter"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '.env') }); // Cargamos las variables de entorno
// Creamos una instancia de express
const app = (0, express_1.default)();
// Middlewares
app.use((0, express_1.json)()); // Para leer los json
// Ruta de prueba
app.get(`${config_1.BASE_URL}/test`, (req, res) => res.json({ msg: 'Servidor OK' }));
// Rutas
app.use(`${config_1.BASE_URL}/services`, serviceRouter_1.default);
// Iniciamos la conexión con la BD
(0, db_1.connectDb)().then(() => {
    // Iniciamos el servidor
    app.listen(config_1.PORT, () => {
        console.log('Server listening on port: ', config_1.PORT);
    });
})
    .catch((error) => {
    console.log('The following error has been occurred: ', error);
});
