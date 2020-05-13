<template>
  <div class="article" @click="getArticle(index)">
      <div class="article-header">
          <h1 class="title">{{article.title.rendered}}</h1>
          <p>Дата: {{ new Date(article.date).toLocaleDateString() }}</p>
      </div>
      <div class="article-info" v-html="article.excerpt.rendered"></div>
  </div>
</template>

<script>
export default {
    name: 'Article',
    props: {
        article: Object,
        index: Number
    },
    methods: {
        getArticle(index){
            this.$emit('show_article', index);
        }
    }
}
</script>

<style scoped>
    .article{
        width: 100%;
        border: 1px solid #a5a5a5;
        margin-top: 15px;
        padding: 15px;
        box-sizing: border-box;
        transition: .2s;
        cursor: pointer;
    }

    .article:hover{
        border: 2px solid #1E88E5;
    }

    .article-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .title{
        font-size: 25px;
    }
</style>
