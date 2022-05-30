<template>
<main>
<div class="text-end mt-2 me-2">
  <button class="btn btn-primary" type="button">刪除全部訂單</button>
</div>
<table class="table">
  <thead>
    <tr>
      <th>訂單筆數</th>
      <th>客戶名稱</th>
      <th>建立日期</th>
      <th>訂單追蹤</th>
      <th>繳費狀態</th>
      <th>訊息</th>
      <th>訂單總金額</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, key) in orders" :key="item.id" >
      <td>{{ key+1 }}</td>
      <td>{{ item.user.name }}</td>
      <td>{{ $filters.date(item.create_at) }}</td>
      <td>{{ item.id }}</td>
      <td>{{ item.is_paid ? '已繳費' : '未付款' }}</td>
      <td>{{ item.message }}</td>
      <td class="text-right">{{ item.total }}
      </td>
    </tr>
  </tbody>
</table>
</main>

</template>

<script>
export default {
  data () {
    return {
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          console.log(this.orders)
        }
      })
    },
    openModal (isnew, item) {
      if (isnew) {
        this.nowgood = {}
      } else {
        this.nowgood = { ...item }
      }
      this.isNew = isnew
      const open = this.$refs.editModal
      open.showModal()
    },
    updateGoods (good) {
      this.nowgood = good
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 上下是在調整api，預設是新增，用上方那個；如果不是新增而是調整，改用下方的
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${good.id}`
        httpMethod = 'put'
      }
      const open = this.$refs.editModal

      this.$http[httpMethod](api, { data: this.nowgood })
        .then((res) => {
          open.hideModal()
          if (res.data.success) {
            this.getGoods()
          }
        })
    },
    openDeleteModal (item) {
      this.nowgood = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    DeleteGood () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.nowgood.id}`
      this.$http.delete(api).then((res) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        if (res.data.success) {
          this.getGoods()
        }
      })
    }

  },
  created () {
    this.getOrders()
  }
}
</script>
