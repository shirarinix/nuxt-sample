<template>
  <div>
    <el-button @click="getIp">IPアドレスの取得</el-button>
    <p>{{ ip }}</p>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        ip: '0.0.0.0'
      }
    },
    methods: {
      async getIp() {
        this.ip = await this.$axios.$get('http://icanhazip.com')
      }
    }
  }
</script>