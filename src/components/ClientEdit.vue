<template>
        <form class="popup-edit-client-form modal-form">
            <ErrorAlert text="Ошибка! Заполните все поля" v-if="error"/>
            <p>ФИО</p>
            <input type="text" name="fio" v-model="fio">
            <p>Телефон</p>
            <input type="text" name="tel" v-model="tel">
            <p>Адрес</p>
            <input type="text" name="address" v-model="address">
            <p>Автомобиль</p>
            <input type="text" name="auto" v-model="auto">
            <p>VIN</p>
            <input type="text" name="vin" v-model="vin">
            <div class="client-add-actions buttons">
                <button class="primary" @click.prevent="validation">Сохранить</button>
                <button class="delete" @click.prevent="closePopUp">Отмена</button>
            </div>
        </form>
</template>

<script>
import ErrorAlert from './ErrorAlert';
import axios from 'axios';

export default {
    name: 'ClientAdd',
    components: {
        ErrorAlert
    },
    props: {
        client_id_prop: Number,
        fio_prop: String,
        tel_prop: String,
        address_prop: String,
        auto_prop: String,
        vin_prop: String
    },

    data: function(){
        return{
            fio: this.fio_prop,
            tel: this.tel_prop,
            address: this.address_prop,
            auto: this.auto_prop,
            vin: this.vin_prop,
            client_id: this.client_id_prop,
            error: false
        }
    },
    methods: {
        async saveClient(){
            const data = {
                id: this.client_id,
                fio: this.fio,
                tel: this.tel,
                address: this.address,
                auto: this.auto,
                vin: this.vin,
                date: this.date
            }
            await axios.post('http://localhost:48656/clt/edit', { data: data });
            this.$emit('refresh');
        },

        closePopUp(){
            this.$emit('close-pop-up');
        },

        validation(){
            const inputs = document.querySelectorAll('.popup-add-client-form input');
            this.error = false;

            for(let input of inputs){
                if(!input.value){
                    input.style.border = '1px solid #e00';
                    this.error = true
                }else{
                    input.style.border = '1px solid #1e88e5';
                }
            }

            this.saveClient();
        }
    }
}
</script>
   
<style scoped>
     .client-add-actions{
         width: 100%;
         display: flex;
         justify-content: space-between;
     }
</style>