import{O as P,a7 as S,a8 as I,ac as o,aN as v,ab as y,ad as w,d as x,b as a,af as O,ag as T,ai as B,I as N,aU as K,aV as _,t as D,a1 as E}from"./index-Al1ESLyH.js";const[H,t]=P("action-sheet"),U=S({},I,{title:String,round:o,actions:v(),closeIcon:y("cross"),closeable:o,cancelText:String,description:String,closeOnPopstate:o,closeOnClickAction:Boolean,safeAreaInsetBottom:o}),V=[...w,"round","closeOnPopstate","safeAreaInsetBottom"];var F=x({name:H,props:U,emits:["select","cancel","update:show"],setup(n,{slots:c,emit:i}){const l=e=>i("update:show",e),r=()=>{l(!1),i("cancel")},m=()=>{if(n.title)return a("div",{class:t("header")},[n.title,n.closeable&&a(N,{name:n.closeIcon,class:[t("close"),K],onClick:r},null)])},f=()=>{if(c.cancel||n.cancelText)return[a("div",{class:t("gap")},null),a("button",{type:"button",class:t("cancel"),onClick:r},[c.cancel?c.cancel():n.cancelText])]},b=(e,s)=>e.loading?a(_,{class:t("loading-icon")},null):c.action?c.action({action:e,index:s}):[a("span",{class:t("name")},[e.name]),e.subname&&a("div",{class:t("subname")},[e.subname])],h=(e,s)=>{const{color:g,loading:d,callback:u,disabled:p,className:k}=e,A=()=>{p||d||(u&&u(e),n.closeOnClickAction&&l(!1),D(()=>i("select",e,s)))};return a("button",{type:"button",style:{color:g},class:[t("item",{loading:d,disabled:p}),k],onClick:A},[b(e,s)])},C=()=>{if(n.description||c.description){const e=c.description?c.description():n.description;return a("div",{class:t("description")},[e])}};return()=>a(B,O({class:t(),position:"bottom","onUpdate:show":l},T(n,V)),{default:()=>{var e;return[m(),C(),a("div",{class:t("content")},[n.actions.map(h),(e=c.default)==null?void 0:e.call(c)]),f()]}})}});const j=E(F);export{j as A};
