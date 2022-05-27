<template>
<div class="productView">
    <a href="#">
      <i class="bi bi-bag-heart"></i>
      <i v-if="cart.length !== 0" class="bi bi-suit-heart-fill"></i>
    </a>
    <nav class="productList">
        <ul>
            <li>
                <a href="#" @click.prevent="renderProducts('全部')">所有類型</a>
            </li>
            <li>
                <a href="#" @click.prevent="renderProducts('程式')">程式梗</a>
            </li>
            <li>
                <a href="#" @click.prevent="renderProducts('工作')">工作梗</a>
            </li>
            <li>
                <a href="#" @click.prevent="renderProducts('生活')">生活梗</a>
            </li>
        </ul>
    </nav>
    <div class="products">
      <div v-for="item in temproducts" :key="item.id" class="card">
        <div class="card-img-top" :style="{backgroundImage:'url('+item.imageUrl+')'}"></div>
        <div class="card-body">
          <h2 class="card-title">{{item.title}}</h2>
          <a href="#" @click.prevent="getTempProduct(item)" class="btn">了解更多</a>
        </div>
      </div>
    </div>
</div>
<ProductModal :item="temproduct" ref="productModal" @emit-cart="addCart"></ProductModal>
</template>

<script>
import ProductModal from '../../components/Home/HomeProductModal.vue'
export default {
  data () {
    return {
      products: [], // 這放api拿回來的
      temproducts: [], // 這放種類篩選後的結果，拿來印出列表的
      temproduct: {}, // 這放要傳入modal的
      cart: []
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.renderProducts('全部')
      })
    },
    renderProducts (category) {
      switch (category) {
        case '全部':
          this.temproducts = this.products
          break
        case '程式':
          this.temproducts = this.products.filter(item => item.category === '程式')
          console.log(this.temproducts)
          break
        case '工作':
          this.temproducts = this.products.filter(item => item.category === '工作')
          console.log(this.temproducts)
          break
        case '生活':
          this.temproducts = this.products.filter(item => item.category === '生活')
          console.log(this.temproducts)
          break
      }
    },
    getTempProduct (item) {
      this.temproduct = item
      this.$refs.productModal.showModal()
    },
    addCart (item) {
      this.cart.push(item)
      console.log(item)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(api, { data: { product_id: item.id, qty: 1 } }).then((res) => {
        this.$refs.productModal.hideModal()
      })
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    ProductModal
  }
}
</script>

<style lang="scss">
.productView{
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: rgb(73, 44, 5);
  padding: 45px 15px;
  >a{
    color: antiquewhite;
    position: absolute;
    font-size: 3rem;
    bottom:60px;
    position: fixed;
    left:40px;
    .bi-suit-heart-fill{
      color:rgb(218, 20, 20);
      font-size: 30px;
      position: absolute;
      bottom:85px;
      left:65px;
      position: fixed;
    }
  }
  .productList{
      background-color: antiquewhite ;
      border-radius: 10px;
      width: 10%;
    ul{
      display: flex;
      flex-direction: column;
      justify-content: center;
      li{
        width: 80%;
        border-radius: 10px;
        background-color:#492c05;
        padding: 20px;
        margin: 20px;
        a{
          display: block;
          color: antiquewhite;
          text-align: center;
        }
      }
    }
  }
  .products{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color:antiquewhite;
    border-radius:10px ;
    width: 85%;
    .card{
      margin: 0.5% 0.5%;
      width: 19%;
      height: 400px;
      border: 1px solid #492c05;
      .card-img-top{
        height: 300px;
        border: 1px solid #492c05;
        background-position: center center;
        background-size: cover;
      }
      .card-body{
        font-weight: bold;
        text-align: center;
        color: #492c05;
        a{
          background: antiquewhite;
          color: #492c05;
        }
        a:hover{
          border: 1px solid #492c05;
        }
      }
    }
  }
}
</style>
