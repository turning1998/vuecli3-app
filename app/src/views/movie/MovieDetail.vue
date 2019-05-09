<template>
    <div>
        <h1> {{$route.parmas.movieId}}</h1>
         <h1> {{$route.parmas.movieId}}</h1>
          <h1> {{$route.parmas.movieId}}</h1>
           <h1> {{$route.parmas.movieId}}</h1>
            <h1> {{$route.parmas.movieId}}</h1>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        created(){
            let url=`https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/subject/${this.$route.params.movieId}`;
            axios.get(url).then((res)=>{
                console.log(res);

            })
            .catch(()=>{

            });
        }
        
    }
</script>

<style lang="scss" scoped>

</style>