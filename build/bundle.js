var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function l(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function c(t){t.parentNode.removeChild(t)}function u(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function a(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function f(){return d(" ")}function g(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function p(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let h;function m(t){h=t}function w(t){(function(){if(!h)throw new Error("Function called outside component initialization");return h})().$$.on_mount.push(t)}const v=[],$=[],k=[],b=[],x=Promise.resolve();let z=!1;function y(t){k.push(t)}let _=!1;const E=new Set;function C(){if(!_){_=!0;do{for(let t=0;t<v.length;t+=1){const e=v[t];m(e),A(e.$$)}for(m(null),v.length=0;$.length;)$.pop()();for(let t=0;t<k.length;t+=1){const e=k[t];E.has(e)||(E.add(e),e())}k.length=0}while(v.length);for(;b.length;)b.pop()();z=!1,_=!1,E.clear()}}function A(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(y)}}const L=new Set;function D(t,e){-1===t.$$.dirty[0]&&(v.push(t),z||(z=!0,x.then(C)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function j(r,s,i,u,a,d,f,g=[-1]){const p=h;m(r);const w=r.$$={fragment:null,ctx:null,props:d,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:s.context||[]),callbacks:n(),dirty:g,skip_bound:!1,root:s.target||p.$$.root};f&&f(w.root);let v=!1;if(w.ctx=i?i(r,s.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return w.ctx&&a(w.ctx[t],w.ctx[t]=o)&&(!w.skip_bound&&w.bound[t]&&w.bound[t](o),v&&D(r,t)),e})):[],w.update(),v=!0,o(w.before_update),w.fragment=!!u&&u(w.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);w.fragment&&w.fragment.l(t),t.forEach(c)}else w.fragment&&w.fragment.c();s.intro&&(($=r.$$.fragment)&&$.i&&(L.delete($),$.i(k))),function(t,n,r,s){const{fragment:i,on_mount:c,on_destroy:u,after_update:a}=t.$$;i&&i.m(n,r),s||y((()=>{const n=c.map(e).filter(l);u?u.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(y)}(r,s.target,s.anchor,s.customElement),C()}var $,k;m(p)}function q(t,e,n){const o=t.slice();return o[5]=e[n],o}function F(t,e,n){const o=t.slice();return o[8]=e[n].name,o[9]=e[n].method,o[11]=n,o}function N(t){let e,n,o,l,r,u=t[8]+"";return{c(){var l;e=a("li"),n=d(u),p(e,"class",(l=window.opener||2!=t[11]?"":"hide",o=(null==l?"":l)+" svelte-1t7kz4w"))},m(o,c){i(o,e,c),s(e,n),l||(r=g(e,"mousedown",t[9]),l=!0)},p(e,n){t=e},d(t){t&&c(e),l=!1,r()}}}function O(e){let n,o,l=e[5]+"";return{c(){n=a("li"),o=d(l),p(n,"draggable","true"),p(n,"class","svelte-1t7kz4w")},m(t,e){i(t,n,e),s(n,o)},p:t,d(t){t&&c(n)}}}function S(e){let n,l,r,d,h,m,w,v,$,k,b,x,z,y,_,E,C,A,L,D,j,S,H,I,W,G,J,K=e[1],Q=[];for(let t=0;t<K.length;t+=1)Q[t]=N(F(e,K,t));let R=e[0],U=[];for(let t=0;t<R.length;t+=1)U[t]=O(q(e,R,t));return{c(){n=a("main"),l=a("div"),r=a("ul");for(let t=0;t<Q.length;t+=1)Q[t].c();d=f(),h=a("div"),m=a("div"),w=a("ul");for(let t=0;t<U.length;t+=1)U[t].c();v=f(),$=a("div"),k=a("div"),b=a("span"),b.textContent="header",x=f(),z=a("div"),y=a("ul"),_=a("li"),_.textContent="input",E=f(),C=a("li"),C.textContent="input",A=f(),L=a("li"),L.textContent="input",D=f(),j=a("li"),j.textContent="input",S=f(),H=a("ul"),H.innerHTML='<li draggable="true" class="svelte-1t7kz4w">input</li> \n\t\t\t\t\t\t<li class="svelte-1t7kz4w">output</li>',I=f(),W=a("div"),p(r,"class","menu svelte-1t7kz4w"),p(r,"id","window"),p(l,"id","top"),p(l,"class","svelte-1t7kz4w"),p(w,"class","menu svelte-1t7kz4w"),p(m,"id","pallet"),p(m,"class","svelte-1t7kz4w"),p(b,"class","head svelte-1t7kz4w"),p(b,"draggable","true"),p(_,"draggable","true"),p(_,"class","svelte-1t7kz4w"),p(C,"class","svelte-1t7kz4w"),p(L,"class","svelte-1t7kz4w"),p(j,"class","svelte-1t7kz4w"),p(y,"class","input svelte-1t7kz4w"),p(H,"class","output svelte-1t7kz4w"),p(z,"class","sockets svelte-1t7kz4w"),p(k,"class","node svelte-1t7kz4w"),p($,"id","container"),p($,"class","svelte-1t7kz4w"),p(h,"id","mid"),p(h,"class","svelte-1t7kz4w"),p(W,"id","bot"),p(W,"class","svelte-1t7kz4w"),p(n,"id","main"),p(n,"class","svelte-1t7kz4w")},m(t,e){i(t,n,e),s(n,l),s(l,r);for(let t=0;t<Q.length;t+=1)Q[t].m(r,null);s(n,d),s(n,h),s(h,m),s(m,w);for(let t=0;t<U.length;t+=1)U[t].m(w,null);s(h,v),s(h,$),s($,k),s(k,b),s(k,x),s(k,z),s(z,y),s(y,_),s(y,E),s(y,C),s(y,A),s(y,L),s(y,D),s(y,j),s(z,S),s(z,H),s(n,I),s(n,W),G||(J=[g(b,"dragexit",T),g(b,"dragstart",M),g(_,"dragend",T),g(_,"dragstart",M),g($,"dragover",B),g($,"drop",P)],G=!0)},p(t,[e]){if(2&e){let n;for(K=t[1],n=0;n<K.length;n+=1){const o=F(t,K,n);Q[n]?Q[n].p(o,e):(Q[n]=N(o),Q[n].c(),Q[n].m(r,null))}for(;n<Q.length;n+=1)Q[n].d(1);Q.length=K.length}if(1&e){let n;for(R=t[0],n=0;n<R.length;n+=1){const o=q(t,R,n);U[n]?U[n].p(o,e):(U[n]=O(o),U[n].c(),U[n].m(w,null))}for(;n<U.length;n+=1)U[n].d(1);U.length=R.length}},i:t,o:t,d(t){t&&c(n),u(Q,t),u(U,t),G=!1,o(J)}}}function T(t){console.log("stop")}function H(){let t=window.innerWidth,e=window.innerHeight;window.open(window.location.origin,"","width="+t+",height="+e+",fullscreen=true")}function I(){window.close()}function M(t){t.dataTransfer.setDragImage(new Image,0,0)}function B(t){console.log(t),t.preventDefault()}function P(t){t.preventDefault()}function W(t){let e=[],n=[{name:"break window",method:H},{name:"fullscreen",method:function(){let t=document.querySelector("main");l?(document.exitFullscreen(),l=!1):(t.requestFullscreen(),l=!0);console.log("enter fullscreen")}},{name:"close window",method:I}],o=new AudioContext,l=!1;for(let t in o)e.push(t);return w((()=>{console.log(window.opener),document.addEventListener("contextmenu",(t=>{t.preventDefault();let e=t.target;return console.log(e.parentElement.parentElement.classList),!1}))})),[e,n]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),j(this,t,W,S,r,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
