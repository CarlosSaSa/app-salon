"use strict";
// Controladores para los servicios
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeServiceById = exports.updateServiceById = exports.getServiceById = exports.insertService = exports.getAllServices = void 0;
const mongoose_1 = require("mongoose");
const serviceModel_1 = __importDefault(require("../models/serviceModel"));
// Para obtener todos los services
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield serviceModel_1.default.find();
        return res.status(200).json({ msg: 'Services obtained correctly', services });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
});
exports.getAllServices = getAllServices;
// Controlador para ingresar un servicio
const insertService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verficamos si los valores contienen valores vacios
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({ msg: 'Some values are empty, verify those data' });
    }
    // Extramos los datos del body
    const { name, price } = req.body;
    try {
        // Creamos una instancia de service
        const service = new serviceModel_1.default({ name, price });
        const serviceInserted = yield service.save();
        return res.status(200).json({ msg: 'Service inserted correctly', service: serviceInserted });
    }
    catch (error) {
        console.log("Server error at insertService:  ", error);
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
});
exports.insertService = insertService;
// COntrolador para obtener un servicio por el ID
const getServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Verificamos que el id sea un id valido
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'The id is invalid' });
    }
    ;
    try {
        // Si es valido entonces obtenemos el servicio por id
        const service = yield serviceModel_1.default.findById(id);
        // Si el servicio no existe entonces es un 404
        if (!service)
            return res.status(404).json({ msg: 'Service not found' });
        // Retornamos el servicio
        return res.status(200).json({ msg: 'Service get correctly', service });
    }
    catch (error) {
        console.log("Server error at getServiceById:  ", error);
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
});
exports.getServiceById = getServiceById;
// Controlador para actualizar un servicio por ID
const updateServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtenemos el ID del path 
    const { id } = req.params;
    const { name, price } = req.body;
    // Verificamos que el id sea valiod
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: 'ID not valid' });
    try {
        // Obtenemos el servicio, NOTA: Si los valores a actualizar son undefined los valores en la BD no se actualizan a este valor si no que se conservarn los anteriores
        const service = yield serviceModel_1.default.findByIdAndUpdate(id, { name, price }, { returnDocument: 'after' });
        // Si no se encontro el service ya que el ID es valido pero no encontrado entonces es un 404
        if (!service)
            return res.status(404).json({ msg: 'Service not found' });
        return res.status(200).json({ msg: 'Service updated correctly', service });
    }
    catch (error) {
        console.log("Server error at updateServiceById => ", error);
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
});
exports.updateServiceById = updateServiceById;
// Controlador para remover un servicio
const removeServiceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtenemos el id del servicio
    const { id } = req.params;
    // Verificamos que el id sea valido
    if (!mongoose_1.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: 'The ID es not valid' });
    try {
        // Removemos el documento por el ID
        const serviceDeleted = yield serviceModel_1.default.findByIdAndRemove(id);
        // Si no existe el service eliminado es 404
        if (!serviceDeleted)
            return res.status(404).json({ msg: 'Service not found' });
        return res.status(200).json({ msg: 'Service deleted correctly', service: serviceDeleted });
    }
    catch (error) {
        console.log("Server error at removeServiceById => ", error);
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
});
exports.removeServiceById = removeServiceById;
