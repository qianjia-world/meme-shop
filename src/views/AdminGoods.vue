<template>
<main>
<div class="text-end mt-2 me-2">
  <button class="btn btn-primary" @click="openModal(true)" type="button">增加產品</button>
</div>
<table class="table">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th>產品描述</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in goods" :key="item.id">
      <td>{{ item.category }}</td>
      <td>{{ item.title }}</td>
      <td>{{ item.description }}</td>
      <td class="text-right">
        {{ item.origin_price }}
      </td>
      <td class="text-right">
        {{ item.price }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button @click="openModal(false, item)" class="btn btn-outline-primary btn-sm">編輯</button>
          <button @click="openDeleteModal(item)" class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</main>
<GoodsPagination :pages="pagination"  @emit-pages="getGoods"></GoodsPagination>
<EditModal :goods="nowgood" ref="editModal" @emit-update="updateGoods" ></EditModal>
<DeleteModal :item="nowgood" ref="delModal" @emit-del="DeleteGood" ></DeleteModal>
</template>

<script>
import GoodsPagination from '../components/Admin/GoodsPagination.vue'
import EditModal from '../components/Admin/EditModal.vue'
import DeleteModal from '../components/Admin/DeleteModal.vue'
export default {
  data () {
    return {
      goods: [],
      pagination: {},
      nowgood: {},
      isNew: false
    }
  },
  methods: {
    getGoods (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.goods = res.data.products
          this.pagination = res.data.pagination
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
      console.log(this.isNew, this.nowgood)
      const open = this.$refs.editModal
      open.showModal()
    },
    updateGoods (good) {
      this.nowgood = good
      console.log(this.nowgood)
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
          console.log(res)
          open.hideModal()
          if (res.data.success) {
            this.getGoods()
          }
        })
    },
    openDeleteModal (item) {
      this.tempProduct = { ...item }
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
    this.getGoods()
  },
  components: {
    GoodsPagination,
    EditModal,
    DeleteModal
  }
}
</script>
