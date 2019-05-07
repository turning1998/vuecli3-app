<template>
    <header class="header">
        <div class="header-home">
            <router-link to="/">首页</router-link>
        </div>
        <h3 class="header-title">电影</h3>
      
    </header>
</template>
<script>
    export default {
        
    }
</script>
<style lang="scss" scoped>
.header{
    height: 1rem;
    background: #bd1609;
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    color: #ffffff;
    &-home{   //&-home: .header-home
        line-height: 1rem;
        padding-left:0.2rem;
    }
    &-title{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);      
    }

}
a{
    color:#fff;
}

</style>