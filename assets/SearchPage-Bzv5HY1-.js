import{d as f,r as n,v as d,c as r,a as e,b as g,V as _,ar as w,D as x,C as y,I as S,f as b,o as c,E as k}from"./index-Al1ESLyH.js";import{u as C}from"./search-l6njEG29.js";import"./tool-DO7ubHTV.js";const D={class:"bg-white p-1"},R={class:"flex items-center m-2"},B={class:"flex-1 flex mx-2 relative"},I=e("i",{class:"absolute left-2 top-1/2 -translate-y-1/2"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-5 h-5"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})])],-1),K={class:""},N={class:"m-2"},V=e("h4",{class:"m-2 font-bold"},"历史搜索",-1),E=["data-tagname"],$=f({__name:"SearchPage",setup(J){const h=b(),u=C(),i=n(),t=n("");d(()=>{var s;(s=i.value)==null||s.focus()});const p=s=>{const o=s.target.dataset.tagname;t.value=o};d(()=>{const s=sessionStorage.getItem("historyKeys");a.value=s?JSON.parse(s):[]});const a=n([]),m=async()=>{await u.getSearchResultData(t.value),u.searchResultData.status=="succeeded"&&h.push({path:"/searchresult",query:{key:t.value}}),a.value.push(t.value),a.value=[...new Set(a.value)],t.value="",sessionStorage.setItem("historyKeys",JSON.stringify([...new Set(a.value)]))};return(s,o)=>{const v=S;return c(),r("main",D,[e("div",R,[g(v,{name:"arrow-left",size:"20",onClick:o[0]||(o[0]=l=>s.$router.back())}),e("div",B,[I,_(e("input",{type:"text",ref_key:"searchRef",ref:i,class:"w-full rounded-2xl p-1 pl-10 bg-blue-50","onUpdate:modelValue":o[1]||(o[1]=l=>t.value=l),placeholder:"搜索组队/动态/用户"},null,512),[[w,t.value]])]),e("button",{class:"flex-none w-8 p-1 rounded-md bg-blue-300 shadow-xl shadow-orange-100 text-xs text-white",onClick:m}," 搜索 ")]),e("div",K,[e("div",N,[V,e("ul",{class:"flex w-full flex-wrap",onClick:p},[(c(!0),r(x,null,y(a.value,l=>(c(),r("li",{class:"m-2",key:l},[e("span",{class:"w-full rounded-xl p-1 px-2 bg-slate-400 bg-opacity-20 text-xs","data-tagname":l},k(l),9,E)]))),128))])])])])}}});export{$ as default};
