import{H as y,P as b,F as P,B as L,N as T,u as x}from"./PostInfo.895a7b38.js";import{C as B}from"./CardCategories.b79f5522.js";import{C as w}from"./CardTags.490b54dd.js";import{r as S,g as D,h as C,w as N,i as F,_ as I,d as z,j as M,k as f,o as c,c as l,l as s,n as V,e as t,a as e,m as $,t as H,p as O,F as k,q as j,s as q,v as A,x as E,y as R,z as U}from"./app.d3725a3c.js";var W=function(){var a=S([]),n=D(),i=C(),u=function(){a.value=[];var r=n.path.replace(/[\w%-]+\.html$/,""),p=i.filter(function(o){return o.path.startsWith(r)});F(p,r,a.value),a.value=a.value.filter(function(o){return!/index\.html$/i.test(o.link)})};return N(function(){return n.path},function(){return u()},{immediate:!0}),a};const G=e("div",{class:"posts-banner"},null,-1),J={class:"theme-container theme-posts-container"},K={class:"theme-content"},Q={class:"theme-aside"},X={class:"theme-wrapper posts-container card-box"},Y={class:"post-content markdown-body"},Z={key:0,class:"header"},ee={class:"posts"},se=z({__name:"PostsLayout",setup(a){const n=x(),i=R(),u=M(),r=f(()=>{const{backgroundImage:m,darkBackgroundImage:g}=n.value,h=(u.value?g:m)||m;return{"background-image":`url("${q(h||"")}")`}}),p=f(()=>A(i.value)),o=W(),_=C(),d=U();return(m,g)=>{const h=E("Content");return c(),l(k,null,[s(y,{class:V({active:t(p)})},null,8,["class"]),e("div",{class:"theme-background",style:$(t(r))},null,4),G,e("main",J,[e("div",K,[e("aside",Q,[s(B,{pages:t(_)},null,8,["pages"]),s(w,{pages:t(_)},null,8,["pages"])]),e("div",X,[e("div",Y,[t(d).path?(c(),l("header",Z,[e("h1",null,H(t(d).title),1),s(b,{post:t(d)},null,8,["post"])])):O("",!0),s(h)]),e("ul",ee,[(c(!0),l(k,null,j(t(o),v=>(c(),l("li",{key:v.text,class:"posts-item"},[s(T,{item:v},null,8,["item"])]))),128))])])])]),s(P),s(L)],64)}}});var re=I(se,[["__file","PostsLayout.vue"]]);export{re as default};