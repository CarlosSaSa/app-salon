import type { servicesI } from "@/interfaces/servicesI";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

// Store para las citas seleccionadas
export const useAppointmentStore = defineStore('appointments', () => {

    // Declaramos un array de services que indica los servicios seleccionados por el usuario
    const servicesSelecteds = ref<servicesI[]>([]);


    // Para almacenar el objeto seleccionado
    const onServiceSelected = ( service: servicesI ) => {
        // Si el servicio ya se encuentra seleccionado entonces lo eliminamos del array de services
        if ( servicesSelecteds.value.some( serviceSelected => serviceSelected._id == service._id  ) ) {
            servicesSelecteds.value = servicesSelecteds.value.filter( servicesSelecteds => servicesSelecteds._id !== service._id );
            return;
        }

        // Si al querer ingresar otro servicio y el array de services tiene dos elementos
        if ( servicesSelecteds.value.length >= 2 ) {
            alert('Solo dos servicios puede seleccinar');
            return;
        }

        // Si no existe entonces hacemos el push hacia el array
        servicesSelecteds.value.push( service );
    }

    // Para saber si el servicio seleccionado ya se encuentra en el array
    const existsServiceSelected = computed( () => (id: string) => servicesSelecteds.value.some( selectedValue => selectedValue._id == id ) );

    // Para saber si el array de servicios seleccionados esta vacio
    const notServicesSelected = computed( () => servicesSelecteds.value.length == 0 );

    // Para calcular el total a pagar por los servicios
    const totaLAmount = computed( () => servicesSelecteds.value.reduce( ( total: number, service: servicesI ) =>  total + Number(service.price), 0 ) )


    return {
        onServiceSelected,
        existsServiceSelected,
        servicesSelecteds,
        notServicesSelected,
        totaLAmount
    }
})