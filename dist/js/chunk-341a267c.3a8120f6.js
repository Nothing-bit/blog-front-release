(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-341a267c"],{"1dde":function(t,e,a){var s=a("d039"),r=a("b622"),n=a("2d00"),i=r("species");t.exports=function(t){return n>=51||!s((function(){var e=[],a=e.constructor={};return a[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},3638:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",[a("el-col",{attrs:{xl:{span:18,offset:3},lg:{span:20,offset:2},md:{span:24}}},[a("div",{staticClass:"breadcrumb"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/fore/index"}}},[a("a",{staticClass:"breadcrumb-item"},[t._v("首 页")])]),a("el-breadcrumb-item",[a("a",{staticClass:"breadcrumb-item"},[t._v("关 于")])])],1)],1),a("transition",{attrs:{appear:"","appear-active-class":"animate__animated animate__fadeIn","enter-active-class":"animate__animated animate__fadeIn"}},[a("el-card",[a("div",{directives:[{name:"proxy",rawName:"v-proxy"}],staticClass:"info-content ck-content",domProps:{innerHTML:t._s(t.myInfo)}})])],1)],1)],1),a("el-row",[a("el-col",{attrs:{xl:{span:18,offset:3},lg:{span:20,offset:2},md:24}},[a("el-card",{directives:[{name:"loading",rawName:"v-loading",value:t.formLoading,expression:"formLoading"}],staticClass:"comment-module",attrs:{shadow:"hover"}},[a("el-row",[a("el-col",{attrs:{lg:{span:12,offset:6},md:{span:20,offset:2}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-position":"top"}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"内容",prop:"content"}},[a("el-input",{attrs:{type:"textarea",maxlength:"400",rows:"6","show-word-limit":"",resize:"none"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"被回复时，邮件告诉我"}},[a("el-switch",{model:{value:t.form.inform,callback:function(e){t.$set(t.form,"inform",e)},expression:"form.inform"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"邮件地址",prop:"email"}},[a("el-input",{attrs:{type:"email",disabled:!t.form.inform},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),a("el-form-item",{staticClass:"form-item",staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.submitComment}},[t._v("提交")])],1)],1)],1)],1)],1),a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.getComment,expression:"getComment"}],staticClass:"infinite-list",staticStyle:{overflow:"auto"},attrs:{"infinite-scroll-delay":"1000"}},t._l(t.list,(function(e){return a("el-card",{key:e.id,staticClass:"infinite-list-item comment-module",attrs:{shadow:"hover"}},[a("el-row",{attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{lg:{span:16,offset:4},md:{span:24},sm:{span:24}}},[a("el-row",{attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{lg:{span:2},md:{span:2},sm:{span:2}}},[a("el-avatar",{attrs:{size:50,src:e.avatar,shape:"square"}})],1),a("el-col",{attrs:{lg:{span:6},md:{span:6},sm:{span:6}}},[a("p",{staticClass:"username"},[t._v(t._s(e.username))])]),a("el-col",{attrs:{lg:{span:8,offset:8},md:{span:8,offset:8},sm:{span:8,offset:8}}},[a("p",{staticClass:"create-by"},[t._v("留言于："+t._s(e.createBy))])])],1),a("p",{staticClass:"content-module"},[t._v(t._s(e.content))]),a("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){return t.reply(e.userId,e.id,e.username)}}},[t._v("回复")]),t._l(e.replyList,(function(s){return a("div",{key:s.id},[a("el-divider"),a("el-row",{attrs:{type:"flex",align:"middle"}},[a("el-col",{attrs:{lg:{span:2},md:{span:2},sm:{span:2}}},[a("el-avatar",{staticClass:"avatar",attrs:{size:50,src:s.avatar,shape:"square"}})],1),a("el-col",{attrs:{lg:{span:6},md:{span:6},sm:{span:6}}},[a("p",{staticClass:"username"},[t._v(t._s(s.username)+" 回复："+t._s(s.targetUsername))])]),a("el-col",{attrs:{lg:{span:8,offset:8},md:{span:8,offset:8},sm:{span:8,offset:8}}},[a("p",{staticClass:"create-by"},[t._v("回复于："+t._s(s.createBy))])])],1),a("p",{staticClass:"content-module"},[t._v(t._s(s.content))]),a("el-button",{attrs:{size:"mini",round:""},on:{click:function(a){return t.reply(s.userId,e.id,s.username)}}},[t._v("回复")])],1)}))],2)],1)],1)})),1),a("el-card",{staticClass:"last-card",attrs:{shadow:"hover"}},[t.commentLoading?a("h3",{staticStyle:{"text-align":"center"}},[a("i",{staticClass:"el-icon-loading"}),t._v("努力加载中")]):t._e(),t.hasNextPage?t._e():a("h3",{staticStyle:{"text-align":"center"}},[t._v("没有更多留言了！")])])],1)],1),a("el-dialog",{attrs:{visible:t.replyDialogDisplay,width:"50%",center:""},on:{"update:visible":function(e){t.replyDialogDisplay=e}}},[a("span",[t._v("回复："+t._s(t.targetUsername))]),a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:t.formLoading,expression:"formLoading"}],ref:"form",attrs:{model:t.form,"label-position":"top"}},[a("el-form-item",{staticClass:"form-item",attrs:{label:"内容",prop:"content"}},[a("el-input",{attrs:{type:"textarea",maxlength:"400",rows:"6","show-word-limit":"",resize:"none"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"被回复时，邮件告诉我"}},[a("el-switch",{model:{value:t.form.inform,callback:function(e){t.$set(t.form,"inform",e)},expression:"form.inform"}})],1),a("el-form-item",{staticClass:"form-item",attrs:{label:"邮件地址",prop:"email"}},[a("el-input",{attrs:{type:"email",disabled:!t.form.inform},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),a("el-form-item",{staticClass:"form-item",staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"primary"},on:{click:t.submitComment}},[t._v("提交")])],1)],1)],1)],1)},r=[],n=(a("99af"),a("5c96")),i=a("bc3a"),o=a.n(i),l={name:"About",methods:{getMyInfo:function(){var t=this,e=this.baseUrl+"/fore/myInfo";o.a.get(e).then((function(e){var a=e.data;t.myInfo=a.data}))},checkInput:function(){if(this.form.content.length<2)return Object(n["Notification"])({title:"提示",message:"请输入留言内容或者留言内容过短",type:"warning"}),!1;if(1==this.form.inform){var t=/^\w{3,}@\w{2,}\.(com|cn|net|com\.cn)$/;if(0==t.test(this.form.email))return Object(n["Notification"])({title:"提示",message:"请输入格式正确的邮件地址",type:"warning"}),!1}return!0},reply:function(t,e,a){this.replyDialogDisplay=!0,this.form.targetUserId=t,this.form.parentId=e,this.targetUsername=a},submitComment:function(){var t=this;if(1==this.checkInput()){var e=this.$cookies.get("zBlogToken");if(null!=e){var a=this.baseUrl+"/fore/comment";this.formLoading=!0,o.a.post(a,this.form,{headers:{Authorization:e}}).then((function(e){var a=e.data;200==a.code?(Object(n["Notification"])({title:"提示",message:"已成功提交留言，待审核后将会予以展示。",type:"success"}),t.formLoading=!1,t.$refs["form"].resetFields()):(Object(n["Notification"])({title:"错误",message:"未能成功提交留言！",type:"error"}),t.formLoading=!1)}))}else Object(n["Notification"])({title:"注意",message:"您需要登录后才能进行留言！",type:"warning"})}},getComment:function(){var t=this;if(this.hasNextPage){this.commentLoading=!0;var e=this.baseUrl+"/fore/comment/list?pageNum="+this.pageNum;o.a.get(e).then((function(e){var a=e.data;if(200==a.code){var s=a.data;t.pageNum++,t.hasNextPage=s.hasNextPage,t.commentLoading=!1,t.list=t.list.concat(s.list)}else Object(n["Notification"])({title:"提示",message:"获取留言列表失败！",type:"error"})}))}}},created:function(){document.title="关 于",this.getMyInfo()},data:function(){return{replyDialogDisplay:!1,hasNextPage:!0,formLoading:!1,targetUsername:"",form:{content:"",inform:!1,email:"",targetUserId:"",parentId:""},commentLoading:!1,list:[],pageNum:1,myInfo:""}}},m=l,c=(a("f587"),a("2877")),f=Object(c["a"])(m,s,r,!1,null,"44b4ebea",null);e["default"]=f.exports},8418:function(t,e,a){"use strict";var s=a("c04e"),r=a("9bf2"),n=a("5c6c");t.exports=function(t,e,a){var i=s(e);i in t?r.f(t,i,n(0,a)):t[i]=a}},"99af":function(t,e,a){"use strict";var s=a("23e7"),r=a("d039"),n=a("e8b5"),i=a("861d"),o=a("7b0b"),l=a("50c4"),m=a("8418"),c=a("65f0"),f=a("1dde"),d=a("b622"),p=a("2d00"),u=d("isConcatSpreadable"),g=9007199254740991,v="Maximum allowed index exceeded",b=p>=51||!r((function(){var t=[];return t[u]=!1,t.concat()[0]!==t})),h=f("concat"),y=function(t){if(!i(t))return!1;var e=t[u];return void 0!==e?!!e:n(t)},_=!b||!h;s({target:"Array",proto:!0,forced:_},{concat:function(t){var e,a,s,r,n,i=o(this),f=c(i,0),d=0;for(e=-1,s=arguments.length;e<s;e++)if(n=-1===e?i:arguments[e],y(n)){if(r=l(n.length),d+r>g)throw TypeError(v);for(a=0;a<r;a++,d++)a in n&&m(f,d,n[a])}else{if(d>=g)throw TypeError(v);m(f,d++,n)}return f.length=d,f}})},b6c8:function(t,e,a){},f587:function(t,e,a){"use strict";a("b6c8")}}]);