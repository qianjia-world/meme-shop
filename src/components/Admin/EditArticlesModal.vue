<template>
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
ref="modal">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="editModalLabel">
          <span>新增文章</span>
        </h5>
        <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-3">
              <label for="image" class="form-label">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                      placeholder="請輸入圖片連結" v-model="temparticle.image">
            </div>
            <div class="mb-3">
              <label for="customFile" class="form-label">或 上傳圖片
                <i class="fas fa-spinner fa-spin"></i>
              </label>
              <input type="file" id="customFile" class="form-control" @change="uploadFile" ref="fileInput">
            </div>
            <img class="img-fluid" alt="">
            <div class="mt-5">
              <div class="mb-3">
                <label for="create_at" class="form-label">新增日期</label>
                <input type="date" class="form-control" id="create_at" placeholder="請輸入新增日期" v-model="create_at">
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">文章描述</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="temparticle.description"></textarea>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control" id="title"
                      placeholder="請輸入標題" v-model="temparticle.title">
            </div>

            <div class="row gx-2">
              <div class="mb-3 col-md-6">
                <label for="tag" class="form-label">關鍵字</label>
                <input type="text" class="form-control" id="tag"
                        placeholder="請輸入關鍵字" v-model="temparticle.tag">
              </div>
              <div class="mb-3 col-md-6">
                <label for="author" class="form-label">作者</label>
                <input type="text" class="form-control" id="author"
                placeholder="請輸入作者" v-model="temparticle.author">
              </div>
            </div>

            <div class="row gx-2">
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">文章內容</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="18" v-model="temparticle.content"></textarea>
              </div>
            </div>

            <hr>

            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" checked="checked"
                        :true-value=true
                        :false-value=false
                        id="is_enabled" v-model="temparticle.isPublic">
                <label class="form-check-label" for="isPublic">
                  是否公開
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary"
                data-bs-dismiss="modal">取消
        </button>
        <button type="button" class="btn btn-primary" @click="$emit('emit-update', temparticle )">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import modalMixin from '../../Mixins/modalmixin'
export default {
  data () {
    return {
      temparticle: {},
      create_at: ''
    }
  },
  props: {
    article: {}
  },
  watch: {
    article () {
      this.temparticle = this.article
      const dateAndTime = new Date(this.temparticle.create_at * 1000).toISOString().split('T')
      this.create_at = dateAndTime[0]
    },
    create_at () {
      this.temparticle.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()// js方法
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(api, formData).then((res) => {
        if (res.data.success) {
          this.temparticle.imageUrl = res.data.imageUrl
        }
      })
    }
  },
  mixins: [modalMixin]
}
</script>
