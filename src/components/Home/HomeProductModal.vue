<template>
<div class="modal fade productModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title" id="exampleModalLabel">{{product.title}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div class="container-fluid">
              <div class="row">
                <div class="col-8 ">
                    <div class="productimg" :style="{backgroundImage:'url('+product.imageUrl+')'}" ></div>
                </div>
                <div class="col-4 productdescription">
                    <h2>產品描述</h2>
                    <p>{{ `"${product.description}"`}}</p>
                    <h2>說明內容</h2>
                    <p>{{product.content}}</p>
                    <div class="price">
                        <h2>價格</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">原價</th>
                                    <th scope="col">特價</th>
                                    <th scope="col">單位</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">$</th>
                                    <td>{{product.origin_price}}</td>
                                    <td>{{product.price}}</td>
                                    <td>{{product.unit}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        <button type="button" class="btn btn-primary" @click="$emit('emit-cart', product )">加入購物車</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import modalMixin from '../../Mixins/modalmixin'
export default {
  props: {
    item: {}
  },
  watch: {
    item () {
      this.product = this.item
    }
  },
  data () {
    return {
      product: {}
    }
  },
  mixins: [modalMixin]
}
</script>

<style lang="scss" >
.productModal{
    .modal-header{
        background:#492c05;
        color: antiquewhite;
        font-size: 2rem;
    }
    .modal-body{
        background:antiquewhite;
        .productimg{
          height: 600px;
          border: 3px solid #492c05;
          background-position: center center;
          background-size: contain;
          background-repeat: no-repeat;
          border-radius: 50px;
        }
        .productdescription{
            display: flex;
            flex-direction: column;
          h2{
            font-size: 1.5rem;
            font-weight: bold;
            color:#492c05
          }
          p{
            background:#492c05;
            color: rgb(255, 255, 255);
            border-radius: 10px;
            padding: 20px 20px;
            margin: 20px 20px;
            line-height: 1.5;
          }
          .price{
            justify-self: end;
            .table{
            margin: 20px 20px;
            background:#492c05;
            color: antiquewhite;
            border-radius: 5px;
            }
          }
        }
    }
    .modal-footer{
        background:#492c05;
        color: antiquewhite;
    }
}
</style>
