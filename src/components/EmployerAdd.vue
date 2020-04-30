<template>
    <form class="popup-add-employer-form modal-form">
        <ErrorAlert text="Ошибка! Заполните все поля" v-if="error"/>
        <p>ФИО</p>
        <input type="text" name="fio" v-model="fio">
        <p>Телефон</p>
        <input type="text" name="tel" v-model="tel">
        <p>Адрес</p>
        <input type="text" name="address" v-model="address">
        <p>Должность</p>
        <input type="text" name="position" v-model="position">
        <p>ИНН</p>
        <input type="text" name="INN" v-model="INN">
        <div class="employer-add-actions buttons">
            <button class="primary" @click.prevent="validation">Подтвердить</button>
            <button class="delete" @click.prevent="hideAddEmployer">Отмена</button>
        </div>
    </form>
</template>

<script>
import ErrorAlert from './ErrorAlert';
import axios from 'axios';


export default {
    name: 'EmployerAdd',
    components: {
        ErrorAlert
    },
    data(){
        return{
            fio: '',
            tel: '',
            address: '',
            position: '',
            INN: '',
            error: false
        }
    },
    methods: {
        saveEmployer(){
            const data = {
                "fio": this.fio,
                "tel": this.tel,
                "address": this.address,
                "position": this.position,
                "INN": this.INN
            };

            axios('http://localhost:48656/emp/add', {
                method: 'POST',
                data: data
            });
        },

        hideAddEmployer(){
            this.$emit('hide-add');
        },

        validation(){
            const inputs = document.querySelectorAll('.popup-add-employer-form input');
            this.error = false;

            for(let input of inputs){
                if(!input.value){
                    this.error = true;
                    input.style.border = '1px solid #e00';
                }else{
                    input.style.border = '1px solid #1e88e5';
                }
            }

            if(!this.error){
                this.saveEmployer();
                this.hideAddEmployer();
                this.$emit('refresh');
            }
        }
    }
}
</script>

<style scoped>
    .employer-add-actions{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>