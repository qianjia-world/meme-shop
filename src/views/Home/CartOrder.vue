<template>
<div class="justify-content-center cartOrder">
  <h1>請填寫您的訂單資料</h1>
  <form class="col-md-6">
    <table class="table align-middle">
      <thead>
        <th>品名</th>
        <th>數量/單位</th>
        <th>單價</th>
      </thead>
      <tbody>
        <tr v-for="item in data.carts" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qty }} / {{ item.product.unit }}</td>
          <td class="text-end">{{ item.total }} </td>
        </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="2" class="text-end">總計</td>
        <td class="text-end">{{data.final_total? data.final_total : ''}}</td>
      </tr>
      </tfoot>
    </table>

    <div class="row g-3 order">
      <div class="col-md-6">
        <label for="UserName" class="form-label">姓名</label>
        <input type="text" class="form-control" id="UserName" placeholder="請輸入姓名" v-model="user.name">
      </div>
      <div class="col-md-6">
        <label for="UserPhone" class="form-label">電話</label>
        <input type="tel" class="form-control" id="UserPhone" placeholder="請輸入電話" v-model="user.tel">
      </div>
      <div class="col-12">
        <label for="UserEmail" class="form-label">郵件</label>
        <input type="email" class="form-control" id="UserEmail" placeholder="請輸入Email" v-model="user.email">
      </div>
      <div class="col-12">
        <label for="inputAddress2" class="form-label">地址</label>
        <input type="text" class="form-control" id="inputAddress2" placeholder="請輸入地址" v-model="user.address">
      </div>
      <div class="col-12">
        <label for="Messenge" class="form-label">留言</label>
        <textarea class="form-control" id="Messenge" rows="3" v-model="message"></textarea>
      </div>
      <div class="col-md-4">
        <label for="PayWay" class="form-label">付款方式</label>
        <select id="PayWay" class="form-select">
          <option selected>貨到付款</option>
          <option>銀行轉帳</option>
          <option>刷臉</option>
          <option>搶劫</option>
        </select>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="Check">
          <label class="form-check-label" for="Check">
            我已詳閱購買說明
          </label>
        </div>
        <div class="text-end">
          <button type="button" @click="getOrder" class="btn btn-danger">建立訂單</button>
        </div>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      message: '',
      data: {}
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      this.$http.post(api, { data: { user: this.user, message: this.message } }).then((res) => {
        const id = res.data.orderId
        this.$router.push(`/pay/${id}`)
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.data = res.data.data
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.cartOrder{
  background: rgb(73, 44, 5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 136px);
  padding: 1%;
  h1{
    text-align: center;
    color: antiquewhite;
    font-size: 2rem;
    padding-bottom: 3%;
  }
  form{
    width: 90%;
    padding: 3% 3%;
    background: antiquewhite;
  }
  .order{
    padding: 3%;
    outline: 1px dashed #492c05;
    outline-offset: -10px;
  }
  @media (max-width:510px) {
    min-height: calc(100vh - 102px);
  }
}
</style>
