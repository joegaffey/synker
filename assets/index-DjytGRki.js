var Et=Object.defineProperty;var St=(a,t,e)=>t in a?Et(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var u=(a,t,e)=>(St(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,et=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),nt=new WeakMap;let vt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(et&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}};const Tt=a=>new vt(typeof a=="string"?a:a+"",void 0,st),A=(a,...t)=>{const e=a.length===1?a[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+a[n+1],a[0]);return new vt(e,a,st)},At=(a,t)=>{if(et)a.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=j.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,a.appendChild(s)}},at=et?a=>a:a=>a instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Tt(e)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Dt,defineProperty:Ct,getOwnPropertyDescriptor:Mt,getOwnPropertyNames:Ft,getOwnPropertySymbols:Lt,getPrototypeOf:zt}=Object,k=globalThis,ot=k.trustedTypes,Pt=ot?ot.emptyScript:"",B=k.reactiveElementPolyfillSupport,L=(a,t)=>a,G={toAttribute(a,t){switch(t){case Boolean:a=a?Pt:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,t){let e=a;switch(t){case Boolean:e=a!==null;break;case Number:e=a===null?null:Number(a);break;case Object:case Array:try{e=JSON.parse(a)}catch{e=null}}return e}},bt=(a,t)=>!Dt(a,t),rt={attribute:!0,type:String,converter:G,reflect:!1,useDefault:!1,hasChanged:bt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),k.litPropertyMetadata??(k.litPropertyMetadata=new WeakMap);let D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=rt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ct(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Mt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??rt}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;const t=zt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){const e=this.properties,s=[...Ft(e),...Lt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(at(i))}else t!==void 0&&e.push(at(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return At(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:G).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),r=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:G;this._$Em=i;const d=r.fromAttribute(e,l.type);this[i]=d??((o=this._$Ej)==null?void 0:o.get(i))??d,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){var o;if(t!==void 0){const l=this.constructor;if(i===!1&&(n=this[t]),s??(s=l.getPropertyOptions(t)),!((s.hasChanged??bt)(n,e)||s.useDefault&&s.reflect&&n===((o=this._$Ej)==null?void 0:o.get(t))&&!this.hasAttribute(l._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,r=this[n];l!==!0||this._$AL.has(n)||r===void 0||this.C(n,void 0,o,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[L("elementProperties")]=new Map,D[L("finalized")]=new Map,B==null||B({ReactiveElement:D}),(k.reactiveElementVersions??(k.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,lt=a=>a,R=z.trustedTypes,ct=R?R.createPolicy("lit-html",{createHTML:a=>a}):void 0,xt="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+$,It=`<${wt}>`,T=document,P=()=>T.createComment(""),I=a=>a===null||typeof a!="object"&&typeof a!="function",it=Array.isArray,Ot=a=>it(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,dt=/-->/g,ht=/>/g,_=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,ft=/"/g,$t=/^(?:script|style|textarea|title)$/i,Nt=a=>(t,...e)=>({_$litType$:a,strings:t,values:e}),c=Nt(1),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ut=new WeakMap,E=T.createTreeWalker(T,129);function kt(a,t){if(!it(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ct!==void 0?ct.createHTML(t):t}const Ut=(a,t)=>{const e=a.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=F;for(let l=0;l<e;l++){const r=a[l];let d,f,h=-1,b=0;for(;b<r.length&&(o.lastIndex=b,f=o.exec(r),f!==null);)b=o.lastIndex,o===F?f[1]==="!--"?o=dt:f[1]!==void 0?o=ht:f[2]!==void 0?($t.test(f[2])&&(i=RegExp("</"+f[2],"g")),o=_):f[3]!==void 0&&(o=_):o===_?f[0]===">"?(o=i??F,h=-1):f[1]===void 0?h=-2:(h=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?_:f[3]==='"'?ft:pt):o===ft||o===pt?o=_:o===dt||o===ht?o=F:(o=_,i=void 0);const x=o===_&&a[l+1].startsWith("/>")?" ":"";n+=o===F?r+It:h>=0?(s.push(d),r.slice(0,h)+xt+r.slice(h)+$+x):r+$+(h===-2?l:x)}return[kt(a,n+(a[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class O{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,r=this.parts,[d,f]=Ut(t,e);if(this.el=O.createElement(d,s),E.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=E.nextNode())!==null&&r.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(xt)){const b=f[o++],x=i.getAttribute(h).split($),U=/([.?@])?(.*)/.exec(b);r.push({type:1,index:n,name:U[2],strings:x,ctor:U[1]==="."?Rt:U[1]==="?"?Ht:U[1]==="@"?Bt:H}),i.removeAttribute(h)}else h.startsWith($)&&(r.push({type:6,index:n}),i.removeAttribute(h));if($t.test(i.tagName)){const h=i.textContent.split($),b=h.length-1;if(b>0){i.textContent=R?R.emptyScript:"";for(let x=0;x<b;x++)i.append(h[x],P()),E.nextNode(),r.push({type:2,index:++n});i.append(h[b],P())}}}else if(i.nodeType===8)if(i.data===wt)r.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf($,h+1))!==-1;)r.push({type:7,index:n}),h+=$.length-1}n++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function M(a,t,e=a,s){var o,l;if(t===C)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=I(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(a),i._$AT(a,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=M(a,i._$AS(a,t.values),i,s)),t}class jt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??T).importNode(e,!0);E.currentNode=i;let n=E.nextNode(),o=0,l=0,r=s[0];for(;r!==void 0;){if(o===r.index){let d;r.type===2?d=new N(n,n.nextSibling,this,t):r.type===1?d=new r.ctor(n,r.name,r.strings,this,t):r.type===6&&(d=new Yt(n,this,t)),this._$AV.push(d),r=s[++l]}o!==(r==null?void 0:r.index)&&(n=E.nextNode(),o++)}return E.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),I(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ot(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=O.createElement(kt(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new jt(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new O(t)),e}k(t){it(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new N(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=lt(t).nextSibling;lt(t).remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=M(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const l=t;let r,d;for(t=n[0],r=0;r<n.length-1;r++)d=M(this,l[s+r],e,r),d===C&&(d=this._$AH[r]),o||(o=!I(d)||d!==this._$AH[r]),d===p?t=p:t!==p&&(t+=(d??"")+n[r+1]),this._$AH[r]=d}o&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Rt extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class Ht extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class Bt extends H{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??p)===C)return;const s=this._$AH,i=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==p&&(s===p||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Yt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const V=z.litHtmlPolyfillSupport;V==null||V(O,N),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.3.3");const Vt=(a,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new N(t.insertBefore(P(),n),n,void 0,e??{})}return i._$AI(a),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis;class v extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return C}}var yt;v._$litElement$=!0,v.finalized=!0,(yt=S.litElementHydrateSupport)==null||yt.call(S,{LitElement:v});const q=S.litElementPolyfillSupport;q==null||q({LitElement:v});(S.litElementVersions??(S.litElementVersions=[])).push("4.2.2");const gt=a=>String(a).padStart(2,"0"),g=a=>`${a.getFullYear()}-${gt(a.getMonth()+1)}-${gt(a.getDate())}`,m=(a,t)=>{const e=new Date;return e.setDate(e.getDate()+a),e},qt=[{id:"@default",title:"Default List"},{id:"groceries",title:"Groceries 🛒"},{id:"family",title:"Family Plans"}],mt=[{id:"ev1",calendarId:"primary",title:"Family Dinner 🍕",description:"",start:`${g(m(0))}T18:30:00`,end:`${g(m(0))}T20:00:00`,allDay:!1,location:"Grandma's house",color:null,attendees:[]},{id:"ev2",calendarId:"primary",title:"School Sports Day 🏃",description:"Bring sunscreen and water",start:g(m(2)),end:g(m(2)),allDay:!0,location:"City park",color:null,attendees:[]},{id:"ev3",calendarId:"family",title:"Dentist Appointment 🦷",description:"",start:`${g(m(-1))}T09:00:00`,end:`${g(m(-1))}T09:45:00`,allDay:!1,location:"Smile Dental",color:null,attendees:[]},{id:"ev4",calendarId:"primary",title:"Weekend Road Trip 🚗",description:"Pack the camping gear",start:g(m(4)),end:g(m(6)),allDay:!0,location:"Lakeview",color:null,attendees:[]}],Wt=[{id:"t1",listId:"@default",listTitle:"Default List",title:"Buy milk 🥛",notes:"Two litres",due:`${g(m(0))}T00:00:00`,completed:!1,completedAt:null,position:"00000000000000000001",parent:null},{id:"t2",listId:"groceries",listTitle:"Groceries 🛒",title:"Vegetables for the week",notes:"Tomatoes, lettuce, carrots",due:`${g(m(1))}T00:00:00`,completed:!1,completedAt:null,position:"00000000000000000002",parent:null},{id:"t3",listId:"family",listTitle:"Family Plans",title:"Book cinema tickets 🎬",notes:"Check times first",due:null,completed:!1,completedAt:null,position:"00000000000000000003",parent:null},{id:"t4",listId:"groceries",listTitle:"Groceries 🛒",title:"Pick up dry cleaning",notes:"",due:`${g(m(-1))}T00:00:00`,completed:!0,completedAt:`${g(m(-1))}T10:00:00`,position:"00000000000000000004",parent:null}],W=new Date().toISOString(),Gt=a=>new Promise(t=>setTimeout(t,a));function w(a,t=200){return new Response(JSON.stringify(a),{status:t,headers:{"Content-Type":"application/json"}})}function Jt(a){const t=a.split("?")[1];return t?Object.fromEntries(new URLSearchParams(t)):{}}async function Kt(a,t={}){const e=a.split("?")[0],s=(t.method||"GET").toUpperCase();if(await Gt(150),s!=="GET"&&e!=="/sync")return w({error:"Read-only demo"},405);if(e==="/status")return w({authenticated:!0,lastSync:W,syncInterval:5});if(e==="/calendar/events")return w({events:mt,lastSync:W});const i=e.match(/^\/calendar\/events\/month\/(\d+)\/(\d+)$/);if(i){const n=parseInt(i[1],10),o=parseInt(i[2],10),l=mt.filter(r=>{const d=new Date(r.start.includes("T")?r.start:`${r.start}T00:00:00`);return d.getFullYear()===n&&d.getMonth()===o});return w({events:l})}if(e==="/tasks/lists")return w({lists:qt});if(e==="/tasks"){const{listId:n,completed:o}=Jt(a);let l=Wt;if(n&&(l=l.filter(r=>r.listId===n)),o!==void 0){const r=o==="true";l=l.filter(d=>d.completed===r)}return w({tasks:l,lastSync:W})}return e==="/sync"?w({success:!0,lastSync:new Date().toISOString()}):w({error:"Not found"},404)}function y(a,t){return Kt(a,t)}class _t extends v{render(){return c`
      <div class="logo">📅</div>
      <h1>Synker</h1>
      <p>Your family's calendar & tasks<br>all in one cheerful place! ✨</p>
      <a class="login-btn" href="/api/auth/login">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
        </svg>
        Connect Google
      </a>
      <div class="features">
        <div class="feature">
          <span class="feature-icon">📆</span>
          <span class="feature-label">Calendar</span>
        </div>
        <div class="feature">
          <span class="feature-icon">✅</span>
          <span class="feature-label">Tasks</span>
        </div>
        <div class="feature">
          <span class="feature-icon">👨‍👩‍👧‍👦</span>
          <span class="feature-label">Family</span>
        </div>
        <div class="feature">
          <span class="feature-icon">🔄</span>
          <span class="feature-label">Auto-Sync</span>
        </div>
      </div>
    `}}u(_t,"styles",A`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 32px;
      position: relative;
      z-index: 1;
    }

    .logo {
      font-size: 72px;
      margin-bottom: 16px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    h1 {
      font-family: 'Fredoka', sans-serif;
      font-size: 48px;
      font-weight: 700;
      color: #4a3f6b;
      margin-bottom: 8px;
      text-shadow: 2px 2px 0 rgba(108, 99, 255, 0.2);
    }

    p {
      font-family: 'Fredoka', sans-serif;
      font-size: 18px;
      color: #7c6fa0;
      margin-bottom: 48px;
      text-align: center;
    }

    .login-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 18px 36px;
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(108, 99, 255, 0.4);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-decoration: none;
    }

    .login-btn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 40px rgba(108, 99, 255, 0.5);
    }

    .login-btn:active {
      transform: translateY(0) scale(0.98);
    }

    .login-btn svg {
      width: 24px;
      height: 24px;
    }

    .features {
      margin-top: 48px;
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .feature-icon {
      font-size: 32px;
    }

    .feature-label {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #7c6fa0;
      font-weight: 500;
    }
  `);customElements.define("synker-login",_t);class J extends v{constructor(){super(),this.events=[],this.loading=!0;const t=new Date,e=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;this.selectedDate=e,this.viewYear=t.getFullYear(),this.viewMonth=t.getMonth(),this.showCreateForm=!1,this.newEventTitle="",this.newEventLocation="",this.newEventDate=e,this.newEventStartTime="09:00",this.newEventEndTime="10:00",this.newEventAllDay=!1,this.newEventCalendar="primary",this.creating=!1,this.deletingId=null,this.confirmDeleteId=null,this.editingEvent=null,this.calendars=[],this._allEvents=[],this._fetchEvents()}async _fetchEvents(t=!1){t||(this.loading=!0);try{const s=await(await y("/calendar/events")).json();this.events=s.events||[],this._allEvents=s.events||[];const i=new Map;for(const n of this.events)i.has(n.calendarId)||i.set(n.calendarId,n.calendarId);this.calendars=Array.from(i.keys()),this.calendars.length>0&&!this.calendars.includes(this.newEventCalendar)&&(this.newEventCalendar=this.calendars[0])}catch(e){console.error("Failed to fetch events:",e)}finally{t||(this.loading=!1)}}refresh(){this._fetchEvents(!0)}_getMonthDates(){const t=new Date,e=this.viewYear,s=this.viewMonth,i=new Date(e,s+1,0).getDate(),n=[];for(let o=1;o<=i;o++){const l=new Date(e,s,o),r=`${e}-${String(s+1).padStart(2,"0")}-${String(o).padStart(2,"0")}`;n.push({date:r,day:l.toLocaleDateString("en",{weekday:"short"}),num:o,isToday:l.toDateString()===t.toDateString()})}return n}_getLocalDate(t){if(!t)return"";if(!t.includes("T"))return t;const e=new Date(t);return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_getDatesWithEvents(){const t=new Set;for(const e of this.events){const s=this._getLocalDate(e.start);s&&t.add(s)}return t}_getSelectedDayEvents(){return this.events.filter(t=>this._getLocalDate(t.start)===this.selectedDate)}_getUpcomingEvents(){const t=new Date,e=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;return this.events.filter(s=>this._getLocalDate(s.start)>=e).sort((s,i)=>(s.start||"").localeCompare(i.start||"")).slice(0,10)}_formatTime(t){if(!t||!t.includes("T"))return{hour:"☀️",period:"All Day"};const e=new Date(t),s=e.getHours(),i=e.getMinutes().toString().padStart(2,"0"),n=s>=12?"PM":"AM";return{hour:`${s%12||12}:${i}`,period:n}}_formatDateLabel(t){const e=new Date(t+"T00:00:00"),s=new Date,i=new Date(s);return i.setDate(s.getDate()+1),e.toDateString()===s.toDateString()?"Today":e.toDateString()===i.toDateString()?"Tomorrow":e.toLocaleDateString("en",{weekday:"short",month:"short",day:"numeric"})}_selectDate(t){this.selectedDate=t,this.newEventDate=t}_prevMonth(){this.viewMonth===0?(this.viewMonth=11,this.viewYear--):this.viewMonth--,this._scrolled=!1,this._fetchMonthEvents()}_nextMonth(){this.viewMonth===11?(this.viewMonth=0,this.viewYear++):this.viewMonth++,this._scrolled=!1,this._fetchMonthEvents()}async _fetchMonthEvents(){const t=new Date;if(this.viewYear===t.getFullYear()&&this.viewMonth===t.getMonth()){this._fetchEvents();return}this.loading=!0;try{const s=await(await y(`/calendar/events/month/${this.viewYear}/${this.viewMonth}`)).json();this.events=s.events||[]}catch(e){console.error("Failed to fetch month events:",e),this.events=this._filterEventsByMonth(this._allEvents,this.viewYear,this.viewMonth)}finally{this.loading=!1}}_filterEventsByMonth(t,e,s){return(t||[]).filter(i=>{const n=this._getLocalDate(i.start);if(!n)return!1;const[o,l]=n.split("-").map(Number);return o===e&&l===s+1})}_calendarLabel(t){return t==="primary"?"Primary":t.startsWith("family")?"Family":t.split("@")[0].slice(0,12)+"..."}_startEdit(t){this.editingEvent=t,this.newEventTitle=t.title,this.newEventLocation=t.location||"",this.newEventCalendar=t.calendarId||"primary",this.newEventDate=this._getLocalDate(t.start),this.newEventAllDay=t.allDay;const e=t.start,s=t.end;if(e&&e.includes("T")){const i=new Date(e);this.newEventStartTime=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`}if(s&&s.includes("T")){const i=new Date(s);this.newEventEndTime=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`}this.showCreateForm=!0}_closeForm(){this.showCreateForm=!1,this.editingEvent=null}async _handleSubmit(t){if(t.preventDefault(),!!this.newEventTitle.trim()){this.creating=!0;try{const e={title:this.newEventTitle.trim(),calendarId:this.newEventCalendar,allDay:this.newEventAllDay};this.newEventLocation.trim()&&(e.location=this.newEventLocation.trim()),this.newEventAllDay?(e.start=this.newEventDate,e.end=this.newEventDate):(e.start=`${this.newEventDate}T${this.newEventStartTime}:00`,e.end=`${this.newEventDate}T${this.newEventEndTime}:00`);const s=!!this.editingEvent,i=s?`/calendar/events/${encodeURIComponent(this.editingEvent.id)}`:"/calendar/events";(await y(i,{method:s?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok&&(this.newEventTitle="",this.newEventLocation="",this.newEventAllDay=!1,this.showCreateForm=!1,this.editingEvent=null,await this._fetchEvents())}catch(e){console.error("Failed to save event:",e)}finally{this.creating=!1}}}async _handleDelete(t){this.deletingId=t.id;try{(await y(`/calendar/events/${encodeURIComponent(t.id)}`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({calendarId:t.calendarId})})).ok&&(this.confirmDeleteId=null,await this._fetchEvents())}catch(e){console.error("Failed to delete event:",e)}finally{this.deletingId=null}}updated(){const t=this.shadowRoot.querySelector(".date-chip.today");t&&!this._scrolled&&(t.scrollIntoView({inline:"center",behavior:"smooth"}),this._scrolled=!0)}render(){const t=this._getMonthDates(),e=this._getDatesWithEvents(),s=this._getSelectedDayEvents(),i=this._getUpcomingEvents(),n=new Date(this.viewYear,this.viewMonth).toLocaleDateString("en",{month:"long",year:"numeric"});return c`
      <div class="month-nav">
        <button class="month-nav-btn" @click=${this._prevMonth} aria-label="Previous month">‹</button>
        <span class="month-label">${n}</span>
        <button class="month-nav-btn" @click=${this._nextMonth} aria-label="Next month">›</button>
      </div>

      <div class="date-strip" role="listbox" aria-label="Date selection">
        ${t.map(o=>c`
          <button
            class="date-chip ${o.date===this.selectedDate?"active":""} ${o.isToday?"today":""} ${e.has(o.date)?"has-events":""}"
            @click=${()=>this._selectDate(o.date)}
            role="option"
            aria-selected=${o.date===this.selectedDate}
            aria-label="${o.day} ${o.num}"
          >
            <span class="date-day">${o.day}</span>
            <span class="date-num">${o.num}</span>
          </button>
        `)}
      </div>

      ${this.showCreateForm?this._renderCreateForm():this.online?c`
        <button class="add-btn" @click=${()=>{this.showCreateForm=!0}}>
          <span>📅</span> New Event
        </button>
      `:""}

      ${this.loading?c`
        <div class="loading">
          <div class="loading-dots"><span></span><span></span><span></span></div>
        </div>
      `:c`
        ${s.length>0?c`
          <div class="section-title">📌 ${this._formatDateLabel(this.selectedDate)}</div>
          <div class="events-list" role="list" aria-label="Events for selected date">
            ${s.map((o,l)=>this._renderEventCard(o,l,!1))}
          </div>
        `:""}

        <div class="section-title">🗓️ Upcoming</div>
        ${i.length===0?c`
          <div class="empty-state">
            <div class="empty-icon">🌴</div>
            <div class="empty-text">Nothing planned — enjoy the month!</div>
          </div>
        `:c`
          <div class="events-list" role="list" aria-label="Upcoming events">
            ${i.map((o,l)=>this._renderEventCard(o,l,!0))}
          </div>
        `}
      `}
    `}_renderCreateForm(){const t=this.calendars.length>0?this.calendars:["primary"];return c`
      <form class="create-form" @submit=${this._handleSubmit}>
        <div class="form-field">
          <label for="event-title">What's happening?</label>
          <input
            id="event-title"
            type="text"
            placeholder="e.g. Family dinner 🍕"
            .value=${this.newEventTitle}
            @input=${e=>{this.newEventTitle=e.target.value}}
            autofocus
          >
        </div>

        <div class="form-field">
          <label for="event-location">Where? (optional)</label>
          <input
            id="event-location"
            type="text"
            placeholder="e.g. Grandma's house"
            .value=${this.newEventLocation}
            @input=${e=>{this.newEventLocation=e.target.value}}
          >
        </div>

        <div class="form-field">
          <label for="event-calendar">Calendar</label>
          <select
            id="event-calendar"
            .value=${this.newEventCalendar}
            @change=${e=>{this.newEventCalendar=e.target.value}}
          >
            ${t.map(e=>c`
              <option value=${e}>${this._calendarLabel(e)}</option>
            `)}
          </select>
        </div>

        <div class="form-field">
          <label for="event-date">Date</label>
          <input
            id="event-date"
            type="date"
            .value=${this.newEventDate}
            @input=${e=>{this.newEventDate=e.target.value}}
          >
        </div>

        <label class="form-toggle">
          <input
            type="checkbox"
            .checked=${this.newEventAllDay}
            @change=${e=>{this.newEventAllDay=e.target.checked}}
          >
          All day event
        </label>

        ${this.newEventAllDay?"":c`
          <div class="form-row">
            <div class="form-field">
              <label for="event-start">Start</label>
              <input
                id="event-start"
                type="time"
                .value=${this.newEventStartTime}
                @input=${e=>{this.newEventStartTime=e.target.value}}
              >
            </div>
            <div class="form-field">
              <label for="event-end">End</label>
              <input
                id="event-end"
                type="time"
                .value=${this.newEventEndTime}
                @input=${e=>{this.newEventEndTime=e.target.value}}
              >
            </div>
          </div>
        `}

        <div class="form-actions">
          <button
            type="button"
            class="form-btn cancel"
            @click=${this._closeForm}
          >Cancel</button>
          <button
            type="submit"
            class="form-btn submit"
            ?disabled=${!this.newEventTitle.trim()||this.creating}
          >${this.creating?this.editingEvent?"Saving...":"Creating...":this.editingEvent?"Save Changes 💾":"Add Event 🎉"}</button>
        </div>
      </form>
    `}_renderEventCard(t,e,s){const i=this._formatTime(t.start),n=s?this._formatDateLabel((t.start||"").split("T")[0]):null,o=this.deletingId===t.id,l=this.confirmDeleteId===t.id;return c`
      <div class="event-card ${o?"deleting":""}" role="listitem" style="animation-delay: ${e*.05}s">
        <div class="event-time-badge ${t.allDay?"all-day":""}">
          <span class="event-time-hour">${i.hour}</span>
          <span class="event-time-period">${i.period}</span>
        </div>
        <div class="event-details">
          <div class="event-title">${t.title}</div>
          ${t.location?c`<div class="event-meta">📍 ${t.location}</div>`:""}
          ${n?c`<div class="event-date-label">📅 ${n}</div>`:""}
        </div>
        <div class="event-actions">
          ${this.online?c`
            <button
              class="event-action-btn edit"
              @click=${()=>this._startEdit(t)}
              aria-label="Edit event ${t.title}"
            >✏️</button>
            <button
              class="event-action-btn delete"
              @click=${()=>{this.confirmDeleteId=t.id}}
              aria-label="Delete event ${t.title}"
            >🗑️</button>
          `:""}
        </div>

        ${l?c`
          <div class="confirm-delete">
            <button class="form-btn cancel" @click=${()=>{this.confirmDeleteId=null}}>Keep</button>
            <button class="form-btn delete" @click=${()=>this._handleDelete(t)}>Delete</button>
          </div>
        `:""}
      </div>
    `}}u(J,"properties",{events:{type:Array},loading:{type:Boolean},selectedDate:{type:String},viewYear:{type:Number},viewMonth:{type:Number},showCreateForm:{type:Boolean},newEventTitle:{type:String},newEventLocation:{type:String},newEventDate:{type:String},newEventStartTime:{type:String},newEventEndTime:{type:String},newEventAllDay:{type:Boolean},newEventCalendar:{type:String},creating:{type:Boolean},deletingId:{type:String},confirmDeleteId:{type:String},editingEvent:{type:Object},calendars:{type:Array},online:{type:Boolean}}),u(J,"styles",A`
    :host {
      display: block;
    }

    .month-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 12px;
    }

    .month-nav-btn {
      font-family: 'Fredoka', sans-serif;
      font-size: 24px;
      font-weight: 600;
      color: #6c63ff;
      background: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .month-nav-btn:active {
      transform: scale(0.9);
      background: #f0eeff;
    }

    .month-label {
      font-family: 'Fredoka', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #4a3f6b;
      text-align: center;
    }

    .date-strip {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 4px 0 16px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .date-strip::-webkit-scrollbar {
      display: none;
    }

    .date-chip {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 8px 10px;
      border-radius: 14px;
      background: white;
      border: none;
      cursor: pointer;
      min-width: 48px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
      font-family: 'Fredoka', sans-serif;
      position: relative;
    }

    .date-chip.active {
      background: linear-gradient(135deg, #ff6b9d 0%, #ff8a80 100%);
      color: white;
      transform: scale(1.08);
      box-shadow: 0 4px 16px rgba(255, 107, 157, 0.3);
    }

    .date-chip.today {
      border: 2px solid #ff6b9d;
    }

    .date-chip.has-events::after {
      content: '';
      position: absolute;
      bottom: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #6c63ff;
    }

    .date-chip.active.has-events::after {
      background: white;
    }

    .date-chip:active {
      transform: scale(0.95);
    }

    .date-day {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      opacity: 0.7;
    }

    .date-num {
      font-size: 18px;
      font-weight: 700;
    }

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px;
      margin-bottom: 16px;
      border: 2px dashed #d4c8f0;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.6);
      font-family: 'Fredoka', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #6c63ff;
      cursor: pointer;
      transition: all 0.2s ease;
      gap: 8px;
    }

    .add-btn:active {
      transform: scale(0.98);
      background: rgba(108, 99, 255, 0.05);
    }

    .create-form {
      background: white;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-field {
      margin-bottom: 12px;
    }

    .form-field label {
      display: block;
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #7c6fa0;
      margin-bottom: 4px;
    }

    .form-field input,
    .form-field select {
      width: 100%;
      padding: 12px 14px;
      border: 2px solid #e8e0f5;
      border-radius: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      color: #4a3f6b;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      background: white;
    }

    .form-field input:focus,
    .form-field select:focus {
      border-color: #6c63ff;
    }

    .form-row {
      display: flex;
      gap: 10px;
    }

    .form-row .form-field {
      flex: 1;
    }

    .form-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #7c6fa0;
      cursor: pointer;
    }

    .form-toggle input[type="checkbox"] {
      width: 20px;
      height: 20px;
      accent-color: #6c63ff;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 16px;
    }

    .form-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .form-btn:active {
      transform: scale(0.95);
    }

    .form-btn.cancel {
      background: #f0e6ff;
      color: #7c6fa0;
    }

    .form-btn.submit {
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
    }

    .form-btn.submit:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .section-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #7c6fa0;
      margin: 16px 0 10px;
    }

    .events-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .event-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px;
      background: white;
      border-radius: 18px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease;
      animation: slideUp 0.3s ease forwards;
      opacity: 0;
      position: relative;
    }

    .event-card:active {
      transform: scale(0.98);
    }

    .event-card.deleting {
      opacity: 0.4;
      pointer-events: none;
    }

    .event-time-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 10px;
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      border-radius: 12px;
      color: white;
      min-width: 56px;
    }

    .event-time-badge.all-day {
      background: linear-gradient(135deg, #ffd93d 0%, #ffb347 100%);
    }

    .event-time-hour {
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 700;
    }

    .event-time-period {
      font-family: 'Fredoka', sans-serif;
      font-size: 10px;
      font-weight: 500;
      opacity: 0.8;
    }

    .event-details {
      flex: 1;
    }

    .event-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #4a3f6b;
      margin-bottom: 2px;
    }

    .event-meta {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
    }

    .event-date-label {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
      margin-top: 2px;
    }

    .event-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 6px;
    }

    .event-action-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      transition: all 0.2s ease;
    }

    .event-action-btn.delete {
      background: #fee;
      color: #ff4444;
    }

    .event-action-btn.edit {
      background: #eef;
      color: #6c63ff;
    }

    .event-action-btn:active {
      transform: scale(0.9);
      opacity: 1;
    }

    .confirm-delete {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      animation: fadeIn 0.15s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .confirm-delete .form-btn {
      padding: 8px 16px;
      font-size: 13px;
    }

    .confirm-delete .form-btn.delete {
      background: linear-gradient(135deg, #ff4444 0%, #cc0000 100%);
      color: white;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
      text-align: center;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .empty-text {
      font-family: 'Fredoka', sans-serif;
      font-size: 18px;
      color: #7c6fa0;
      font-weight: 500;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 48px;
    }

    .loading-dots {
      display: flex;
      gap: 8px;
    }

    .loading-dots span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #6c63ff;
      animation: pulse 1.2s ease-in-out infinite;
    }

    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse {
      0%, 100% { transform: scale(0.8); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 1; }
    }
  `);customElements.define("synker-calendar",J);class K extends v{constructor(){super(),this.tasks=[],this.taskLists=[],this.loading=!0,this.selectedList=null,this.showCompleted=!1,this.showCreateForm=!1,this.newTaskTitle="",this.newTaskNotes="",this.newTaskDue="",this.creating=!1,this.editingTask=null,this.togglingIds=new Set,this._fetchData()}async _fetchData(t=!1){t||(this.loading=!0);try{const[e,s]=await Promise.all([y("/tasks/lists"),y("/tasks")]),i=await e.json(),n=await s.json();this.taskLists=i.lists||[],this.tasks=n.tasks||[],!this.selectedList&&this.taskLists.length>0&&(this.selectedList=this.taskLists[0].id)}catch(e){console.error("Failed to fetch tasks:",e)}finally{t||(this.loading=!1)}}refresh(){this._fetchData(!0)}_getFilteredTasks(){return this.selectedList?this.tasks.filter(t=>t.listId===this.selectedList):[]}_formatDue(t){if(!t)return null;const e=new Date(t),s=new Date,i=new Date(s);return i.setDate(s.getDate()+1),e.toDateString()===s.toDateString()?"📌 Today":e.toDateString()===i.toDateString()?"📌 Tomorrow":e<s?"⚠️ Overdue":`📅 ${e.toLocaleDateString("en",{month:"short",day:"numeric"})}`}_toDateInputValue(t){if(!t)return"";const e=new Date(t);return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}_startEdit(t){this.editingTask=t,this.newTaskTitle=t.title,this.newTaskNotes=t.notes||"",this.newTaskDue=this._toDateInputValue(t.due),this.showCreateForm=!0}_closeForm(){this.showCreateForm=!1,this.editingTask=null}async _handleSubmit(t){if(t.preventDefault(),!!this.newTaskTitle.trim()){this.creating=!0;try{const e=this.editingTask?this.editingTask.listId:this.selectedList,s={title:this.newTaskTitle.trim(),listId:e};this.newTaskNotes.trim()&&(s.notes=this.newTaskNotes.trim()),this.newTaskDue&&(s.due=new Date(this.newTaskDue).toISOString());const i=!!this.editingTask,n=i?`/tasks/${encodeURIComponent(this.editingTask.id)}`:"/tasks";(await y(n,{method:i?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).ok&&(this.newTaskTitle="",this.newTaskNotes="",this.newTaskDue="",this.showCreateForm=!1,this.editingTask=null,await this._fetchData())}catch(e){console.error("Failed to save task:",e)}finally{this.creating=!1}}}async _handleToggle(t){const e=new Set(this.togglingIds);e.add(t.id),this.togglingIds=e;try{(await y(`/tasks/${t.id}/toggle`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({listId:t.listId,completed:!t.completed})})).ok&&await this._fetchData()}catch(s){console.error("Failed to toggle task:",s)}finally{const s=new Set(this.togglingIds);s.delete(t.id),this.togglingIds=s}}render(){if(this.loading)return c`
        <div class="loading">
          <div class="loading-dots"><span></span><span></span><span></span></div>
        </div>
      `;const t=this._getFilteredTasks(),e=t.filter(i=>!i.completed),s=t.filter(i=>i.completed);return c`
      <div class="list-tabs" role="tablist" aria-label="Task lists">
        ${this.taskLists.map(i=>c`
          <button
            class="list-tab ${this.selectedList===i.id?"active":""}"
            @click=${()=>{this.selectedList=i.id}}
            role="tab"
            aria-selected=${this.selectedList===i.id}
          >${i.title}</button>
        `)}
      </div>

      ${this.showCreateForm?c`
        <form class="create-form" @submit=${this._handleSubmit}>
          <div class="form-field">
            <label for="task-title">What needs doing?</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Buy milk 🥛"
              .value=${this.newTaskTitle}
              @input=${i=>{this.newTaskTitle=i.target.value}}
              autofocus
            >
          </div>
          <div class="form-field">
            <label for="task-notes">Notes (optional)</label>
            <textarea
              id="task-notes"
              placeholder="Any extra details..."
              .value=${this.newTaskNotes}
              @input=${i=>{this.newTaskNotes=i.target.value}}
            ></textarea>
          </div>
          <div class="form-field">
            <label for="task-due">Due date (optional)</label>
            <input
              id="task-due"
              type="date"
              .value=${this.newTaskDue}
              @input=${i=>{this.newTaskDue=i.target.value}}
            >
          </div>
          <div class="form-actions">
            <button
              type="button"
              class="form-btn cancel"
              @click=${this._closeForm}
            >Cancel</button>
            <button
              type="submit"
              class="form-btn submit"
              ?disabled=${!this.newTaskTitle.trim()||this.creating}
            >${this.creating?this.editingTask?"Saving...":"Adding...":this.editingTask?"Save Changes 💾":"Add Task ✨"}</button>
          </div>
        </form>
      `:this.online?c`
        <button class="add-btn" @click=${()=>{this.showCreateForm=!0}}>
          <span>➕</span> New Task
        </button>
      `:""}
      ${e.length===0&&!this.showCompleted?c`
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <div class="empty-text">All done! You're a star! ⭐</div>
        </div>
      `:c`
        <div class="tasks-list" role="list" aria-label="Tasks">
          ${e.map((i,n)=>this._renderTask(i,n,!1))}
        </div>
      `}

      ${s.length>0?c`
        <button
          class="toggle-completed ${this.showCompleted?"open":""}"
          @click=${()=>{this.showCompleted=!this.showCompleted}}
          aria-expanded=${this.showCompleted}
        >
          <span class="toggle-icon">▶</span>
          ${s.length} completed
        </button>
        ${this.showCompleted?c`
          <div class="tasks-list" role="list" aria-label="Completed tasks">
            ${s.map((i,n)=>this._renderTask(i,n,!0))}
          </div>
        `:""}
      `:""}
    `}_renderTask(t,e,s){const i=this._formatDue(t.due),n=this.togglingIds.has(t.id);return c`
      <div
        class="task-card ${s?"completed":""} ${n?"toggling":""}"
        role="listitem"
        style="animation-delay: ${e*.03}s"
      >
        <div
          class="task-checkbox"
          role="checkbox"
          aria-checked=${s}
          aria-label="Mark ${t.title} as ${s?"incomplete":"complete"}"
          tabindex="0"
          @click=${this.online?()=>this._handleToggle(t):void 0}
          @keydown=${this.online?o=>{(o.key==="Enter"||o.key===" ")&&this._handleToggle(t)}:void 0}
        ></div>
        <div class="task-content">
          <div class="task-title">${t.title}</div>
          <div class="task-meta">
            ${i?c`<span class="task-due">${i}</span>`:""}
          </div>
          ${t.notes?c`<div class="task-notes">${t.notes}</div>`:""}
        </div>
        ${this.online?c`
          <button
            class="task-edit-btn"
            @click=${()=>this._startEdit(t)}
            aria-label="Edit task ${t.title}"
          >✏️</button>
        `:""}
      </div>
    `}}u(K,"properties",{tasks:{type:Array},taskLists:{type:Array},loading:{type:Boolean},selectedList:{type:String},showCompleted:{type:Boolean},showCreateForm:{type:Boolean},newTaskTitle:{type:String},newTaskNotes:{type:String},newTaskDue:{type:String},creating:{type:Boolean},editingTask:{type:Object},togglingIds:{type:Object},online:{type:Boolean}}),u(K,"styles",A`
    :host {
      display: block;
    }

    .list-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 4px 0 16px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .list-tabs::-webkit-scrollbar {
      display: none;
    }

    .list-tab {
      padding: 8px 18px;
      border-radius: 20px;
      border: none;
      background: white;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #7c6fa0;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
    }

    .list-tab.active {
      background: linear-gradient(135deg, #6bcb77 0%, #4caf50 100%);
      color: white;
      box-shadow: 0 4px 16px rgba(107, 203, 119, 0.3);
    }

    .list-tab:active {
      transform: scale(0.95);
    }

    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px;
      margin-bottom: 16px;
      border: 2px dashed #d4c8f0;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.6);
      font-family: 'Fredoka', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #6c63ff;
      cursor: pointer;
      transition: all 0.2s ease;
      gap: 8px;
    }

    .add-btn:active {
      transform: scale(0.98);
      background: rgba(108, 99, 255, 0.05);
    }

    .create-form {
      background: white;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-field {
      margin-bottom: 12px;
    }

    .form-field label {
      display: block;
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: #7c6fa0;
      margin-bottom: 4px;
    }

    .form-field input,
    .form-field textarea {
      width: 100%;
      padding: 12px 14px;
      border: 2px solid #e8e0f5;
      border-radius: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      color: #4a3f6b;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }

    .form-field input:focus,
    .form-field textarea:focus {
      border-color: #6c63ff;
    }

    .form-field textarea {
      resize: vertical;
      min-height: 60px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .form-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .form-btn:active {
      transform: scale(0.95);
    }

    .form-btn.cancel {
      background: #f0e6ff;
      color: #7c6fa0;
    }

    .form-btn.submit {
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      box-shadow: 0 4px 12px rgba(108, 99, 255, 0.3);
    }

    .form-btn.submit:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .toggle-completed {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 0;
      margin-bottom: 12px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      color: #a094c4;
      cursor: pointer;
      border: none;
      background: none;
    }

    .toggle-icon {
      transition: transform 0.2s ease;
    }

    .toggle-completed.open .toggle-icon {
      transform: rotate(90deg);
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .task-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
      animation: slideUp 0.3s ease forwards;
      opacity: 0;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .task-card:active {
      transform: scale(0.98);
    }

    .task-card.completed {
      opacity: 0.6;
    }

    .task-card.toggling {
      opacity: 0.4;
      pointer-events: none;
    }

    .task-checkbox {
      width: 28px;
      height: 28px;
      border-radius: 9px;
      border: 2.5px solid #d4c8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .task-checkbox:active {
      transform: scale(0.85);
    }

    .task-card.completed .task-checkbox {
      background: linear-gradient(135deg, #6bcb77 0%, #4caf50 100%);
      border-color: #4caf50;
    }

    .task-card.completed .task-checkbox::after {
      content: '✓';
      color: white;
      font-size: 15px;
      font-weight: 700;
    }

    .task-content {
      flex: 1;
    }

    .task-title {
      font-family: 'Fredoka', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #4a3f6b;
    }

    .task-card.completed .task-title {
      text-decoration: line-through;
      color: #a094c4;
    }

    .task-meta {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .task-due {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #ff6b9d;
      font-weight: 500;
    }

    .task-notes {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
      margin-top: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .task-edit-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 50%;
      background: #eef;
      color: #6c63ff;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      flex-shrink: 0;
      margin-top: 1px;
      transition: all 0.2s ease;
    }

    .task-edit-btn:active {
      transform: scale(0.9);
      opacity: 1;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 24px;
      text-align: center;
    }

    .empty-icon {
      font-size: 64px;
      margin-bottom: 16px;
      animation: bounce 2s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    .empty-text {
      font-family: 'Fredoka', sans-serif;
      font-size: 18px;
      color: #7c6fa0;
      font-weight: 500;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 48px;
    }

    .loading-dots {
      display: flex;
      gap: 8px;
    }

    .loading-dots span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #6bcb77;
      animation: pulse 1.2s ease-in-out infinite;
    }

    .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
    .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes pulse {
      0%, 100% { transform: scale(0.8); opacity: 0.5; }
      50% { transform: scale(1.2); opacity: 1; }
    }
  `);customElements.define("synker-tasks",K);class Z extends v{_switchView(t){this.dispatchEvent(new CustomEvent("view-changed",{detail:{view:t}}))}render(){return c`
      <nav role="navigation" aria-label="Main navigation">
        <button
          class=${this.currentView==="calendar"?"active":""}
          @click=${()=>this._switchView("calendar")}
          aria-label="Calendar view"
          aria-current=${this.currentView==="calendar"?"page":"false"}
        >
          <span class="nav-icon">📆</span>
          Calendar
        </button>
        <button
          class=${this.currentView==="tasks"?"active":""}
          @click=${()=>this._switchView("tasks")}
          aria-label="Tasks view"
          aria-current=${this.currentView==="tasks"?"page":"false"}
        >
          <span class="nav-icon">✅</span>
          Tasks
        </button>
      </nav>
    `}}u(Z,"properties",{currentView:{type:String}}),u(Z,"styles",A`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
      padding-bottom: env(safe-area-inset-bottom, 0);
    }

    nav {
      display: flex;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      background: white;
      border-radius: 24px 24px 0 0;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
    }

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 10px 28px;
      border: none;
      border-radius: 16px;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      font-weight: 500;
      color: #a094c4;
    }

    button.active {
      background: linear-gradient(135deg, #6c63ff 0%, #5a4fcf 100%);
      color: white;
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(108, 99, 255, 0.3);
    }

    button:active {
      transform: scale(0.95);
    }

    .nav-icon {
      font-size: 24px;
    }
  `);customElements.define("synker-nav",Z);class Q extends v{constructor(){super(),this.level=100,this.charging=!1,this.supported=!1,this._init()}async _init(){if(navigator.getBattery)try{this.battery=await navigator.getBattery(),this.supported=!0,this._update(),this._onLevelChange=()=>this._update(),this._onChargingChange=()=>this._update(),this.battery.addEventListener("levelchange",this._onLevelChange),this.battery.addEventListener("chargingchange",this._onChargingChange)}catch(t){console.warn("Battery API unavailable:",t)}}_update(){this.battery&&(this.level=Math.round(this.battery.level*100),this.charging=this.battery.charging)}disconnectedCallback(){var t,e,s;(t=super.disconnectedCallback)==null||t.call(this),(e=this.battery)==null||e.removeEventListener("levelchange",this._onLevelChange),(s=this.battery)==null||s.removeEventListener("chargingchange",this._onChargingChange)}render(){if(!this.supported)return window.isSecureContext===!1?c`
          <div class="chip na" role="status" title="Battery requires HTTPS">
            <span class="icon">🔒</span>
            <span>HTTPS</span>
          </div>
        `:c``;const t=this.level<=20?"low":this.level<=50?"medium":"high",e=this.charging?"⚡":this.level<=20?"🪫":"🔋";return c`
      <div class="chip ${t}" role="status" aria-label="Battery ${this.level}%${this.charging?", charging":""}">
        <span class="icon">${e}</span>
        <span>${this.level}%</span>
      </div>
    `}}u(Q,"properties",{level:{type:Number},charging:{type:Boolean},supported:{type:Boolean}}),u(Q,"styles",A`
    :host {
      display: inline-block;
    }

    .chip {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 7px 11px;
      border-radius: 20px;
      background: white;
      box-shadow: 0 2px 12px rgba(108, 99, 255, 0.15);
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #4a3f6b;
    }

    .icon {
      font-size: 16px;
    }

    .chip.low {
      color: #d32f2f;
      animation: pulse 1.2s ease-in-out infinite;
    }

    .chip.medium {
      color: #e65100;
    }

    .chip.high {
      color: #2e7d32;
    }

    .chip.na {
      color: #a094c4;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }
  `);customElements.define("synker-battery",Q);class X extends v{_formatLastSync(){if(!this.lastSync)return"Never synced";const t=new Date(this.lastSync),s=Math.floor((new Date-t)/6e4);return s<1?"Just now":s<60?`${s}m ago`:t.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}_handleSync(){this.dispatchEvent(new CustomEvent("sync-requested"))}render(){return c`
      <div class="header">
        <div class="brand">
          <span class="brand-icon">📅</span>
          <h1>Synker</h1>
        </div>
        <div>
          <div class="sync-row">
            <synker-battery></synker-battery>
            <button
              class="sync-btn ${this.syncing?"syncing":""}"
              @click=${this._handleSync}
              ?disabled=${this.syncing||!this.online}
              aria-label="Sync with Google"
            >
              <span class="sync-icon">🔄</span>
              ${this.syncing?"Syncing...":"Sync"}
            </button>
          </div>
          <div class="last-sync">${this._formatLastSync()}</div>
        </div>
      </div>
    `}}u(X,"properties",{syncing:{type:Boolean},lastSync:{type:String},online:{type:Boolean}}),u(X,"styles",A`
    :host {
      display: block;
      padding: 16px;
      padding-top: env(safe-area-inset-top, 16px);
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-icon {
      font-size: 28px;
    }

    h1 {
      font-family: 'Fredoka', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #4a3f6b;
    }

    .sync-row {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
    }

    .sync-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 16px;
      background: white;
      border: none;
      border-radius: 20px;
      font-family: 'Fredoka', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #6c63ff;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(108, 99, 255, 0.15);
      transition: all 0.2s ease;
    }

    .sync-btn:active {
      transform: scale(0.95);
    }

    .sync-btn.syncing {
      opacity: 0.7;
      pointer-events: none;
    }

    .sync-icon {
      display: inline-block;
      font-size: 16px;
      transition: transform 0.3s ease;
    }

    .sync-btn.syncing .sync-icon {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .last-sync {
      font-family: 'Fredoka', sans-serif;
      font-size: 12px;
      color: #a094c4;
      text-align: right;
      margin-top: 4px;
    }
  `);customElements.define("synker-header",X);const Zt=!0;class tt extends v{constructor(){super(),this.demo=Zt,this.authenticated=!1,this.currentView="calendar",this.syncing=!1,this.lastSync=null,this.online=!1,this._onOnline=()=>this._recoverOnline(),this._onOffline=()=>{this.demo||(this.online=!1)},window.addEventListener("online",this._onOnline),window.addEventListener("offline",this._onOffline),this._checkAuth(),this._registerSW()}disconnectedCallback(){var t;(t=super.disconnectedCallback)==null||t.call(this),window.removeEventListener("online",this._onOnline),window.removeEventListener("offline",this._onOffline),this._onlineTimer&&clearInterval(this._onlineTimer)}async _autoRefresh(){var t,e,s,i;this.demo||((e=(t=this.shadowRoot.querySelector("synker-calendar"))==null?void 0:t.refresh)==null||e.call(t),(i=(s=this.shadowRoot.querySelector("synker-tasks"))==null?void 0:s.refresh)==null||i.call(s),this.online||await this._probeConnection())}async _probeConnection(){if(this.demo||this.online)return;let t;try{const s=new AbortController,i=setTimeout(()=>s.abort(),5e3);t=await y(`/status?_=${Date.now()}`,{signal:s.signal}),clearTimeout(i)}catch{return}if(!t.ok)return;let e;try{e=await t.json()}catch{return}this.lastSync=e.lastSync,e.authenticated!==this.authenticated&&(this.authenticated=e.authenticated),this._recoverOnline()}_recoverOnline(){var t,e,s,i;this.demo||this.online||(this.online=!0,this.requestUpdate(),(e=(t=this.shadowRoot.querySelector("synker-calendar"))==null?void 0:t.refresh)==null||e.call(t),(i=(s=this.shadowRoot.querySelector("synker-tasks"))==null?void 0:s.refresh)==null||i.call(s))}async _registerSW(){if(!(this.demo||!("serviceWorker"in navigator)))try{await navigator.serviceWorker.register("sw.js")}catch(t){console.warn("SW registration failed:",t)}}async _checkAuth(){try{const e=await(await y("/status")).json();this.authenticated=e.authenticated,this.lastSync=e.lastSync}catch(t){console.error("Status check failed:",t)}}async _handleSync(){var t,e,s,i;this.syncing=!0;try{const o=await(await y("/sync",{method:"POST"})).json();this.lastSync=o.lastSync,this.requestUpdate(),(e=(t=this.shadowRoot.querySelector("synker-calendar"))==null?void 0:t.refresh)==null||e.call(t),(i=(s=this.shadowRoot.querySelector("synker-tasks"))==null?void 0:s.refresh)==null||i.call(s)}catch(n){console.error("Sync failed:",n)}finally{this.syncing=!1}}_handleNavChange(t){this.currentView=t.detail.view}render(){return this.authenticated?c`
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div class="main-content">
        ${this.demo?c`<div class="offline-banner">🧪 Demo — mock data, read-only</div>`:this.online?"":c`<div class="offline-banner">🔌 Read-only — offline</div>`}
        <synker-header
          .syncing=${this.syncing}
          .lastSync=${this.lastSync}
          .online=${this.online}
          @sync-requested=${this._handleSync}
        ></synker-header>
        <div class="content">
          ${this.currentView==="calendar"?c`<synker-calendar .online=${this.online}></synker-calendar>`:c`<synker-tasks .online=${this.online}></synker-tasks>`}
        </div>
        <synker-nav
          .currentView=${this.currentView}
          @view-changed=${this._handleNavChange}
        ></synker-nav>
      </div>
    `:c`
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
        <synker-login></synker-login>
      `}}u(tt,"properties",{authenticated:{type:Boolean},currentView:{type:String},syncing:{type:Boolean},lastSync:{type:String},online:{type:Boolean}}),u(tt,"styles",A`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: linear-gradient(180deg, #f0e6ff 0%, #e8f4fd 50%, #fce4ec 100%);
      overflow: hidden;
      position: relative;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px;
      padding-bottom: 80px;
      -webkit-overflow-scrolling: touch;
    }

    .bubbles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .bubble {
      position: absolute;
      border-radius: 50%;
      opacity: 0.15;
      animation: float 8s ease-in-out infinite;
    }

    .bubble:nth-child(1) {
      width: 80px; height: 80px;
      background: #ff6b9d;
      top: 10%; left: 5%;
      animation-delay: 0s;
    }
    .bubble:nth-child(2) {
      width: 120px; height: 120px;
      background: #6c63ff;
      top: 60%; right: -20px;
      animation-delay: 2s;
    }
    .bubble:nth-child(3) {
      width: 60px; height: 60px;
      background: #ffd93d;
      top: 30%; right: 10%;
      animation-delay: 4s;
    }
    .bubble:nth-child(4) {
      width: 100px; height: 100px;
      background: #6bcb77;
      bottom: 20%; left: -10px;
      animation-delay: 1s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-20px) scale(1.05); }
    }

    .main-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .offline-banner {
      background: linear-gradient(135deg, #ffd93d 0%, #ffb347 100%);
      color: #4a3f6b;
      font-family: 'Fredoka', sans-serif;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      padding: 6px 12px;
      z-index: 2;
    }
  `);customElements.define("synker-app",tt);
