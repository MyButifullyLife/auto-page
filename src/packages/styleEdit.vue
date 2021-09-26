<template>
  <div class="Ec-dragContent-styleEdit">
    <el-drawer
      title="页面属性设置"
      :visible.sync="drawerShow"
      :direction="'rtl'"
      size="300px"
      :modal="false"
      @close="close"
    >
     <section class="section-cot">
       <p class="title" style="margin-top: 0;">
         页面设置
       </p>
       <el-radio-group v-model="cotStyle.autoSize" @click="change"  size="mini" class="radio">
         <el-radio :label="true" size="mini">自适应</el-radio>
         <el-radio :label="false" size="mini">固定宽度</el-radio>
       </el-radio-group>
       <p class="title ">
         页面边距
       </p>
       <div class="input-cot">
         <span>左右</span><el-input-number v-model="cotStyle.marginTop"  :min="0"    size="mini"></el-input-number>
       </div>
       <div class="input-cot" style="margin-top: 12px;">
         <span>上下</span><el-input-number v-model="cotStyle.marginRight"  :min="0"    size="mini"></el-input-number>
       </div>
       <p class="title ">
         背景颜色
       </p>
       <div class="color-cot" @click="showColor">
         <el-popover
                 placement="top-start"
                 trigger="click">
           <div slot="reference" class="color-btn">
             <el-button  :style="{'backgroundColor': cotStyle.style.backgroundColor}"  style="margin-right:15px;" > </el-button> <span>{{cotStyle.style.backgroundColor}}</span>
           </div>
           <div >
             <sketch-picker  :value="cotStyle.style.backgroundColor" @input="updateValue"/>
           </div>
         </el-popover>
       </div>

     </section>
    </el-drawer>
  </div>
</template>

<script>
  import { Sketch } from 'vue-color'
  export default {
    name: 'StyleEdit',
    components: {
      'sketch-picker': Sketch
    },
    data() {
      return {
        drawerShow: false,
        cotStyle: {
          marginTop: 10,
          marginRight: 10,
          margin: [],
          autoSize: true,
          style: {
            backgroundColor: '#DBD8D8'
          }
        }
      }
    },
    watch: {
      cotStyle: {
        handler(val) {
          const d = JSON.parse(JSON.stringify(val))
          d.margin = []
          d.margin.push(d.marginTop)
          d.margin.push(d.marginRight)
          this.$parent.cotStyle = d
        },
        deep: true
      }
    },
    mounted() {
    },
    methods: {
      updateValue(val) {
        this.cotStyle.style.backgroundColor = val.hex
      },
      showColor() {

      },
      change(e) {
        console.log(e)
      },
      init() {
        this.drawerShow = true
      },
      close() {
      },
      childClose() {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-top{
    margin-top: 15px;
  }
  .Ec-dragContent-styleEdit{
    ::v-deep .el-drawer__header {
      padding: 12px;
      margin-bottom: 0;
    }
    .section-cot{
      padding: 0 12px;
      font-size: 12px;
      .title{
        margin:24px 0 12px 0;
        color: #000;
        font-size: 14px;
        text-align: left;
      }
      .radio{
        width: 100%;
        text-align: left;
        ::v-deep.el-radio__label{
          font-size: 12px !important;
        }
      }
      .input-cot{
        display: flex;
        align-items: center;
        font-size: 12px;
        >span{
          text-align: left;
          margin-right: 15px;
        }
      }
    }
    .color-btn{
      display: flex;
      align-items: center;
      justify-content: left;
      width: 100%;
    }
  }
</style>
