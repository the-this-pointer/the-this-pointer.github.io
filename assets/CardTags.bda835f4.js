import{u as C}from"./PostInfo.f4276a87.js";import{_ as k,f as y,i as B,G as F,n as _,o as l,c as r,a as t,t as c,g as u,F as q,v as A,q as M,s as N,O,P as p,d as P}from"./app.b78311c0.js";const S={class:"card-box card-wrapper tags"},V={class:"title"},b=t("i",{class:"iconfont icon-tag"},null,-1),w={class:"list"},L=["onClick"],$=["title"],z={class:"num"},D={key:0,class:"more"},E=P("\u66F4\u591A "),G=t("i",{class:"iconfont icon-next"},null,-1),I=[E,G],R=y({__name:"CardTags",props:{all:{type:Boolean,default:!1},pages:{type:Array,required:!0}},setup(g){const a=g,h=O(),m=a.all?"All Tags":"Popular Tags",i=C(),o=B(F(a.pages,"tags")),f=o.value.reduce((s,n)=>(s+=n.num,s),0);a.all&&o.value.unshift({text:"all",num:f});const x=_(()=>a.all?o.value:o.value.slice(0,i.value.maxTags)),v=()=>{const s=Math.floor(Math.random()*p.length);return{"background-color":p[s]}},d=s=>{h.push({path:"/tags/",query:{tag:s}})},T=_(()=>o.value.length>i.value.maxTags);return(s,n)=>(l(),r("section",S,[t("header",null,[t("h3",V,[b,t("span",null,c(u(m)),1)])]),t("ul",w,[(l(!0),r(q,null,A(u(x),e=>(l(),r("li",{key:e.text,class:"item",style:M(v()),onClick:j=>d(e.text)},[t("span",{class:"text",title:e.text},c(e.text),9,$),t("span",z,c(e.num),1)],12,L))),128))]),!a.all&&u(T)?(l(),r("div",D,[t("span",{class:"more-text",onClick:n[0]||(n[0]=e=>d("all"))},I)])):N("",!0)]))}});var K=k(R,[["__file","CardTags.vue"]]);export{K as C};