import type { servicesI } from "@/interfaces/servicesI";
import { defineStore } from "pinia";
import { ref } from 'vue';


export const useServices = defineStore('services', () => {
 
    // Para almacenar los servicios
    const services = ref<servicesI[]>([]);

    // Para guardar los servicios
    const setServices = ( servicesIn: servicesI[] ) => {
        services.value = servicesIn;
    }

    return {
        services,
        setServices
    }

})