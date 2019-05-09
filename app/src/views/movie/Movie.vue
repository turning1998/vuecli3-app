<template>
    <div>
        <ul>
            <li v-for="obj in movieList" :key="obj.id" class="movieList">
            
                <img :src="obj.images.small" alt="" class="poster">
                <div class="movie-info">
                    <h5>{{obj.title}}</h5>
                    <p>观众评&nbsp;<span class="audience">{{obj.rating.average}}</span></p>
                    <p class="cast">主演：<span v-for="(value,index) in obj.casts" :key="index">{{value.name}},</span></p>
                    <p>{{obj.collect_count}}已观看</p>
                    <p>年份:{{obj.year}}</p>
                </div>
            </li>
        </ul>
        <div>
            <img src="./assets/imgs/Mloading.gif" alt="">
        </div>
    </div>
</template>

<script>
import axios from 'axios';//axious 装在node_modules下
    export default {
        data(){
            return{
                movieList:[],
                ImgShow:true,
            }
        },
        created(){
            let url='https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/in_theaters?start=0&count=5';
           axios.get(url).then(result=>{
               console.log(result.data.subjects);
               this.movieList=result.data.subjects;
           })
           .catch(()=>{
               console.log("Failed to get movie list!");
           } )
        }
        
    }
</script>

<style lang="scss" scoped>

li.movieList{
    display: flex;
    margin: 0.2rem 0.2rem;
    border-bottom: 0.02px solid #c0c0c0;
    &  img.poster{
        width:1.28rem;
        height:1.8rem;
        vertical-align: middle;
        padding: 0.2rem;
    }
    & .movie-info{
        flex-grow: 1;
        float: left;
    }
    & h5{
        font-size: 0.34rem;
        font-weight: 700;
    }
    & p.cast{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 2.9rem;
    }
    & p,span{
        font-size: 0.26rem;
        color: #666;
    }
    & .audience{
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }
}




</style>