import{u as P}from"./PostInfo.895a7b38.js";import{h as d,g as y,k as g,r as l,w as T}from"./app.d3725a3c.js";var L=function(o,p){var f=P(),t=d(),c=y(),n=g(function(){return c.query[p]}),r=l(t),s=function(){n.value==="all"?r.value=t.filter(function(e){var a;return(a=e.frontmatter[o])===null||a===void 0?void 0:a.length}):r.value=t.filter(function(e){var a;return(a=e.frontmatter[o])===null||a===void 0?void 0:a.includes(n.value)})};s();var v=f.value.perPage||10,u=l(1),i=l(r.value.length);T(n,function(){u.value=1,s(),i.value=r.value.length});var h=g(function(){var e=(u.value-1)*v;return r.value.slice(e,e+v)}),m=function(e){u.value=e};return{pages:t,pageList:h,handlePageChange:m,perPage:v,page:u,total:i}};export{L as u};
