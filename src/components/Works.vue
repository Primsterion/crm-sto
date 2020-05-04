<template>
    <div class="works-list">
        <div class="work-list-actions">
            <button class="primary" @click="getInfoToAddWorkForm">Добавить работу</button>
            <div class="search-form">
                <input type="text" placeholder="Введите ФИО клиента..." v-model="searchValue">
                <button class="primary" @click="searchWork">Поиск</button>
            </div>
        </div>
        <div class="work-list-header">
            <p class="id">№</p>
            <p class="fio_client">ФИО Клиента</p>
            <p class="auto">Авто</p>
            <p class="fio_employer">ФИО сотрудника</p>
            <p class="date">Дата</p>
            <p class="status">Статус</p>
            <p class="actions">Действия</p>
        </div>
        <div class="works-list-content">
            <Work v-for="(work, index) in works" :key="index" :work="work" @change_status="changeStatus(index)"/>
        </div>
        <div class="modal" v-if="showModalChangeStatus">
            <div class="modal-content">
                <div class="form-group">
                    <p>Статус</p>
                    <select name="" v-model="works[currentWorkIndex].status">
                        <option value="В ожидании">В ожидании</option>
                        <option value="Идет работа">Идет работа</option>
                        <option value="Работа завершена">Работа завершена</option>
                    </select>
                </div>
                <div class="buttons">
                    <button class="primary" @click="saveStatus">Сохранить</button>
                    <button class="delete" @click="cancelStatus">Отмена</button>
                </div>
            </div>
        </div>
        <div class="modal" v-if="showModalAddWork">
            <div class="modal-content">
                <h1>Добавление работы</h1>
                <div class="form-group">
                    <p>Выбор клиента</p>
                    <select name="" v-model="newWork.client_id">
                        <option value="" selected disabled>ФИО | телефон</option>
                        <option v-for="(client, index) in workFormInfo.clients" :key="index" :value="client.client_id">{{ client.fio }} | {{ client.tel }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <p>Выбор сотрудника</p>
                    <select name="" v-model="newWork.employer_id">
                        <option value="" selected disabled>ФИО | должность</option>
                        <option v-for="(employer, index) in workFormInfo.employers" :key="index" :value="employer.employer_id">{{ employer.fio_employer }} | {{ employer.position }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <p>Формирование списка услуг</p>
                    <select name="" v-model="workFormInfo.currentWorkType">
                        <option value="" selected disabled>Услуга | цена</option>
                        <option v-for="(workType, index) in workFormInfo.workTypes" :key="index" :value="workType" :class="{hide: workType.disable}">{{ workType.work_type_name }} | {{ workType.work_type_sum }}</option>
                    </select>
                    <p><button class="primary" @click="addWorkType">Добавить услугу</button></p>
                    <p>Выбранные услуги</p>
                    <ul class="sub-works">
                        <li v-for="work in workFormInfo.selectedWorkTypes" :key="work.work_type_id">{{ work.work_type_name }} - {{ work.work_type_sum }} <span class="del" @click="removeWorkType(work.work_type_id)">&times;</span></li>
                    </ul>
                    <p>Итоговая сумма работ: {{ workFormInfo.total }} р</p>
                </div>
                <div class="buttons">
                    <button class="primary" @click="saveWork">Сохранить</button>
                    <button class="delete" @click="showModalAddWork = false">Отмена</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Work from './Work';

export default {
    name: 'Works',
    components: { Work },
    data: () => {
        return {
            works: [],
            works_copy: [],
            workFormInfo: {
                clients: [],
                employers: [],
                workTypes: [],
                currentWorkType: {},
                selectedWorkTypes: [],
                total: 0
            },
            newWork: {
                client_id: '',
                employer_id: '',
                work_types_id: '',
                status: 'В ожидании',
                date: new Date().toLocaleDateString().split('.').reverse().join('-')
            },
            currentWorkIndex: null,
            showModalChangeStatus: false,
            showModalAddWork: false,
            status: '',
            searchValue: ''
        }
    },

    mounted(){
        this.getWorks();
    },

    methods: {
        getWorks(){
            axios.get('http://localhost:48656/works')
                .then(resp => { this.works = resp.data.concat(); })
                .then(() => { this.works_copy = this.works.concat(); }) 
        },

        async getInfoToAddWorkForm(){
            await this.getAllClients();
            await this.getAllEmployers();
            await this.getAllWorkTypes();
            this.workFormInfo.selectedWorkTypes = [];
            this.workFormInfo.currentWorkType = {};
            this.workFormInfo.total = 0;
            this.showModalAddWork = true;
        },

        getAllClients(){
            axios.get('http://localhost:48656/clt')
                .then(resp => (this.workFormInfo.clients = resp.data))
        },

        getAllEmployers(){
            axios.get('http://localhost:48656/emp/get')
                .then(resp => (this.workFormInfo.employers = resp.data))
        },

        getAllWorkTypes(){
            axios.get('http://localhost:48656/work-types')
                .then(resp => (this.workFormInfo.workTypes = resp.data))
                .then(() => {
                    for(let work of this.workFormInfo.workTypes){
                        work['disable'] = false;
                    }
                })
        },

        updateTotal(){
            this.workFormInfo.total = 0;
            for(const work of this.workFormInfo.selectedWorkTypes){
                this.workFormInfo.total += +work.work_type_sum;
            }
        },

        addWorkType(){
            this.workFormInfo.selectedWorkTypes.push(this.workFormInfo.currentWorkType);
            for(let work of this.workFormInfo.workTypes){
                if(work.work_type_id === this.workFormInfo.currentWorkType.work_type_id){
                    work.disable = true;
                }
            }
            this.updateTotal();
            this.workFormInfo.currentWorkType = {};
        },

        removeWorkType(id){
            this.workFormInfo.selectedWorkTypes = this.workFormInfo.selectedWorkTypes.filter((work) => work.work_type_id !== id);
            const idsArr = [];
            for(const work of this.workFormInfo.selectedWorkTypes){
                idsArr.push(work.work_type_id);
            }

            for(const work of this.workFormInfo.workTypes){
               if(idsArr.indexOf(work.work_type_id) === -1){
                   work.disable = false;
               }
            }
            this.updateTotal();
            this.workFormInfo.currentWorkType = {};
        },

        saveWork(){
            let work_types_id = [];
            let valid = true;
            for(const work of this.workFormInfo.selectedWorkTypes){
                work_types_id.push(work.work_type_id);
            }

            this.newWork.work_types_id = work_types_id.join(';');

            for(const prop in this.newWork){
                if(!this.newWork[prop]){
                    valid = false;
                }
            }

            if(valid){
                 axios.post('http://localhost:48656/works/add', {data: this.newWork })
                    .then(this.getWorks)
                    .then(() => {this.showModalAddWork = false});
            }else{
                alert("Заполните все поля!");
            }

           
        },
        
        saveStatus(){
            axios.post('http://localhost:48656/works/save-status', {
                data: {
                    id: this.works[this.currentWorkIndex].work_id,
                    status: this.works[this.currentWorkIndex].status
                }
            }).then(() => { this.showModalChangeStatus = false })
        },

        changeStatus(id){
            this.currentWorkIndex = id;
            this.status = this.works[this.currentWorkIndex].status;
            this.showModalChangeStatus = true;
        },

        cancelStatus(){
            this.works[this.currentWorkIndex].status = this.status;
            this.showModalChangeStatus = false;
        },
        
        searchWork(){
            const regex = new RegExp(`${this.searchValue}`, 'i');
            this.works = this.works_copy.concat();
            if(this.searchValue.length){
                this.works = this.works.filter((work) => work.fio.match(regex));
            }
        }
    }
}
</script>

<style scoped>

    .works-list{
        width: 90%;
        margin: 20px auto;
    }

    .work-list-header{
        display: flex;
        flex-direction: space-between;
        width: 100%;
        text-align: center;
        background: #1E88E5;
        color: #fff;
        font-weight: 600;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-right: 15px;
    }

    .work-list-header p{
        display: block;
        width: 15%;
    }

    .works-list-content{
        max-height: 400px;
        overflow-y: scroll;
    }

    .modal-content{
        width: fit-content;
    }

    .work-list-actions{
        margin: 15px 0;
    }

    .work-list-actions, .search-form{
        display: flex;
    }

    .search-form{
        width: 300px;
        margin-left: 15px;
    }

    span.del{
        display: inline-block;
        width: 20px;
        text-align: center;
        padding: 2px 0;
        border-radius: 4px;
        background: #ff0000;
        color: #fff;
        font-weight: 600;
        transition: .2s;
    }

    span.del:hover{
        background: #fff;
        color: #ff0000;
    }

</style>