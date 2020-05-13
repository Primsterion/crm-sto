<template>
  <div class="client">
      <p class="fio">{{ fio }}</p>
      <p class="tel">{{ tel }}</p>
      <p class="address">{{ address }}</p>
      <p class="auto">{{ auto }}</p>
      <p class="date">{{ new Date(date).toLocaleDateString() }}</p>
      <div class="client-action">
          <button class="primary" @click="works">Работы</button>
          <button class="edit" @click="edit">Изменить</button>
          <button class="delete" @click="remove">&times;</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Client',
    props: {
        fio: String,
        tel: String,
        address: String,
        auto: String,
        date: String
    },
    methods: {
        edit(){
            this.$emit('edit', {...this.$props});
        },

        works(){
            this.$emit('get_works');
        },
        
        remove(){
            this.$emit('remove');
        }
    }
}
</script>

<style>
    .client{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: .1s;
    }

    .client:hover{
        background: #1E88E5 !important;
        color: #fff;
    }

    .client > *{
        width: 20%;
        display: block;
        text-align: center;
    }

    .client:nth-child(2n){
        background: #eee;
    }
</style>