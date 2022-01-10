var Se=Object.defineProperty,Ie=Object.defineProperties;var Ne=Object.getOwnPropertyDescriptors;var se=Object.getOwnPropertySymbols;var ke=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var H=(e,t,n)=>t in e?Se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,B=(e,t)=>{for(var n in t||(t={}))ke.call(t,n)&&H(e,n,t[n]);if(se)for(var n of se(t))Pe.call(t,n)&&H(e,n,t[n]);return e},X=(e,t)=>Ie(e,Ne(t));var v=(e,t,n)=>(H(e,typeof t!="symbol"?t+"":t,n),n);import{f as D,R as z,c as _,s as L,a as K,p as De,r as Ae,b as a,d as E,e as S,g as I,h as oe,o as Ee,G as Oe,i as Be,j as k,k as R,l as _e,F as Re,w as re,S as Me,E as je,m as Fe,n as ie,q as Ye,t as $e,u as Xe,v as ze,x as Le,y as Ve,z as V,A as We,B as qe,T as Ge,C as ae,D as le,H as ce,I as He,J as Ke}from"./vendor.358297b1.js";const Te=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};Te();var N;(function(e){e[e.Add=0]="Add",e[e.Delete=1]="Delete",e[e.Move=2]="Move",e[e.Attr=3]="Attr"})(N||(N={}));function ue(e){return Reflect.has(e[0],"id")}function Ue(e){return!Reflect.has(e[0],"id")}class O{constructor(t){v(this,"parent");v(this,"children");v(this,"attrs");this.parent=t.parent,this.attrs=t.attrs,t.children&&(this.children=t.children)}}class W{constructor(t){v(this,"type");v(this,"time");v(this,"data");this.time=t.time,this.type=t.type,this.data=t.data}}class Je{constructor(t){v(this,"records",[]);v(this,"index",-1);v(this,"max");v(this,"recording");v(this,"lastOperatedIds",[]);var n,o;this.max=(n=t==null?void 0:t.max)!=null?n:20,this.recording=(o=t==null?void 0:t.recording)!=null?o:!0}getPrevRecord(){if(!(this.index<0))return this.records[this.index]}getNextRecord(){if(!(this.index>=this.records.length-1))return this.records[this.index+1]}}function T(e){const t=F(e[0]);let n=t.position.x,o=t.position.x+t.size.width,s=t.position.y,r=t.position.y+t.size.height;return e.forEach(i=>{const l=F(i);l.position.x<n&&(n=l.position.x),o<l.position.x+l.size.width&&(o=l.position.x+l.size.width),l.position.y<s&&(s=l.position.y),r<l.position.y+l.size.height&&(r=l.position.y+l.size.height)}),{x:n,y:s,width:o-n,height:r-s}}function F(e){return e instanceof O?{position:{x:e.attrs.offsetX,y:e.attrs.offsetY},size:{width:e.attrs.width,height:e.attrs.height}}:{position:e.getProp("position"),size:e.getProp("size")}}function Qe(e){const t=o(e),n=Number(t);return n?(n+1).toString():"1";function o(s){var h;const r=s.attrs.id;let i="";if((h=s.children)==null?void 0:h.length)for(const y of s.children){const c=o(y),f=Number(i),g=Number(c);f&&g&&(i=Math.max(f,g).toString()),g&&(i=c)}const l=Number(i),u=Number(r);return l&&u?Math.max(l,u).toString():l?i:r}}function Ze(e,t,{canvas:n}){var s,r;const o=(s=e.parent)==null?void 0:s.data.id;return new t({attrs:e.data,parent:B({},o&&(r=D(n,i=>i.attrs.id===o))!=null?r:n),children:[]})}function U(e,t){const n=Array.isArray(e)?e:[e],o=t.getSelectedCells().filter(s=>!n.includes(s.data.id));for(const s of n)t.isSelected(s)||t.select(s);for(const s of o)t.unselect(s)}var b;(function(e){e[e.Canvas=1]="Canvas",e[e.Button=2]="Button",e[e.Container=3]="Container"})(b||(b={}));function Y(e){const t=Object.assign({id:e.attrs.id,x:e.attrs.offsetX,y:e.attrs.offsetY,width:e.attrs.width,height:e.attrs.height},{data:e.attrs});switch(e.attrs.type){case b.Button:return new z(X(B({},t),{attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:b[e.attrs.type],fill:"white"}}}));case b.Container:return new z(X(B({},t),{attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1}}}));default:throw new Error(`[Sa error]: unexpected element type ${e.attrs.type}.`)}}class et{constructor(){v(this,"clips")}isEmpty(t=this.clips){var n;return!((n=this.clips)==null?void 0:n.elements.length)}copy(t,n){this.clips={elements:_(t.selected),type:"copy"}}cut(t,n){this.clips={elements:_(t.selected),type:"cut"}}paste(t,n=t.canvas.attrs.id,o){if(this.isEmpty(this.clips)||!t.graph)return;const s=D(t.canvas,u=>u.attrs.id===n);if(!s){console.warn("[Sa warn]: can not paste in undefined parent.");return}const r=this.clips.elements.map(u=>{const h=new O(X(B({},u),{parent:s}));return(o==null?void 0:o.nodeProps)&&L(h.attrs,o.nodeProps(u)),h}),i=r.map(u=>Y(u)),l=n?t.graph.getCellById(s.attrs.id):void 0;if(l)for(const u of i)u.setParent(l),l.addChild(u);return t.addChildren(r,n),t.graph.addNodes(i),r}}class tt{constructor(t){v(this,"type");v(this,"canvas");v(this,"history");v(this,"clipboard");v(this,"selected",[]);v(this,"graph");v(this,"nextId");this.type="PcForm",this.history=new Je,this.clipboard=new et,this.nextId="1",this.canvas=new O({parent:void 0,children:[],attrs:t.attrs})}setCanvas(t){this.canvas=t,this.selected=[t],this.nextId=Qe(t)}setGraph(t){this.graph=t}getNextId(){const t=this.nextId;return this.nextId=String(Number(t)+1),t}addChild(t,n){var s;const o=(s=typeof n=="string"?K(this.canvas.children,r=>r.attrs.id===n):n)!=null?s:this.canvas;if(q(this,t),!this.history.lastOperatedIds.includes(t.attrs.id)){const r=new W({type:N.Add,time:new Date,data:[{next:B({},_(t))}]});this.addRecord(r)}return o}addChildren(t,n){var s;const o=(s=typeof n=="string"?K(this.canvas.children,r=>r.attrs.id===n):n)!=null?s:this.canvas;for(const r of t)q(this,r);if(!t.some(r=>this.history.lastOperatedIds.includes(r.attrs.id))){const r=new W({type:N.Add,time:new Date,data:t.map(i=>({next:B({},_(i))}))});this.addRecord(r)}return o}setSelected(t){if(!!this.graph){if(console.log("set selected",this.selected,t),!arguments.length||Array.isArray(t)&&!t.length)return this.selected=[this.canvas],this.canvas;if(console.log("---",this.canvas),!!this.canvas.children){if(typeof t=="string"){const n=D(this.canvas,o=>o.attrs.id===t);return console.log("node",n),n&&(this.selected=[n],U(t,this.graph)),n}if(Array.isArray(t)){const n=[];for(const o of t)if(typeof o=="string"){const s=D(this.canvas,r=>r.attrs.id===o);s&&n.push(s)}else n.push(o);return U(n.map(o=>o.attrs.id),this.graph),this.selected=n,n}if(typeof t=="object")return this.selected=[t],U(t.attrs.id,this.graph),t}}}updateElemData(t,n){const o=typeof t=="string"?D(this.canvas,r=>r.attrs.id===t):t;if(!o)return;const s=new W({type:N.Attr,time:new Date,data:[{id:o.attrs.id,prev:_(De(o.attrs,Object.keys(n))),next:_(n)}]});return this.addRecord(s),J(this,o.attrs.id,n),L(o.attrs,n),o}addRecord(t){console.log("[Sa info]: New record has been added.",t),this.history.index&&this.history.records.length>this.history.index+1&&this.history.records.splice(this.history.index+1),this.history.records.push(t),this.history.index+=1,this.history.lastOperatedIds=[]}undo(){var n,o;if(!this.graph)return;const t=this.history.getPrevRecord();if(!t){console.warn("[Sa warn]: None previous record in history.");return}if(console.log("prev record",t,this.history),ue(t.data)){this.history.lastOperatedIds=t.data.map(s=>s.id);for(const s of t.data){const r=D(this.canvas,i=>i.attrs.id===s.id);r&&(L(r.attrs,s.prev),J(this,s.id,s.prev))}this.setSelected(t.data.map(s=>s.id))}else{t.type===N.Add?this.history.lastOperatedIds=t.data.map(s=>s.next.attrs.id):this.history.lastOperatedIds=t.data.map(s=>s.prev.attrs.id);for(const s of t.data)t.type===N.Add?de(this,(o=(n=s.next)==null?void 0:n.attrs)==null?void 0:o.id):t.type===N.Delete&&q(this,s.prev);this.setSelected(this.history.lastOperatedIds)}this.history.index-=1}redo(){var n,o;const t=this.history.getNextRecord();if(!t){console.warn("[Sa warn]: None next record in history.");return}if(ue(t.data)){this.history.lastOperatedIds=t.data.map(s=>s.id);for(const s of t.data){const r=D(this.canvas,i=>i.attrs.id===s.id);r&&(L(r.attrs,s.next),J(this,s.id,s.next))}this.setSelected(t.data.map(s=>s.id))}else if(Ue(t.data)){t.type===N.Add?this.history.lastOperatedIds=t.data.map(s=>s.next.attrs.id):this.history.lastOperatedIds=t.data.map(s=>s.prev.attrs.id);for(const s of t.data)t.type===N.Add?q(this,s.next):t.type===N.Delete&&de(this,(o=(n=s.prev)==null?void 0:n.attrs)==null?void 0:o.id);this.setSelected(this.history.lastOperatedIds)}this.history.index+=1}}function J(e,t,n){var s,r,i,l,u,h;if(!e.graph)return;const o=e.graph.getCellById(t);if(o){const y=F(o);o.setProp({position:{x:(s=n.offsetX)!=null?s:y.position.x,y:(r=n.offsetY)!=null?r:y.position.y},size:{width:(i=n.width)!=null?i:y.size.width,height:(l=n.height)!=null?l:y.size.height}})}else e.graph.size.resize((u=n.width)!=null?u:e.canvas.attrs.width,(h=n.height)!=null?h:e.canvas.attrs.height)}function q(e,t){var o;if(!e.graph||!e.canvas.children||!t)return;const n=e.graph.hasCell(t.attrs.id);if(t.parent){if(!n){const r=Y(t);e.graph.addCell(r);const i=e.graph.getCellById(t.parent.attrs.id);i&&i.addChild(r)}const s=D(e.canvas,r=>{var i;return r.attrs.id===((i=t.parent)==null?void 0:i.attrs.id)});s&&((o=s.children)==null||o.push(t),t.parent=s)}}function de(e,t){if(!e.graph||!e.canvas.children||!t)return;const n=D(e.canvas,o=>o.attrs.id===t);n&&e.canvas.children&&(e.graph.removeCell(n.attrs.id),Ae(e.canvas.children,o=>o.attrs.id===n.attrs.id))}const nt=[{title:"undo",icon:a("span",null,[E("undo")]),click:e=>e.undo()},{title:"redo",icon:a("span",null,[E("redo")]),click:e=>e.redo()}];function st(e,t){return he(e,t)}function ot(e,t){return he(e,t)}function he(e,t){const n=t.getNextId(),o=t.canvas;switch(e.data.name){case"Button":return Y({attrs:{id:n,name:"Button",width:80,height:40,type:b.Button,offsetX:0,offsetY:0},parent:o});case"Container":return Y({attrs:{id:n,name:"Container",width:200,height:100,type:b.Container,offsetX:0,offsetY:0},parent:o});default:console.error("[Sa error]: unexpected drag node",e)}return e}const rt=e=>({groups:[{name:"Normal",collapsable:!0},{name:"Container",collapsable:!0}],getDragNode:t=>st(t,e),getDropNode:t=>ot(t,e),nodes:{Normal:[new z({width:80,height:40,attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:"Button",fill:"white"}},data:{name:"Button"}})],Container:[new z({width:80,height:40,attrs:{rect:{fill:"#31D0C6",stroke:"#4B4A67",strokeWidth:1},text:{text:"Container",fill:"white"}},data:{name:"Container"}})]}}),it=()=>{var s;const e=new O({parent:void 0,children:[],attrs:{type:b.Canvas,id:"1",name:"mock pc form",width:800,height:600,offsetX:0,offsetY:0}}),t=new O({parent:e,attrs:{id:"2",type:b.Button,name:"mock button 1",width:80,height:40,offsetX:200,offsetY:100}}),n=new O({parent:e,attrs:{type:b.Button,id:"3",name:"mock button 2",width:80,height:40,offsetX:150,offsetY:200}}),o=new O({parent:e,attrs:{type:b.Container,id:"4",name:"mock container",width:400,height:200,offsetX:50,offsetY:300},children:[]});return(s=e.children)==null||s.push(t,n,o),e};function fe(e,t){if(!(e==null?void 0:e.graph))return;if(t){let o=[];for(const i of t)typeof i=="object"?o.push(i.toJSON().id):o.push(i);const s=o.map(i=>K(e.canvas.children,l=>l.attrs.id===i)),r=new W({type:N.Delete,time:new Date,data:s.map(i=>({prev:_(i)}))});return e.addRecord(r),e.graph.removeCells(o)}const n=e.graph.getSelectedCells();n.length&&fe(e,n)}function at(e){e.clipboard.copy(e,{deep:!0,useLocalStorage:!0})}function me(e,t,n){if(n.clipboard.isEmpty(n.clipboard.clips)||!n.graph)return;if(t&&t.data.type!==b.Container)return console.error(`[Sa error]: can not paste elements in ${b[t.data.type]}.`);const o=T(n.clipboard.clips.elements),s=o.x-e.offsetX,r=o.y-e.offsetY,i=n.clipboard.paste(n,t==null?void 0:t.data.id,{deep:!0,nodeProps:l=>({id:n.getNextId(),offsetX:l.attrs.offsetX-s,offsetY:l.attrs.offsetY-r})});i&&(n.graph.cleanSelection(),n.graph.select(i==null?void 0:i.map(l=>l.attrs.id)))}function lt(e){if(!e)return;const t=e.getSelectedCells();e.cut(t,{deep:!0,useLocalStorage:!0})}var ct=S({name:"SaPcFormRender",props:{drawer:{required:!0,type:Object}},setup(e){const t=I(null),n=I(null),o=I([]),s=oe(),r=oe();Ee(()=>{var l;if(t.value){const u=it();console.log("create graph",u);const h=new Oe({container:t.value,width:u.attrs.width,height:u.attrs.height,snapline:!0,grid:{visible:!0,type:"doubleMesh",args:[{color:"#eee",thickness:1},{color:"#ddd",thickness:1,factor:4}]},selecting:{enabled:!0,multiple:!0,rubberband:!0,movable:!0,showEdgeSelectionBox:!0},resizing:!0,translating:{restrict(c){var M;const f=c.cell,g=c.graph.selection;if(f.isNode()){const A=f.getParent();if(A){const d=A.getBBox();if((M=g==null?void 0:g.cells)==null?void 0:M.length){const x=T(g.cells),m=F(f);return{x:d.x+m.position.x-x.x,y:d.y+m.position.y-x.y,width:d.width-(x.width-m.size.width),height:d.height-(x.height-m.size.height)}}return d}if(g==null?void 0:g.length){const d=T(g.cells),x=F(f);return{x:x.position.x-d.x,y:x.position.y-d.y,width:u.attrs.width-(d.width-x.size.width),height:u.attrs.height-(d.height-x.size.height)}}}return{x:0,y:0,width:u.attrs.width,height:u.attrs.height}}},clipboard:{enabled:!0,useLocalStorage:!0}});Be(e.drawer).setGraph(h).setCanvas(u);const y=(l=u.children)==null?void 0:l.map(c=>Y(c));y&&h.addNodes(y),h.enableHistory(),h.on("blank:mousedown",()=>{h.cleanSelection(),n.value.hide()}),h.on("blank:contextmenu",({e:c})=>{h.cleanSelection(),r.value=void 0,s.value=c,n.value.show(c.originalEvent)}),h.on("cell:mousedown",({cell:c})=>{c.toFront({deep:!0}),n.value.hide()}),h.on("cell:contextmenu",({cell:c,e:f})=>{h.isSelected(c)||(h.cleanSelection(),h.select(c)),r.value=c,s.value=f,n.value.show(f.originalEvent)}),h.on("selection:changed",({selected:c})=>{o.value=c,e.drawer.setSelected(c.map(f=>f.data.id)),c.length>1?h.disableSnapline():h.enableSnapline()}),h.on("node:added",({cell:c})=>{const f=c.getProp("position");c.data.offsetX=f.x,c.data.offsetY=f.y;const g=Ze(c,O,e.drawer);e.drawer.addChild(g)}),h.on("node:moved",({cell:c})=>{const{x:f,y:g}=c.position();e.drawer.updateElemData(c.data.id,{offsetX:f,offsetY:g})}),h.on("node:resized",({cell:c})=>{const{width:f,height:g}=c.size();e.drawer.updateElemData(c.data.id,{width:f,height:g})})}});const i=k(()=>o.value.length?a(Re,null,[a(R("v-contextmenu-item"),{onClick:()=>at(e.drawer)},{default:()=>[E("copy")]}),a(R("v-contextmenu-item"),{onClick:()=>lt(e.drawer.graph)},{default:()=>[E("cut")]}),a(R("v-contextmenu-item"),{onClick:()=>me(s.value,r.value,e.drawer)},{default:()=>[E("paste")]}),a(R("v-contextmenu-item"),{type:"danger",icon:a(_e,null,null),onClick:()=>fe(e.drawer)},{default:()=>[E("delete")]})]):a(R("v-contextmenu-item"),{onClick:()=>me(s.value,void 0,e.drawer)},{default:()=>[E("paste")]}));return{workspace:t,contextmenu:n,selectedCells:o,graphContextmenu:i}},render(){return a("div",null,[a("div",{ref:"workspace"},null),a(R("v-contextmenu"),{ref:"contextmenu"},{default:()=>[this.graphContextmenu]})])}}),P;(function(e){e.Input="input",e.Number="number",e.Select="select",e.Dialog="dialog",e.Color="color",e.Cascader="cascader"})(P||(P={}));const w={"widget-id":{label:"id",attr:"id",component:P.Input,disabled:!0},"widget-name":{label:"name",attr:"name",component:P.Input},"widget-width":{label:"width",attr:"width",component:P.Number},"widget-height":{label:"height",attr:"height",component:P.Number},"widget-offsetX":{label:"x",attr:"offsetX",component:P.Number},"widget-offsetY":{label:"y",attr:"offsetY",component:P.Number}},ut={[b.Canvas]:{basic:[w["widget-id"],w["widget-name"],w["widget-width"],w["widget-height"]]},[b.Container]:{basic:[w["widget-id"],w["widget-name"],w["widget-width"],w["widget-height"],w["widget-offsetX"],w["widget-offsetY"]]},[b.Button]:{basic:[w["widget-id"],w["widget-name"],w["widget-width"],w["widget-height"],w["widget-offsetX"],w["widget-offsetY"]]}};function dt(e,t,n){const o=n.selected[0];!o||n.updateElemData(o,{[e]:t})}const ht=()=>({drawer:new tt({attrs:{type:b.Canvas,id:"1",name:"Pc Form Demo",width:800,height:600,offsetX:0,offsetY:0}}),header:nt,side:rt,workspace:ct,controller:{plugins:ut,valueChange:dt}}),ft={PcForm:()=>ht()};var mt=S({name:"SaFormLayoutHeader",props:{options:{required:!0,type:Array},drawer:{required:!0,type:Object}},render(){return a("div",{class:"sa-form-header flex justify-start p-1"},[this.options.map(e=>a("span",{class:"header-tool",onClick:t=>e.click(this.drawer,t),title:e.title,style:{width:e.width?`${e.width}px`:"30px",height:"30px"}},[e.icon]))])}}),pt=S({name:"CoFormLayoutSidebar",props:{stencil:{type:Function},drawer:{required:!0,type:Object}},setup(e){const t=I(null),n=k(()=>e.drawer.graph);let o;return re(()=>n.value,()=>{var s;if(n.value&&!o&&e.stencil){const r=e.stencil(e.drawer);o=new Me({title:"Components",target:n.value,scaled:!1,animation:!0,search(i,l){const u=i.attrs.text.text;return new RegExp(l,"i").test(u)},placeholder:"Search by shape name",notFoundText:"Not Found",collapsable:!0,stencilGraphWidth:208,stencilGraphHeight:180,groups:r.groups,getDragNode:i=>r.getDragNode(i,e.drawer),getDropNode:i=>r.getDropNode(i,e.drawer)}),(s=t.value)==null||s.appendChild(o.container);for(const i of r.groups)o.load(r.nodes[i.name],i.name)}}),{graph:n,refStencil:t,stencil:o}},render(){return a("div",{class:"sa-form-side flex flex-col justify-start p-1 relative w-52"},[a("div",{ref:"refStencil"},null)])}});function pe(e,t,n,o){o(e.attr,t,n)}function gt(e,t,n){var r,i;const o=t.selected[0];let s;if(o&&xt(e.attr,o)&&(s=o==null?void 0:o.attrs[e.attr]),s===void 0)return a("span",null,null);switch(e.component){case P.Input:return a(Fe,{modelValue:s,onInput:l=>pe(e,l,t,n.valueChange),disabled:(r=e.disabled)!=null?r:!1},null);case P.Number:return a(je,{controls:!1,modelValue:s,onInput:l=>pe(e,l,t,n.valueChange),disabled:(i=e.disabled)!=null?i:!1},null);default:return console.error(`[Sa error]: unexpected plugin type ${e.component}.`),a("span",null,[e.label])}}function xt(e,t){return Reflect.has(t.attrs,e)}var vt=S({name:"ControllerItem",props:{plugin:{required:!0,type:Object},drawer:{required:!0,type:Object},controller:{required:!0,type:Object}},setup(e){const t=k(()=>gt(e.plugin,e.drawer,e.controller));return()=>a("div",null,[t.value])}});var yt=S({name:"SaFormLayoutController",props:{drawer:{required:!0,type:Object},controller:{required:!0,type:Object}},setup(e){const t=k(()=>{var o;const n=(o=e.drawer.selected[0])==null?void 0:o.attrs.type;if(n&&e.controller.plugins[n])return e.controller.plugins[n]});return()=>{var n;return a("div",{class:"controller-container"},[t.value?(n=t.value.basic)==null?void 0:n.map(o=>a("div",{class:"controller-item"},[a("div",{class:"controller-item-label"},[o.label]),a("div",{class:"controller-item-plugin"},[a(vt,{plugin:o,drawer:e.drawer,controller:e.controller},null)])])):""])}}}),bt=S({props:{type:{required:!0,type:String},id:{required:!0,type:String}},setup(e,t){const n=ie(ft[e.type]()),o=n.workspace;return()=>a("section",{class:"flex flex-col"},[a("h1",{class:"font-bold text-lg py-4"},[E("Sa Form")]),a("header",null,[a(Ye,null,{default:()=>[a(mt,{options:n.header,drawer:n.drawer,class:"bg-slate-500"},null)]})]),a("main",{class:"mt-1 flex flex-grow"},[a("aside",null,[a(pt,{stencil:n.side,drawer:n.drawer,class:"bg-slate-500 h-full"},null)]),a("main",{class:"flex-grow justify-center bg-slate-500 mx-1 overflow-auto"},[a(o,{drawer:n.drawer},null)]),a("aside",{class:"w-52 bg-slate-500"},[a(yt,{drawer:n.drawer,controller:n.controller},null)])])])}});const wt={class:"w-3/5 mx-auto h-full"},Ct=S({setup(e){return(t,n)=>(ze(),$e("div",wt,[a(Xe(bt),{id:"1",type:"PcForm",class:"h-1/2"})]))}});const ge=(e,t)=>{var r;const n=t.arg||t.value;if(!n){console.error("\u53C2\u6570\u6709\u8BEF");return}const o=t.value,s=Le(n)?n.value:(r=t.instance)==null?void 0:r.$refs[n];if(!s){console.error(`\u6CA1\u6709\u627E\u5230 ${n} \u5BF9\u5E94\u7684\u5B9E\u4F8B`);return}if(typeof s.addReference!="function"){console.error(`${n} \u5BF9\u5E94\u7684\u5B9E\u4F8B\u4E0D\u662F VContextmenu`);return}e.$contextmenuKey=n,s.addReference(e,o)},xe=(e,t)=>{var s;const n=e.$contextmenuKey;if(!n)return;const o=(s=t.instance)==null?void 0:s.$refs[n];o==null||o.removeReference(e)},St=(e,t)=>{xe(e,t),ge(e,t)},It={mounted:ge,updated:St,beforeUnmount:xe},p={contextmenu:"v-contextmenu",contextmenuIcon:"v-contextmenu-icon",contextmenuInner:"v-contextmenu-inner",contextmenuDivider:"v-contextmenu-divider",contextmenuItem:"v-contextmenu-item",contextmenuItemHover:"v-contextmenu-item--hover",contextmenuItemDisabled:"v-contextmenu-item--disabled",contextmenuItemDanger:"v-contextmenu-item--danger",contextmenuGroup:"v-contextmenu-group",contextmenuGroupTitle:"v-contextmenu-group__title",contextmenuGroupMenus:"v-contextmenu-group__menus",contextmenuSubmenu:"v-contextmenu-submenu",contextmenuSubmenuTitle:"v-contextmenu-submenu__title",contextmenuSubmenuMenus:"v-contextmenu-submenu__menus",contextmenuSubmenuMenusTop:"v-contextmenu-submenu__menus--top",contextmenuSubmenuMenusRight:"v-contextmenu-submenu__menus--right",contextmenuSubmenuMenusBottom:"v-contextmenu-submenu__menus--bottom",contextmenuSubmenuMenusLeft:"v-contextmenu-submenu__menus--left",contextmenuSubmenuArrow:"v-contextmenu-submenu__arrow"};function Nt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!ae(e)}const kt={trigger:["contextmenu"]},ve=S({name:"VContextmenu",props:{modelValue:{type:Boolean,default:!1},autoAjustPlacement:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},teleport:{type:[String,Object],default:()=>"body"}},emits:["show","hide","update:modelValue"],setup(e,{emit:t}){const n=I(null),o=I(e.modelValue||!1),s=d=>{o.value=d,t("update:modelValue",d)},r=I({top:0,left:0}),i=k(()=>({top:`${r.value.top}px`,left:`${r.value.left}px`})),l=I(null),u=(d,x)=>{var Z,ee;const m=d instanceof Event?x:d,$=(m==null?void 0:m.autoAjustPlacement)||e.autoAjustPlacement,C={top:(m==null?void 0:m.top)||0,left:(m==null?void 0:m.left)||0};d instanceof Event&&(d.preventDefault(),C.top=(Z=m==null?void 0:m.top)!=null?Z:d.pageY,C.left=(ee=m==null?void 0:m.left)!=null?ee:d.pageX),s(!0),le(()=>{if($){const G=n.value;if(!G)return;const te=G.clientWidth,ne=G.clientHeight;if(ne+C.top>=window.innerHeight+window.scrollY){const j=C.top-ne;j>window.scrollY&&(C.top=j)}if(te+C.left>=window.innerWidth+window.scrollX){const j=C.left-te;j>window.scrollX&&(C.left=j)}}r.value=C,t("show")})},h=()=>{l.value=null,s(!1),t("hide")},y=ie(new Map),c=I(),f=k(()=>c.value&&y.get(c.value)),g=(d,x)=>{const m=(()=>(x==null?void 0:x.trigger)?Array.isArray(x.trigger)?x.trigger:[x.trigger]:kt.trigger)(),$=C=>{e.disabled||(c.value=d,u(C,{}))};m.forEach(C=>{d.addEventListener(C,$)}),y.set(d,{triggers:m,handler:$})},M=d=>{const x=y.get(d);!x||(x.triggers.forEach(m=>{d.removeEventListener(m,x.handler)}),y.delete(d))},A=d=>{if(!d.target||!n.value||!c.value)return;n.value.contains(d.target)||f.value&&f.value.triggers.includes("click")&&c.value.contains(d.target)||s(!1)};return re(o,d=>{d?document.addEventListener("click",A):document.removeEventListener("click",A)}),Ve(()=>{document.removeEventListener("click",A)}),V("visible",o),V("autoAjustPlacement",e.autoAjustPlacement),V("show",u),V("hide",h),{visible:o,style:i,currentReferenceOptions:f,currentOptions:l,contextmenuRef:n,addReference:g,removeReference:M,toggle:s,show:u,hide:h}},methods:{renderContent(){var e,t;return We(a("div",{class:p.contextmenu,ref:"contextmenuRef",style:this.style},[a("ul",{class:p.contextmenuInner},[(t=(e=this.$slots).default)==null?void 0:t.call(e,{triggerOptions:"currentReferenceOptions",options:"currentOptions"})])]),[[qe,"visible"]])}},render(){let e;return this.visible?this.teleport?a(Ge,{to:this.teleport},Nt(e=this.renderContent())?e:{default:()=>[e]}):this.renderContent():null}});function Pt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!ae(e)}const ye=S({name:"VContextmenuItem",props:{disabled:{type:Boolean,default:!1},hideOnClick:{type:Boolean,default:!0},icon:{required:!1,type:Object},type:{requred:!1,type:String}},emits:["click","mouseenter","mouseleave"],setup(e,{emit:t}){const n=ce("hide"),o=I(!1);return{classes:k(()=>({[p.contextmenuItem]:!0,[p.contextmenuItemDisabled]:e.disabled,[p.contextmenuItemHover]:o.value,[p.contextmenuItemDanger]:e.type==="danger"})),handleClick:u=>{e.disabled||(t("click",u),e.hideOnClick&&(n==null||n()))},handleMouseenter:u=>{e.disabled||(o.value=!0,t("mouseenter",u))},handleMouseleave:u=>{e.disabled||(o.value=!1,t("mouseleave",u))}}},render(){var t,n;const e=this.icon;return a("li",{class:this.classes,onClick:this.handleClick,onMouseenter:this.handleMouseenter,onMouseleave:this.handleMouseleave},[e?a(R("el-icon"),{class:"mr-1 leading-0"},Pt(e)?e:{default:()=>[e]}):a("span",{style:{width:"18px"}},null),(n=(t=this.$slots).default)==null?void 0:n.call(t)])}}),be=S({name:"VContextmenuDivider",render(){return a("li",{class:p.contextmenuDivider},null)}}),Dt=S({name:"VContextmenuIcon",props:{name:{type:String,required:!0}},render(){return a("i",{class:[p.contextmenuIcon,`${p.contextmenuIcon}-${this.name}`]},null)}}),we=S({name:"VContextmenuSubmenu",props:{title:{type:String,required:!0},disabled:{type:Boolean,default:!1}},emits:["mouseenter","mouseleave"],setup(e,{emit:t}){const n=I(null),o=ce("autoAjustPlacement"),s=I(["top","right"]),r=I(!1),i=y=>{e.disabled||(r.value=!0,t("mouseenter",y),le(()=>{const c=[];if(o){const{target:f}=y,g=f.getBoundingClientRect();if(!n.value)return;const M=n.value.clientWidth,A=n.value.clientHeight;g.right+M>=window.innerWidth?c.push("left"):c.push("right"),g.bottom+A>=window.innerHeight?c.push("bottom"):c.push("top")}s.value=c}))},l=y=>{e.disabled||(r.value=!1,t("mouseleave",y))},u=k(()=>({[p.contextmenuItem]:!0,[p.contextmenuSubmenuTitle]:!0,[p.contextmenuItemHover]:r.value,[p.contextmenuItemDisabled]:e.disabled})),h=k(()=>({[p.contextmenu]:!0,[p.contextmenuSubmenuMenus]:!0,[p.contextmenuSubmenuMenusTop]:s.value.includes("top"),[p.contextmenuSubmenuMenusRight]:s.value.includes("right"),[p.contextmenuSubmenuMenusBottom]:s.value.includes("bottom"),[p.contextmenuSubmenuMenusLeft]:s.value.includes("left")}));return{hover:r,submenuRef:n,titleClasses:u,menusClasses:h,handleMouseenter:i,handleMouseleave:l}},render(){var e,t,n,o;return a("li",{class:p.contextmenuSubmenu,onMouseenter:this.handleMouseenter,onMouseleave:this.handleMouseleave},[a("div",{class:this.titleClasses},[((t=(e=this.$slots).title)==null?void 0:t.call(e))||this.title,a("span",{class:p.contextmenuSubmenuArrow},[a(Dt,{name:"right-arrow"},null)])]),this.hover?a("div",{ref:"submenuRef",class:this.menusClasses},[a("ul",{class:p.contextmenuInner},[(o=(n=this.$slots).default)==null?void 0:o.call(n)])]):null])}}),Ce=S({name:"VContextmenuGroup",props:{title:{type:String,default:void 0},maxWidth:{type:[Number,String],default:void 0}},setup(e){return{style:k(()=>{if(!!e.maxWidth)return{"max-width":typeof e.maxWidth=="number"?`${e.maxWidth}px`:e.maxWidth,"overflow-x":"auto"}})}},methods:{renderTitle(){var t,n;const e=((n=(t=this.$slots).title)==null?void 0:n.call(t))||this.title;return e?a("div",{class:p.contextmenuGroupTitle},[e]):null}},render(){var e,t;return a("li",{class:p.contextmenuGroup},[this.renderTitle(),a("ul",{style:this.style,class:p.contextmenuGroupMenus},[(t=(e=this.$slots).default)==null?void 0:t.call(e)])])}}),At=e=>{e.directive("contextmenu",It),e.component(ve.name,ve),e.component(ye.name,ye),e.component(be.name,be),e.component(we.name,we),e.component(Ce.name,Ce)},Et={install:At},Q=He(Ct);Q.use(Et);Q.use(Ke);Q.mount("#app");
