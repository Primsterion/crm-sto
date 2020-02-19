import Vue from 'vue';
import Router from 'vue-router'; 

import Clients from '../components/Clients';
import Employers from '../components/Employers';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/clients',
            name: 'Clients',
            component: Clients
        },
        {
            path: '/employers',
            name: 'Employers',
            component: Employers
        }
    ]
});