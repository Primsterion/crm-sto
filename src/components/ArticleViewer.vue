<template>
  <div class="container">
      <button class="primary" @click="goBack">Назад к статьям</button>
      <div class="content" v-html="html"></div>
  </div>
</template>

<script>
export default {
    name: 'ArticleViewer',
    props: {
        html: String
    },
    methods: {
        goBack(){
            this.$emit('go_back');
        }
    }
}
</script>

<style>

</style>