<!--
 watch: {                   }//一个数据影响多个数据
 computed{                  }//一个数据受多个数据的影响

//对选中列表变色
（1）通过当前的索引与元素的下标相对应,如果一致则添加样式
 (2)
 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio
//音频：<audio src=""  autoplay></audio>    
属性 
autoplay为自动播放
controls 如果设置了该属性，浏览器将提供一个包含声音，播放进度，
        播放暂停的控制面板，让用户可以控制音频的播放。
ref
方法
pause 暂停事件
play  播放事件
playing
timeupdate  当currentTime改变时触发
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
                        <i class="icon iconfont icon-shangyishou" @click="prev()"></i>
                        <i class="icon iconfont icon-bofang" v-show="!isPlay" @click="play()" ></i>
                        <i class="icon iconfont icon-zanting" v-show="isPlay"  @click="pause()"></i>
                        <i class="icon iconfont icon-xiayishou"   @click="next()"></i>
                   </div>
                   <span @click="listShow=!listShow" class="album-Info-control-menu">歌单</span>
               </div>
            </div>
        </div>

        <!--歌曲列表-->
        <transition name="fade">
            <ul class="music" v-show="listShow">
                <li :class="['music-title',nowIndex==index?'selected':'']" v-for="(music,index) in musicInf" :key="index" @click="selected(index)">
                    <span>{{music.title}}&nbsp;</span>-
                    <span>{{music.author}}</span>
                </li>
            </ul>
        </transition>
        <!--音频-->
        <div class="musicAudio">
             <audio ref="xx"  :src="musicAudio" autoplay controls @play="isPlay=true" @pause="isPlay=false"></audio>
        </div>
         <!--歌词-->
        <div class="lyric-Info" ref="lrc">
            <ul class="lyric-Info-list">
                <li :class="index== lrcIndex?'selected':''" v-for="(obj,index) in lrcList" :key="index">{{obj.lrc}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import '@/assets/font/iconfont.css';

    export default {
        props:["musicInf"],
        mounted(){
            let times= this.$refs.xx;
            //绑定事件
            //oDiv.on事件名=function(){}; false冒泡 true捕获
            //oDiv.addEventLister('事件名',function(){},false)
            times.addEventListener('timeupdate',()=>{
                //监听timeupdate事件  获取当前时间 currentTime
               // console.log(times.currentTime);
               let playTime=times.currentTime; //获取当前播放时间 单位为秒
               this.lrcList.forEach((elem,index)=>{
                    //当前播放时间 在歌词信息里面的时间时间内 
                    //console.log(elem.time,playTime);
                   if(Math.ceil(elem.time)>= playTime&&Math.floor(elem.time)< playTime){
                           this.lrcIndex=index;//index 歌词的索引
                           //this.lrcIndex 被选中的歌词的索引
                           this.$refs.lrc.scrollTop=this.lrcIndex*25;//滚动

                   }
               });
               
            })
        },
        data() {
            return {
                nowIndex:0,//当前选中歌曲的索引
                albumImg:"http://singerimg.kugou.com/uploadpic/softhead/400/20180718/20180718110356316.jpg",
                albumTitle:"我要你",
                albumAuthor:"老狼",
                isPlay:false,//是否播放
                listShow:true,//歌单
                musicAudio:'http://up.mcyt.net/down/43422.mp3',//歌曲的音频
                lrcList:[],//歌词的数组
                lrcIndex:-1,//歌词的索引
                }
            },
        methods: {
            selected(index){
                this.nowIndex=index;
               /*  this.albumTitle=music.title;
                this.albumAuthor=music.author;
                this.albumImg=music.musicImgSrc;
                this.musicAudio=music.src; */
            },
           /*  playMusic(){
                console.log(this.$refs.xx);//获取真实DOM结构

            }, */
            play(){
                if(this.nowIndex!=-1)
                {
                    this.$refs.xx.play();//获取audio下的播放方法，播放音频
                }
            },
            pause(){
                 this.$refs.xx.pause();
            },
            prev(){
                this.nowIndex--;//
                if(this.nowIndex<0){
                    this.nowIndex=this.musicInf.length-1;
                }
            },
            next(){
                this.nowIndex++;//
                if(this.nowIndex==this.musicInf.length){
                    this.nowIndex=0;
                }
            },
            //解析歌词
            parseLrc(lrc){
                //console.log(lrc);
                //按照行分割
                let line=lrc.split('\n');
                //console.log(line);//数组
                //时间和歌词分割：遍历数组 
                //ref.exec(str) 匹配字符串  正则表达式下的方法
                //str.match(reg);匹配字符串   字符串下的方法
                line.forEach(elem=>{
                    // /[\d{2}:\d{2}.\d{2}]/ 只要是包含这个格式的都可以
                    //  /([\d{2}:\d{2}.\d{2}])/ 加()为子表达式  输出结果和子表达式
                    //   /\[\d{2}:\d{2}.\d{2}\]/  时间
                   let time= elem.match(/\[\d{2}:\d{2}.\d{2}\]/)[0];
                   if(time!=null){
                         let lyric=elem.split(time)[1];//分割出歌词
                        // console.log(elem.split(time));
                       //console.log(time);
                      //  console.log(lyric);
                   
                   //把时间转化成秒
                   let timeReg=time.match(/(\d{2}):(\d{2}).(\d{2})/);
                 // console.log(timeReg);
                   //timeReg[1] 分钟 
                   //timeReg[2] 秒
                   //timeReg[3]  毫秒
                   let time2Seconds=parseInt(timeReg[1])*60+parseInt(timeReg[2])+parseInt(timeReg[3])/1000;
                  //  console.log(time2Seconds );//以秒为单位
                //lrcList:[],//歌词的数组

                    this.lrcList.push({
                        time:time2Seconds,
                        lrc:lyric,
                    })
                 }

                });
                //console.log(this.lrcList);
                

            }
           
            
        },
        //每次nowIndex改变，都会改变对应歌曲的消息
         watch: {                   
                nowIndex(){//监测nowIndex属性 只要nowIndex属性改变 对应的信息就要改变
                    let nowMusic=this.musicInf[this.nowIndex];//当前音乐对应的信息
                    this.albumTitle=nowMusic.title;
                    this.albumAuthor=nowMusic.author;
                    this.albumImg=nowMusic.musicImgSrc;
                    this.musicAudio=nowMusic.src;
                    this.lrcList=[];//歌词改变
                    this.lrcIndex=-1;//选中的歌词
                    //加载歌词
                    axios.get('/'+nowMusic.lrc).then((lyrics)=>{
                         this.parseLrc(lyrics.data);//歌词解析
                        //console.log(lyrics.data);
                    }).catch(()=>{
                        console.log("Failed to get lyrics message!");
                    })
                    
                }
            },
    }
   
</script>

<style lang="scss" scoped>
.music{
    position: fixed;
    bottom: 0;
    margin-bottom: 1.8rem;
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
.musicAudio{
    position: fixed;
    bottom: 0.8rem;
    width: 100%;
    & audio{
        width: 100%;
        height: 1rem;
        background-color: #343433;
    }
}
.lyric-Info{
    padding-top: 2rem;
    text-align: center;
    height: 6.2rem;
    overflow-y: scroll;
    .selected{
        color: #299557;
        font-size:120%;
    }
}

</style>