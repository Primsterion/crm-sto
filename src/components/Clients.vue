<template>
    <div class="clients">
        <div class="clients-actions">
            <button class="primary" @click="showModalAdd = true">Добавить клиента</button>
            <input type="text" class="search" placeholder="Введите ФИО клиента" v-model="searchValue">
            <button class="primary" @click="searchClient">Поиск</button>
        </div>
        <div class="clients-header">
            <p class="fio">ФИО</p>
            <p class="tel">Телефон</p>
            <p class="address">Адрес</p>
            <p class="auto">Авто</p>
            <p class="date">Дата</p>
            <p class="actions">Действия</p>
        </div>
        <div class="clients-content">
            <Client v-for="(client, index) in clients" :key="index" v-bind="client" @edit="edit(index)" @get_works="getWorks(index)" @remove="deleteClient(index)"/>
        </div>
        <div v-if="showModalEdit" class="client-form">
            <ClientEdit @refresh="refreshClients" @close-pop-up="showModalEdit = false"
                :fio_prop="clients[currentClientId].fio"
                :tel_prop="clients[currentClientId].tel"
                :address_prop="clients[currentClientId].address"
                :auto_prop="clients[currentClientId].auto"
                :vin_prop="clients[currentClientId].vin"
                :client_id_prop="clients[currentClientId].client_id"
            />
        </div>
        <div v-if="showModalWorks" class="client-work-modal">
            <ClientWorks
                @close-pop-up="showModalWorks = false" 
                :client_id="clients[currentClientId].client_id"
            />
        </div>
        <div class="modal" v-if="showModalAdd">
            <div class="modal-content">
                <h1>Добавление клиента</h1>
                <div class="form-group">
                    <p>ФИО</p>
                    <input type="text" v-model="newClient.fio">
                </div>
                <div class="form-group">
                    <p>Номер телефона</p>
                    <input type="text" v-model="newClient.tel">
                </div>
                <div class="form-group">
                    <p>Адрес</p>
                    <input type="text" v-model="newClient.address">
                </div>
                <div class="form-group">
                    <p>Автомобиль</p>
                    <input type="text" v-model="newClient.auto">
                </div>
                <div class="form-group">
                    <p>VIN код автомобиля</p>
                    <input type="text" v-model="newClient.vin">
                </div>
                <div class="buttons">
                    <button class="primary" @click="saveClient">Добавить</button>
                    <button class="delete" @click="showModalAdd = false">Отмена</button>
                </div>
            </div>
        </div>
        <div class="modal remove-modal" v-if="showModalRemove">
            <div class="modal-content">
                <h1>Вы действительно хотите удалить клиента?</h1>
                <div class="buttons">
                    <button class="primary" @click="confirmDelete">Подтвердить</button>
                    <button class="delete" @click="showModalRemove = false">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Client from './Client';
import ClientEdit from './ClientEdit';
import ClientWorks from './ClientWorks';

import axios from 'axios';

export default {
    name: 'Clients',
    data: function(){
        return{
            clients: [],
            clients_copy: [],
            newClient: {
                fio: '',
                tel: '',
                address: '',
                auto: '',
                vin: '',
                date: new Date().toLocaleDateString().split('.').reverse().join('-')
            },
            currentClientId: 0,
            showModalEdit: false,
            showModalWorks: false,
            showModalAdd: false,
            showModalRemove: false,
            searchValue: ''
        }
    },
    mounted(){
       this.getClients();
    },
    components: {
        Client, ClientEdit, ClientWorks
    },
    methods: {

        edit(index){
            this.showModalEdit = true;
            this.currentClientId = index;
        },

        getWorks(index){
            this.showModalWorks = true;
            this.currentClientId = index;
        },

        confirmDelete(){

            const index = +this.currentClientId;

            axios.post('http://localhost:48656/clt/remove', {
                data: {
                    id: this.clients_copy[index].client_id
                }
            }).then(() => {
                this.clients = this.clients_copy = this.clients_copy.filter(client => (+client.client_id != +this.clients_copy[index].client_id));
                this.showModalRemove = false;
            })
        },

        deleteClient(index){
            this.showModalRemove = true;
            this.currentClientId = index;
        },

        getClients(){
            axios.get('http://localhost:48656/clt')
                .then(response => (this.clients = response.data))
                .then(() => { this.clients_copy = this.clients.concat(); console.log('client ok')});
        },

        async refreshClients(){
            await this.getClients();
            this.showModalEdit = false;
        },

        saveClient(){
           if(!this.validate()){
               alert('Заполните все поля!');
           }else{
               axios.post('http://localhost:48656/clt/add', {
                   data: this.newClient
               })
               .then(() => {this.showModalAdd = false})
               .then(this.getClients);
               
           }
        },

        searchClient(){
            this.clients = this.clients_copy.concat();
            if(this.searchValue){
                const regex = new RegExp(`${this.searchValue}`, 'i');
                this.clients = this.clients.filter((client) => (client.fio.match(regex)));
            }
        },  

        validate(){
            for(const value in this.newClient){
                if(this.newClient[value].length === 0){
                    return false;
                }
            }

            return true;
        }
    }
}
</script>

<style scoped>

    .clients-actions{
        margin: 15px 0;
    }

    .clients-header{
        display: flex;
        justify-content: space-between;
        text-align: center;
        background: #1E88E5;
        color: #fff;
        font-weight: 600;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-right: 15px;
    }
        
    .clients-header p{
        display: block;
        width: 20%;
    }

    .clients{
        width: 90%;
        margin: 20px auto;
    }

    .clients-content{
        max-height: 400px;
        overflow-y: scroll;
    }

    .client-form{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,.7);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .client-form form{
       width: 100%;
       max-width: 750px;
    }

    .client-work-modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #000000bb;
    }

    

</style>