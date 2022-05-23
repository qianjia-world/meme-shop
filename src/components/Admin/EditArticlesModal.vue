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
                      placeholder="請輸入圖片連結" v-model="good.image">
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
                <input type="date" class="form-control" id="create_at" placeholder="請輸入新增日期" v-model="good.create_at">
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control" id="title"
                      placeholder="請輸入標題" v-model="good.title">
            </div>

            <div class="row gx-2">
              <div class="mb-3 col-md-6">
                <label for="tag" class="form-label">關鍵字</label>
                <input type="text" class="form-control" id="tag"
                        placeholder="請輸入關鍵字" v-model="good.tag">
              </div>
              <div class="mb-3 col-md-6">
                <label for="author" class="form-label">作者</label>
                <input type="text" class="form-control" id="author"
                placeholder="請輸入作者" v-model="good.author">
              </div>
            </div>

            <div class="row gx-2">
              <div class="mb-3 ">
                <label for="content" class="form-label">文章內容</label>
                <input type="textarea" class="form-control" id="content" placeholder="請輸入文章內容" v-model="good.content">
              </div>
            </div>

            <hr>

            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled" v-model="good.isPublic">
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
        <button type="button" class="btn btn-primary" @click="$emit('emit-update', good )">確認</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ModalMixin from '@/Mixins/modalmixin'
export default {
  mixins: [ModalMixin],
  props: {
    goods: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      modal: {},
      good: {}
    }
  },
  watch: {
    goods () {
      this.good = this.goods
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
          this.good.imageUrl = res.data.imageUrl
        }
      })
    }
    // 這一塊還不熟
  }
}
</script>
