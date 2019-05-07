//如果想要在中定义的组件上绑定事件需要加native修饰符,即@click.native 
<template>
    <ul class="footer" :style="{background:bgColor}">
        <li class="footer-title"  v-for="(obj,index) in options" :key="index"> 
            <router-link :to='obj.path' @click.native='checkedItem(obj)'>{{obj.title}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
      

        data(){
            return{
            }
        },
        props:['options','bgColor'],
        methods: {
            checkedItem(obj){
                this.checkedBgColor=obj.bgColor;
                this.$emit('checkedItem',obj);
            }
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