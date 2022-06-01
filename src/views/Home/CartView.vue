<template>
<div class="table-responsive cartView">
  <h1>您的迷因清單</h1>
  <table v-if="carts.length !== 0" class="table table-light table-hover">
    <thead>
      <tr class="list">
        <th scope="col">圖片</th>
        <th scope="col">標題</th>
        <th scope="col" class="hide">單位</th>
        <th scope="col" class="hide">原價</th>
        <th scope="col" class="hide">特價</th>
        <th scope="col">數量</th>
        <th scope="col">總價</th>
        <th scope="col" class="text-center">刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in carts" :key="key">
        <td class="img align-middle">
          <div class="image" :style="{backgroundImage:'url('+item.product.imageUrl+')'}"></div>
        </td>
        <td class="align-middle">{{item.product.title}}</td>
        <td class="align-middle hide">{{item.product.unit}}</td>
        <td class="align-middle hide">{{item.product.origin_price}}</td>
        <td class="align-middle hide">{{item.product.price}}</td>
        <td class="align-middle">
          <input type="number" @change="updateCart(item)" v-model="item.qty"></td>
        <td class="align-middle">{{item.final_total}}</td>
        <td class="align-middle text-center" >
          <a href="#" @click.prevent="deleteCart(item)">
            <i class="bi bi-x-square-fill"></i>
          </a>
        </td>
      </tr>
    </tbody>
    <tfoot>
    <tr>
      <td class="align-middle">總計</td>
      <td class="align-middle"></td>
      <td class="align-middle hide"></td>
      <td class="align-middle hide">{{ add ('origin_price', 'product') }}</td>
      <td class="align-middle hide">{{ add ('price', 'product') }}</td>
      <td class="align-middle">{{ add ('qty') }}</td>
      <td class="align-middle">{{ add ('final_total') }}</td>
      <td class="align-middle text-center">
        <a class="pay" href="#" @click.prevent="goShop">
          <i class="bi bi-coin"></i>
        </a>
      </td>
    </tr>
    </tfoot>
  </table>
  <div v-else class="noCart">
    <h2>您的清單還是空的，再去看看吧!</h2>
    <img src="../../../src/assets/yaa.webp" alt="">
  </div>
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
      if (!this.carts.length) return // 時間問題而產生的補丁，之後要找到一個更好的寫法
      if (product) {
        const objarray = this.carts.map(item => item.product[value])
        return objarray.reduce((a, b) => a + b)
      } else {
        const objarray = this.carts.map(item => item[value])
        return objarray.reduce((a, b) => a + b)
      }
    },
    deleteCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.delete(api).then((res) => {
        this.getCart()
      })
    },
    goShop () {
      this.$router.push('/order')
    },
    updateCart (item) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.$http.put(api, { data: { product_id: item.id, qty: item.qty } }).then((res) => {
        this.getCart()
      })
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
  min-height: 921px;
  padding: 20px;
  h1{
    text-align:center;
    font-size: 2rem;
    color: antiquewhite;
    padding: 30px 0;
  }
  .table{
    width: 95%;
    margin: 0 auto;
    .list th{
      white-space:nowrap;
    }
    .align-middle{
      width: 9%;
      input{
        width: 100%;
      }
    }
    .img{
      width: 30%;
      .image{
      height: 200px;
      border: 1px solid #492c05;
      background-position: center center;
      background-size: cover;
      }
    }
    .bi-x-square-fill{
      font-size: 30px;
      color: #492c05;
    }
    .pay{
      font-size: 45px;
      color: #492c05;
    }
  }
  .noCart{
    width: 90%;
    margin: 0 auto;
    background-color: antiquewhite;
    padding: 3%;
    outline: 2px solid #492c05;
    outline-offset: -10px;
    h2{
      font-size: 30px;
      margin-bottom: 10px;
      text-align: center;
      color: #492c05;;
    }
    img{
      display: block;
      height: auto;
      margin: 0 auto;
      background-position: center center;
      width: 75%;
    }
  }
  @media (max-width:655px) {
    .table{
      .hide{
        display: none;
      }
      .align-middle{
        width: 10%;
      }
      .img{
        width: 50%;
      }
    }
  }
    @media (max-width:485px) {
    .table{
      min-height: 700px;
      .align-middle{
        width: 12%;
      }
      .img{
        width: 12%;
        .image{
        height: 80px;}
      }
    }
  }
}
</style>
