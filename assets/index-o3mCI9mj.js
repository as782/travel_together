import{O as B,d as $,r as u,au as j,A as D,ah as f,a0 as _,q as C,ao as N,x as O,v as R,t as I,b as n,a9 as d,ac as P,ab as z,V as U,bv as V,af as S,I as q,a1 as A}from"./index-Al1ESLyH.js";const[F,i]=B("image"),M={src:String,alt:String,fit:String,position:String,round:Boolean,block:Boolean,width:d,height:d,radius:d,lazyLoad:Boolean,iconSize:d,showError:P,errorIcon:z("photo-fail"),iconPrefix:String,showLoading:P,loadingIcon:z("photo"),crossorigin:String,referrerpolicy:String};var T=$({name:F,props:M,emits:["load","error"],setup(r,{emit:g,slots:c}){const t=u(!1),o=u(!0),a=u(),{$Lazyload:l}=j().proxy,x=D(()=>{const e={width:f(r.width),height:f(r.height)};return _(r.radius)&&(e.overflow="hidden",e.borderRadius=f(r.radius)),e});C(()=>r.src,()=>{t.value=!1,o.value=!0});const v=e=>{o.value&&(o.value=!1,g("load",e))},h=()=>{const e=new Event("load");Object.defineProperty(e,"target",{value:a.value,enumerable:!0}),v(e)},m=e=>{t.value=!0,o.value=!1,g("error",e)},y=(e,s,b)=>b?b():n(q,{name:e,size:r.iconSize,class:s,classPrefix:r.iconPrefix},null),E=()=>{if(o.value&&r.showLoading)return n("div",{class:i("loading")},[y(r.loadingIcon,i("loading-icon"),c.loading)]);if(t.value&&r.showError)return n("div",{class:i("error")},[y(r.errorIcon,i("error-icon"),c.error)])},k=()=>{if(t.value||!r.src)return;const e={alt:r.alt,class:i("img"),style:{objectFit:r.fit,objectPosition:r.position},crossorigin:r.crossorigin,referrerpolicy:r.referrerpolicy};return r.lazyLoad?U(n("img",S({ref:a},e),null),[[V("lazy"),r.src]]):n("img",S({ref:a,src:r.src,onLoad:v,onError:m},e),null)},w=({el:e})=>{const s=()=>{e===a.value&&o.value&&h()};a.value?s():I(s)},L=({el:e})=>{e===a.value&&!t.value&&m()};return l&&N&&(l.$on("loaded",w),l.$on("error",L),O(()=>{l.$off("loaded",w),l.$off("error",L)})),R(()=>{I(()=>{var e;(e=a.value)!=null&&e.complete&&!r.lazyLoad&&h()})}),()=>{var e;return n("div",{class:i({round:r.round,block:r.block}),style:x.value},[k(),E(),(e=c.default)==null?void 0:e.call(c)])}}});const H=A(T);export{H as I};
