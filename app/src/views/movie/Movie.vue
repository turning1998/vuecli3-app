<template>
    <div>
        <h1>movie</h1>
        <h1>movie</h1>
        <h1>movie</h1>
    </div>
</template>

<script>
import axios from 'axios';//axious 装在node_modules下
    export default {
        created(){
            let url='https://api.douban.com/v2/movie/in_theaters';
           axios.get(url).then(result=>{
               console.log(result);

           })
           .catch(()=>{

           } )
        }
        
    }
</script>

<style lang="scss" scoped>

</style>