<template>
    <div class="container">
        <div class="articles" v-if="!showArticleContent">
            <h1>Обучающие материалы</h1>
            <div class="article-list">
                <Article v-for="(article, index) in news" :key="article.id" :article="article" :index="index" @show_article="showArticle"/>
            </div>
        </div>
        <ArticleViewer v-if="showArticleContent" :html="news[currentNewsID].content.rendered" @go_back="hideArticle"/>
    </div>
</template>

<script>
import axios from 'axios';

import Article from './Article';
import ArticleViewer from './ArticleViewer';

export default {
    name: 'Articles',
    components: { Article, ArticleViewer  },
    data: () => {
        return{
            news: [],
            currentNewsID: null,
            showArticleContent: false
        }
    },
    mounted(){
         axios.get('http://andrey.ce37051.tmweb.ru/wp-json/wp/v2/help_article')
            .then(response => (this.news = response.data));
    },
    methods: {
        showArticle(index){
            this.currentNewsID = index;
            this.showArticleContent = true;
        },

        hideArticle(){
            this.showArticleContent = false;
        }
    }
}
</script>

<style>

</style>