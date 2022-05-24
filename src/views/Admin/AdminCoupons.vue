<template>
<main>
<div class="text-end mt-2 me-2">
  <button class="btn btn-primary" @click="openModal(true)" type="button">增加優惠卷</button>
</div>
<table class="table">
  <thead>
    <tr>
      <th width="200">優惠卷名稱</th>
      <th width="200">折價力度</th>
      <th width="350">到期日</th>
      <th width="200">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in coupons" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.percent }}</td>
      <td>{{ changeText(item.due_date) }}</td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button @click="openModal(false, item)" class="btn btn-outline-primary btn-sm">編輯</button>
          <button @click="openDeleteModal(item)" class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</main>
<GoodsPagination :pages="pagination"  @emit-pages="getCoupons"></GoodsPagination>
<EditModal :goods="nowCoupon" ref="editModal" @emit-update="updateGoods" :isNew="isNew" ></EditModal>
<DeleteModal :item="nowCoupon" ref="delModal" @emit-del="DeleteGood" ></DeleteModal>
</template>

<script>
import GoodsPagination from '../../components/Admin/GoodsPagination.vue'
import EditModal from '../../components/Admin/EditCouponsModal.vue'
import DeleteModal from '../../components/Admin/DeleteModal.vue'
export default {
  data () {
    return {
      coupons: [],
      pagination: {},
      nowCoupon: {},
      isNew: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          // 這段要讓unix轉字串，方便之後顯示
        }
      })
    },
    changeText (item) {
      const date = new Date(item * 1000)
      item = date.getFullYear() + '-' + this.add0((date.getMonth() + 1)) + '-' + this.add0(date.getDate())
      return item
    },
    add0 (m) {
      return m < 10 ? '0' + m : m
    },
    openModal (isnew, item) {
      if (isnew) {
        this.nowCoupon = {}
      } else {
        this.nowCoupon = { ...item }
      }
      this.isNew = isnew
      const open = this.$refs.editModal
      open.showModal()
    },
    updateGoods (coupon) {
      this.nowCoupon = { ...coupon }
      this.nowCoupon.due_date = new Date(this.nowCoupon.due_date).getTime() / 1000
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 上下是在調整api，預設是新增，用上方那個；如果不是新增而是調整，改用下方的
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`
        httpMethod = 'put'
      }
      const open = this.$refs.editModal
      this.$http[httpMethod](api, { data: this.nowCoupon })
        .then((res) => {
          open.hideModal()
          if (res.data.success) {
            this.nowCoupon = {}
            this.getCoupons()
          }
        })
    },
    openDeleteModal (item) {
      this.nowCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    DeleteGood () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.nowCoupon.id}`
      this.$http.delete(api).then((res) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        if (res.data.success) {
          this.getCoupons()
          this.nowCoupon = {}
        }
      })
    }

  },
  created () {
    this.getCoupons()
  },
  components: {
    GoodsPagination,
    EditModal,
    DeleteModal
  }
}
</script>
