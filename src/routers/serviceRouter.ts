import { Router } from 'express';
import { getAllServices, getServiceById, insertService, removeServiceById, updateServiceById } from '../controllers/serviceController';

// Creamos un router para los servicios
const app: Router = Router();

app.route('/')
    .get( getAllServices )
    .post( insertService );

app.route('/:id')
    .get( getServiceById )
    .put( updateServiceById )
    .delete( removeServiceById );

// Exportamos el router
export default app;