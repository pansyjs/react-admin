(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"53Hs":function(e,t,a){},"9Nox":function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("y8nQ");var n=l(a("Vl3Y")),u=l(a("qIgq"));a("OaEy");var r=l(a("2fM7"));a("7Kak");var d=l(a("9yH6")),f=l(a("q1tI")),o=l(a("iVvo")),c=d.default.Group,i=r.default.Option,s=function(e){var t=e.dispatch,a=e.visible,l=e.formType,s=e.onClose,m=e.onConfirm,p=e.form,v=e.modules,E=e.actions,b=p.getFieldDecorator,y=f.default.useState(""),g=(0,u.default)(y,2),h=g[0],w=g[1],I=f.default.useState("all"),C=(0,u.default)(I,2),k=C[0],q=C[1],x=f.default.useState(null),O=(0,u.default)(x,2),S=O[0],j=O[1];f.default.useEffect(function(){l&&w("create"===l?"\u6dfb\u52a0\u6388\u6743\u8bed\u53e5":"\u66f4\u65b0\u6388\u6743\u8bed\u53e5")},[e.formType]),f.default.useEffect(function(){a||p.resetFields()},[e.visible]);var F=function(){s&&s()},M=function(e){var t=e.target.value;q(t)},P=function(e){j({id:e.key,name:e.label}),t({type:"action/fetchList",payload:{moduleId:e.key}})},N=function(){p.validateFields(function(e,t){if(!e){if(!S)return;var a=t.effect,l=t.type,n=t.actions,u=S.name,r="all"===l?["".concat(u,"/*")]:n.map(function(e){return"".concat(u,"/").concat(e.label)});m&&m({effect:a,action:r})}})},_={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:12},md:{span:15}}},D=f.default.useMemo(function(){return v.map(function(e){return f.default.createElement(i,{key:e.id,value:e.id},e.name)})},[e.modules]);return f.default.createElement(o.default,{visible:a,onClose:F,onConfirm:N,onCancel:F,width:600,title:h},f.default.createElement(n.default,null,f.default.createElement(n.default.Item,Object.assign({},_,{label:"\u6743\u9650\u6548\u529b"}),b("effect",{initialValue:"allow",rules:[{required:!0,message:"\u6743\u9650\u6548\u529b\u4e0d\u80fd\u4e3a\u7a7a"}]})(f.default.createElement(c,null,f.default.createElement(d.default,{value:"allow"},"\u5141\u8bb8"),f.default.createElement(d.default,{value:"deny"},"\u62d2\u7edd")))),f.default.createElement(n.default.Item,Object.assign({},_,{label:"\u6240\u5c5e\u6a21\u5757"}),b("module",{rules:[{required:!0,message:"\u6240\u5c5e\u6a21\u5757\u4e0d\u80fd\u4e3a\u7a7a"}]})(f.default.createElement(r.default,{showSearch:!0,labelInValue:!0,placeholder:"\u8bf7\u9009\u62e9\u6240\u5c5e\u6a21\u5757",optionFilterProp:"children",onSelect:P},D))),f.default.createElement(n.default.Item,Object.assign({},_,{label:"\u64cd\u4f5c\u540d\u79f0"}),b("type",{initialValue:k,rules:[{required:!0,message:"\u6240\u5c5e\u6a21\u5757\u4e0d\u80fd\u4e3a\u7a7a"}]})(f.default.createElement(c,{onChange:M},f.default.createElement(d.default,{value:"all"},"\u6240\u6709\u64cd\u4f5c"),f.default.createElement(d.default,{value:"other"},"\u7279\u5b9a\u64cd\u4f5c")))),"all"!==k&&f.default.createElement(n.default.Item,Object.assign({},_,{label:"\u7279\u5b9a\u64cd\u4f5c"}),b("actions",{rules:[{required:!0,message:"\u64cd\u4f5c\u4e0d\u80fd\u4e3a\u7a7a"}]})(f.default.createElement(r.default,{showSearch:!0,labelInValue:!0,placeholder:"\u8bf7\u9009\u62e9\u64cd\u4f5c",mode:"multiple",optionFilterProp:"children"},E.map(function(e){return f.default.createElement(i,{key:e.id,value:e.id},e.name)}))))))};s.defaultProps={modules:[],actions:[]};var m=n.default.create()(s);t.default=m},D6Tr:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("pQjU")),u=n.default;t.default=u},pQjU:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(a("p0pE")),u=l(a("eHn4")),r=l(a("qIgq")),d=l(a("q1tI")),f=l(a("TSYQ"));a("53Hs");var o=function(e){var t=e.prefixCls,a=e.className,l=e.style,o=e.extra,c=e.children,i=d.default.useState(void 0),s=(0,r.default)(i,2),m=s[0],p=s[1];return d.default.useEffect(function(){var e=function(){var e="calc(100% - 80)";p(e)};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}},[1]),d.default.createElement("div",{className:(0,f.default)(a,(0,u.default)({},"".concat(t),!0)),style:(0,n.default)({},l,{width:m})},d.default.createElement("div",{className:"left"},o),d.default.createElement("div",{className:"right"},c))};o.defaultProps={prefixCls:"lotus-footer-toolbar"};var c=o;t.default=c},"x8L+":function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var n=l(a("bx4M"));a("5NDa");var u=l(a("5rEg"));a("y8nQ");var r=l(a("Vl3Y"));a("+L6B");var d=l(a("2/Rp"));a("5Dmo");var f=l(a("3S7+"));a("+BJd");var o=l(a("mr32")),c=l(a("gWZ8")),i=l(a("p0pE")),s=l(a("qIgq")),m=l(a("q1tI")),p=l(a("Y+p1")),v=l(a("mNz5")),E=a("MuoO"),b=l(a("usdK")),y=l(a("CLD0")),g=l(a("D6Tr")),h=l(a("Oc/f")),w=l(a("9Nox")),I=function(e){var t=e.dispatch,a=e.form,l=e.modules,E=e.actions,I=a.getFieldDecorator,C=m.default.useState(!1),k=(0,s.default)(C,2),q=k[0],x=k[1],O=m.default.useState([]),S=(0,s.default)(O,2),j=S[0],F=S[1];m.default.useState(function(){t({type:"action/fetchModules"})});var M=function(){x(!0)},P=function(){x(!1)},N=function(){a.validateFields(function(e,l){e||t({type:"policy/fetchCreate",payload:(0,i.default)({},l,{document:j}),callback:function(){F([]),a.resetFields(),V()}})})},_=function(e){F([].concat((0,c.default)(j),[e])),x(!1)},D=function(e){F(j.filter(function(t){return!(0,p.default)(t,e)}))},V=function(){b.default.push("/permission/policies")},L=[{title:"\u6743\u9650\u6548\u529b",dataIndex:"effect",render:function(e){return"allow"===e?"\u5141\u8bb8":"\u7981\u6b62"}},{title:"\u6a21\u5757",dataIndex:"module",render:function(e,t){var a=t.action[0];return a.split("/")[0]}},{title:"\u64cd\u4f5c\u540d\u79f0",dataIndex:"action",render:function(e){return e.map(function(e,t){return m.default.createElement(o.default,{key:t,color:"#2db7f5"},e)})}},{title:"\u64cd\u4f5c",key:"buttons",render:function(e,t){return m.default.createElement(f.default,{placement:"top",title:"\u5220\u9664"},m.default.createElement(d.default,{type:"danger",size:"small",icon:"delete",onClick:function(){return D(t)}}))}}];return m.default.createElement(m.default.Fragment,null,m.default.createElement(y.default,{title:"\u65b0\u5efa\u81ea\u5b9a\u4e49\u6743\u9650\u7b56\u7565",extra:[m.default.createElement(d.default,{key:"1",type:"primary",onClick:M},"\u6dfb\u52a0\u6388\u6743\u8bed\u53e5")]},m.default.createElement(r.default,{layout:"inline"},m.default.createElement(r.default.Item,{label:"\u7b56\u7565\u540d\u79f0"},I("name",{rules:[{required:!0,message:"\u7b56\u7565\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a"}]})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7b56\u7565\u540d\u79f0"}))),m.default.createElement(r.default.Item,{label:"\u7b56\u7565\u5907\u6ce8"},I("remark",{})(m.default.createElement(u.default,{placeholder:"\u8bf7\u8f93\u5165\u7b56\u7565\u5907\u6ce8"}))))),m.default.createElement(w.default,{visible:q,formType:"create",modules:l,actions:E,dispatch:t,onConfirm:_,onClose:P}),m.default.createElement(n.default,{bordered:!1},m.default.createElement(h.default,{data:{list:j},columns:L,rowKey:function(){return(0,v.default)()}})),m.default.createElement(g.default,null,m.default.createElement(d.default,{type:"primary",disabled:!j.length,onClick:N},"\u786e\u5b9a"),m.default.createElement(d.default,{onClick:V},"\u8fd4\u56de")))};I.defaultProps={modules:[]};var C=(0,E.connect)(function(e){var t=e.action;return{modules:t.modules,actions:t.list}})(r.default.create()(I));t.default=C}}]);