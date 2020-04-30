<template>
  <div class="search-field">
      <input type="text" name="fio" id="fio" :placeholder="placeholder" v-model="value">
      <button class="primary" @click="change">Поиск</button>
  </div>
</template>

<script>
export default {
    name: 'SearchField',
    props:{
        placeholder_prop: String
    },
    data(){
        return{
            value: '',
            placeholder: this.placeholder_prop
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
        width: 425px;
        display: flex;
        margin-left: 15px;
    }
</style>