(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{Pasi:function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.SendCode=void 0,a("+L6B");var r=l(a("2/Rp")),o=l(a("qIgq")),i=l(a("Y/ft")),d=n(a("q1tI")),u=a("c+yx"),s=function(e){var t=null,a=0,n=e.second,l=e.initText,s=e.runText,f=e.resetText,c=e.onCaptcha,p=e.storageKey,g=e.onEnd,m=(0,i.default)(e,["second","initText","runText","resetText","onCaptcha","storageKey","onEnd"]),v=(0,d.useState)(l),y=(0,o.default)(v,2),E=y[0],h=y[1],C=(0,d.useState)(!1),b=(0,o.default)(C,2),T=b[0],x=b[1],w=(0,d.useState)(n),M=(0,o.default)(w,1),_=M[0],S=(0,d.useState)(!1),P=(0,o.default)(S,2),q=P[0],L=P[1];function I(e){e.preventDefault(),L(!0);var t=c?c():null;(0,u.isPromise)(t)?t.then(function(){L(!1),k()}).catch(function(){L(!1),console.log("\u83b7\u53d6\u9a8c\u8bc1\u7801\u5931\u8d25")}):t&&(L(!1),k())}function D(e){return s.replace(/\{([^{]*?)%s(.*?)\}/g,e.toString())}function k(){x(!0);var e=a||_;if(p){var n=(new Date).getTime()+1e3*e;sessionStorage.setItem(p,n.toString())}a||h(D(e)),t=setInterval(function(){e--,h(D(e)),e<=0&&F()},1e3)}function F(){h(f),x(!1),t&&clearInterval(t),p&&sessionStorage.removeItem(p),g&&g()}return(0,d.useEffect)(function(){var e=sessionStorage.getItem(p);if(p&&e){var n=~~((Number(e)-(new Date).getTime())/1e3);n>0&&(a=n,h(D(n)),k())}return function(){t&&clearInterval(t)}},[]),d.default.createElement(r.default,Object.assign({},m,{onClick:I,loading:q,disabled:T}),E)};t.SendCode=s,s.defaultProps={second:60,initText:"\u83b7\u53d6\u9a8c\u8bc1\u7801",runText:"{%s}\u79d2\u540e\u91cd\u65b0\u83b7\u53d6",resetText:"\u91cd\u65b0\u83b7\u53d6\u9a8c\u8bc1\u7801"}},WxbV:function(e,t,a){},g00D:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("+L6B");var l=n(a("2/Rp"));a("Pwec");var r=n(a("CtXQ"));a("5NDa");var o=n(a("5rEg")),i=n(a("p0pE"));a("y8nQ");var d=n(a("Vl3Y")),u=n(a("q1tI")),s=a("Y2fQ"),f=a("ioru"),c=d.default.Item,p=function(e){var t=e.prefixCls,a=e.loading,n=e.onLogin,p=e.onChangeType,g=e.form,m=g.validateFields,v=g.getFieldDecorator,y="password",E=function(e){e.preventDefault(),m(function(e,t){e&&n&&n((0,i.default)({},t,{type:y}))})},h=function(){p&&p(y)};return u.default.createElement(d.default,{onSubmit:E},u.default.createElement(c,null,v("mobile",{rules:[{required:!0,message:(0,s.formatMessage)({id:"validation.mobile.required"})}]})(u.default.createElement(o.default,{size:"large",prefix:u.default.createElement(r.default,{type:"mobile"}),placeholder:"".concat((0,s.formatMessage)({id:"app.login.mobile"}))}))),u.default.createElement(c,null,v("code",{rules:[{required:!0,message:(0,s.formatMessage)({id:"validation.verification-code.required"})}]})(u.default.createElement(o.default,{size:"large",autoComplete:"off",maxLength:6,prefix:u.default.createElement(r.default,{type:"key"}),placeholder:"".concat((0,s.formatMessage)({id:"app.login.verification-code"})),suffix:u.default.createElement(f.SendCode,{className:"verification-code-button"})}))),u.default.createElement(c,null,u.default.createElement(l.default,{loading:a,type:"primary",htmlType:"submit",size:"large",block:!0},u.default.createElement(s.FormattedMessage,{id:"app.login.login"})),u.default.createElement("div",{className:"".concat(t,"__switch")},u.default.createElement("span",{onClick:h},u.default.createElement(s.FormattedMessage,{id:"app.login.login-type-password"})))))};p.defaultProps={loading:!1};var g=d.default.create()(p);t.default=g},gRjX:function(e,t,a){"use strict";var n=a("tAuX"),l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(a("2Taf")),o=l(a("vZ4D")),i=l(a("l4Ni")),d=l(a("ujKo")),u=l(a("MhPg")),s=n(a("mrSG")),f=l(a("q1tI")),c=a("MuoO"),p=l(a("je13")),g=a("LeJ0"),m=l(a("qC21")),v=l(a("g00D"));a("WxbV");var y=function(e){function t(){var e;return(0,r.default)(this,t),e=(0,i.default)(this,(0,d.default)(t).apply(this,arguments)),e.handleLogin=function(t){var a=e.props.dispatch;a({type:"login/fetchLogin",payload:t})},e.handleChangeType=function(t){var a=e.props.dispatch,n=g.STORAGE_KEY_DEFAULT_CONFIG.loginType;p.default.set(n,t),a({type:"login/changeLoginType",payload:t})},e}return(0,u.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,a=e.loginType,n=e.loading;return f.default.createElement("div",{className:t},"password"===a&&f.default.createElement(m.default,{prefixCls:t,loading:n,onLogin:this.handleLogin,onChangeType:this.handleChangeType}),"sms"===a&&f.default.createElement(v.default,{prefixCls:t,loading:n,onLogin:this.handleLogin,onChangeType:this.handleChangeType}))}}]),t}(f.default.Component);y.defaultProps={prefixCls:"login-page"},y=s.__decorate([(0,c.connect)(function(e){var t=e.loading,a=e.login;return{loginType:a.type,loading:t.effects["login/fetchLogin"]}})],y);var E=y;t.default=E},ioru:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"SendCode",{enumerable:!0,get:function(){return n.SendCode}});var n=a("Pasi")},qC21:function(e,t,a){"use strict";var n=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("+L6B");var l=n(a("2/Rp"));a("Pwec");var r=n(a("CtXQ"));a("5NDa");var o=n(a("5rEg")),i=n(a("p0pE"));a("y8nQ");var d=n(a("Vl3Y")),u=n(a("q1tI")),s=n(a("mOP9")),f=a("Y2fQ"),c=d.default.Item,p=function(e){var t=e.prefixCls,a=e.loading,n=e.onLogin,p=e.onChangeType,g=e.form,m=g.validateFields,v=g.getFieldDecorator,y=function(e){e.preventDefault(),m(function(e,t){e||n&&n((0,i.default)({},t,{type:"password"}))})},E=function(){p&&p("sms")};return u.default.createElement(d.default,{onSubmit:y},u.default.createElement(c,null,v("username",{initialValue:"admin",rules:[{required:!0,message:(0,f.formatMessage)({id:"validation.username.required"})}]})(u.default.createElement(o.default,{size:"large",prefix:u.default.createElement(r.default,{type:"user"}),placeholder:"".concat((0,f.formatMessage)({id:"app.login.username"}))}))),u.default.createElement(c,null,v("password",{initialValue:"123456",rules:[{required:!0,message:(0,f.formatMessage)({id:"validation.password.required"})}]})(u.default.createElement(o.default,{size:"large",prefix:u.default.createElement(r.default,{type:"lock"}),autoComplete:"off",type:"password",placeholder:"".concat((0,f.formatMessage)({id:"app.login.password"})),suffix:u.default.createElement("span",{className:"forgot-link"},u.default.createElement(s.default,{to:"/user/password-reset"},u.default.createElement(f.FormattedMessage,{id:"app.login.forgot-password"})))}))),u.default.createElement(c,null,u.default.createElement(l.default,{loading:a,type:"primary",htmlType:"submit",size:"large",block:!0},u.default.createElement(f.FormattedMessage,{id:"app.login.login"})),u.default.createElement("div",{className:"".concat(t,"__switch")},u.default.createElement("span",{onClick:E},u.default.createElement(f.FormattedMessage,{id:"app.login.login-type-sms"})))))};p.defaultProps={loading:!1};var g=d.default.create()(p);t.default=g}}]);