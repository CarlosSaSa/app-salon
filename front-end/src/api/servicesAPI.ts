// Archivo donde se haran las peticiones hacia la API
import api from '@/lib/axios';

export default {
    getAll() {
        return api.get('/services');
    }
}