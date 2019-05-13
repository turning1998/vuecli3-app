<template>
    <div>
        <img v-for="obj in Musicbg "  :key="Musicbg.id"   :src="Musicbg.bg" alt="">

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return{
                Musicbg:[]

            }
        },
        created(){
            let url='/musiclist.json';
            axios.get(url).then((musiclist)=>{
                console.log(musiclist);
                this.Musicbg=musiclist.data.albums;
                console.log(this.MusicList);

            }).catch(()=>{
                console.log("Failed to get music list!");
            })
        }
        
    }
</script>

<style lang="scss" scoped>

</style>