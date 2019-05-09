//如果想要在中定义的组件上绑定事件需要加native修饰符,即@click.native 
<template>
    <ul class="footer" :style="{background:bgColor}">
        <li class="footer-title"  v-for="(obj,index) in options" :key="index"> 
            <!--可以取消点击事件是因为每一个组件对应的path都不同;
                在created()阶段可以根据path切换内容
            -->
            <!-- <router-link :to='obj.path' @click.native='checkedItem(obj)'>{{obj.title}}</router-link>-->
            <router-link :to='obj.path'>{{obj.title}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
      

        data(){
            return{
            }
        },
        //options是所有的项
        //bgColor对应当前path对应下的某一个项的背景颜色
        props:['options','bgColor'],
        methods: {
           /*  checkedItem(obj){ 点击事件处理函数
                this.checkedBgColor=obj.bgColor;
                this.$emit('checkedItem',obj);
            } */
        },
        
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
    &-title{
        flex:1;
        line-height: 1rem;
        text-align: center;
        a{
            color:#c0c0c0;
            display: block;
            outline: none;
            cursor: pointer;
            &.router-link-active{
                font-weight: bold;
                color: #fff;
            }
        }
        
    }
}

</style>