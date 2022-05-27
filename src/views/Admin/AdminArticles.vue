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
      <td>{{ $filters.date(item.create_at) }}</td>
      <td>{{ item.description }}</td>
      <td>{{ item.tag }}</td>
      <td>
        <span class="text-success" v-if="item.isPublic">公開</span>
        <span class="text-muted" v-else>不公開</span>
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
<DelModal :item="temparticle" ref="delModal" @emit-del="updateDelete"></DelModal >
<EditModal :article="temparticle" ref="editModal" @emit-update="updateArticle"></EditModal>
</template>

<script>
import DelModal from '../../components/Admin/DeleteModal.vue'
import EditModal from '../../components/Admin/EditArticlesModal.vue'
export default {
  data () {
    return {
      articles: [],
      temparticle: {},
      isNew: false
    }
  },
  methods: {
    getProduct (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`
      this.$http.get(api).then((res) => {
        this.articles = res.data.articles
      })
    },
    openModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.temparticle = {
          create_at: new Date().getTime() / 1000
        }
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`
        this.$http.get(api).then((res) => {
          this.temparticle = res.data.article
        })
      }
      this.$refs.editModal.showModal()
    },
    updateArticle (temparticle) {
      if (this.isNew) {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
        this.$http.post(api, { data: temparticle }).then((res) => {
          this.$refs.editModal.hideModal()
          this.getProduct()
        })
      } else {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${temparticle.id}`
        this.$http.put(api, { data: temparticle }).then((res) => {
          this.$refs.editModal.hideModal()
          this.getProduct()
        })
      }
    },
    openDeleteModal (item) {
      this.temparticle = item
      this.$refs.delModal.showModal()
    },
    updateDelete () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.temparticle.id}`
      this.$http.delete(api).then((res) => {
        this.$refs.delModal.hideModal()
        this.getProduct()
      })
    }
  },
  created () {
    this.getProduct()
  },
  components: {
    EditModal,
    DelModal
  }
}
</script>
