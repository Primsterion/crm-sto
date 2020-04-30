<template>
    <form class="popup-add-employer-form modal-form">
        <ErrorAlert text="Ошибка! Заполните все поля" v-if="error"/>
        <p>ФИО</p>
        <input type="text" name="fio" v-model="employers[index].fio_employer">
        <p>Телефон</p>
        <input type="text" name="tel" v-model="employers[index].tel_employer">
        <p>Адрес</p>
        <input type="text" name="address" v-model="employers[index].address_employer">
        <p>Должность</p>
        <input type="text" name="position" v-model="employers[index].position">
        <p>ИНН</p>
        <input type="text" name="INN" v-model="employers[index].INN">
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
    name: 'EmployerEdit',
    components: {
        ErrorAlert
    },
    data(){
        return{
            error: false
        }
    },
    props: {
        employers: Array,
        index: Number
    },
    methods: {
        saveEmployer(){
            const data = {
                "id": this.employers[this.index].employer_id,
                "fio": this.employers[this.index].fio_employer,
                "tel": this.employers[this.index].tel_employer,
                "address": this.employers[this.index].address_employer,
                "position": this.employers[this.index].position,
                "INN": this.employers[this.index].INN
            };

            axios('http://localhost:48656/emp/edit', {
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