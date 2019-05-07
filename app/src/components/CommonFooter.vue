<template>
    <footer class="footer">
        <router-link to='/movie'>电影</router-link>
        <router-link to='/music'>音乐</router-link>
        <router-link to='/book'>书籍</router-link>
        <router-link to='/photo'>图片</router-link>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.footer{
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    background-color: #bd1609;
    
}
a{
    flex:1;
    line-height: 1rem;
    color:#fff;
    text-align: center;

}
a:hover{
    font-weight: bold;
    color: aqua;
}


</style>