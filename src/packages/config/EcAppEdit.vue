<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'EcAppEdit',
  props: {
    /**
     * 是否管理员
     */
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
