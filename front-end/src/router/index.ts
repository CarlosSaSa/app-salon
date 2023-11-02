import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home' ,component: () => import("@/views/HomeView.vue") },
    { path: '/reservaciones', name: 'appointments' ,component: () => import("@/views/appoiments/AppointmentsLayout.vue"),
      children: [
        { path: 'nueva', component: () => import("@/views/appoiments/NewAppointmentLayout.vue"), 
          children: [ 
            { path: '', name: 'new-appointment', component: () => import("@/views/appoiments/ServicesView.vue") },
            { path: 'detalles', name: 'appointment-details', component: () => import("@/views/appoiments/AppoimentView.vue") },
          ] 
        }
      ] 
    },
  ]
})

export default router
