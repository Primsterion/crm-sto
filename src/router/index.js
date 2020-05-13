import Vue from 'vue';
import Router from 'vue-router'; 

import Clients from '../components/Clients';
import Employers from '../components/Employers';
import Works from '../components/Works';
import Help from '../components/Help';

Vue.use(Router);



export default new Router({
    routes: [
        {
            path: '/clients',
            name: 'Clients',
            component: Clients,
            meta: {
                title: 'Мое СТО - Клиенты'
            }
        },
        {
            path: '/employers',
            name: 'Employers',
            component: Employers,
            meta: {
                title: 'Мое СТО - Сотрудники'
            }
        },
        {
            path: '/works',
            name: 'Works',
            component: Works,
            meta: {
                title: 'Мое СТО - Работы'
            }
        },
        {
            path: '/help',
            name: 'Help',
            component: Help,
            meta: {
                title: 'Мое СТО - Помощь'
            }
        }
    ]
});

