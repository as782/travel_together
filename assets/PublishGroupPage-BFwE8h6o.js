import{d as O,v as z,G as J,A as M,J as $,r as _,c as B,b as o,w as r,aA as H,s as P,f as K,o as U,g as y,u as Q,D as W,C as X,B as Y,E as Z,a as A,F as ee,ai as ae}from"./index-Al1ESLyH.js";/* empty css              *//* empty css              */import{a as te,R as oe,b as le,A as re}from"./index.esm-DFUqB_kw.js";import"./index-xslAZJtX.js";import{C as se}from"./index-DJB-JNsy.js";import{a as q,U as ne}from"./index-Ci1VZxiM.js";import{d as de,a as ie}from"./index-GFwVjkA3.js";import{i as me,m as ue,p as pe}from"./index-Bc0MyXRq.js";import{u as _e}from"./themes-Diakp-Yr.js";import{F as fe}from"./index-Cb0lWyr4.js";import{B as ce}from"./index-dW7UAVpM.js";import"./index-BFdtbEqF.js";import"./function-call-CNCgHTtt.js";import"./index-uvLI7Ok2.js";import"./index-o3mCI9mj.js";const ye=A("span",{class:"text-xl font-bold"},"帖子标题:",-1),ve={class:"img-upload"},be=A("div",{class:"w-full h-1 mt-2"},null,-1),Re=O({__name:"PublishGroupPage",setup(ge){z(()=>{!x.themes.length&&x.getThemes(),F.value=x.themes});const v=H(),R=K(),x=_e(),b=J(),S=M(()=>{var l;return!!((l=v.params)!=null&&l.editId)}),E=async l=>{try{const e=await me(l),{user_id:n,title:d,description:s,duration_day:u,estimated_expense:p,gender_requirement:f,payment_method:c,start_location:m,end_location:I,team_size:t,theme_id:N,images:D,itinerary:T}=e.data;a.user_id=n,a.title=d,a.description=s,a.duration_day=u,a.estimated_expense=p,a.gender_requirement=f,a.payment_method=c,a.start_location=m,a.end_location=I,a.team_size=t,a.theme_id=N,a.image_urls=D.map(j=>j.image_url),a.itinerary=T,g.value=k(D,"image"),V.value=k([{image_id:l,image_url:T}],"itinerary")}catch(e){console.error(e)}},a=$({user_id:void 0,title:"",description:"",duration_day:void 0,estimated_expense:void 0,gender_requirement:"",payment_method:"",start_location:"",end_location:"",team_size:void 0,theme_id:void 0,image_urls:[],itinerary:""}),F=_([]),i=_({showAddressPopup:!1,flag:0}),G=l=>{i.value.showAddressPopup=!1,i.value.flag==0?a.start_location=l.selectedOptions.map(e=>e.text).join("/"):a.end_location=l.selectedOptions.map(e=>e.text).join("/")};z(()=>{var l;(l=v.params)!=null&&l.editId&&E(Number(v.params.editId))});const g=_([]),V=_([]),h=_([]),w=_([]),k=(l,e)=>l.map(n=>({url:n.image_url,beforeDelete:()=>(e=="itinerary"?w.value.push(n.image_id):h.value.push(n.image_id),!0)})),C=async(l,e)=>{switch(e){case"images":await ie(l);break;case"itinerary":await de(l);break}},L=async()=>{var l,e;try{const n=new FormData,d=new FormData;g.value.forEach(m=>{n.append("team_post",m.file)}),V.value.forEach(m=>{d.append("initerary",m.file)});const s={filedata:n,flag:"team_post",username:b.userInfo.username},u={filedata:d,flag:"initerary",username:b.userInfo.username};h.value.length&&await C(h.value,"images"),w.value.length&&await C(w.value,"itinerary");let p=await q(s);a.image_urls=p.data.fileUrls;let f=await q(u);a.itinerary=f.data.fileUrls[0];const c={...a,user_id:(l=b.userInfo)==null?void 0:l.user_id};if(S.value){const m={post_id:Number(v.params.editId),...a,user_id:(e=b.userInfo)==null?void 0:e.user_id};await ue(m),P("修改成功")}else await pe(c),P("发布成功");R.back()}catch(n){console.error(n),P("发布失败，请重试")}};return(l,e)=>{const n=ne,d=se,s=ee,u=oe,p=le,f=re,c=ae,m=ce,I=fe;return U(),B("main",null,[o(I,{class:"form-area",onSubmit:L},{default:r(()=>[o(d,{class:"p-2 m-2 border border-blue-200 rounded-md"},{default:r(()=>[o(n,{modelValue:g.value,"onUpdate:modelValue":e[0]||(e[0]=t=>g.value=t),multiple:"",class:"my-upload flex-nowrap overflow-x-auto max-w-full max-h-80"},null,8,["modelValue"])]),_:1}),o(d,{class:"p-1 m-2 border border-blue-200 rounded-md"},{default:r(()=>[o(s,{name:"title",modelValue:a.title,"onUpdate:modelValue":e[1]||(e[1]=t=>a.title=t),label:"帖子标题",placeholder:"请输入标题"},{label:r(()=>[ye]),_:1},8,["modelValue"]),o(s,{name:"description",modelValue:a.description,"onUpdate:modelValue":e[2]||(e[2]=t=>a.description=t),rows:"10",spellcheck:!1,autosize:"",type:"textarea",placeholder:"简单介绍此次旅行"},null,8,["modelValue"])]),_:1}),o(d,{class:"p-1 m-2 border border-blue-200 rounded-md"},{default:r(()=>[o(s,{name:"duration_day",modelValue:a.duration_day,"onUpdate:modelValue":e[3]||(e[3]=t=>a.duration_day=t),type:"text",label:"旅行时间:",placeholder:"例如: 10 (天)"},null,8,["modelValue"]),o(s,{name:"team_size",modelValue:a.team_size,"onUpdate:modelValue":e[4]||(e[4]=t=>a.team_size=t),type:"text",label:"小队人数:",placeholder:"例如: 20 (人)"},null,8,["modelValue"]),o(s,{name:"payment_method",modelValue:a.payment_method,"onUpdate:modelValue":e[5]||(e[5]=t=>a.payment_method=t),type:"text",label:"付费方式:",placeholder:"例如: AA"},null,8,["modelValue"]),o(s,{name:"estimated_expense",modelValue:a.estimated_expense,"onUpdate:modelValue":e[6]||(e[6]=t=>a.estimated_expense=t),type:"text",label:"预计消费:",placeholder:"例如: 8 (元)"},null,8,["modelValue"]),o(s,{name:"gender_requirement",label:"性别要求:"},{input:r(()=>[o(p,{modelValue:a.gender_requirement,"onUpdate:modelValue":e[7]||(e[7]=t=>a.gender_requirement=t),direction:"horizontal"},{default:r(()=>[o(u,{name:"male"},{default:r(()=>[y("男")]),_:1}),o(u,{name:"female"},{default:r(()=>[y("女")]),_:1}),o(u,{name:"other"},{default:r(()=>[y("其他")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),o(d,{class:"p-1 m-2 border border-blue-200 rounded-md"},{default:r(()=>[o(s,{name:"start_location",modelValue:a.start_location,"onUpdate:modelValue":e[8]||(e[8]=t=>a.start_location=t),"is-link":"",readonly:"",type:"text",label:"旅行起点:",onClick:e[9]||(e[9]=()=>{i.value.showAddressPopup=!0,i.value.flag=0}),placeholder:"例如: xxx"},null,8,["modelValue"]),o(s,{name:"end_location",modelValue:a.end_location,"onUpdate:modelValue":e[10]||(e[10]=t=>a.end_location=t),"is-link":"",readonly:"",type:"text",label:"旅行终点:",onClick:e[11]||(e[11]=()=>{i.value.showAddressPopup=!0,i.value.flag=1}),placeholder:"例如: xxx"},null,8,["modelValue"]),o(c,{show:i.value.showAddressPopup,"onUpdate:show":e[13]||(e[13]=t=>i.value.showAddressPopup=t),position:"bottom"},{default:r(()=>[o(f,{title:"标题","area-list":Q(te),onConfirm:G,onCancel:e[12]||(e[12]=t=>i.value.showAddressPopup=!1)},null,8,["area-list"])]),_:1},8,["show"])]),_:1}),o(d,{class:"p-1 m-2 border border-blue-200 rounded-md"},{default:r(()=>[o(s,{name:"theme_id",label:"帖子主题"},{input:r(()=>[o(p,{modelValue:a.theme_id,"onUpdate:modelValue":e[14]||(e[14]=t=>a.theme_id=t),direction:"horizontal"},{default:r(()=>[(U(!0),B(W,null,X(F.value,t=>(U(),Y(u,{key:t.theme_id,name:t.theme_id},{default:r(()=>[y(Z(t.theme_name),1)]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),o(d,{class:"p-1 m-2 border border-blue-200 rounded-md"},{default:r(()=>[A("div",ve,[o(s,null,{input:r(()=>[o(n,{modelValue:V.value,"onUpdate:modelValue":e[15]||(e[15]=t=>V.value=t),reupload:"","max-count":1},null,8,["modelValue"])]),_:1})])]),_:1}),o(d,{class:"m-2 rounded-3xl"},{default:r(()=>[o(m,{class:"p-2",round:"",block:"",type:"primary","native-type":"submit"},{default:r(()=>[y(" 提交 ")]),_:1})]),_:1}),be]),_:1})])}}});export{Re as default};
