<template>
    <div>
        {{$route.parmas.movieId}}
        hhaha
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        created(){
            let url=`https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/subject/${this.route.pramas.movieId}`
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