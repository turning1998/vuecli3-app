

 
<!--
//对选中列表变色
（1）通过当前的索引与元素的下标相对应,如果一致则添加样式
 (2)
//音频：<audio src=""></audio>
视频
-->
<template>
    <div>
        <div class="album">
            <div class="album-mask" :style="{background:'url('+albumImg+') no-repeat center/cover'} "></div>
            <div class="album-img">
                <img :src="albumImg" alt="">
            </div>
            <div class="album-Info">
                <h3 class="album-Info-title">{{albumTitle}}</h3>
                <p class="album-Info-author">{{albumAuthor}}</p>
               <div class="album-Info-control">
                   <div class="album-Info-control-icon">
                        <i class="icon iconfont icon-shangyishou"></i>
                        <i class="icon iconfont icon-bofang" v-show="!isPlay" ></i>
                        <i class="icon iconfont icon-zanting" v-show="isPlay"></i>
                        <i class="icon iconfont icon-xiayishou"></i>
                   </div>
                   <span @click="listShow=!listShow" class="album-Info-control-menu">歌单</span>
               </div>
            </div>
        </div>

        <!--歌曲列表-->
        <transition name="fade">
            <ul class="music" v-show="listShow">
                <li :class="['music-title',nowIndex==index?'selected':'']" v-for="(music,index) in musicInf" :key="index" @click="selected(music,index)">
                    <span>{{music.title}}&nbsp;</span>-
                    <span>{{music.author}}</span>
                </li>
            </ul>
        </transition>
        <div>
             <audio :src="musicAudio" autoplay></audio>
        </div>
       
       
    </div>
</template>

<script>
import '@/assets/font/iconfont.css';

    export default {
        props:["musicInf"],
        data() {
            return {
                nowIndex:0,//当前选中歌曲的索引
                albumImg:'http://omratag7g.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg',
                albumTitle:"我要你",
                albumAuthor:"老狼",
                isPlay:false,//是否播放
                listShow:true,//歌单
                musicAudio:'',//歌曲的音频
                }
            },
        methods: {
            selected(music,index){
                this.nowIndex=index;
                this.albumTitle=music.title;
                this.albumAuthor=music.author;
                this.albumImg=music.musicImgSrc;
                this.musicAudio=music.src;


            }
            
        }
    }
   
</script>

<style lang="scss" scoped>
.music{
    position: fixed;
    bottom: 0;
    margin-bottom: 1rem;
    height: 4rem;
    overflow-y: scroll;
    width: 100%;
    
    background-color: #2a2929;
    &-title{
        color: #dcdbdb;
        border-bottom: 0.02rem solid #343433;
        padding: 0.2rem; 
        &.selected{
            color:#299557;
        }
    }
}
.album{
    display: flex;
    position: relative;
    &-mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter:blur(10px);//模糊度
        z-index: -1;//层级
    }
    &-img{
        flex: 1;
        width: 0;
        img{
            width: 100%;
        }
    }
    &-Info{
        color: #4bcf0e;
        width: 0;
        flex:2;
        text-align: center;
       
        &-control{
            &-icon{
                float: left;
                padding: 0  0.7rem;
                font-size: 0.3rem;

            }
            &-menu{
                float: left;

            }

        }
    }
}
.fade{
    &-enter{
        transform: translateY(100%);
        &-active{
            transition: transform 1s ease;
        }
        &-to{
            transform: translateY(0);
        }
    }
    &-leave{
        transform: translateY(0);
        &-active{
            transition: transform 1s ease;
        }
        &-to{
            transform: translateY(100%);
        }

    }
}

</style>