import{d as L,h as l,c as ze,a as ke,b as Fe,s as we,i as Oe,e as Le,f as Pe,g as Ae,j as Ve,k as $e,l as D,u as Ie,N as K,m as Be,n as Ne,o as Ue,p as _e,r as $,q as De,V as Ee,t as q,v as He,w as Me,x as qe,y as _,z as h,A as p,B,C as v,D as W,E as je,F as Ke,G as ee,H as We,I as V,J as Ge,K as Je,L as Qe,M,O as Xe,P as O,Q as G,R as J,S as Ye}from"./index.568350f6.js";var Ze=L({name:"Search",render(){return l("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",style:"enable-background: new 0 0 512 512"},l("path",{d:`M443.5,420.2L336.7,312.4c20.9-26.2,33.5-59.4,33.5-95.5c0-84.5-68.5-153-153.1-153S64,132.5,64,217s68.5,153,153.1,153
  c36.6,0,70.1-12.8,96.5-34.2l106.1,107.1c3.2,3.4,7.6,5.1,11.9,5.1c4.1,0,8.2-1.5,11.3-4.5C449.5,437.2,449.7,426.8,443.5,420.2z
   M217.1,337.1c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-84.9c0-32.1,12.5-62.3,35.2-84.9c22.7-22.7,52.9-35.2,85-35.2
  c32.1,0,62.3,12.5,85,35.2c22.7,22.7,35.2,52.9,35.2,84.9c0,32.1-12.5,62.3-35.2,84.9C279.4,324.6,249.2,337.1,217.1,337.1z`}))}});const er=e=>{const{fontWeight:i,fontSizeLarge:a,fontSizeMedium:o,fontSizeSmall:c,heightLarge:s,heightMedium:u,borderRadius:r,cardColor:f,tableHeaderColor:d,textColor1:g,textColorDisabled:m,textColor2:F,textColor3:w,borderColor:y,hoverColor:C,closeColorHover:x,closeColorPressed:S,closeIconColor:z,closeIconColorHover:k,closeIconColorPressed:t}=e;return Object.assign(Object.assign({},Ae),{itemHeightSmall:u,itemHeightMedium:u,itemHeightLarge:s,fontSizeSmall:c,fontSizeMedium:o,fontSizeLarge:a,borderRadius:r,dividerColor:y,borderColor:y,listColor:f,headerColor:Ve(f,d),titleTextColor:g,titleTextColorDisabled:m,extraTextColor:w,extraTextColorDisabled:m,itemTextColor:F,itemTextColorDisabled:m,itemColorPending:C,titleFontWeight:i,closeColorHover:x,closeColorPressed:S,closeIconColor:z,closeIconColorHover:k,closeIconColorPressed:t})},rr=ze({name:"Transfer",common:ke,peers:{Checkbox:Fe,Scrollbar:we,Input:Oe,Empty:Le,Button:Pe},self:er});var tr=rr;const N=$e("n-transfer");var Q=L({name:"TransferHeader",props:{size:{type:String,required:!0},selectAllText:String,clearText:String,source:Boolean,onCheckedAll:Function,onClearAll:Function,title:String},setup(e){const{targetOptionsRef:i,canNotSelectAnythingRef:a,canBeClearedRef:o,allCheckedRef:c,mergedThemeRef:s,disabledRef:u,mergedClsPrefixRef:r,srcOptionsLengthRef:f}=D(N),{localeRef:d}=Ie("Transfer");return()=>{const{source:g,onClearAll:m,onCheckedAll:F,selectAllText:w,clearText:y}=e,{value:C}=s,{value:x}=r,{value:S}=d,z=e.size==="large"?"small":"tiny",{title:k}=e;return l("div",{class:`${x}-transfer-list-header`},k&&l("div",{class:`${x}-transfer-list-header__title`},k),g&&l(K,{class:`${x}-transfer-list-header__button`,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,size:z,tertiary:!0,onClick:c.value?m:F,disabled:a.value||u.value},{default:()=>c.value?y||S.unselectAll:w||S.selectAll}),!g&&o.value&&l(K,{class:`${x}-transfer-list-header__button`,theme:C.peers.Button,themeOverrides:C.peerOverrides.Button,size:z,tertiary:!0,onClick:m,disabled:u.value},{default:()=>S.clearAll}),l("div",{class:`${x}-transfer-list-header__extra`},g?S.total(f.value):S.selected(i.value.length)))}}}),X=L({name:"NTransferListItem",props:{source:Boolean,label:{type:String,required:!0},value:{type:[String,Number],required:!0},disabled:Boolean,option:{type:Object,required:!0}},setup(e){const{targetValueSetRef:i,mergedClsPrefixRef:a,mergedThemeRef:o,handleItemCheck:c,renderSourceLabelRef:s,renderTargetLabelRef:u,showSelectedRef:r}=D(N),f=Be(()=>i.value.has(e.value));function d(){e.disabled||c(!f.value,e.value)}return{mergedClsPrefix:a,mergedTheme:o,checked:f,showSelected:r,renderSourceLabel:s,renderTargetLabel:u,handleClick:d}},render(){const{disabled:e,mergedTheme:i,mergedClsPrefix:a,label:o,checked:c,source:s,renderSourceLabel:u,renderTargetLabel:r}=this;return l("div",{class:[`${a}-transfer-list-item`,e&&`${a}-transfer-list-item--disabled`,s?`${a}-transfer-list-item--source`:`${a}-transfer-list-item--target`],onClick:s?this.handleClick:void 0},l("div",{class:`${a}-transfer-list-item__background`}),s&&this.showSelected&&l("div",{class:`${a}-transfer-list-item__checkbox`},l(_e,{theme:i.peers.Checkbox,themeOverrides:i.peerOverrides.Checkbox,disabled:e,checked:c})),l("div",{class:`${a}-transfer-list-item__label`,title:Ue(o)},s?u?u({option:this.option}):o:r?r({option:this.option}):o),!s&&!e&&l(Ne,{focusable:!1,class:`${a}-transfer-list-item__close`,clsPrefix:a,onClick:this.handleClick}))}}),Y=L({name:"TransferList",props:{virtualScroll:{type:Boolean,required:!0},itemSize:{type:Number,required:!0},options:{type:Array,required:!0},disabled:{type:Boolean,required:!0},source:Boolean},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:i}=D(N),a=$(null),o=$(null);function c(){var r;(r=a.value)===null||r===void 0||r.sync()}function s(){const{value:r}=o;if(!r)return null;const{listElRef:f}=r;return f}function u(){const{value:r}=o;if(!r)return null;const{itemsElRef:f}=r;return f}return{mergedTheme:e,mergedClsPrefix:i,scrollerInstRef:a,vlInstRef:o,syncVLScroller:c,scrollContainer:s,scrollContent:u}},render(){const{mergedTheme:e,options:i}=this;if(i.length===0)return l(De,{theme:e.peers.Empty,themeOverrides:e.peerOverrides.Empty});const{mergedClsPrefix:a,virtualScroll:o,source:c,disabled:s,syncVLScroller:u}=this;return l(q,{ref:"scrollerInstRef",theme:e.peers.Scrollbar,themeOverrides:e.peerOverrides.Scrollbar,container:o?this.scrollContainer:void 0,content:o?this.scrollContent:void 0},{default:()=>o?l(Ee,{ref:"vlInstRef",style:{height:"100%"},class:`${a}-transfer-list-content`,items:this.options,itemSize:this.itemSize,showScrollbar:!1,onResize:u,onScroll:u,keyField:"value"},{default:({item:r})=>{const{source:f,disabled:d}=this;return l(X,{source:f,key:r.value,value:r.value,disabled:r.disabled||d,label:r.label,option:r})}}):l("div",{class:`${a}-transfer-list-content`},i.map(r=>l(X,{source:c,key:r.value,value:r.value,disabled:r.disabled||s,label:r.label,option:r})))})}}),Z=L({name:"TransferFilter",props:{value:String,placeholder:String,disabled:Boolean,onUpdateValue:{type:Function,required:!0}},setup(){const{mergedThemeRef:e,mergedClsPrefixRef:i}=D(N);return{mergedClsPrefix:i,mergedTheme:e}},render(){const{mergedTheme:e,mergedClsPrefix:i}=this;return l("div",{class:`${i}-transfer-filter`},l(He,{value:this.value,onUpdateValue:this.onUpdateValue,disabled:this.disabled,placeholder:this.placeholder,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,clearable:!0,size:"small"},{"clear-icon-placeholder":()=>l(Me,{clsPrefix:i},{default:()=>l(Ze,null)})}))}});function lr(e){const i=$(e.defaultValue),a=qe(_(e,"value"),i),o=h(()=>{const t=new Map;return(e.options||[]).forEach(n=>t.set(n.value,n)),t}),c=h(()=>new Set(a.value||[])),s=h(()=>{const t=o.value,n=[];return(a.value||[]).forEach(I=>{const T=t.get(I);T&&n.push(T)}),n}),u=$(""),r=$(""),f=h(()=>e.sourceFilterable||!!e.filterable),d=h(()=>{const{showSelected:t,options:n,filter:I}=e;return f.value?n.filter(T=>I(u.value,T,"source")&&(t||!c.value.has(T.value))):t?n:n.filter(T=>!c.value.has(T.value))}),g=h(()=>{if(!e.targetFilterable)return s.value;const{filter:t}=e;return s.value.filter(n=>t(r.value,n,"target"))}),m=h(()=>{const{value:t}=a;return t===null?new Set:new Set(t)}),F=h(()=>{const t=new Set(m.value);return d.value.forEach(n=>{!n.disabled&&!t.has(n.value)&&t.add(n.value)}),t}),w=h(()=>{const t=new Set(m.value);return d.value.forEach(n=>{!n.disabled&&t.has(n.value)&&t.delete(n.value)}),t}),y=h(()=>{const t=new Set(m.value);return g.value.forEach(n=>{n.disabled||t.delete(n.value)}),t}),C=h(()=>d.value.every(t=>t.disabled)),x=h(()=>{if(!d.value.length)return!1;const t=m.value;return d.value.every(n=>n.disabled||t.has(n.value))}),S=h(()=>g.value.some(t=>!t.disabled));function z(t){u.value=t!=null?t:""}function k(t){r.value=t!=null?t:""}return{uncontrolledValueRef:i,mergedValueRef:a,targetValueSetRef:c,valueSetForCheckAllRef:F,valueSetForUncheckAllRef:w,valueSetForClearRef:y,filteredTgtOptionsRef:g,filteredSrcOptionsRef:d,targetOptionsRef:s,canNotSelectAnythingRef:C,canBeClearedRef:S,allCheckedRef:x,srcPatternRef:u,tgtPatternRef:r,mergedSrcFilterableRef:f,handleSrcFilterUpdateValue:z,handleTgtFilterUpdateValue:k}}var ar=p("transfer",`
 width: 100%;
 font-size: var(--n-font-size);
 height: 300px;
 display: flex;
 flex-wrap: nowrap;
 word-break: break-word;
`,[B("disabled",[p("transfer-list",[p("transfer-list-header",[v("title",`
 color: var(--n-header-text-color-disabled);
 `),v("extra",`
 color: var(--n-header-extra-text-color-disabled);
 `)])])]),p("transfer-list",`
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
 `),p("transfer-list-header",`
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
 `)]),p("transfer-list-body",`
 flex-basis: 0;
 flex-grow: 1;
 box-sizing: border-box;
 position: relative;
 display: flex;
 flex-direction: column;
 border-radius: inherit;
 border-top-left-radius: 0;
 border-top-right-radius: 0;
 `,[p("transfer-filter",`
 padding: 4px 12px 8px 12px;
 box-sizing: border-box;
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),p("transfer-list-flex-container",`
 flex: 1;
 position: relative;
 `,[p("scrollbar",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 height: unset;
 `),p("empty",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 `),p("transfer-list-content",`
 padding: 0;
 margin: 0;
 position: relative;
 `,[p("transfer-list-item",`
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
 `),je("disabled",[W("&:hover",[v("background","background-color: var(--n-item-color-pending);"),v("close",`
 opacity: 1;
 pointer-events: all;
 `)])])])])])])])]);const ir=Object.assign(Object.assign({},ee.props),{value:Array,defaultValue:{type:Array,default:null},options:{type:Array,default:()=>[]},disabled:{type:Boolean,default:void 0},virtualScroll:Boolean,sourceTitle:String,selectAllText:String,clearText:String,targetTitle:String,filterable:{type:Boolean,default:void 0},sourceFilterable:Boolean,targetFilterable:Boolean,showSelected:{type:Boolean,default:!0},sourceFilterPlaceholder:String,targetFilterPlaceholder:String,filter:{type:Function,default:(e,i)=>e?~(""+i.label).toLowerCase().indexOf((""+e).toLowerCase()):!0},size:String,renderSourceLabel:Function,renderTargetLabel:Function,renderSourceList:Function,renderTargetList:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onChange:[Function,Array]});var or=L({name:"Transfer",props:ir,setup(e){const{mergedClsPrefixRef:i}=Ke(e),a=ee("Transfer","-transfer",ar,tr,e,i),o=We(e),{mergedSizeRef:c,mergedDisabledRef:s}=o,u=h(()=>{const{value:b}=c,{self:{[V("itemHeight",b)]:R}}=a.value;return Ge(R)}),{uncontrolledValueRef:r,mergedValueRef:f,targetValueSetRef:d,valueSetForCheckAllRef:g,valueSetForUncheckAllRef:m,valueSetForClearRef:F,filteredTgtOptionsRef:w,filteredSrcOptionsRef:y,targetOptionsRef:C,canNotSelectAnythingRef:x,canBeClearedRef:S,allCheckedRef:z,srcPatternRef:k,tgtPatternRef:t,mergedSrcFilterableRef:n,handleSrcFilterUpdateValue:I,handleTgtFilterUpdateValue:T}=lr(e);function P(b){const{onUpdateValue:R,"onUpdate:value":A,onChange:U}=e,{nTriggerFormInput:E,nTriggerFormChange:H}=o;R&&M(R,b),A&&M(A,b),U&&M(U,b),r.value=b,E(),H()}function re(){P([...g.value])}function te(){P([...m.value])}function le(){P([...F.value])}function j(b,R){P(b?(f.value||[]).concat(R):(f.value||[]).filter(A=>A!==R))}function ae(b){P(b)}return Je(N,{targetValueSetRef:d,mergedClsPrefixRef:i,disabledRef:s,mergedThemeRef:a,targetOptionsRef:C,canNotSelectAnythingRef:x,canBeClearedRef:S,allCheckedRef:z,srcOptionsLengthRef:h(()=>e.options.length),handleItemCheck:j,renderSourceLabelRef:_(e,"renderSourceLabel"),renderTargetLabelRef:_(e,"renderTargetLabel"),showSelectedRef:_(e,"showSelected")}),{mergedClsPrefix:i,mergedDisabled:s,itemSize:u,isMounted:Qe(),mergedTheme:a,filteredSrcOpts:y,filteredTgtOpts:w,srcPattern:k,tgtPattern:t,mergedSize:c,mergedSrcFilterable:n,handleSrcFilterUpdateValue:I,handleTgtFilterUpdateValue:T,handleSourceCheckAll:re,handleSourceUncheckAll:te,handleTargetClearAll:le,handleItemCheck:j,handleChecked:ae,cssVars:h(()=>{const{value:b}=c,{common:{cubicBezierEaseInOut:R},self:{borderRadius:A,borderColor:U,listColor:E,titleTextColor:H,titleTextColorDisabled:ie,extraTextColor:oe,itemTextColor:ne,itemColorPending:se,itemTextColorDisabled:de,titleFontWeight:ce,closeColorHover:ue,closeColorPressed:fe,closeIconColor:he,closeIconColorHover:be,closeIconColorPressed:ge,closeIconSize:ve,closeSize:me,dividerColor:pe,extraTextColorDisabled:xe,[V("extraFontSize",b)]:Se,[V("fontSize",b)]:Ce,[V("titleFontSize",b)]:Te,[V("itemHeight",b)]:Re,[V("headerHeight",b)]:ye}}=a.value;return{"--n-bezier":R,"--n-border-color":U,"--n-border-radius":A,"--n-extra-font-size":Se,"--n-font-size":Ce,"--n-header-font-size":Te,"--n-header-extra-text-color":oe,"--n-header-extra-text-color-disabled":xe,"--n-header-font-weight":ce,"--n-header-text-color":H,"--n-header-text-color-disabled":ie,"--n-item-color-pending":se,"--n-item-height":Re,"--n-item-text-color":ne,"--n-item-text-color-disabled":de,"--n-list-color":E,"--n-header-height":ye,"--n-close-size":me,"--n-close-icon-size":ve,"--n-close-color-hover":ue,"--n-close-color-pressed":fe,"--n-close-icon-color":he,"--n-close-icon-color-hover":be,"--n-close-icon-color-pressed":ge,"--n-divider-color":pe}})}},render(){const{mergedClsPrefix:e,renderSourceList:i,renderTargetList:a,mergedTheme:o,mergedSrcFilterable:c,targetFilterable:s}=this;return l("div",{class:[`${e}-transfer`,this.mergedDisabled&&`${e}-transfer--disabled`],style:this.cssVars},l("div",{class:`${e}-transfer-list ${e}-transfer-list--source`},l(Q,{source:!0,selectAllText:this.selectAllText,clearText:this.clearText,title:this.sourceTitle,onCheckedAll:this.handleSourceCheckAll,onClearAll:this.handleSourceUncheckAll,size:this.mergedSize}),l("div",{class:`${e}-transfer-list-body`},c?l(Z,{onUpdateValue:this.handleSrcFilterUpdateValue,value:this.srcPattern,disabled:this.mergedDisabled,placeholder:this.sourceFilterPlaceholder}):null,l("div",{class:`${e}-transfer-list-flex-container`},i?l(q,{theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar},{default:()=>i({onCheck:this.handleChecked,checkedOptions:this.filteredTgtOpts,pattern:this.srcPattern})}):l(Y,{source:!0,options:this.filteredSrcOpts,disabled:this.mergedDisabled,virtualScroll:this.virtualScroll,itemSize:this.itemSize}))),l("div",{class:`${e}-transfer-list__border`})),l("div",{class:`${e}-transfer-list ${e}-transfer-list--target`},l(Q,{onClearAll:this.handleTargetClearAll,size:this.mergedSize,title:this.targetTitle}),l("div",{class:`${e}-transfer-list-body`},s?l(Z,{onUpdateValue:this.handleTgtFilterUpdateValue,value:this.tgtPattern,disabled:this.mergedDisabled,placeholder:this.sourceFilterPlaceholder}):null,l("div",{class:`${e}-transfer-list-flex-container`},a?l(q,{theme:o.peers.Scrollbar,themeOverrides:o.peerOverrides.Scrollbar},{default:()=>a({onCheck:this.handleChecked,checkedOptions:this.filteredTgtOpts,pattern:this.tgtPattern})}):l(Y,{options:this.filteredTgtOpts,disabled:this.mergedDisabled,virtualScroll:this.virtualScroll,itemSize:this.itemSize}))),l("div",{class:`${e}-transfer-list__border`})))}});var sr=L({name:"WidgetContextmenuBinds",props:{graph:{required:!0,type:Object},plugin:{required:!0,type:Object}},setup(e,i){var u;const a=h(()=>Xe(e.graph.canvas.children,r=>r.attrs.type!==G.Contextmenu&&!r.attrs["is-draft"])),o=$([...(u=e.graph.selected[0].attrs["contextmenu-binds"])!=null?u:[]]),c=({onCheck:r,pattern:f})=>O(Ye,{checkable:!0,blockLine:!0,checkOnClick:!0,keyField:"value",data:a.value,pattern:f,filter:(d,g)=>g.value==d||g.label.includes(d),showIrrelevantNodes:!1,"render-label":({option:d})=>O("div",{title:`${G[d.type]}: ${d.label}`,class:"text-left w-full overflow-hidden whitespace-nowrap text-ellipsis"},[d.label]),"render-prefix":({option:d})=>O("i",{class:`iconfont ${J[d.type]}`},null),checkedKeys:o.value,onUpdateCheckedKeys:r},null),s=({option:r})=>O("div",{class:"flex items-center gap-2"},[O("i",{class:`iconfont ${J[r.type]}`},null),r.label]);return i.expose({update:()=>o.value}),()=>O("section",{class:"widget-contextmenu-binds"},[O(or,{value:o.value,"onUpdate:value":r=>o.value=r,options:a.value,"render-source-list":c,"render-target-label":s,"source-filterable":!0},null)])}});export{sr as default};
