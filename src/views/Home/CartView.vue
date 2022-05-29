<template>
<div class="table-responsive cartView">
  <h1>您的購物車清單</h1>
  <table class="table table-light table-hover">
    <thead>
      <tr>
        <th scope="col">圖片</th>
        <th scope="col">內容</th>
        <th scope="col">單位</th>
        <th scope="col">原價</th>
        <th scope="col">特價</th>
        <th scope="col">數量</th>
        <th scope="col">總價</th>
        <th scope="col">刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in carts" :key="key">
        <td class="img">
          <div class="image" :style="{backgroundImage:'url('+item.product.imageUrl+')'}"></div>
        </td>
        <td class="align-middle">{{item.product.title}}</td>
        <td class="align-middle">{{item.product.unit}}</td>
        <td class="align-middle">{{item.product.origin_price}}</td>
        <td class="align-middle">{{item.product.price}}</td>
        <td class="align-middle">
          <input type="number" v-model="item.qty"></td>
        <td class="align-middle">{{item.final_total}}</td>
        <td class="align-middle">
          <i class="bi bi-x-square-fill"></i>
        </td>
      </tr>
    </tbody>
    <tfoot>
    <tr>
      <td>總計</td>
      <td></td>
      <td></td>
      <td>{{ add ('origin_price', 'product') }}</td>
      <td>{{ add ('price', 'product') }}</td>
      <td>{{ add ('qty') }}</td>
      <td>{{ add ('final_total') }}</td>
      <td></td>
    </tr>
    </tfoot>
  </table>
</div>
</template>

<script>
export default {
  data () {
    return {
      carts: []
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(api).then((res) => {
        this.carts = res.data.data.carts
      })
    },
    add (value, product) {
      if (product) {
        const objarray = this.carts.map(item => item.product[value])
        console.log(objarray, value)
        return objarray.reduce((a, b) => a + b)
      } else {
        const objarray = this.carts.map(item => item[value])
        console.log(objarray, value)
        return objarray.reduce((a, b) => a + b)
      }
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.cartView{
  background-color: #492c05;
  padding-bottom: 30px;
  h1{
    text-align:center;
    font-size: 2rem;
    color: antiquewhite;
    padding: 30px 0;
  }
  .table{
    width: 60%;
    margin: 0 auto;
    .img{
      width: 30%;
      .image{
      height: 150px;
      border: 1px solid #492c05;
      background-position: center center;
      background-size: cover;
      }
    }
  }
}
</style>
