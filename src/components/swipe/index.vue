<template>
  <el-carousel indicator-position="outside" class="drag-swipe" height="300px">
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <img :src="item.img" alt="" class="drag-swipe-img">
    </el-carousel-item>
  </el-carousel>
</template>
<script>

export default {
  name: 'EcSwipe',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >
  .drag-swipe-img{
    width: 100%;
    height: 100%;
  }
</style>
