import{_ as n}from"./entry.101f2928.js";import{O as o,al as f,ar as g,aw as E,ax as k,z as s}from"./index.d8522b0d.js";const x={__name:"nuxt-error-page",props:{error:Object},setup(c){const{error:t}=c;(t.stack||"").split(`
`).splice(1).map(e=>({text:e.replace("webpack:/","").replace(".vue",".js").trim(),internal:e.includes("node_modules")&&!e.includes(".cache")||e.includes("internal")||e.includes("new Promise")})).map(e=>`<span class="stack${e.internal?" internal":""}">${e.text}</span>`).join(`
`);const r=Number(t.statusCode||500),a=r===404,u=t.statusMessage??(a?"Page Not Found":"Internal Server Error"),i=t.message||t.toString(),p=void 0,l=o(()=>n(()=>import("./error-404.1c7c54da.js"),["./error-404.1c7c54da.js","./index.d8522b0d.js","./entry.101f2928.js","./entry.42024e76.css","./error-404.8bdbaeb8.css"],import.meta.url).then(e=>e.default||e)),_=o(()=>n(()=>import("./error-500.b9f4dd55.js"),["./error-500.b9f4dd55.js","./entry.101f2928.js","./index.d8522b0d.js","./entry.42024e76.css","./error-500.b63a96f5.css"],import.meta.url).then(e=>e.default||e)),m=a?l:_;return(e,d)=>(f(),g(s(m),E(k({statusCode:s(r),statusMessage:s(u),description:s(i),stack:s(p)})),null,16))}},h=x;export{h as default};
