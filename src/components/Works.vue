<template>
    <div class="works-list">
        <div class="work-list-actions">
            <button class="primary">Добавить работу</button>
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
            currentWorkIndex: null,
            showModalChangeStatus: false,
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
        margin-bottom: 15px;
    }

    .work-list-actions, .search-form{
        display: flex;
    }

    .search-form{
        width: 300px;
        margin-left: 15px;
    }

</style>