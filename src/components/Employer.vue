<template>
  <div class="employer">
      <p class="fio">{{ fio_employer }}</p>
      <p class="tel">{{ tel_employer }}</p>
      <p class="address">{{ address_employer }}</p>
      <p class="position">{{ position }}</p>
      <div class="client-action">
          <button class="edit" @click="edit">Изменить</button>
          <button class="delete" @click="remove">Удалить</button>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'Employer',
    props: {
        fio_employer: String,
        tel_employer: String,
        address_employer: String,
        position: String
    },
    methods: {
        edit(){
            this.$emit('edit');
        },
        
        remove(){
            this.$emit('remove');
        }
    }
}
</script>

<style scoped>
.employer{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: .1s;
}

.employer:hover{
    background: #1E88E5 !important;
    color: #fff;
}

.employer > *{
    width: 20%;
    display: block;
    text-align: center;
}

.employer:nth-child(2n){
    background: #eee;
}
</style>