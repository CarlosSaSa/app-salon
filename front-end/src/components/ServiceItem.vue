<script setup lang="ts">
    import { formatCurrency } from '@/helpers';
    import type { servicesI } from '@/interfaces/servicesI';
    import { useAppointmentStore } from '@/stores/appointments';

    // Definimos los props
    defineProps<{ service: servicesI }>();

    // Usamos la store de appointments
    const appointments = useAppointmentStore();

</script>

<template>
    <div class="p-5 space-y-5 rounded-lg cursor-pointer" 
         :class="appointments.existsServiceSelected(service._id) ? 'bg-blue-700 text-white': 'bg-white' "
        @click="appointments.onServiceSelected( service )">
        <p class="text-2xl font-light"> {{service.name }}</p>
        <p class="text-4xl font-black" :class="appointments.existsServiceSelected(service._id) ? 'text-white': 'text-blue-600'"> {{ formatCurrency( service.price ) }}</p>   
    </div>

</template>