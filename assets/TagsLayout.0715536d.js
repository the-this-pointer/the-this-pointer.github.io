import{_ as c,f as i,o as l,c as m,e as a,a as s,g as e,J as _,K as h,F as d}from"./app.b78311c0.js";import{H as u,F as f,B as P}from"./PostInfo.f4276a87.js";import{C as T}from"./CardTags.bda835f4.js";import{P as v,a as C}from"./Pagination.f2ee67bb.js";import{u as L}from"./useTypePages.3c39ff96.js";const B={class:"theme-container theme-common-container"},y={class:"theme-content"},F={class:"theme-aside"},k={class:"theme-wrapper"},w=i({__name:"TagsLayout",setup(x){const{pages:n,pageList:r,handlePageChange:p,perPage:t,page:g,total:o}=L("tags","tag");return(H,N)=>(l(),m(d,null,[a(u),s("main",B,[s("div",y,[s("aside",F,[a(T,{all:"",pages:e(n)},null,8,["pages"])]),s("div",k,[a(v,{ref:"PostListRef",pages:e(r)},null,8,["pages"]),_(a(C,{"per-page":e(t),page:e(g),total:e(o),onPageChange:e(p)},null,8,["per-page","page","total","onPageChange"]),[[h,e(o)>e(t)]])])])]),a(f),a(P)],64))}});var R=c(w,[["__file","TagsLayout.vue"]]);export{R as default};