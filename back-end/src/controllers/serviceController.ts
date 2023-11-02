// Controladores para los servicios

import { Request, Response } from "express";
import { Types } from "mongoose";
import Service from '../models/serviceModel';

// Para obtener todos los services
export const getAllServices = async ( req: Request, res: Response ) => {

    try {
        const services = await Service.find();
        return res.status(200).json({ msg: 'Services obtained correctly', services });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
}

// Controlador para ingresar un servicio
export const insertService = async ( req: Request, res: Response ) => {

    // Verficamos si los valores contienen valores vacios
    if ( Object.values( req.body ).includes('') ) {
        return res.status(400).json({ msg: 'Some values are empty, verify those data' });
    }

    // Extramos los datos del body
    const { name, price } = req.body;

    try {
        // Creamos una instancia de service
        const service = new Service( { name, price } );
        const serviceInserted = await service.save();
        return res.status(200).json({ msg: 'Service inserted correctly', service: serviceInserted });
    } catch (error) {
        console.log("Server error at insertService:  ", error );
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }
}

// COntrolador para obtener un servicio por el ID
export const getServiceById = async ( req: Request, res: Response ) => {
    const { id } = req.params;

    // Verificamos que el id sea un id valido
    if ( !Types.ObjectId.isValid( id ) ) {
        return res.status(400).json({ msg: 'The id is invalid' });
    };

    try {
        // Si es valido entonces obtenemos el servicio por id
        const service = await Service.findById( id );
        // Si el servicio no existe entonces es un 404
        if (!service)
            return res.status(404).json({ msg: 'Service not found' });
    
        // Retornamos el servicio
        return res.status(200).json({ msg: 'Service get correctly', service });
    } catch (error) {
        console.log("Server error at getServiceById:  ", error );
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }


}

// Controlador para actualizar un servicio por ID
export const updateServiceById = async ( req: Request, res: Response ) => {
    // Obtenemos el ID del path 
    const { id } = req.params;
    const { name, price } = req.body;

    // Verificamos que el id sea valiod
    if ( !Types.ObjectId.isValid( id ) ) 
        return res.status(400).json({ msg: 'ID not valid' });

    try {
        // Obtenemos el servicio, NOTA: Si los valores a actualizar son undefined los valores en la BD no se actualizan a este valor si no que se conservarn los anteriores
        const service = await Service.findByIdAndUpdate( id, { name, price }, { returnDocument: 'after' }  );
        // Si no se encontro el service ya que el ID es valido pero no encontrado entonces es un 404
        if ( !service )
            return res.status(404).json({ msg: 'Service not found' });

        return res.status(200).json({ msg: 'Service updated correctly', service });

    } catch (error) {
        console.log("Server error at updateServiceById => ", error );
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }


}

// Controlador para remover un servicio
export const removeServiceById = async ( req: Request, res: Response ) => {
    // Obtenemos el id del servicio
    const { id } = req.params;
    // Verificamos que el id sea valido
    if ( !Types.ObjectId.isValid( id ) )
        return res.status(400).json({ msg: 'The ID es not valid' });

    try {
        // Removemos el documento por el ID
        const serviceDeleted = await Service.findByIdAndRemove( id );
        // Si no existe el service eliminado es 404
        if ( !serviceDeleted )
            return res.status(404).json({ msg: 'Service not found' });

        return res.status(200).json({ msg: 'Service deleted correctly', service: serviceDeleted });

    } catch (error) {
        console.log("Server error at removeServiceById => ", error );
        return res.status(500).json({ msg: 'Server error has ocurred, please contact to admin' });
    }


}