var Ie=Object.defineProperty,Ee=Object.defineProperties;var Ae=Object.getOwnPropertyDescriptors;var ie=Object.getOwnPropertySymbols;var Re=Object.prototype.hasOwnProperty,_e=Object.prototype.propertyIsEnumerable;var H=(e,t,n)=>t in e?Ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,B=(e,t)=>{for(var n in t||(t={}))Re.call(t,n)&&H(e,n,t[n]);if(ie)for(var n of ie(t))_e.call(t,n)&&H(e,n,t[n]);return e},L=(e,t)=>Ee(e,Ae(t));var b=(e,t,n)=>(H(e,typeof t!="symbol"?t+"":t,n),n);import{c as A,f as R,a as U,A as je,d as S,i as K,r as N,b as a,E as Be,e as Oe,l as M,g as Me,s as z,p as ae,h as Fe,j as T,o as $e,k as Ye,m as I,n as F,F as Le,q as j,t as Ve,w as le,u as ce,v as J,x as Xe,y as ze,z as qe,B as ue,C as We,D as Ge,G as He,H as Ue,I as Ke,J as Te,K as q,L as Je,M as Qe,T as Ze,N as de,O as he,P as et,Q as tt}from"./vendor.4df8cf51.js";const nt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};nt();const st="modulepreload",fe={},ot="/sa-form/",rt=function(t,n){return!n||n.length===0?t():Promise.all(n.map(o=>{if(o=`${ot}${o}`,o in fe)return;fe[o]=!0;const s=o.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${r}`))return;const i=document.createElement("link");if(i.rel=s?"stylesheet":st,s||(i.as="script",i.crossOrigin=""),i.href=o,document.head.appendChild(i),s)return new Promise((c,l)=>{i.addEventListener("load",c),i.addEventListener("error",l)})})).then(()=>t())};var k;(function(e){e[e.Add=0]="Add",e[e.Delete=1]="Delete",e[e.Move=2]="Move",e[e.Attr=3]="Attr"})(k||(k={}));function me(e){return Reflect.has(e[0],"id")}function it(e){return!Reflect.has(e[0],"id")}function Kt(e,t){return Reflect.has(t.attrs,e)}class O{constructor(t){b(this,"parent");b(this,"children");b(this,"attrs");this.parent=t.parent,this.attrs=A(t.attrs),t.children&&(this.children=t.children)}}class V{constructor(t){b(this,"type");b(this,"time");b(this,"data");this.time=t.time,this.type=t.type,this.data=t.data}}class at{constructor(t){b(this,"records",[]);b(this,"index",-1);b(this,"max");b(this,"recording");var n,o;this.max=(n=t==null?void 0:t.max)!=null?n:20,this.recording=(o=t==null?void 0:t.recording)!=null?o:!0}getPrevRecord(){if(!(this.index<0))return this.records[this.index]}getNextRecord(){if(!(this.index>=this.records.length-1))return this.records[this.index+1]}}function Q(e){const t=X(e[0]);let n=t.position.x,o=t.position.x+t.size.width,s=t.position.y,r=t.position.y+t.size.height;return e.forEach(i=>{const c=X(i);c.position.x<n&&(n=c.position.x),o<c.position.x+c.size.width&&(o=c.position.x+c.size.width),c.position.y<s&&(s=c.position.y),r<c.position.y+c.size.height&&(r=c.position.y+c.size.height)}),{x:n,y:s,width:o-n,height:r-s}}function X(e){return e instanceof O?{position:{x:e.attrs.offsetX,y:e.attrs.offsetY},size:{width:e.attrs.width,height:e.attrs.height}}:{position:e.getProp("position"),size:e.getProp("size")}}function lt(e){const t=o(e),n=Number(t);return n?(n+1).toString():"1";function o(s){var u;const r=s.attrs.id;let i="";if((u=s.children)==null?void 0:u.length)for(const f of s.children){const x=o(f),d=Number(i),m=Number(x);d&&m&&(i=Math.max(d,m).toString()),m&&(i=x)}const c=Number(i),l=Number(r);return c&&l?Math.max(c,l).toString():c?i:r}}function ct(e,t,{canvas:n}){var s,r;const o=(s=e.parent)==null?void 0:s.data.id;return new t({attrs:e.data,parent:B({},o&&(r=R(n,i=>i.attrs.id===o))!=null?r:n),children:[]})}function Z(e,t){const n=Array.isArray(e)?e:[e],o=t.getSelectedCells().filter(s=>!n.includes(s.data.id));for(const s of n)t.isSelected(s)||t.select(s);for(const s of o)t.unselect(s)}function pe(e,t){return Reflect.has(t.attrs,e)}var w;(function(e){e[e.Canvas=1]="Canvas",e[e.Button=2]="Button",e[e.Select=3]="Select",e[e.Container=4]="Container"})(w||(w={}));function ee(e,t){var o;if(!(e==null?void 0:e.graph))return;if(t){const s=[];for(const c of t)typeof c=="object"?s.push(c.toJSON().id):s.push(c);const r=s.map(c=>U(e.canvas.children,l=>l.attrs.id===c)),i=new V({type:k.Delete,time:new Date,data:r.map(c=>({prev:A(c)}))});e.addRecord(i),e.graph.removeCells(s);for(const c of r)((o=c.parent)==null?void 0:o.children)&&je.remove(c.parent.children,l=>l.attrs.id===c.attrs.id);return r}const n=e.graph.getSelectedCells();n.length&&ee(e,n)}function ut(e){e.clipboard.copy(e,{deep:!0,useLocalStorage:!0})}function dt(e){e.clipboard.cut(e,{deep:!0,useLocalStorage:!0})}function ge(e,t,n){if(n.clipboard.isEmpty(n.clipboard.clips)||!n.graph)return;if(t&&t.data.type!==w.Container)return console.error(`[Sa error]: can not paste elements in ${w[t.data.type]}.`);const o=Q(n.clipboard.clips.elements),s=o.x-e.offsetX,r=o.y-e.offsetY;n.clipboard.paste(n,t==null?void 0:t.data.id,{deep:!0,nodeProps:i=>({id:n.getNextId(),offsetX:i.attrs.offsetX-s,offsetY:i.attrs.offsetY-r})})}var ht=S({name:"SaFormPcSelect",setup(){var o;const e=K("getNode"),t=e==null?void 0:e(),n=N((o=t==null?void 0:t.data.options)!=null?o:[]);return t==null||t.on("change:data",({current:s})=>{var r;n.value=(r=s.options)!=null?r:[]}),()=>a(Be,{class:"sa-graph-vue-component"},{default:()=>[n.value?n.value.map(s=>a(Oe,{label:s.name,value:s.name},null)):""]})}});function $(e){const t=Object.assign({id:e.attrs.id,x:e.attrs.offsetX,y:e.attrs.offsetY,width:e.attrs.width,height:e.attrs.height},{data:e.attrs});switch(e.attrs.type){case w.Button:return new M.Shape.Rect(L(B({},t),{attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:w[e.attrs.type],fill:"white"}}}));case w.Select:return new Me.VueShape(L(B({},t),{shape:"vue-shape",component:{render:()=>a(ht,null,null)}}));case w.Container:return new M.Shape.Rect(L(B({},t),{attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1}}}));default:throw new Error(`[Sa error]: unexpected element type ${e.attrs.type}.`)}}class ft{constructor(){b(this,"clips")}isEmpty(t=this.clips){var n;return!((n=this.clips)==null?void 0:n.elements.length)}copy(t,n){this.clips={elements:A(t.selected),type:"copy"}}cut(t,n){this.clips={elements:A(t.selected),type:"cut"},ee(t)}paste(t,n=t.canvas.attrs.id,o){if(this.isEmpty(this.clips)||!t.graph)return;const s=R(t.canvas,l=>l.attrs.id===n);if(!s){console.warn("[Sa warn]: can not paste in undefined parent.");return}const r=this.clips.elements.map(l=>{const u=new O(L(B({},l),{parent:s}));return(o==null?void 0:o.nodeProps)&&z(u.attrs,o.nodeProps(l)),u}),i=r.map(l=>$(l)),c=n?t.graph.getCellById(s.attrs.id):void 0;if(c)for(const l of i)l.setParent(c),c.addChild(l);return t.addChildren(r,n),t.graph.addNodes(i),r}}function mt(e){return Reflect.has(e,"id")}class pt{constructor(t){b(this,"type");b(this,"canvas");b(this,"history");b(this,"clipboard");b(this,"selected",[]);b(this,"graph");b(this,"nextId");this.type="PcForm",this.history=new at,this.clipboard=new ft,this.nextId="1",this.canvas=new O({parent:void 0,children:[],attrs:t.attrs})}setCanvas(t){this.canvas=t,this.selected=[t],this.nextId=lt(t)}setGraph(t){this.graph=t}getNextId(){const t=this.nextId;return this.nextId=String(Number(t)+1),t}addChild(t,n){var r;const o=(r=typeof n=="string"?U(this.canvas.children,i=>i.attrs.id===n):n)!=null?r:this.canvas;W(this,t);const s=new V({type:k.Add,time:new Date,data:[{next:B({},A(t))}]});return this.addRecord(s),this.setSelected(t),o}addChildren(t,n){var r;const o=(r=typeof n=="string"?U(this.canvas.children,i=>i.attrs.id===n):n)!=null?r:this.canvas;for(const i of t)W(this,i);const s=new V({type:k.Add,time:new Date,data:t.map(i=>({next:B({},A(i))}))});return this.addRecord(s),this.setSelected(t),o}setSelected(t){if(!!this.graph){if(!arguments.length||Array.isArray(t)&&!t.length)return this.selected=[this.canvas],this.canvas;if(!!this.canvas.children){if(typeof t=="string"){const n=R(this.canvas,o=>o.attrs.id===t);return n&&(this.selected=[n],Z(t,this.graph)),n}if(Array.isArray(t)){const n=[];for(const o of t)if(typeof o=="string"){const s=R(this.canvas,r=>r.attrs.id===o);s&&n.push(s)}else n.push(o);return Z(n.map(o=>o.attrs.id),this.graph),this.selected=n,n}if(typeof t=="object")return this.selected=[t],Z(t.attrs.id,this.graph),t}}}updateElemData(t,n,o=!0){if(!t)return;const s=typeof t=="string"?R(this.canvas,r=>r.attrs.id===t):t;if(!!s){if(o){const r=new V({type:k.Attr,time:new Date,data:[{id:s.attrs.id,prev:A(ae(s.attrs,Object.keys(n))),next:A(n)}]});this.addRecord(r)}return te(this,s.attrs.id,n),z(s.attrs,n),s}}updateElemsData(t){const n=t.map(s=>({el:mt(s)?R(this.canvas,r=>r.attrs.id===s.id):s.element,data:s.data})),o=new V({type:k.Attr,time:new Date,data:n.map(s=>({id:s.el.attrs.id,prev:A(ae(s.el.attrs,Object.keys(s.data))),next:A(s.data)}))});this.addRecord(o);for(const s of n)this.updateElemData(s.el,s.data,!1);return n.map(s=>s.el)}addRecord(t){console.log("[Sa info]: New record has been added.",t),this.history.index&&this.history.records.length>this.history.index+1&&this.history.records.splice(this.history.index+1),this.history.records.push(t),this.history.index+=1}undo(){var n,o;if(!this.graph)return;const t=this.history.getPrevRecord();if(!t){console.warn("[Sa warn]: None previous record in history.");return}if(me(t.data)){for(const s of t.data){const r=R(this.canvas,i=>i.attrs.id===s.id);r&&(z(r.attrs,s.prev),te(this,s.id,s.prev))}this.setSelected(t.data.map(s=>s.id))}else{for(const s of t.data)t.type===k.Add?ve(this,(o=(n=s.next)==null?void 0:n.attrs)==null?void 0:o.id):t.type===k.Delete&&W(this,s.prev);t.type===k.Add?this.setSelected(t.data.map(s=>s.next.attrs.id)):this.setSelected(t.data.map(s=>s.prev.attrs.id))}this.history.index-=1}redo(){var n,o;const t=this.history.getNextRecord();if(!t){console.warn("[Sa warn]: None next record in history.");return}if(me(t.data)){for(const s of t.data){const r=R(this.canvas,i=>i.attrs.id===s.id);r&&(z(r.attrs,s.next),te(this,s.id,s.next))}this.setSelected(t.data.map(s=>s.id))}else if(it(t.data)){for(const s of t.data)t.type===k.Add?W(this,s.next):t.type===k.Delete&&ve(this,(o=(n=s.prev)==null?void 0:n.attrs)==null?void 0:o.id);t.type===k.Add?this.setSelected(t.data.map(s=>s.next.attrs.id)):this.setSelected(t.data.map(s=>s.prev.attrs.id))}this.history.index+=1}}function te(e,t,n){var s,r,i,c,l,u;if(!e.graph)return;const o=e.graph.getCellById(t);if(o){const f=X(o);o.setProp({position:{x:(s=n.offsetX)!=null?s:f.position.x,y:(r=n.offsetY)!=null?r:f.position.y},size:{width:(i=n.width)!=null?i:f.size.width,height:(c=n.height)!=null?c:f.size.height}}),o.updateData(n)}else e.graph.size.resize((l=n.width)!=null?l:e.canvas.attrs.width,(u=n.height)!=null?u:e.canvas.attrs.height)}function W(e,t){var o;if(!e.graph||!e.canvas.children||!t)return;const n=e.graph.hasCell(t.attrs.id);if(t.parent){if(!n){const r=$(t);e.graph.addCell(r);const i=e.graph.getCellById(t.parent.attrs.id);i&&i.addChild(r)}const s=R(e.canvas,r=>{var i;return r.attrs.id===((i=t.parent)==null?void 0:i.attrs.id)});s&&((o=s.children)==null||o.push(t),t.parent=s)}}function ve(e,t){if(!e.graph||!e.canvas.children||!t)return;const n=R(e.canvas,o=>o.attrs.id===t);n&&e.canvas.children&&(e.graph.removeCell(n.attrs.id),Fe(e.canvas.children,o=>o.attrs.id===n.attrs.id))}const gt=[{title:"undo",icon:a("i",{class:"iconfont iconchexiao1"},null),click:e=>e.undo()},{title:"redo",icon:a("i",{class:"iconfont iconhuifu1"},null),click:e=>e.redo()}];function vt(e,t){return xe(e,t)}function xt(e,t){return xe(e,t)}function yt(e,t){const n=e.getProp("position");e.data.offsetX=n.x,e.data.offsetY=n.y;const o=ct(e,O,t);return t.addChild(o),!0}function xe(e,t){const n=t.getNextId(),o=t.canvas;switch(e.data.name){case"Button":return $({attrs:{id:n,name:"Button",width:80,height:40,type:w.Button,offsetX:0,offsetY:0},parent:o});case"Select":return $({attrs:{id:n,name:"Select",width:80,height:40,type:w.Select,offsetX:0,offsetY:0,options:[{name:"default"}]},parent:o});case"Container":return $({attrs:{id:n,name:"Container",width:200,height:100,type:w.Container,offsetX:0,offsetY:0},parent:o});default:console.error("[Sa error]: unexpected drag node",e)}return e}const wt=e=>({groups:[{name:"Normal",collapsable:!0},{name:"Container",collapsable:!0}],getDragNode:t=>vt(t,e),getDropNode:t=>xt(t,e),validateNode:t=>yt(t,e),nodes:{Normal:[new M.Shape.Rect({width:80,height:40,attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:"Button",fill:"white"}},data:{name:"Button"}}),new M.Shape.Rect({width:80,height:40,attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:"Select",fill:"white"}},data:{name:"Select"}})],Container:[new M.Shape.Rect({width:80,height:40,attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:"Container",fill:"white"}},data:{name:"Container"}})]}}),bt=()=>{var s;const e=new O({parent:void 0,children:[],attrs:{type:w.Canvas,id:"1",name:"mock pc form",width:800,height:600,offsetX:0,offsetY:0}}),t=new O({parent:e,attrs:{id:"2",type:w.Button,name:"mock button 1",width:80,height:40,offsetX:200,offsetY:100}}),n=new O({parent:e,attrs:{type:w.Button,id:"3",name:"mock button 2",width:80,height:40,offsetX:150,offsetY:200}}),o=new O({parent:e,attrs:{type:w.Container,id:"4",name:"mock container",width:400,height:200,offsetX:50,offsetY:300},children:[]});return(s=e.children)==null||s.push(t,n,o),e};var Ct=S({name:"SaPcFormRender",props:{drawer:{required:!0,type:Object}},setup(e){const t=N(null),n=N(null),o=N([]),s=T(),r=T();$e(()=>{var c;if(t.value){const l=bt();console.log("create graph",l);const u=new M.Graph({container:t.value,width:l.attrs.width,height:l.attrs.height,snapline:!0,grid:{visible:!0,type:"doubleMesh",args:[{color:"#eee",thickness:1},{color:"#ddd",thickness:1,factor:4}]},selecting:{enabled:!0,multiple:!0,rubberband:!0,movable:!0,showEdgeSelectionBox:!0},resizing:!0,translating:{restrict(d){var E;const m=d.cell,C=d.graph.selection;if(m.isNode()){const p=m.getParent();if(p){const v=p.getBBox();if((E=C==null?void 0:C.cells)==null?void 0:E.length){const h=Q(C.cells),_=X(m);return{x:v.x+_.position.x-h.x,y:v.y+_.position.y-h.y,width:v.width-(h.width-_.size.width),height:v.height-(h.height-_.size.height)}}return v}if(C==null?void 0:C.length){const v=Q(C.cells),h=X(m);return{x:h.position.x-v.x,y:h.position.y-v.y,width:l.attrs.width-(v.width-h.size.width),height:l.attrs.height-(v.height-h.size.height)}}}return{x:0,y:0,width:l.attrs.width,height:l.attrs.height}}},clipboard:{enabled:!0,useLocalStorage:!0}});Ye(e.drawer).setGraph(u).setCanvas(l);const f=(c=l.children)==null?void 0:c.map(d=>$(d));f&&u.addNodes(f),u.enableHistory(),u.on("blank:mousedown",()=>{u.cleanSelection(),n.value.hide()}),u.on("blank:contextmenu",({e:d})=>{u.cleanSelection(),r.value=void 0,s.value=d,n.value.show(d.originalEvent)}),u.on("cell:mousedown",({cell:d})=>{d.toFront({deep:!0}),n.value.hide()}),u.on("cell:contextmenu",({cell:d,e:m})=>{u.isSelected(d)||(u.cleanSelection(),u.select(d)),r.value=d,s.value=m,n.value.show(m.originalEvent)}),u.on("selection:changed",({selected:d})=>{o.value=d,e.drawer.setSelected(d.map(m=>m.data.id)),d.length>1?u.disableSnapline():u.enableSnapline()});let x=[];u.on("node:moved",({cell:d})=>{if(e.drawer.selected.length>1&&e.drawer.selected.some(m=>m.attrs.id===d.id))x.push(d),x.length===e.drawer.selected.length&&(e.drawer.updateElemsData(x.map(m=>{const{x:C,y:E}=m.position();return{id:m.id,data:{offsetX:C,offsetY:E}}})),x=[]);else{const{x:m,y:C}=d.position();e.drawer.updateElemData(d.id,{offsetX:m,offsetY:C}),e.drawer.setSelected(d.id)}}),u.on("node:resized",({cell:d})=>{const{width:m,height:C}=d.size();e.drawer.updateElemData(d.data.id,{width:m,height:C})})}});const i=I(()=>o.value.length?a(Le,null,[a(F("v-contextmenu-item"),{onClick:()=>ut(e.drawer)},{default:()=>[j("copy")]}),a(F("v-contextmenu-item"),{onClick:()=>dt(e.drawer)},{default:()=>[j("cut")]}),a(F("v-contextmenu-item"),{onClick:()=>ge(s.value,r.value,e.drawer)},{default:()=>[j("paste")]}),a(F("v-contextmenu-item"),{type:"danger",icon:a(Ve,null,null),onClick:()=>ee(e.drawer)},{default:()=>[j("delete")]})]):a(F("v-contextmenu-item"),{onClick:()=>ge(s.value,void 0,e.drawer)},{default:()=>[j("paste")]}));return{workspace:t,contextmenu:n,selectedCells:o,graphContextmenu:i}},render(){return a("div",null,[a("div",{ref:"workspace"},null),a(F("v-contextmenu"),{ref:"contextmenu"},{default:()=>[this.graphContextmenu]})])}}),D;(function(e){e.Input="input",e.Number="number",e.Select="select",e.Dialog="dialog",e.Color="color",e.Cascader="cascader"})(D||(D={}));const y={"widget-id":{label:"id",attr:"id",type:D.Input,disabled:!0},"widget-name":{label:"name",attr:"name",type:D.Input},"widget-width":{label:"width",attr:"width",type:D.Number},"widget-height":{label:"height",attr:"height",type:D.Number},"widget-offsetX":{label:"x",attr:"offsetX",type:D.Number},"widget-offsetY":{label:"y",attr:"offsetY",type:D.Number}},St={"select-options":{label:"options",attr:"options",type:D.Dialog,dialog:{component:"widget-options",title:"select-options",filter:e=>e.map(t=>t.name).join(";")},disabled:!0}},Nt={[w.Canvas]:{basic:[y["widget-id"],y["widget-name"],y["widget-width"],y["widget-height"]]},[w.Container]:{basic:[y["widget-id"],y["widget-name"],y["widget-width"],y["widget-height"],y["widget-offsetX"],y["widget-offsetY"]]},[w.Button]:{basic:[y["widget-id"],y["widget-name"],y["widget-width"],y["widget-height"],y["widget-offsetX"],y["widget-offsetY"]]},[w.Select]:{basic:[y["widget-id"],y["widget-name"],y["widget-width"],y["widget-height"],y["widget-offsetX"],y["widget-offsetY"],St["select-options"]]}};function Pt(e,t,n){const o=n.selected[0];!o||n.updateElemData(o,{[e]:t})}const kt={"./PcForm/controller/widget-options/index.tsx":()=>rt(()=>import("./index.a0218b02.js"),["assets/index.a0218b02.js","assets/index.3be83ae9.css","assets/vendor.4df8cf51.js"])},Dt=()=>({drawer:new pt({attrs:{type:w.Canvas,id:"1",name:"Pc Form Demo",width:800,height:600,offsetX:0,offsetY:0}}),header:gt,side:wt,workspace:Ct,controller:{plugins:Nt,valueChange:Pt,components:kt}}),It={PcForm:()=>Dt()};var Et=S({name:"SaFormLayoutHeader",props:{options:{required:!0,type:Array},drawer:{required:!0,type:Object}},render(){return a("div",{class:"sa-form-header flex justify-start p-1"},[this.options.map(e=>a("span",{class:"header-tool",onClick:t=>e.click(this.drawer,t),title:e.title,style:{width:e.width?`${e.width}px`:"30px",height:"30px"}},[e.icon]))])}}),At=S({name:"CoFormLayoutSidebar",props:{stencil:{type:Function},drawer:{required:!0,type:Object}},setup(e){const t=N(null),n=I(()=>e.drawer.graph);let o;return le(()=>n.value,()=>{var s;if(n.value&&!o&&e.stencil){const r=e.stencil(e.drawer);o=new M.Addon.Stencil({title:"Components",target:n.value,scaled:!1,animation:!0,search(i,c){const l=i.attrs.text.text;return new RegExp(c,"i").test(l)},placeholder:"Search by shape name",notFoundText:"Not Found",collapsable:!0,stencilGraphWidth:208,stencilGraphHeight:180,groups:r.groups,getDragNode:i=>r.getDragNode(i,e.drawer),getDropNode:i=>r.getDropNode(i,e.drawer),validateNode:i=>r.validateNode(i,e.drawer)}),(s=t.value)==null||s.appendChild(o.container);for(const i of r.groups)o.load(r.nodes[i.name],i.name)}}),{graph:n,refStencil:t}},render(){return a("div",{class:"sa-form-side flex flex-col justify-start p-1 relative w-52"},[a("div",{ref:"refStencil"},null)])}});function Rt(e,t){const n=e.selected[0];if(!!n&&pe(t.attr,n))return n.attrs[t.attr]}var _t=S({name:"SaFormControllerDialogLayout",props:{plugin:{required:!0,type:Object},drawer:{required:!0,type:Object},controller:{required:!0,type:Object}},setup(e){var c;const t=N(!1);let n;if(e.plugin.dialog){const l=/\.\/.+\/(.+)\/index.tsx/i;for(const u of Object.keys(e.controller.components)){const f=(c=u.match(l))==null?void 0:c[1];f&&f===e.plugin.dialog.component&&(n=e.controller.components[u])}}const o=T();s();async function s(){if(n){const l=await n();o.value=l.default}}const r=I(()=>o.value?ze(o.value,{drawer:e.drawer,plugin:e.plugin}):"");function i(){var f,x;const l=(f=r.value)==null?void 0:f.component.exposed;if(!(l==null?void 0:l.update)){console.error(`[Sa error]: Plugin ${(x=e.plugin.dialog)==null?void 0:x.component} doesn't have expose update function.`);return}const{update:u}=l;try{const d=u();e.drawer.updateElemData(e.drawer.selected[0],{[e.plugin.attr]:d})}catch(d){console.error(d)}t.value=!1}return()=>{var l,u,f;return a("div",{class:"dialog-container"},[((l=e.plugin.dialog)==null?void 0:l.filter)?a(ce,{modelValue:e.plugin.dialog.filter(Rt(e.drawer,e.plugin)),disabled:!0},null):"",a(J,{onClick:()=>t.value=!0},{default:()=>[j("set")]}),a(Xe,{title:(f=(u=e.plugin.dialog)==null?void 0:u.title)!=null?f:e.plugin.label,modelValue:t.value,closeOnClickModal:!1,onClose:()=>t.value=!1},{default:()=>[r.value],footer:()=>a("div",null,[a(J,{type:"default",onClick:()=>t.value=!1},{default:()=>[j("cancel")]}),a(J,{type:"primary",onClick:i},{default:()=>[j("submit")]})])})])}}});function ye(e,t,n,o){o(e.attr,t,n)}function jt(e,t,n){var r,i;const o=t.selected[0];let s;switch(o&&pe(e.attr,o)&&(s=o==null?void 0:o.attrs[e.attr]),e.type){case D.Input:return a(ce,{class:"sa-plugin",modelValue:s,onInput:c=>ye(e,c,t,n.valueChange),disabled:(r=e.disabled)!=null?r:!1},null);case D.Number:return a(qe,{class:"sa-plugin",controls:!1,modelValue:s,onInput:c=>ye(e,c,t,n.valueChange),disabled:(i=e.disabled)!=null?i:!1},null);case D.Dialog:return a(_t,{class:"sa-plugin",drawer:t,plugin:e,controller:n},null);default:return console.error(`[Sa error]: Unexpected plugin type ${e.type}.`),a("span",{class:"bg-red-700 w-full block text-center"},[e.type])}}var Bt=S({name:"ControllerItem",props:{plugin:{required:!0,type:Object},drawer:{required:!0,type:Object},controller:{required:!0,type:Object}},setup(e){const t=I(()=>jt(e.plugin,e.drawer,e.controller));return()=>t.value}});var Ot=S({name:"SaFormLayoutController",props:{drawer:{required:!0,type:Object},controller:{required:!0,type:Object}},setup(e){const t=I(()=>{var o;const n=(o=e.drawer.selected[0])==null?void 0:o.attrs.type;if(n){if(e.controller.plugins[n])return e.controller.plugins[n];console.warn(`[Sa warn]: Plugins not found in type ${w[n]}.`)}});return()=>{var n;return a("div",{class:"controller-container"},[t.value?(n=t.value.basic)==null?void 0:n.map(o=>a("div",{class:"controller-item"},[a("div",{class:"controller-item-label"},[o.label]),a("div",{class:"controller-item-plugin"},[a(Bt,{plugin:o,drawer:e.drawer,controller:e.controller},null)])])):""])}}}),Mt=S({props:{type:{required:!0,type:String},id:{required:!0,type:String}},setup(e,t){const n=ue(It[e.type]()),o=n.workspace;return()=>a("section",{class:"flex flex-col"},[a("h1",{class:"font-bold text-lg py-4"},[j("Sa Form")]),a("header",null,[a(We,null,{default:()=>[a(Et,{options:n.header,drawer:n.drawer,class:"bg-slate-500"},null)]})]),a("main",{class:"mt-1 flex flex-grow"},[a("aside",null,[a(At,{stencil:n.side,drawer:n.drawer,class:"bg-slate-500 h-full"},null)]),a("main",{class:"flex-grow justify-center bg-slate-500 mx-1 overflow-auto"},[a(o,{drawer:n.drawer},null)]),a("aside",{class:"w-64 bg-slate-500 shrink-0"},[a(Ot,{drawer:n.drawer,controller:n.controller},null)])])])}});const Ft={class:"w-3/5 mx-auto h-full",style:{"min-width":"calc(472px + 0.5rem)"}},$t=S({setup(e){return(t,n)=>(Ue(),Ge("div",Ft,[a(He(Mt),{id:"1",type:"PcForm",class:"h-1/2"})]))}});const we=(e,t)=>{var r;const n=t.arg||t.value;if(!n){console.error("\u53C2\u6570\u6709\u8BEF");return}const o=t.value,s=Ke(n)?n.value:(r=t.instance)==null?void 0:r.$refs[n];if(!s){console.error(`\u6CA1\u6709\u627E\u5230 ${n} \u5BF9\u5E94\u7684\u5B9E\u4F8B`);return}if(typeof s.addReference!="function"){console.error(`${n} \u5BF9\u5E94\u7684\u5B9E\u4F8B\u4E0D\u662F VContextmenu`);return}e.$contextmenuKey=n,s.addReference(e,o)},be=(e,t)=>{var s;const n=e.$contextmenuKey;if(!n)return;const o=(s=t.instance)==null?void 0:s.$refs[n];o==null||o.removeReference(e)},Yt=(e,t)=>{be(e,t),we(e,t)},Lt={mounted:we,updated:Yt,beforeUnmount:be},g={contextmenu:"v-contextmenu",contextmenuIcon:"v-contextmenu-icon",contextmenuInner:"v-contextmenu-inner",contextmenuDivider:"v-contextmenu-divider",contextmenuItem:"v-contextmenu-item",contextmenuItemHover:"v-contextmenu-item--hover",contextmenuItemDisabled:"v-contextmenu-item--disabled",contextmenuItemDanger:"v-contextmenu-item--danger",contextmenuGroup:"v-contextmenu-group",contextmenuGroupTitle:"v-contextmenu-group__title",contextmenuGroupMenus:"v-contextmenu-group__menus",contextmenuSubmenu:"v-contextmenu-submenu",contextmenuSubmenuTitle:"v-contextmenu-submenu__title",contextmenuSubmenuMenus:"v-contextmenu-submenu__menus",contextmenuSubmenuMenusTop:"v-contextmenu-submenu__menus--top",contextmenuSubmenuMenusRight:"v-contextmenu-submenu__menus--right",contextmenuSubmenuMenusBottom:"v-contextmenu-submenu__menus--bottom",contextmenuSubmenuMenusLeft:"v-contextmenu-submenu__menus--left",contextmenuSubmenuArrow:"v-contextmenu-submenu__arrow"};function Vt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!de(e)}const Xt={trigger:["contextmenu"]},Ce=S({name:"VContextmenu",props:{modelValue:{type:Boolean,default:!1},autoAjustPlacement:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},teleport:{type:[String,Object],default:()=>"body"}},emits:["show","hide","update:modelValue"],setup(e,{emit:t}){const n=N(null),o=N(e.modelValue||!1),s=p=>{o.value=p,t("update:modelValue",p)},r=N({top:0,left:0}),i=I(()=>({top:`${r.value.top}px`,left:`${r.value.left}px`})),c=N(null),l=(p,v)=>{var ne,se;const h=p instanceof Event?v:p,_=(h==null?void 0:h.autoAjustPlacement)||e.autoAjustPlacement,P={top:(h==null?void 0:h.top)||0,left:(h==null?void 0:h.left)||0};p instanceof Event&&(p.preventDefault(),P.top=(ne=h==null?void 0:h.top)!=null?ne:p.pageY,P.left=(se=h==null?void 0:h.left)!=null?se:p.pageX),s(!0),he(()=>{if(_){const G=n.value;if(!G)return;const oe=G.clientWidth,re=G.clientHeight;if(re+P.top>=window.innerHeight+window.scrollY){const Y=P.top-re;Y>window.scrollY&&(P.top=Y)}if(oe+P.left>=window.innerWidth+window.scrollX){const Y=P.left-oe;Y>window.scrollX&&(P.left=Y)}}r.value=P,t("show")})},u=()=>{c.value=null,s(!1),t("hide")},f=ue(new Map),x=N(),d=I(()=>x.value&&f.get(x.value)),m=(p,v)=>{const h=(()=>(v==null?void 0:v.trigger)?Array.isArray(v.trigger)?v.trigger:[v.trigger]:Xt.trigger)(),_=P=>{e.disabled||(x.value=p,l(P,{}))};h.forEach(P=>{p.addEventListener(P,_)}),f.set(p,{triggers:h,handler:_})},C=p=>{const v=f.get(p);!v||(v.triggers.forEach(h=>{p.removeEventListener(h,v.handler)}),f.delete(p))},E=p=>{if(!p.target||!n.value||!x.value)return;n.value.contains(p.target)||d.value&&d.value.triggers.includes("click")&&x.value.contains(p.target)||s(!1)};return le(o,p=>{p?document.addEventListener("click",E):document.removeEventListener("click",E)}),Te(()=>{document.removeEventListener("click",E)}),q("visible",o),q("autoAjustPlacement",e.autoAjustPlacement),q("show",l),q("hide",u),{visible:o,style:i,currentReferenceOptions:d,currentOptions:c,contextmenuRef:n,addReference:m,removeReference:C,toggle:s,show:l,hide:u}},methods:{renderContent(){var e,t;return Je(a("div",{class:g.contextmenu,ref:"contextmenuRef",style:this.style},[a("ul",{class:g.contextmenuInner},[(t=(e=this.$slots).default)==null?void 0:t.call(e,{triggerOptions:"currentReferenceOptions",options:"currentOptions"})])]),[[Qe,"visible"]])}},render(){let e;return this.visible?this.teleport?a(Ze,{to:this.teleport},Vt(e=this.renderContent())?e:{default:()=>[e]}):this.renderContent():null}});function zt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!de(e)}const Se=S({name:"VContextmenuItem",props:{disabled:{type:Boolean,default:!1},hideOnClick:{type:Boolean,default:!0},icon:{required:!1,type:Object},type:{requred:!1,type:String}},emits:["click","mouseenter","mouseleave"],setup(e,{emit:t}){const n=K("hide"),o=N(!1);return{classes:I(()=>({[g.contextmenuItem]:!0,[g.contextmenuItemDisabled]:e.disabled,[g.contextmenuItemHover]:o.value,[g.contextmenuItemDanger]:e.type==="danger"})),handleClick:l=>{e.disabled||(t("click",l),e.hideOnClick&&(n==null||n()))},handleMouseenter:l=>{e.disabled||(o.value=!0,t("mouseenter",l))},handleMouseleave:l=>{e.disabled||(o.value=!1,t("mouseleave",l))}}},render(){var t,n;const e=this.icon;return a("li",{class:this.classes,onClick:this.handleClick,onMouseenter:this.handleMouseenter,onMouseleave:this.handleMouseleave},[e?a(et,{class:"mr-1 leading-0"},zt(e)?e:{default:()=>[e]}):a("span",{style:{width:"18px"}},null),(n=(t=this.$slots).default)==null?void 0:n.call(t)])}}),Ne=S({name:"VContextmenuDivider",render(){return a("li",{class:g.contextmenuDivider},null)}}),qt=S({name:"VContextmenuIcon",props:{name:{type:String,required:!0}},render(){return a("i",{class:[g.contextmenuIcon,`${g.contextmenuIcon}-${this.name}`]},null)}}),Pe=S({name:"VContextmenuSubmenu",props:{title:{type:String,required:!0},disabled:{type:Boolean,default:!1}},emits:["mouseenter","mouseleave"],setup(e,{emit:t}){const n=N(null),o=K("autoAjustPlacement"),s=N(["top","right"]),r=N(!1),i=f=>{e.disabled||(r.value=!0,t("mouseenter",f),he(()=>{const x=[];if(o){const{target:d}=f,m=d.getBoundingClientRect();if(!n.value)return;const C=n.value.clientWidth,E=n.value.clientHeight;m.right+C>=window.innerWidth?x.push("left"):x.push("right"),m.bottom+E>=window.innerHeight?x.push("bottom"):x.push("top")}s.value=x}))},c=f=>{e.disabled||(r.value=!1,t("mouseleave",f))},l=I(()=>({[g.contextmenuItem]:!0,[g.contextmenuSubmenuTitle]:!0,[g.contextmenuItemHover]:r.value,[g.contextmenuItemDisabled]:e.disabled})),u=I(()=>({[g.contextmenu]:!0,[g.contextmenuSubmenuMenus]:!0,[g.contextmenuSubmenuMenusTop]:s.value.includes("top"),[g.contextmenuSubmenuMenusRight]:s.value.includes("right"),[g.contextmenuSubmenuMenusBottom]:s.value.includes("bottom"),[g.contextmenuSubmenuMenusLeft]:s.value.includes("left")}));return{hover:r,submenuRef:n,titleClasses:l,menusClasses:u,handleMouseenter:i,handleMouseleave:c}},render(){var e,t,n,o;return a("li",{class:g.contextmenuSubmenu,onMouseenter:this.handleMouseenter,onMouseleave:this.handleMouseleave},[a("div",{class:this.titleClasses},[((t=(e=this.$slots).title)==null?void 0:t.call(e))||this.title,a("span",{class:g.contextmenuSubmenuArrow},[a(qt,{name:"right-arrow"},null)])]),this.hover?a("div",{ref:"submenuRef",class:this.menusClasses},[a("ul",{class:g.contextmenuInner},[(o=(n=this.$slots).default)==null?void 0:o.call(n)])]):null])}}),ke=S({name:"VContextmenuGroup",props:{title:{type:String,default:void 0},maxWidth:{type:[Number,String],default:void 0}},setup(e){return{style:I(()=>{if(!!e.maxWidth)return{"max-width":typeof e.maxWidth=="number"?`${e.maxWidth}px`:e.maxWidth,"overflow-x":"auto"}})}},methods:{renderTitle(){var t,n;const e=((n=(t=this.$slots).title)==null?void 0:n.call(t))||this.title;return e?a("div",{class:g.contextmenuGroupTitle},[e]):null}},render(){var e,t;return a("li",{class:g.contextmenuGroup},[this.renderTitle(),a("ul",{style:this.style,class:g.contextmenuGroupMenus},[(t=(e=this.$slots).default)==null?void 0:t.call(e)])])}}),Wt=e=>{e.directive("contextmenu",Lt),e.component(Ce.name,Ce),e.component(Se.name,Se),e.component(Ne.name,Ne),e.component(Pe.name,Pe),e.component(ke.name,ke)},Gt={install:Wt},De=tt($t);De.use(Gt);De.mount("#app");export{Kt as i};
