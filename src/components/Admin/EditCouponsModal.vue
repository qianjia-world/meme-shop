<template>
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
ref="modal">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="editModalLabel">
          <span>新增優惠卷</span>
        </h5>
        <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input type="text" class="form-control" id="title"
                      placeholder="請輸入標題" v-model="good.title">
            </div>

            <div class="row gx-2">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">優惠代碼</label>
                <input type="text" class="form-control" id="code"
                        placeholder="請輸入優惠代碼" v-model="good.code">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">優惠力度</label>
                <input type="number" class="form-control" id="percent"
                        placeholder="請輸入優惠力度" v-model="good.percent">
              </div>
            </div>

            <div class="row gx-2">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">到期日</label>
                <input type="date" class="form-control" id="due_date"
                        placeholder="請輸入到期日" v-model="good.due_date">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled" v-model="good.is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
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
    },
    isNew: {
      type: Boolean,
      default () { return false }
    }
  },
  data () {
    return {
      modal: {},
      good: {},
      date: ''
    }
  },
  watch: {
    goods () {
      if (this.isNew === false) {
        this.good = { ...this.goods }
        const date = new Date(this.goods.due_date * 1000)
        this.good.due_date = date.getFullYear() + '-' + this.add0((date.getMonth() + 1)) + '-' + this.add0(date.getDate())
        console.log(this.good.due_date)
      }
    }
  },
  methods: {
    add0 (m) {
      return m < 10 ? '0' + m : m
    }
  }
}
</script>
