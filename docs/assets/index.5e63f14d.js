import{d as w,h as l,c as ke,a as Fe,b as we,s as Oe,i as Le,e as Pe,f as Ve,g as $e,j as Ae,k as Ie,l as D,u as Be,N as K,m as Ne,n as Ue,o as _e,p as De,r as V,q as He,V as Ee,t as q,v as Me,w as qe,x as je,y as _,z as h,A as x,B,C as v,D as W,E as Ke,F as We,G as Z,H as Ge,I as P,J as Je,K as Qe,L as Xe,M,O as F,P as ee,Q as G,R as Ye}from"./index.663c0561.js";var Ze=w({name:"Search",render(){return l("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",style:"enable-background: new 0 0 512 512"},l("path",{d:`M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
  c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
   M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
  c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z`}))}});const er=e=>{const{fontWeight:a,fontSizeLarge:i,fontSizeMedium:o,fontSizeSmall:c,heightLarge:s,heightMedium:u,borderRadius:r,cardColor:f,tableHeaderColor:d,textColor1:g,textColorDisabled:m,textColor2:k,textColor3:C,borderColor:p,hoverColor:S,closeColorHover:T,closeColorPressed:z,closeIconColor:$,closeIconColorHover:A,closeIconColorPressed:t}=e;return Object.assign(Object.assign({},$e),{itemHeightSmall:u,itemHeightMedium:u,itemHeightLarge:s,fontSizeSmall:c,fontSizeMedium:o,fontSizeLarge:i,borderRadius:r,dividerColor:p,borderColor:p,listColor:f,headerColor:Ae(f,d),titleTextColor:g,titleTextColorDisabled:m,extraTextColor:C,extraTextColorDisabled:m,itemTextColor:k,itemTextColorDisabled:m,itemColorPending:S,titleFontWeight:a,closeColorHover:T,closeColorPressed:z,closeIconColor:$,closeIconColorHover:A,closeIconColorPressed:t})},rr=ke({name:"Transfer",common:Fe,peers:{Checkbox:we,Scrollbar:Oe,Input:Le,Empty:Pe,Button:Ve},self:er});var tr=rr;const N=Ie("n-transfer");var J=w({name:"TransferHeader",props:{size:{type:String,required:!0},source:Boolean,onCheckedAll:Function,onClearAll:Function,title:String},setup(e){const{targetOptionsRef:a,canNotSelectAnythingRef:i,canBeClearedRef:o,allCheckedRef:c,mergedThemeRef:s,disabledRef:u,mergedClsPrefixRef:r,srcOptionsLengthRef:f}=D(N),{localeRef:d}=Be("Transfer");return()=>{const{source:g,onClearAll:m,onCheckedAll:k}=e,{value:C}=s,{value:p}=r,{value:S}=d,T=e.size==="large"?"small":"tiny",{title:z}=e;return l("div",{class:`${p}-transfer-list-header`},z&&l("div",{class:`${p}-transfer-list-header__title`},z),g&&l(K,{class:`${p}-transfer-list-header__button`,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,size:T,tertiary:!0,onClick:c.value?m:k,disabled:i.value||u.value},{default:()=>c.value?S.unselectAll:S.selectAll}),!g&&o.value&&l(K,{class:`${p}-transfer-list-header__button`,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,size:T,tertiary:!0,onClick:m,disabled:u.value},{default:()=>S.clearAll}),l("div",{class:`${p}-transfer-list-header__extra`},g?S.total(f.value):S.selected(a.value.length)))}}}),Q=w({name:"NTransferListItem",props:{source:Boolean,label:{type:String,required:!0},value:{type:[String,Number],required:!0},disabled:Boolean,option:{type:Object,required:!0}},setup(e){const{targetValueSetRef:a,mergedClsPrefixRef:i,mergedThemeRef:o,handleItemCheck:c,renderSourceLabelRef:s,renderTargetLabelRef:u,showSelectedRef:r}=D(N),f=Ne(()=>a.value.has(e.value));function d(){e.disabled||c(!f.value,e.value)}return{mergedClsPrefix:i,mergedTheme:o,checked:f,showSelected:r,renderSourceLabel:s,renderTargetLabel:u,handleClick:d}},render(){const{disabled:e,mergedTheme:a,mergedClsPrefix:i,label:o,checked:c,source:s,renderSourceLabel:u,renderTargetLabel:r}=this;return l("div",{class:[`${i}-transfer-list-item`,e&&`${i}-transfer-list-item--disabled`,s?`${i}-transfer-list-item--source`:`${i}-transfer-list-item--target`],onClick:s?this.handleClick:void 0},l("div",{class:`${i}-transfer-list-item__background`}),s&&this.showSelected&&l("div",{class:`${i}-transfer-list-item__checkbox`},l(De,{theme:a.peers.Checkbox,themeOverrides:a.peerOverrides.Checkbox,disabled:e,checked:c})),l("div",{class:`${i}-transfer-list-item__label`,title:_e(o)},s?u?u({option:this.option}):o:r?r({option:this.option}):o),!s&&!e&&l(Ue,{focusable:!1,class:`${i}-transfer-list-item__close`,clsPrefix:i,onClick:this.handleClick}))}}),X=w({name:"TransferList",props:{virtualScroll:{type:Boolean,required:!0},itemSize:{type:Number,required:!0},options:{type:Array,required:!0},disabled:{type:Boolean,required:!0},source:Boolean},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:a}=D(N),i=V(null),o=V(null);function c(){var r;(r=i.value)===null||r===void 0||r.sync()}function s(){const{value:r}=o;if(!r)return null;const{listElRef:f}=r;return f}function u(){const{value:r}=o;if(!r)return null;const{itemsElRef:f}=r;return f}return{mergedTheme:e,mergedClsPrefix:a,scrollerInstRef:i,vlInstRef:o,syncVLScroller:c,scrollContainer:s,scrollContent:u}},render(){const{mergedTheme:e,options:a}=this;if(a.length===0)return l(He,{theme:e.peers.Empty,themeOverrides:e.peerOverrides.Empty});const{mergedClsPrefix:i,virtualScroll:o,source:c,disabled:s,syncVLScroller:u}=this;return l(q,{ref:"scrollerInstRef",theme:e.peers.Scrollbar,themeOverrides:e.peerOverrides.Scrollbar,container:o?this.scrollContainer:void 0,content:o?this.scrollContent:void 0},{default:()=>o?l(Ee,{ref:"vlInstRef",style:{height:"100%"},class:`${i}-transfer-list-content`,items:this.options,itemSize:this.itemSize,showScrollbar:!1,onResize:u,onScroll:u,keyField:"value"},{default:({item:r})=>{const{source:f,disabled:d}=this;return l(Q,{source:f,key:r.value,value:r.value,disabled:r.disabled||d,label:r.label,option:r})}}):l("div",{class:`${i}-transfer-list-content`},a.map(r=>l(Q,{source:c,key:r.value,value:r.value,disabled:r.disabled||s,label:r.label,option:r})))})}}),Y=w({name:"TransferFilter",props:{value:String,placeholder:String,disabled:Boolean,onUpdateValue:{type:Function,required:!0}},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:a}=D(N);return{mergedClsPrefix:a,mergedTheme:e}},render(){const{mergedTheme:e,mergedClsPrefix:a}=this;return l("div",{class:`${a}-transfer-filter`},l(Me,{value:this.value,onUpdateValue:this.onUpdateValue,disabled:this.disabled,placeholder:this.placeholder,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,clearable:!0,size:"small"},{"clear-icon-placeholder":()=>l(qe,{clsPrefix:a},{default:()=>l(Ze,null)})}))}});function lr(e){const a=V(e.defaultValue),i=je(_(e,"value"),a),o=h(()=>{const t=new Map;return(e.options||[]).forEach(n=>t.set(n.value,n)),t}),c=h(()=>new Set(i.value||[])),s=h(()=>{const t=o.value,n=[];return(i.value||[]).forEach(I=>{const y=t.get(I);y&&n.push(y)}),n}),u=V(""),r=V(""),f=h(()=>e.sourceFilterable||!!e.filterable),d=h(()=>{const{showSelected:t,options:n,filter:I}=e;return f.value?n.filter(y=>I(u.value,y,"source")&&(t||!c.value.has(y.value))):t?n:n.filter(y=>!c.value.has(y.value))}),g=h(()=>{if(!e.targetFilterable)return s.value;const{filter:t}=e;return s.value.filter(n=>t(r.value,n,"target"))}),m=h(()=>{const{value:t}=i;return t===null?new Set:new Set(t)}),k=h(()=>{const t=new Set(m.value);return d.value.forEach(n=>{!n.disabled&&!t.has(n.value)&&t.add(n.value)}),t}),C=h(()=>{const t=new Set(m.value);return d.value.forEach(n=>{!n.disabled&&t.has(n.value)&&t.delete(n.value)}),t}),p=h(()=>{const t=new Set(m.value);return g.value.forEach(n=>{n.disabled||t.delete(n.value)}),t}),S=h(()=>d.value.every(t=>t.disabled)),T=h(()=>{if(!d.value.length)return!1;const t=m.value;return d.value.every(n=>n.disabled||t.has(n.value))}),z=h(()=>g.value.some(t=>!t.disabled));function $(t){u.value=t!=null?t:""}function A(t){r.value=t!=null?t:""}return{uncontrolledValueRef:a,mergedValueRef:i,targetValueSetRef:c,valueSetForCheckAllRef:k,valueSetForUncheckAllRef:C,valueSetForClearRef:p,filteredTgtOptionsRef:g,filteredSrcOptionsRef:d,targetOptionsRef:s,canNotSelectAnythingRef:S,canBeClearedRef:z,allCheckedRef:T,srcPatternRef:u,tgtPatternRef:r,mergedSrcFilterableRef:f,handleSrcFilterUpdateValue:$,handleTgtFilterUpdateValue:A}}var ar=x("transfer",`
 width: 100%;
 font-size: var(--n-font-size);
 height: 300px;
 display: flex;
 flex-wrap: nowrap;
 word-break: break-word;
`,[B("disabled",[x("transfer-list",[x("transfer-list-header",[v("title",`
 color: var(--n-header-text-color-disabled);
 `),v("extra",`
 color: var(--n-header-extra-text-color-disabled);
 `)])])]),x("transfer-list",`
 flex: 1;
 min-width: 0;
 height: inherit;
 display: flex;
 flex-direction: column;
 background-clip: padding-box;
 position: relative;
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-list-color);
 `,[B("source",`
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[v("border","border-right: 1px solid var(--n-divider-color);")]),B("target",`
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[v("border","border-left: none;")]),v("border",`
 padding: 0 12px;
 border: 1px solid var(--n-border-color);
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),x("transfer-list-header",`
 min-height: var(--n-header-height);
 box-sizing: border-box;
 display: flex;
 padding: 12px 12px 10px 12px;
 align-items: center;
 background-clip: padding-box;
 border-radius: inherit;
 border-bottom-left-radius: 0;
 border-bottom-right-radius: 0;
 line-height: 1.5;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[W("> *:not(:first-child)",`
 margin-left: 8px;
 `),v("title",`
 flex: 1;
 min-width: 0;
 line-height: 1.5;
 font-size: var(--n-header-font-size);
 font-weight: var(--n-header-font-weight);
 transition: color .3s var(--n-bezier);
 color: var(--n-header-text-color);
 `),v("button",`
 position: relative;
 `),v("extra",`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-extra-font-size);
 margin-right: 0;
 white-space: nowrap;
 color: var(--n-header-extra-text-color);
 `)]),x("transfer-list-body",`
 flex-basis: 0;
 flex-grow: 1;
 box-sizing: border-box;
 position: relative;
 display: flex;
 flex-direction: column;
 border-radius: inherit;
 border-top-left-radius: 0;
 border-top-right-radius: 0;
 `,[x("transfer-filter",`
 padding: 4px 12px 8px 12px;
 box-sizing: border-box;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),x("transfer-list-flex-container",`
 flex: 1;
 position: relative;
 `,[x("scrollbar",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 height: unset;
 `),x("empty",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 `),x("transfer-list-content",`
 padding: 0;
 margin: 0;
 position: relative;
 `,[x("transfer-list-item",`
 padding: 0 12px;
 min-height: var(--n-item-height);
 display: flex;
 align-items: center;
 color: var(--n-item-text-color);
 position: relative;
 transition: color .3s var(--n-bezier);
 `,[v("background",`
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),v("checkbox",`
 position: relative;
 margin-right: 8px;
 `),v("close",`
 opacity: 0;
 pointer-events: none;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),v("label",`
 position: relative;
 min-width: 0;
 flex-grow: 1;
 `),B("source","cursor: pointer;"),B("disabled",`
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `),Ke("disabled",[W("&:hover",[v("background","background-color: var(--n-item-color-pending);"),v("close",`
 opacity: 1;
 pointer-events: all;
 `)])])])])])])])]);const ir=Object.assign(Object.assign({},Z.props),{value:Array,defaultValue:{type:Array,default:null},options:{type:Array,default:()=>[]},disabled:{type:Boolean,default:void 0},virtualScroll:Boolean,sourceTitle:String,targetTitle:String,filterable:{type:Boolean,default:void 0},sourceFilterable:Boolean,targetFilterable:Boolean,showSelected:{type:Boolean,default:!0},sourceFilterPlaceholder:String,targetFilterPlaceholder:String,filter:{type:Function,default:(e,a)=>e?~(""+a.label).toLowerCase().indexOf((""+e).toLowerCase()):!0},size:String,renderSourceLabel:Function,renderTargetLabel:Function,renderSourceList:Function,renderTargetList:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]});var or=w({name:"Transfer",props:ir,setup(e){const{mergedClsPrefixRef:a}=We(e),i=Z("Transfer","-transfer",ar,tr,e,a),o=Ge(e),{mergedSizeRef:c,mergedDisabledRef:s}=o,u=h(()=>{const{value:b}=c,{self:{[P("itemHeight",b)]:R}}=i.value;return Je(R)}),{uncontrolledValueRef:r,mergedValueRef:f,targetValueSetRef:d,valueSetForCheckAllRef:g,valueSetForUncheckAllRef:m,valueSetForClearRef:k,filteredTgtOptionsRef:C,filteredSrcOptionsRef:p,targetOptionsRef:S,canNotSelectAnythingRef:T,canBeClearedRef:z,allCheckedRef:$,srcPatternRef:A,tgtPatternRef:t,mergedSrcFilterableRef:n,handleSrcFilterUpdateValue:I,handleTgtFilterUpdateValue:y}=lr(e);function O(b){const{onUpdateValue:R,"onUpdate:value":L,onChange:U}=e,{nTriggerFormInput:H,nTriggerFormChange:E}=o;R&&M(R,b),L&&M(L,b),U&&M(U,b),r.value=b,H(),E()}function te(){O([...g.value])}function le(){O([...m.value])}function ae(){O([...k.value])}function j(b,R){O(b?(f.value||[]).concat(R):(f.value||[]).filter(L=>L!==R))}function ie(b){O(b)}return Qe(N,{targetValueSetRef:d,mergedClsPrefixRef:a,disabledRef:s,mergedThemeRef:i,targetOptionsRef:S,canNotSelectAnythingRef:T,canBeClearedRef:z,allCheckedRef:$,srcOptionsLengthRef:h(()=>e.options.length),handleItemCheck:j,renderSourceLabelRef:_(e,"renderSourceLabel"),renderTargetLabelRef:_(e,"renderTargetLabel"),showSelectedRef:_(e,"showSelected")}),{mergedClsPrefix:a,mergedDisabled:s,itemSize:u,isMounted:Xe(),mergedTheme:i,filteredSrcOpts:p,filteredTgtOpts:C,srcPattern:A,tgtPattern:t,mergedSize:c,mergedSrcFilterable:n,handleSrcFilterUpdateValue:I,handleTgtFilterUpdateValue:y,handleSourceCheckAll:te,handleSourceUncheckAll:le,handleTargetClearAll:ae,handleItemCheck:j,handleChecked:ie,cssVars:h(()=>{const{value:b}=c,{common:{cubicBezierEaseInOut:R},self:{borderRadius:L,borderColor:U,listColor:H,titleTextColor:E,titleTextColorDisabled:oe,extraTextColor:ne,itemTextColor:se,itemColorPending:de,itemTextColorDisabled:ce,titleFontWeight:ue,closeColorHover:fe,closeColorPressed:he,closeIconColor:be,closeIconColorHover:ge,closeIconColorPressed:ve,closeIconSize:me,closeSize:pe,dividerColor:xe,extraTextColorDisabled:Se,[P("extraFontSize",b)]:Ce,[P("fontSize",b)]:ye,[P("titleFontSize",b)]:Re,[P("itemHeight",b)]:Te,[P("headerHeight",b)]:ze}}=i.value;return{"--n-bezier":R,"--n-border-color":U,"--n-border-radius":L,"--n-extra-font-size":Ce,"--n-font-size":ye,"--n-header-font-size":Re,"--n-header-extra-text-color":ne,"--n-header-extra-text-color-disabled":Se,"--n-header-font-weight":ue,"--n-header-text-color":E,"--n-header-text-color-disabled":oe,"--n-item-color-pending":de,"--n-item-height":Te,"--n-item-text-color":se,"--n-item-text-color-disabled":ce,"--n-list-color":H,"--n-header-height":ze,"--n-close-size":pe,"--n-close-icon-size":me,"--n-close-color-hover":fe,"--n-close-color-pressed":he,"--n-close-icon-color":be,"--n-close-icon-color-hover":ge,"--n-close-icon-color-pressed":ve,"--n-divider-color":xe}})}},render(){const{mergedClsPrefix:e,renderSourceList:a,renderTargetList:i,mergedTheme:o,mergedSrcFilterable:c,targetFilterable:s}=this;return l("div",{class:[`${e}-transfer`,this.mergedDisabled&&`${e}-transfer--disabled`],style:this.cssVars},l("div",{class:`${e}-transfer-list ${e}-transfer-list--source`},l(J,{source:!0,title:this.sourceTitle,onCheckedAll:this.handleSourceCheckAll,onClearAll:this.handleSourceUncheckAll,size:this.mergedSize}),l("div",{class:`${e}-transfer-list-body`},c?l(Y,{onUpdateValue:this.handleSrcFilterUpdateValue,value:this.srcPattern,disabled:this.mergedDisabled,placeholder:this.sourceFilterPlaceholder}):null,l("div",{class:`${e}-transfer-list-flex-container`},a?l(q,{theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar},{default:()=>a({onCheck:this.handleChecked,checkedOptions:this.filteredTgtOpts,pattern:this.srcPattern})}):l(X,{source:!0,options:this.filteredSrcOpts,disabled:this.mergedDisabled,virtualScroll:this.virtualScroll,itemSize:this.itemSize}))),l("div",{class:`${e}-transfer-list__border`})),l("div",{class:`${e}-transfer-list ${e}-transfer-list--target`},l(J,{onClearAll:this.handleTargetClearAll,size:this.mergedSize,title:this.targetTitle}),l("div",{class:`${e}-transfer-list-body`},s?l(Y,{onUpdateValue:this.handleTgtFilterUpdateValue,value:this.tgtPattern,disabled:this.mergedDisabled,placeholder:this.sourceFilterPlaceholder}):null,l("div",{class:`${e}-transfer-list-flex-container`},i?l(q,{theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar},{default:()=>i({onCheck:this.handleChecked,checkedOptions:this.filteredTgtOpts,pattern:this.tgtPattern})}):l(X,{options:this.filteredTgtOpts,disabled:this.mergedDisabled,virtualScroll:this.virtualScroll,itemSize:this.itemSize}))),l("div",{class:`${e}-transfer-list__border`})))}});const re=e=>e==null?void 0:e.filter(a=>a.attrs.type!==ee.Contextmenu).map(a=>({label:a.attrs.name,value:a.attrs.id,children:re(a.children),type:a.attrs.type}));var sr=w({name:"WidgetContextmenuBinds",props:{graph:{required:!0,type:Object},plugin:{required:!0,type:Object}},setup(e,a){var u;const i=h(()=>re(e.graph.canvas.children)),o=V([...(u=e.graph.selected[0].attrs["contextmenu-binds"])!=null?u:[]]),c=({onCheck:r,pattern:f})=>F(Ye,{checkable:!0,blockLine:!0,checkOnClick:!0,keyField:"value",data:i.value,pattern:f,filter:(d,g)=>g.value==d||g.label.includes(d),showIrrelevantNodes:!1,"render-label":({option:d})=>F("div",{title:`${ee[d.type]}: ${d.label}`,class:"text-left w-full overflow-hidden whitespace-nowrap text-ellipsis"},[d.label]),"render-prefix":({option:d})=>F("i",{class:`iconfont ${G[d.type]}`},null),checkedKeys:o.value,onUpdateCheckedKeys:r},null),s=({option:r})=>F("div",{class:"flex items-center gap-2"},[F("i",{class:`iconfont ${G[r.type]}`},null),r.label]);return a.expose({update:()=>o.value}),()=>F("section",{class:"widget-contextmenu-binds"},[F(or,{value:o.value,"onUpdate:value":r=>o.value=r,options:i.value,"render-source-list":c,"render-target-label":s,"source-filterable":!0},null)])}});export{sr as default};
