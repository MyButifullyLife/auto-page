<template>
  <div>
    <nav class="edit-cot">
      <template v-if="isEdit">
        <el-tooltip class="item" effect="dark" content="新增卡片" placement="bottom">
          <el-button type="success" circle    icon="el-icon-menu" @click="editGird"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
          <el-button type="primary"  circle icon="el-icon-upload"  @click="save"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="恢复默认数据" placement="bottom">
          <el-button type="success" circle    icon="el-icon-timer" @click="findBack"></el-button>
        </el-tooltip>
      </template>
      <el-switch style="display: block;margin-left: 15px;" v-model="isEdit" active-color="" inactive-color="gray" active-text="编辑">
      </el-switch>
    </nav>
    <div id="Ec-dragContent">
      <grid-layout
        ref="gridlayout"
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :margin="[24,24]"
        :is-draggable="draggable"
        :is-resizable="resizable"
        :vertical-compact="true"
        :use-css-transforms="true"
        @movedEvent="movedEvent"
      >
        <grid-item
          v-for="(item,i) in layout"
          :key="i"
          :static="item.static"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          drag-allow-from=".vue-draggable-handle"
          drag-ignore-from=".grid-menu"
          :class="{'grid-menu-setCot': isEdit}"
        >
          <div class="grid-menu" >
            <div  @click="edit(item)">编辑</div>
            <div @click="del(i)">删除</div>
          </div>
          <div class="vue-draggable-handle" >
            <component :is="item.comField.component" v-bind="item.comField.props" />
          </div>
        </grid-item>
      </grid-layout>
    </div>

    <EcDragEditDrawer ref="editDrawer" />
    <EcDragAddDrawer ref="addDrawer"  />
  </div>
</template>

<script>
  import { GridLayout, GridItem } from 'vue-grid-layout'
  import EcAppCot from '../components/app'
  import EcWipe from '../components/swipe'
  import EcDragEditDrawer from '../packages/edit'
  import EcDragAddDrawer from '../packages/add'
  export default {
    components: {
      GridLayout,
      GridItem,
      EcAppCot,
      EcDragEditDrawer,
      EcDragAddDrawer,
      EcWipe
    },
    data() {
      return {
        isEdit: false,
        drawerShow: false,
        draggable: false,
        resizable: false,
        index: 0,
        layout: [],
        layoutCopy: [],
        layoutEdit: []
      }
    },
    watch: {
      isEdit(n, o) {
        this.draggable = n
        this.resizable = n
        if (n) {
          this.layoutCopy = JSON.parse(JSON.stringify(this.layout))
        }
      }
    },
    methods: {
      findBack() {
        if (this.layoutCopy) {
          this.layout = JSON.parse(JSON.stringify(this.layoutCopy))
        }
      },
      editGird() {
        this.$refs.addDrawer.init(this.$refs.gridlayout)
      },
      movedEvent: function(i, newX, newY) {
        console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY)
      },
      edit(item) {
        // 编辑
        this.layoutEdit = JSON.parse(JSON.stringify(this.layout))
        this.$refs.editDrawer.init(item)
      },
      del(i) {
        // 删除
        this.layout.splice(i, 1)
      },
      save() {
        // 保存
        localStorage.setItem('list', JSON.stringify(this.layout))
        this.$message.success('保存成功')
      },
      load() {
        // 加载
        const layout = localStorage.getItem('list')
        if (layout) {
          this.layout = JSON.parse(layout)
        } else {
          this.isEdit = true
          this.$message.error('暂无数据，右上角编辑可新增卡片')
        }
      },
      itemTitle(item) {
        let result = item.i
        if (item.static) {
          result += ' - Static'
        }
        return result
      }
    },
    mounted() {
      this.load()
    }
  }
</script>

<style scoped lang="scss">
  .edit-cot {
    position: fixed;
    top: 0;
    right: 50px;
    z-index: 10;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .4;
    ::v-deep .el-switch__label--left{
      display: none;
    }
  }
  .edit-cot:hover{
    opacity: 1;
  }
  .vue-grid-layout {
    background: #e3e7ea;
    min-height: 100vh;
  }
  .vue-grid-item:not(.vue-grid-placeholder) {
    background: #ffffff;
    box-shadow: 0 2px 6px 0 rgb(57 75 115 / 15%);
    overflow: hidden;
    border-radius: 4px;
    position: relative;
  }
  .grid-menu {
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0 4px 0 4px;
    z-index: 2;
    font-size: 12px;
  }
  .grid-menu div {
    cursor: pointer;
    padding: 8px;
  }
  .grid-menu-setCot:hover .grid-menu {
    display: flex;
  }
  .grid-menu-setCot:hover {
    background-color: rgba(250,217,205,.5);
  }
  .vue-grid-item.vue-grid-placeholder {
    background-color: #00f !important;
  }
  .vue-grid-item .resizing {
    opacity: 0.9;
  }
  .vue-grid-item .static {
    background: #cce;
  }
  .vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .minMax {
    font-size: 12px;
  }
  .vue-grid-item .add {
    cursor: pointer;
  }
  .vue-grid-layout ::v-deep .vue-resizable-handle {
    z-index: 2;
  }

  .vue-draggable-handle {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    left: 0;
  }
</style>
