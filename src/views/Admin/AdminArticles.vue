<template>
<main>
<div class="text-end mt-2 me-2">
  <button class="btn btn-primary" @click="openModal(true)" type="button">新增文章</button>
</div>
<table class="table">
  <thead>
    <tr>
      <th width="200">文章名稱</th>
      <th width="200">作者</th>
      <th width="350">發布日期</th>
      <th width="350">文章描述</th>
      <th width="350">關鍵字</th>
      <th width="200">是否公開</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in articles" :key="item.id">
      <td>{{ item.title }}</td>
      <td>{{ item.author }}</td>
      <td>{{ item.create_at }}</td>
      <td>{{ item.description }}</td>
      <td>{{ item.tag }}</td>
      <td>
        <span class="text-success" v-if="item.isPublic">啟用</span>
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
<GoodsPagination :pages="pagination"  @emit-pages="getArticles"></GoodsPagination>
<EditModal :goods="nowArticle" ref="editModal" @emit-update="updateGoods" ></EditModal>
<DeleteModal :item="nowArticle" ref="delModal" @emit-del="DeleteGood" ></DeleteModal>
</template>

<script>
import GoodsPagination from '../../components/Admin/GoodsPagination.vue'
import EditModal from '../../components/Admin/EditArticlesModal.vue'
import DeleteModal from '../../components/Admin/DeleteModal.vue'
export default {
  data () {
    return {
      articles: [],
      pagination: {},
      nowArticle: {},
      isNew: false
    }
  },
  methods: {
    getArticles (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.articles = res.data.articles
          this.pagination = res.data.pagination
        }
      })
    },
    openModal (isnew, item) {
      if (isnew) {
        this.nowArticle = {}
      } else {
        this.nowArticle = { ...item }
      }
      this.isNew = isnew
      const open = this.$refs.editModal
      open.showModal()
    },
    updateGoods (coupon) {
      this.nowArticle = coupon
      this.nowArticle.due_date = new Date(this.nowArticle.due_date).getTime()
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      // 上下是在調整api，預設是新增，用上方那個；如果不是新增而是調整，改用下方的
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${coupon.id}`
        httpMethod = 'put'
      }
      const open = this.$refs.editModal

      this.$http[httpMethod](api, { data: this.nowArticle })
        .then((res) => {
          console.log(res)
          open.hideModal()
          if (res.data.success) {
            this.getArticles()
            this.nowArticle = {}
          }
        })
    },
    openDeleteModal (item) {
      this.nowArticle = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    DeleteGood () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.nowArticle.id}`
      this.$http.delete(api).then((res) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        if (res.data.success) {
          this.getArticles()
        }
      })
    }

  },
  created () {
    this.getArticles()
  },
  components: {
    GoodsPagination,
    EditModal,
    DeleteModal
  }
}
</script>
