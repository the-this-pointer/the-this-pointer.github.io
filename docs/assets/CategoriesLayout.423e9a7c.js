import{_ as c,d as g,o as l,c as m,l as a,a as s,e,I as _,J as d,F as h}from"./app.d3725a3c.js";import{H as u,F as f,B as C}from"./PostInfo.895a7b38.js";import{C as P}from"./CardCategories.b79f5522.js";import{P as v,a as L}from"./Pagination.35487fb6.js";import{u as y}from"./useTypePages.2d1f2f4f.js";const B={class:"theme-container theme-common-container"},F={class:"theme-content"},k={class:"theme-aside"},w={class:"theme-wrapper"},x=g({__name:"CategoriesLayout",setup(T){const{pages:r,pageList:n,handlePageChange:i,perPage:t,page:p,total:o}=y("categories","category");return(H,N)=>(l(),m(h,null,[a(u),s("main",B,[s("div",F,[s("aside",k,[a(P,{all:"",pages:e(r)},null,8,["pages"])]),s("div",w,[a(v,{ref:"PostListRef",pages:e(n)},null,8,["pages"]),_(a(L,{"per-page":e(t),page:e(p),total:e(o),onPageChange:e(i)},null,8,["per-page","page","total","onPageChange"]),[[d,e(o)>e(t)]])])])]),a(f),a(C)],64))}});var R=c(x,[["__file","CategoriesLayout.vue"]]);export{R as default};