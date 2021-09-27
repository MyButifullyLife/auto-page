<template>
  <div class="swipe-edit">
    <el-form label-position="right" label-width="70px" :model="formLabelAlign" style="padding-right: 20px;">
      <el-form-item v-for="(item, key) in list" :key="key" label="图片" size="small">
        <el-input v-model="item.img" size="small" />
        <div class="edit-cot">
          <el-button type="primary" circle icon="el-icon-document-copy" @click="add(item)" />
          <el-button type="danger" circle icon="el-icon-delete-solid" :disabled="!key && list.length==1" @click="del(key)" />
        </div>
      </el-form-item>
    </el-form>
    <footer>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="close">取消</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'SwipeEdit',
  props: {
    /**
     * 是否管理员
     */
    isAdmin: {
      type: Boolean,
      default: false
    },
    /**
     * 是否管理员
     */
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      listCopy: []
    }
  },

  mounted() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    save() {
      this.$store.state.layoutEdit = JSON.parse(JSON.stringify(this.$store.state.layout))
      // this.$message.success('保存成功')
      this.close()
    },
    add(item) {
      this.list.push(JSON.parse(JSON.stringify(item)))
    },
    del(index) {
      (this.list && this.list.length) && (this.list.splice(index, 1))
    }
  }
}
</script>
<style lang="scss" scoped>
   .swipe-edit {
     footer{
       display: flex;
       align-items: center;
       justify-content: center;
     }
   }
</style>
