<template>
  <div id="app">
    <common-header></common-header>
    <div>content</div>
    <router-view/>
    <common-footer></common-footer>

  </div>
</template>
<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue';
export default{
  components:{
    CommonHeader,CommonFooter
  }

}
</script>

<style lang="scss">

</style>
