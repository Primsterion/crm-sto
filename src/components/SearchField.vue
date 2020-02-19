<template>
  <div class="search-field">
      <p>Поиск</p>
      <input type="text" name="fio" id="fio" placeholder="Введите ФИО..." @change="change" v-model="value">
  </div>
</template>

<script>
export default {
    name: 'SearchField',
    data(){
        return{
            value: ''
        }
    },
    methods: {
        change(){
            this.$emit('search', {
                value: this.value
            })
        }
    }
}
</script>

<style>
    .search-field{
        margin-bottom: 15px;
        width: 20%;
    }
</style>