"use strict";(self["webpackChunkmeme_shop"]=self["webpackChunkmeme_shop"]||[]).push([[138],{8138:function(e,l,t){t.r(l),t.d(l,{default:function(){return D}});var a=t(6252),s=t(3577),o=t(9963);const r={class:"justify-content-center cartOrder"},n=(0,a._)("h1",null,"請填寫您的訂單資料",-1),d={class:"col-md-6"},c={class:"table align-middle"},i=(0,a._)("thead",null,[(0,a._)("th",null,"品名"),(0,a._)("th",null,"數量/單位"),(0,a._)("th",null,"單價")],-1),u={class:"text-end"},m=(0,a._)("td",{colspan:"2",class:"text-end"},"總計",-1),p={class:"text-end"},_={class:"row g-3 order"},h={class:"col-md-6"},f=(0,a._)("label",{for:"UserName",class:"form-label"},"姓名",-1),b={class:"col-md-6"},y=(0,a._)("label",{for:"UserPhone",class:"form-label"},"電話",-1),g={class:"col-12"},w=(0,a._)("label",{for:"UserEmail",class:"form-label"},"郵件",-1),v={class:"col-12"},k=(0,a._)("label",{for:"inputAddress2",class:"form-label"},"地址",-1),U={class:"col-12"},x=(0,a._)("label",{for:"Messenge",class:"form-label"},"留言",-1),C=(0,a._)("div",{class:"col-md-4"},[(0,a._)("label",{for:"PayWay",class:"form-label"},"付款方式"),(0,a._)("select",{id:"PayWay",class:"form-select"},[(0,a._)("option",{selected:""},"貨到付款"),(0,a._)("option",null,"銀行轉帳"),(0,a._)("option",null,"刷臉"),(0,a._)("option",null,"搶劫")])],-1),z={class:"col-12"},V=(0,a._)("div",{class:"form-check"},[(0,a._)("input",{class:"form-check-input",type:"checkbox",id:"Check"}),(0,a._)("label",{class:"form-check-label",for:"Check"}," 我已詳閱購買說明 ")],-1),O={class:"text-end"};function P(e,l,t,P,$,j){return(0,a.wg)(),(0,a.iD)("div",r,[n,(0,a._)("form",d,[(0,a._)("table",c,[i,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)($.data.carts,(e=>((0,a.wg)(),(0,a.iD)("tr",{key:e.id},[(0,a._)("td",null,(0,s.zw)(e.product.title),1),(0,a._)("td",null,(0,s.zw)(e.qty)+" / "+(0,s.zw)(e.product.unit),1),(0,a._)("td",u,(0,s.zw)(e.total),1)])))),128))]),(0,a._)("tfoot",null,[(0,a._)("tr",null,[m,(0,a._)("td",p,(0,s.zw)($.data.final_total?$.data.final_total:""),1)])])]),(0,a._)("div",_,[(0,a._)("div",h,[f,(0,a.wy)((0,a._)("input",{type:"text",class:"form-control",id:"UserName",placeholder:"請輸入姓名","onUpdate:modelValue":l[0]||(l[0]=e=>$.user.name=e)},null,512),[[o.nr,$.user.name]])]),(0,a._)("div",b,[y,(0,a.wy)((0,a._)("input",{type:"tel",class:"form-control",id:"UserPhone",placeholder:"請輸入電話","onUpdate:modelValue":l[1]||(l[1]=e=>$.user.tel=e)},null,512),[[o.nr,$.user.tel]])]),(0,a._)("div",g,[w,(0,a.wy)((0,a._)("input",{type:"email",class:"form-control",id:"UserEmail",placeholder:"請輸入Email","onUpdate:modelValue":l[2]||(l[2]=e=>$.user.email=e)},null,512),[[o.nr,$.user.email]])]),(0,a._)("div",v,[k,(0,a.wy)((0,a._)("input",{type:"text",class:"form-control",id:"inputAddress2",placeholder:"請輸入地址","onUpdate:modelValue":l[3]||(l[3]=e=>$.user.address=e)},null,512),[[o.nr,$.user.address]])]),(0,a._)("div",U,[x,(0,a.wy)((0,a._)("textarea",{class:"form-control",id:"Messenge",rows:"3","onUpdate:modelValue":l[4]||(l[4]=e=>$.message=e)},null,512),[[o.nr,$.message]])]),C,(0,a._)("div",z,[V,(0,a._)("div",O,[(0,a._)("button",{type:"button",onClick:l[5]||(l[5]=(...e)=>j.getOrder&&j.getOrder(...e)),class:"btn btn-danger"},"建立訂單")])])])])])}var $={data(){return{user:{name:"",email:"",tel:"",address:""},message:"",data:{}}},methods:{getOrder(){const e="https://vue3-course-api.hexschool.io/api/qianjia-api/order";this.$http.post(e,{data:{user:this.user,message:this.message}}).then((e=>{const l=e.data.orderId;this.$router.push(`/pay/${l}`)}))},getCart(){const e="https://vue3-course-api.hexschool.io/api/qianjia-api/cart";this.$http.get(e).then((e=>{this.data=e.data.data}))}},created(){this.getCart()}},j=t(3744);const q=(0,j.Z)($,[["render",P]]);var D=q}}]);
//# sourceMappingURL=138.63c62936.js.map