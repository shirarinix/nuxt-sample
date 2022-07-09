<template>
  <div>
    <p>
      これは、{{$route.params.category}}の{{$route.params.page}}ページ目です！
    </p>

    <div>
      <el-button @click="visible = true" >open</el-button>
      <el-dialog :visible.sync="visible" title="OK">処理されました!</el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        visible: false
      }
    }
  }
</script>