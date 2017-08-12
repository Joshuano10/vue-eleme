<template>
    <div class="nav bottom-boder-1px">
        <div class="nav-tabs">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="nav-tabs">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="nav-tabs">
            <router-link to="/seller">商家</router-link>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style>
.nav {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.nav-tabs {
    flex: 1;
    text-align: center;;
}
a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
}
.act {
    color: rgb(240, 20, 20);
}
</style>
