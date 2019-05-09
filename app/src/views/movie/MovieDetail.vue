<template>
    <div class="movieDetail">
        <div class="movieDetail-img">
            <img src="./assets/imgs/Mloading.gif"  />
        </div>
        <div class="movieDetail-Inf">
            <h3>{{MovieDetail.title}}</h3>
            <p>主演:<span v-for='(item,index) in MovieDetail.casts' :key="index">{{item.name}},</span></p>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return {
                MovieDetail:{}
            }
        },
        created(){
            let url=`https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/subject/${this.$route.params.movieId}`;
            axios.get(url).then((res)=>{
                console.log(res.data);
                this.MovieDetail=res.data;

            })
            .catch(()=>{
                console.log('Failed to get movie details!');

            });
        }
        
    }
</script>

<style lang="scss" scoped>
.movieDetail{
    display:flex;
    &-img{
        flex:1;
    }
    &-Inf{
        flex-grow: 2;
    }

}

</style>