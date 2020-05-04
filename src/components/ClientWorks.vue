<template>
    <div class="client-works">
        <div class="works" v-if="works.length">
            <div class="works-header">
                <p class="id">№</p>
                <p class="tel">ФИО работника</p>
                <p class="address">Авто</p>
                <p class="auto">Статус работы</p>
                <p class="date">Дата</p>
                <p class="actions">Действия</p>
            </div>
            <div class="works-content">
                <div class="work" v-for="(work, index) in works" :key="index">
                    <p>{{ ++index }}</p>
                    <p>{{ work.fio_employer }}</p>
                    <p>{{ work.auto }}</p>
                    <p>{{ work.status }}</p>
                    <p>{{ new Date(work.date).toLocaleDateString() }}</p>
                    <div class="buttons">
                        <button class="primary" @click="getWorkInfo(--index)">Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="works-not-found" v-else>
            <h1>Работы отсутствую</h1>
        </div>
        <div class="current-work" v-if="showInfo">
            <h1>Информация о работах для клиента</h1>
            <hr>
            <p><strong>Информация о клиенте</strong></p>
            <p>ФИО: {{currentWork.fio}}</p>
            <p>Телефон: {{currentWork.tel}}</p>
            <p>Адрес: {{currentWork.address}}</p>
            <p>Авто: {{currentWork.auto}}</p>
            <p>VIN авто: {{ currentWork.vin }}</p>
            <p>Дата обращения: {{ new Date(currentWork.date).toLocaleDateString() }}</p>
            <hr>
            <p><strong>Информация о работнике</strong></p>
            <p>ФИО: {{currentWork.fio_employer}}</p>
            <p>Должность: {{currentWork.position}}</p>
            <p>ИНН: {{currentWork.INN}}</p>
            <hr>
            <p><strong>Информация о проводимых работах</strong></p>
            <p>Список работ</p>
            <ul class="sub-works">
                <li v-for="(sub_work, index) in work.sub_works" :key="index">{{sub_work.work_type_name}} - {{sub_work.work_type_sum}} р</li>
            </ul>
            <p>Текущий статус: {{currentWork.status}}</p>
            <p>Сумма работ: {{work.sum}} р</p>
        </div>
        
        <button class="primary" @click="$emit('close-pop-up')">Ок</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CientWorks',
    props: {
        client_id: Number
    },
    data(){
        return{
            showInfo: false,
            work: {
                sub_works: '',
                sum: 0,
                status: ''
            },
            works: [],
            currentWork: {

            }
        }
    },

    mounted(){
        this.getInfo();
    },

    methods: {
        getInfo(){
            axios.get(`http://localhost:48656/clt/works?id=${this.client_id}`)
            .then((resp) => {
                this.works = resp.data;
            });
        },

        getSubWorks(){
            axios.get(`http://localhost:48656/clt/sub-works?sub_works=${this.currentWork.work_type_id}`).then((response) => {
                this.work.sub_works = response.data;
            }).then(() => {
                this.work.sum = 0;
                for(let sub_work of this.work.sub_works){
                    this.work.sum += sub_work.work_type_sum;
                }
            });
        },

        getWorkInfo(id){
            this.currentWork = Object.assign({}, this.works[id]);
            this.getSubWorks();
            this.showInfo = true;
        }
    }
}
</script>

<style scoped>
    .client-works{
        max-width: 80%;
        min-height: 150px;
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 5px;
    }

    .works-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #1E88E5;
        color: #fff;
        font-weight: 600;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .work{
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
        
    .works-header p, .work p, .work .buttons{
        display: block;
        width: 250px;
        text-align: center;
    }

    .work .buttons{
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .clients-content{
        max-height: 400px;
        overflow-y: scroll;
    }

    .works-not-found{
       width: 100%;
    }

    h1{
        text-align: center;
        margin-bottom: 15px;
    }

    button{
        min-width: 100px;
    }
</style>