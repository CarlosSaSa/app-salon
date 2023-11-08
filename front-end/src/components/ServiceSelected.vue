<script setup lang="ts">
    import type { servicesI } from '@/interfaces/servicesI';
    import { formatCurrency } from '@/helpers';
import { useAppointmentStore } from '@/stores/appointments';

    defineProps<{ service: servicesI }>(); // Definimos los props

    // Usamos el store de appointments
    const appointmentsStore = useAppointmentStore();

</script>

<template>
    <div class="border border-gray-600 rounded-lg p-5 flex justify-between items-center">
        <div>
            <p class="text-2xl font-extrabold text-white">{{ service.name }} </p>
            <p class="text-3xl font-black text-blue-500"> {{ formatCurrency( service.price ) }} </p>
        </div>

        <button type="button" 
                class="inline-flex items-center rounded-md bg-red-600 text-white text-sm px-3 py-2 font-semibold shadow-sm ring-1 ring-inset ring-red-800 hover:bg-red-700"
                @click="appointmentsStore.onServiceSelected(service)">
            Eliminar
        </button>

    </div>
</template>