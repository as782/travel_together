import{O as z,a7 as I,aD as R,ab as l,a9 as C,d as D,aE as w,bw as N,b as i,I as O,bn as q,aV as E,a1 as L}from"./index-Al1ESLyH.js";const[U,o]=z("button"),V=I({},R,{tag:l("button"),text:String,icon:String,type:l("default"),size:l("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:l("button"),loadingSize:C,loadingText:String,loadingType:String,iconPosition:l("left")});var _=D({name:U,props:V,emits:["click"],setup(e,{emit:g,slots:t}){const f=w(),b=()=>t.loading?t.loading():i(E,{size:e.loadingSize,type:e.loadingType,class:o("loading")},null),c=()=>{if(e.loading)return b();if(t.icon)return i("div",{class:o("icon")},[t.icon()]);if(e.icon)return i(O,{name:e.icon,class:o("icon"),classPrefix:e.iconPrefix},null)},x=()=>{let n;if(e.loading?n=e.loadingText:n=t.default?t.default():e.text,n)return i("span",{class:o("text")},[n])},m=()=>{const{color:n,plain:r}=e;if(n){const a={color:r?n:"white"};return r||(a.background=n),n.includes("gradient")?a.border=0:a.borderColor=n,a}},y=n=>{e.loading?q(n):e.disabled||(g("click",n),f())};return()=>{const{tag:n,type:r,size:a,block:S,round:B,plain:P,square:k,loading:T,disabled:s,hairline:d,nativeType:h,iconPosition:u}=e,v=[o([r,a,{plain:P,block:S,round:B,square:k,loading:T,disabled:s,hairline:d}]),{[N]:d}];return i(n,{type:h,class:v,style:m(),disabled:s,onClick:y},{default:()=>[i("div",{class:o("content")},[u==="left"&&c(),x(),u==="right"&&c()])]})}}});const p=L(_);export{p as B};
