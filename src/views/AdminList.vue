<template>
<AdminHeader></AdminHeader>
<router-view/>
<AdminFooter></AdminFooter>
</template>

<script>
import AdminHeader from '../components/Admin/AdminHeader.vue'
import AdminFooter from '../components/Admin/AdminFooter.vue'
export default {
  components: {
    AdminHeader,
    AdminFooter
  }
}
</script>
