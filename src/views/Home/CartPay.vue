<template>
<div class="justify-content-center cartPay" >
  <h1>確認無誤即可付款，我們將盡快為您出貨</h1>
  <form class="col-md-6">
    <table class="table align-middle">
      <thead>
      <th>品名</th>
      <th>數量</th>
      <th>單價</th>
      </thead>
      <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.product.title}}</td>
        <td>{{item.qty}}/張</td>
        <td class="text-end">{{ item.final_total }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="2" class="text-end">總計</td>
        <td class="text-end">{{order.total}}</td>
      </tr>
      </tfoot>
    </table>

    <table class="table">
      <tbody>
      <tr>
        <th width="100">姓名</th>
        <td>{{ order.user.name ?  order.user.name : ''}}</td>
      </tr>
      <tr>
        <th>郵件</th>
        <td>{{ order.user.email?  order.user.email : ''}}</td>
      </tr>
      <tr>
        <th>收件人電話</th>
        <td>{{ order.user.tel ?  order.user.tel : ''}}</td>
      </tr>
      <tr>
        <th>收件人地址</th>
        <td>{{ order.user.address ?  order.user.address : ''}}</td>
      </tr>
      <tr>
        <th>{{order.is_paid }}</th>
        <td>
          <span>尚未付款</span>
          <span class="text-success">付款完成</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="text-end">
      <button class="btn btn-danger" @click="payMoney()">確認付款去</button>
    </div>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {
          name: '',
          address: '',
          email: '',
          tel: 0
        },
        is_paid: false
      },
      orderId: '',
      products: {}
    }
  },
  methods: {
    getOrder () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(api).then((res) => {
        this.order = res.data.order
        this.products = this.order.products
      })
    },
    payMoney () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(api).then((res) => {
        this.$router.push('/')
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>

<style lang="scss">
.cartPay{
  background: rgb(73, 44, 5);
  padding: 0 0 2% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 136px);
  h1{
    text-align: center;
    color: antiquewhite;
    font-size: 30px;
    padding-bottom: 10%;
  }
  form{
    width: 90%;
    padding: 3% 3%;
    background: antiquewhite;
    outline: 1px dashed #492c05;
    outline-offset: -10px;
  }
  @media (max-width:510px) {
    min-height: calc(100vh - 102px);
  }
}
</style>
