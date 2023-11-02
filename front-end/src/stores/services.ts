import { defineStore } from "pinia";
import { onBeforeMount } from 'vue';
import servicesAPI from "@/api/servicesAPI";


export const useServices = defineStore('services', () => {
 

    onBeforeMount( async () => {
        try {
            const services = await servicesAPI.getAll();
            console.log(services);
        } catch (error) {  
            console.log('Ha ocurrido un error: ', error);
        }
    })
    
    return {

    }

})