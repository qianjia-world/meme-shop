<template>
<AdminHeader></AdminHeader>
<router-view/>
</template>

<script>
import AdminHeader from '../../components/Admin/AdminHeader.vue'
export default {
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)memeshop\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 取出存在cookie的token
    this.$http.defaults.headers.common.Authorization = token
    // 把token賦予在header上
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
      // 測試如果cookie是錯的，就讓我跳轉回去重新登入
    })
  },
  components: {
    AdminHeader
  }
}
</script>
