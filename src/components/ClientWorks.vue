<template>
  <div class="client-works">
        <h1>Информация о работах для клиента</h1>
        <hr>
        <p><strong>Информация о клиенте</strong></p>
        <p>ФИО: {{client.fio}}</p>
        <p>Телефон: {{client.tel}}</p>
        <p>Адрес: {{client.address}}</p>
        <p>Авто: {{client.auto}}</p>
        <p>Дата обращения: {{ client.date }}</p>
        <hr>
        <p><strong>Информация о работнике</strong></p>
        <p>ФИО: {{employer.fio}}</p>
        <p>Должность: {{employer.position}}</p>
        <p>ИНН: {{employer.INN}}</p>
        <hr>
        <p><strong>Информация о проводимых работах</strong></p>
        <p>Список работ</p>
        <ul>
            <li v-for="(sub_work, index) in work.sub_works" :key="index">{{sub_work.work_type_name}} - {{sub_work.work_type_sum}} р</li>
        </ul>
        <p>Текущий статус: {{work.status}}</p>
        <p>Сумма работ: {{work.sum}} р</p>
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
            client: {
                fio: '',
                tel: '',
                address: '',
                auto: '',
                date: ''
            },

            employer: {
                fio: '',
                position: '',
                INN: ''
            },

            work: {
                sub_works: '',
                sum: 0,
                status: ''
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
                this.client.fio = resp.data[0].fio;
                this.client.tel = resp.data[0].tel;
                this.client.address = resp.data[0].address;
                this.client.auto = resp.data[0].auto;
                this.client.date = new Date(resp.data[0].date).toLocaleDateString();
                this.employer.fio = resp.data[0].fio_employer;
                this.employer.position = resp.data[0].position;
                this.employer.INN = resp.data[0].INN;
                this.work.status = resp.data[0].status;
                axios.get(`http://localhost:48656/clt/sub-works?sub_works=${resp.data[0].work_type_id}`).then((response) => {
                    this.work.sub_works = response.data;
                }).then(() => {
                    for(let sub_work of this.work.sub_works){
                        this.work.sum += sub_work.work_type_sum;
                    }
                });
            });
            console.log(this.works);
        },

        getSubWorks(){
            console.log(this.works);
            axios.get('http://localhost:48656/clt/sub-works', {
                params: {
                    sub_works: this.test
                }
            });
        }
    }
}
</script>

<style scoped>
    .client-works{
        width: 80%;
        min-height: 300px;
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 5px;
    }

    h1{
        text-align: center;
        margin-bottom: 15px;
    }

    ul li{
        list-style: none;
        margin-bottom: 10px;
    }

    ul li:last-child{
        margin-bottom: 0;
    }

    ul{
        background: #eee;
        padding: 20px;
    }

    button{
        min-width: 100px;
    }
</style>