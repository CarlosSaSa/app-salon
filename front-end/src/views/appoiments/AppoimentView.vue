<script setup lang="ts">
    import ServiceSelected from '@/components/ServiceSelected.vue';
import { formatCurrency } from '@/helpers';
import { useAppointmentStore } from '@/stores/appointments';

    // Recuperamos la información de los servicios 
    const appointments = useAppointmentStore();

</script>

<template>
    <h2 class="text-4xl font-extrabold text-white"> Detalles Cita y Resumen </h2>
    <p class="text-white text-lg mt-5"> A continuación verifica la información y confirma tu cita </p>
    <h3 class="text-3xl font-extrabold text-white"> Servicios </h3>

    <p v-if="appointments.notServicesSelected" class="text-white text-2xl text-center"> No hay servicios seleccionados  </p>
    <!-- Iteramos sobre los servicios -->
    <div v-else class="grid gap-5">
        <ServiceSelected 
            v-for="service in appointments.servicesSelecteds"
            :key="service._id"
            :service="service" />
        <!-- Para mostrar el precio de los services -->
        <p class="text-right text-white text-2xl"> Total a pagar: <span class="font-black"> {{ formatCurrency( appointments.totaLAmount )  }} </span>  </p>
    </div>



</template>

<style>

</style>