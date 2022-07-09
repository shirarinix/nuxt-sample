<template>
  <div>
    <div>
      <el-button @click="visible = true" >open</el-button>
      <el-dialog :visible.sync="visible" title="OK">処理されました!</el-dialog>
    </div>
    <img src="~/assets/img/bookmark_calendar_top.png" >
  </div>
</template>

<script>
import NuxtLogo from '~/components/NuxtLogo.vue'

import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

export default {
  components: {
    NuxtLogo
  },

  data: function() {
    return {
      visible: false
    }
  }
  // plugins: {
  //   Element
  // }
}

</script>