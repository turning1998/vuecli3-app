<!--跳转：
方法1：@click="方法名" 利用this.router.push('路径名')
方法2：<router-link to> 9)
-->

<template>
    <div class="movie">
        <ul>
            <li v-for="obj in movieList" :key="obj.id" class="movieList" @click="goDetail(obj.id)">
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
        <div class="End" v-show="isEnd">数据到底了</div>
        <div class="loading">
            <img src="@/assets/imgs/Mloading.gif" alt="" v-show="ImgShow">
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
                isEnd:false,
            }
        },
        created(){
            this.getMovieInf();
        },
        mounted() {
             window.onscroll=()=>{
                let slideHeight=document.documentElement.scrollTop;//滑动出去的距离 变化
                let visibleRange=document.documentElement.clientHeight;//可视区的距离 不变
                let fullPage=document.documentElement.scrollHeight;//整个页面的高度 不变
                if(slideHeight+visibleRange==fullPage&&!this.isEnd){
                    this.getMovieInf();
                }
            }
        },
        methods:{
            getMovieInf(){
                this.ImgShow=true;
             
                //let start=this.movieList.length;
                //let url=`https://bird.ioliu.cn/v2?url=https://api.douban.com/v2/movie/in_theaters?start=${start}&count=5`;
                let url=`https://api.myjson.com/bins/1hj1iq`;//模拟
                axios.get(url).then(result=>{
                    this.ImgShow=false;
                    let getList=result.data.subjects.slice(this.movieList.length,this.movieList.length+5);//每次取5个数据
                    if(getList.length<5){
                        this.isEnd=true;
                    }
                    this.movieList=this.movieList.concat(getList);//连接两个数组 concat()返回一个新的数组
                   //this.movieList=[...result.data.subjects,...this.movieList];
                })
                .catch(()=>{
               console.log("Failed to get movie list!");
           })
            },
            goDetail(id){
                this.$router.push('/moviedetail/'+id);
                
            }

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
.loading{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);

}
.End{
    text-align: center;
    color: #0080c0;

}
</style>