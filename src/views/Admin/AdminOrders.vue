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
    }
    // delOrder () {
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/all`
    //   this.$http.delete(api)
    // }
  },
  created () {
    this.getOrders()
    // this.delOrder()
  }
}
</script>
