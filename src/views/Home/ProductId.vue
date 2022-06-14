<template>
  <div class="productId">
    <div class="list">
      <div class="image" :style="{backgroundImage:(product.imageUrl ? 'url('+product.imageUrl+')' : '')}"></div>
      <div class="product">
        <h1><i class="bi bi-align-start"></i>  {{ product.title }}  <i class="bi bi-align-end"></i></h1>
        <h2><i class="bi bi-clipboard2-heart-fill"></i>產品類型</h2>
        <p>{{ product.category }}</p>
        <h2><i class="bi bi-clipboard2-heart-fill"></i>產品描述</h2>
        <p>{{ product.description }}</p>
        <h2><i class="bi bi-clipboard2-heart-fill"></i>價格</h2>
        <ul>
          <li>
            <h3><i class="bi bi-piggy-bank"></i>原價<i class="bi bi-piggy-bank"></i></h3>
            <p>{{ product.origin_price }}<i class="bi bi-currency-dollar"></i></p>
          </li>
          <li>
            <h3><i class="bi bi-piggy-bank-fill"></i>特價<i class="bi bi-piggy-bank-fill"></i></h3>
            <p>{{ product.price }}<i class="bi bi-currency-dollar"></i></p>
          </li>
          <li>
            <h3><i class="bi bi-bookmark-fill"></i>單位<i class="bi bi-bookmark-fill"></i></h3>
            <p>{{ product.unit }}</p>
          </li>
        </ul>
        <a href="" class="btn" @click.prevent="addCart()">加入購物車</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      productId: ''
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.productId}`
      this.$http.get(api).then((res) => {
        this.product = res.data.product
      })
    },
    addCart () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: { product_id: this.productId, qty: 1 } }).then((res) => {
        console.log('ok')
        this.$router.push('/')
      })
    }
  },
  created () {
    this.productId = this.$route.params.productId
    this.getProduct()
  }
}
</script>

<style lang="scss">
.productId{
  background-color:#492c05;
  min-height: calc(100vh - 136px);
  display: flex;
  justify-content: center;
  align-items: center;
  .list{
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: antiquewhite;
    height: 75vh;
    padding: 1%;
    .image{
      border:10px solid #a55252;
      width: 50%;
      height: 95%;
      background-size: contain;// 不能寫background，沒作用
      background-repeat: no-repeat;
      background-position: center;
      background-color: #a55252;
    }
    .product{
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 95%;
      background: #51bbad;
      padding: 1%;
      h1{
        font-size: 2rem;
        text-align: center;
        font-weight: bold;
        padding: 1%;
      }
      h2{
        font-size: 1.5rem;
        font-weight: bold;
        margin: 1% 0;
      }
      >p{
        height: 22%;
        font-size: 16px;
        border-radius: 10px;
        background-color: #c28888;
        border: 1px solid #ffffff;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ul{
        display: flex;
        justify-content: space-between;
        height: 20%;
      }
      li{
        width: 30%;
        background-color: #c28888;
        border-radius: 10px;
        height: 100%;
        border: 1px solid #ffffff;
        h3,p{
          height: 50%;
          text-align: center;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .btn{
        background: antiquewhite;
        border: 1px solid #613e3e;
        border-radius: 5px;
        height: 10%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: auto auto;
        align-self: end;
        margin: 2%;
      }
    }
  }
  @media (max-width:800px) {
    .list{
    flex-direction: column;
      .image{
        border:10px solid #a55252;
        width: 98%;
        height: 50%;
      }
      .product{
      display: flex;
      flex-direction: column;
      width: 98%;
      height: 50%;
      background: #51bbad;
      padding: 1%;
      h1{
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        padding: 1%;
      }
      h2{
        font-size: 16px;
        font-weight: bold;
        margin: 1% 0;
      }
      >p{
        height: 22%;
        font-size: 16px;
        border-radius: 10px;
        background-color: #c28888;
        border: 1px solid #ffffff;
        font-weight: 600;
      }
      ul{
        display: flex;
        justify-content: space-between;
        height: 20%;
      }
      li{
        width: 30%;
        background-color: #c28888;
        border-radius: 10px;
        height: 100%;
        border: 1px solid #ffffff;
        h3,p{
          height: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
      }
      .btn{
        background: antiquewhite;
        border: 1px solid #613e3e;
        border-radius: 5px;
        height: 10%;
        width: 40%;
        white-space:nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: auto auto;
        align-self: end;
        margin: 2%;
      }
      }
    }

  }
  @media (max-width:510px) {
  min-height: calc(100vh - 102px);
  }
}

</style>
