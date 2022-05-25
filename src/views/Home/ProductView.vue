<template>
<div class="productView">
    <nav>
        <ul>
            <li>
                <a href="">所有類型</a>
            </li>
            <li>
                <a href="">程式梗</a>
            </li>
            <li>
                <a href="">工作梗</a>
            </li>
            <li>
                <a href="">生活梗</a>
            </li>
        </ul>
    </nav>
    <div class="products">
      <div v-for="item in products" :key="item.id" class="card">
        <img :src="item.imageUrl" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{item.title}}</h5>
          <p class="card-text">{{ item.description }}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      products: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        this.pagination = res.data.pagination
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
.productView{
  background-color: rgb(73, 44, 5);
  padding: 50px 0px;
  nav{
      margin: 0 auto;
      width: 750px;
      background-color: antiquewhite ;
      border-radius: 20px;
    ul{
      display: flex;
      width: 100%;
      li{
        justify-content: center;
        width: 150px;
        border-radius: 10px;
        background-color:#492c05;
        padding: 20px 20px;
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
    justify-content: space-between;
    flex-wrap: wrap;
    background-color:antiquewhite;
    border-radius:10px ;
    width: 80%;
    margin: 50px auto;
    padding: 30px 30px 0px 30px;
    .card{
      margin-bottom: 30px;
      width: 20%;
      height: 400px;
      img{
        height: 300px;
      }
    }
  }
}
</style>
