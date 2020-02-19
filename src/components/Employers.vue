<template>
   <div class="employers">
       <SearchField @search="search" />
        <div class="employers-header">
            <p class="fio">ФИО</p>
            <p class="tel">Телефон</p>
            <p class="address">Адрес</p>
            <p class="position">Должность</p>
            <p class="actions">Действия</p>
        </div>
        <div class="employers-content">
            <Employer v-for="(employer, index) in employers_copy" :key="index" v-bind="employer" @remove="remove(index)" @edit="edit(index)"/>
        </div>
        <div class="employer-add">
            <button class="primary" @click="showEmployerAdd = true">Добавить</button>
        </div>
        <div class="employer-form" v-if="showEmployerAdd">
            <EmployerAdd @hide-add="showEmployerAdd = false" @refresh="getEmployers"/>
        </div>
        <div class="employer-form" v-if="showEmployerEdit">
            <EmployerEdit @hide-add="showEmployerEdit = false" @refresh="getEmployers" :employers="employers" :index="currentEmployerIndex"/>
        </div>
    </div>
</template>

<script>
import Employer from './Employer';
import EmployerAdd from './EmployerAdd';
import EmployerEdit from './EmployerEdit';
import SearchField from './SearchField';
import axios from 'axios';

export default {
    name: 'Employers',
    components: {
        Employer, EmployerAdd, EmployerEdit, SearchField
    },
    data(){
        return{
            employers: [],
            employers_copy: [],
            showEmployerAdd: false,
            showEmployerEdit: false,
            currentEmployerIndex: null,
        }
    },
    mounted(){
         this.getEmployers();
    },

    methods: {
        getEmployers(){
            axios.get('http://localhost:48656/emp/get')
                .then(response => (this.employers = response.data))
                .then(() => {
                    this.employers_copy = this.employers.slice();
                });
        },

        remove(index){

            const data = {
                emp_id: this.employers[index].employer_id
            }
            axios.post('http://localhost:48656/emp/del', {
                data: data
            });

            this.getEmployers();
        },

        edit(index){
            this.currentEmployerIndex = index;
            this.showEmployerEdit = true;
        },

        search(data){
            if(data.value){
                const regex = new RegExp(`${data.value}`, 'i');
                console.log(regex);
                this.employers_copy = this.employers.filter(employer => {
                    console.log(employer.fio_employer);
                    if(employer.fio_employer.match(regex)){
                        return employer;
                    }
                });
            }else{
                this.employers_copy = this.employers;
            }
            
        }
    }
}
</script>

<style scoped>
 .employers-header{
    display: flex;
    justify-content: space-between;
    text-align: center;
    background: #1E88E5;
    color: #fff;
    font-weight: 600;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
    
.employers-header p{
    display: block;
    width: 20%;
}

.employers{
    width: 90%;
    margin: 20px auto;
}

.employer-add{
    margin-top: 30px;
}

.employers-content{
    max-height: 400px;
    overflow-y: scroll;
}

.employer-form{
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

.employer-form form{
    width: 100%;
    max-width: 750px;
}

</style>