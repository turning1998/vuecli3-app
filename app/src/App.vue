<!--当刷新页面时,页面会显示默认样式[此时没有传参];
解决办法1: 在头部子组件created()阶段，向父组件传送自己的名字;
          父组件接收以后根据子组件传送的名字，找到该对象，再传送给底部子组件
解决办法2：vuex 
解决办法3：在App组件的created()阶段
// console.log(location.pathname);//原生js方法:取到当前所在页面的path
//console.log(this.$route.path);// vue方法:取到当前所在页面的path;
根据当前的path找到相应的对象，再传送给头部和底部

-->



<template>
  <div id="app">
    <common-header :checkedList="checkedListInf"></common-header>
    <div class="content">
         <router-view />
    </div>
    <common-footer  :options="menuList" @checkedItem="checkedInf" :bgColor="checkedListInf.bgColor"></common-footer>

  </div>
</template>
<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue';
export default{
  created(){
    //this.$route.path;// vue方法:取到当前所在页面的path 
    let list= this.menuList.filter((obj,index)=>{
     
      return  obj.path==this.$route.path;
    });
    if(list.length){
        this.checkedListInf=list[0];
     

    }
    else{//没有长度 默认页面
      this.checkedListInf=this.menuList[0];

        
         

    }
 
    
  },
  components:{
    CommonHeader,CommonFooter
  },
  data(){
    return{
      menuList:[
        {
          title:"电影",
          name:"movie",
          path:'/movie',
          bgColor:'#8000ff',
        },
        {
          title:"音乐",
          name:"music",
          path:'/music',
          bgColor:'#008040',
        },
        {
          title:"书籍",
          name:"book",
          path:'/book',
          bgColor:'#004080',
        },
        {
          title:"图片",
          name:"photo",
          path:'/photo',
          bgColor:'#0080c0',
        }
      ],
      checkedListInf:{},//向头部传值

    } 
  },
  methods: {
    checkedInf(checkedListInf){   //footer选中的列
      this.checkedListInf=checkedListInf;
    },
   
  },
}
</script>

<style lang="scss">
.content{
  margin:1rem 0;
}

</style>
