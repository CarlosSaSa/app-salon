"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
// Creamos un router para los servicios
const app = (0, express_1.Router)();
// Para obtener los servicios
app.get('/', serviceController_1.getAllServices);
// Para ingresar un servicio
app.post('/', serviceController_1.insertService);
// Para obtener un servicio por el ID
app.get('/:id', serviceController_1.getServiceById);
// Para actualizar un servicio por el ID
app.put('/:id', serviceController_1.updateServiceById);
// Para eliminar un servicio
app.delete('/:id', serviceController_1.removeServiceById);
// Exportamos el router
exports.default = app;
