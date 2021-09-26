<template>
  <div class="Ec-dragContent-add">
    <el-drawer
      title="卡片编辑"
      :visible.sync="drawerShow"
      :direction="'ltr'"
      :modal="false"
      size="300px"
    >
      <div class="Ec-dragContent-list" v-for="(item, key) in list" :key="key">
        <p  @click="item.showMore = !item.showMore">
          <img :class="{'arrow':item.showMore}"  src="../assets/svg/arrow.svg" alt=""> {{ item.title }}
        </p>
        <div class="Ec-dragContent-app" v-if="item.showMore">
          <div
            class="drag-cot"
            v-for="(child, index) in item.list"
            :key="index"
            draggable="true"
            unselectable="on"
            @drag="drag(child)"
            @dragend="dragend(child)"
          >
            <span>
              <img  v-if="child.img" :src="child.img"   alt="">
            </span>
            <p>
              {{ child.label }}
            </p>

          </div>
        </div>
      </div   >
    </el-drawer>
  </div>
</template>

<script>
  import comList from './comList'
  const mouseXY = { 'x': null, 'y': null }
  const DragPos = { 'x': null, 'y': null, 'w': 2, 'h': 2, 'i': null }
  export default {
    name: 'EcDragAddDrawer',
    data() {
      return {
        gridDom: '',
        drawerShow: false,
        list: comList
      }
    },
    computed: {
    },
    mounted() {
      document.addEventListener('dragover', function(e) {
        mouseXY.x = e.clientX
        mouseXY.y = e.clientY
      }, false)
    },
    methods: {
      init(dom) {
        this.drawerShow = true
        this.gridDom = dom
      },
      drag: function(item) {
        const parentRect = document.getElementById('Ec-dragContent').getBoundingClientRect()
        let mouseInGrid = false
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
          mouseInGrid = true
        }
        if (mouseInGrid === true && (this.$parent.layout.findIndex(item => item.i === 'drop')) === -1) {
          this.$parent.layout.push({
            x: (this.$parent.layout.length * 2) % (this.colNum || 12),
            y: this.$parent.layout.length + (this.colNum || 12), // puts it at the bottom
            w: item.w || 1,
            h: item.h || 1,
            comField: item,
            i: 'drop'
          })
        }
        const index = this.$parent.layout.findIndex(item => item.i === 'drop')

        if (index !== -1) {
          try {
            this.gridDom.$children[this.$parent.layout.length].$refs.item.style.display = 'none'
            // eslint-disable-next-line no-empty
          } catch {
          }
          const el = this.gridDom.$children[index]
          el.dragging = { 'top': mouseXY.y - parentRect.top, 'left': mouseXY.x - parentRect.left }
          const new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
          if (mouseInGrid === true) {
            this.gridDom.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, item.w || 1, item.h || 1)
            DragPos.i = String(index)
            DragPos.x = this.$parent.layout[index].x
            DragPos.y = this.$parent.layout[index].y
          }
          if (mouseInGrid === false) {
            this.gridDom.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, item.w || 1, item.h || 1)
            this.$parent.layout = this.$parent.layout.filter(obj => obj.i !== 'drop')
          }
        }
      },
      dragend: function(item) {
        const parentRect = document.getElementById('Ec-dragContent').getBoundingClientRect()
        let mouseInGrid = false
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
          mouseInGrid = true
        }
        if (mouseInGrid === true) {
          // alert(`Dropped element props:\n${JSON.stringify(DragPos, ['x', 'y', 'w', 'h'], 2)}`);
          this.gridDom.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, item.w || 1, item.h || 1)

          this.$parent.layout = this.$parent.layout.filter(obj => obj.i !== 'drop')
          // UNCOMMENT below if you want to add a grid-item
          this.$parent.layout.push({
              x: DragPos.x,
              y: DragPos.y,
              w: item.w || 1,
              h: item.h || 1,
              i: DragPos.i,
              comField: item
          })
          this.gridDom.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, item.w || 1, item.h || 1)
          this.gridDom.$children[this.$parent.layout.length].$refs.item.style.display = 'block'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .Ec-dragContent-add{
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
  .arrow{
     transform: rotate(90deg);
     transition-duration:.3s;
  }
</style>
