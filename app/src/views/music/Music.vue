<template>
    <div>
        <player :musicInf="musicData"></player>
    </div>
</template>
<script>
import axios from 'axios';
import Player  from '@/components/Player.vue';
    export default {
        components:{
            Player
        },
        data(){
            return {
                musicData:[]
            }
        },
        created(){
            axios.get('/data/musicdata.json').then((res)=>{
                    this.musicData=res.data.musicData;
                   // console.log(this.musicData);
            }).catch(()=>{
                console.log("Failed to get music data!");
            });
        }

    }
</script>

<style lang="scss" scoped>

</style>