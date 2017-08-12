<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-nav></v-nav>
    <keep-alive>
        <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import header from './components/header/header.vue';
    import nav from './components/nav/nav.vue';
    import {urlParse} from './util/url.js';

    export default{
        components: {
            'v-header': header,
            'v-nav': nav
        },
        data() {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        console.log(queryParam);
                        return queryParam.id;
                    })()
                }
            };
        },
        created() {
            this.$http.get('./static/data/seller.json' + '?id=' + this.seller.id).then((response) => {
                // this.seller = response.data;
                this.seller = Object.assign({}, this.seller, response.data);
                console.log(this.seller.id);
            });
        }
    };
</script>

<style>
</style>
