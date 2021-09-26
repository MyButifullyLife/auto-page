<template>
  <div class="Ec-dragContent-edit">
    <el-drawer
      :title="detailItem.label"
      :visible.sync="drawerShow"
      :direction="'rtl'"
      size="400px"
      @close="close"
      :modal="false"
    >
      <component :is="comData[ detailItem.editFile ]" v-bind="detailItem.props" @close="childClose" />
    </el-drawer>
  </div>
</template>

<script>
  import Components from './config'
  export default {
    name: 'EcDragEditDrawer',
    data() {
      return {
        comData: Components,
        drawerShow: false,
        detailItem: {}
      }
    },
    mounted() {
    },
    methods: {
      init(item) {
        this.drawerShow = true
        this.detailItem = item.comField
      },
      close() {
        this.$store.state.layout = JSON.parse(JSON.stringify(this.$store.state.layoutEdit))
      },
      childClose() {
        this.drawerShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Ec-dragContent-edit{
    ::v-deep .el-drawer__header {
      padding: 12px;
      margin-bottom: 0;
    }
    .Ec-dragContent-list{
      font-size: 14px;
      >p{
        margin: 0;
        padding-left: 12px;
        text-align: left;
        >img{
          width: 12px;
        }
      }
      >.Ec-dragContent-app{
        display: inline-block;
        padding-left: 12px;
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        .drag-cot{
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          width: 62px;
          height: 62px;
          >span{
            display: inline-block;
            width: 40px;
            height: 40px;
            >img{
              width: 100%;
              height: 100%;
            }
          }
          >p{
            margin: -5px 0 0;
            text-align: center;
            font-size: 12px;
            color: #939393;
          }
        }
      }
    }
  }
</style>
