!function(){"use strict";let e=-1;const t=()=>e,n=t=>{addEventListener("pageshow",(n=>{n.persisted&&(e=n.timeStamp,t(n))}),!0)},r=()=>{const e=self.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(e&&e.responseStart>0&&e.responseStart<performance.now())return e},i=()=>{const e=r();return e&&e.activationStart||0},a=(e,n)=>{const a=r();let o="navigate";return t()>=0?o="back-forward-cache":a&&(document.prerendering||i()>0?o="prerender":document.wasDiscarded?o="restore":a.type&&(o=a.type.replace(/_/g,"-"))),{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:`v4-${Date.now()}-${Math.floor(8999999999999*Math.random())+1e12}`,navigationType:o}},o=(e,t,n)=>{try{if(PerformanceObserver.supportedEntryTypes.includes(e)){const r=new PerformanceObserver((e=>{Promise.resolve().then((()=>{t(e.getEntries())}))}));return r.observe(Object.assign({type:e,buffered:!0},n||{})),r}}catch(e){}},s=(e,t,n,r)=>{let i,a;return o=>{t.value>=0&&(o||r)&&(a=t.value-(i||0),(a||void 0===i)&&(i=t.value,t.delta=a,t.rating=((e,t)=>e>t[1]?"poor":e>t[0]?"needs-improvement":"good")(t.value,n),e(t)))}},c=e=>{requestAnimationFrame((()=>requestAnimationFrame((()=>e()))))},l=e=>{document.addEventListener("visibilitychange",(()=>{"hidden"===document.visibilityState&&e()}))},d=e=>{let t=!1;return()=>{t||(e(),t=!0)}};let u=-1;const m=()=>"hidden"!==document.visibilityState||document.prerendering?1/0:0,p=e=>{"hidden"===document.visibilityState&&u>-1&&(u="visibilitychange"===e.type?e.timeStamp:0,g())},h=()=>{addEventListener("visibilitychange",p,!0),addEventListener("prerenderingchange",p,!0)},g=()=>{removeEventListener("visibilitychange",p,!0),removeEventListener("prerenderingchange",p,!0)},f=()=>(u<0&&(u=m(),h(),n((()=>{setTimeout((()=>{u=m(),h()}),0)}))),{get firstHiddenTime(){return u}}),v=e=>{document.prerendering?addEventListener("prerenderingchange",(()=>e()),!0):e()},T=[1800,3e3],y=(e,t)=>{t=t||{},v((()=>{const r=f();let l,d=a("FCP");const u=o("paint",(e=>{e.forEach((e=>{"first-contentful-paint"===e.name&&(u.disconnect(),e.startTime<r.firstHiddenTime&&(d.value=Math.max(e.startTime-i(),0),d.entries.push(e),l(!0)))}))}));u&&(l=s(e,d,T,t.reportAllChanges),n((n=>{d=a("FCP"),l=s(e,d,T,t.reportAllChanges),c((()=>{d.value=performance.now()-n.timeStamp,l(!0)}))})))}))},E=[.1,.25];let S=0,b=1/0,C=0;const L=e=>{e.forEach((e=>{e.interactionId&&(b=Math.min(b,e.interactionId),C=Math.max(C,e.interactionId),S=C?(C-b)/7+1:0)}))};let I;const w=[],M=new Map;let D=0;const P=[],x=e=>{if(P.forEach((t=>t(e))),!e.interactionId&&"first-input"!==e.entryType)return;const t=w[w.length-1],n=M.get(e.interactionId);if(n||w.length<10||e.duration>t.latency){if(n)e.duration>n.latency?(n.entries=[e],n.latency=e.duration):e.duration===n.latency&&e.startTime===n.entries[0].startTime&&n.entries.push(e);else{const t={id:e.interactionId,latency:e.duration,entries:[e]};M.set(t.id,t),w.push(t)}w.sort(((e,t)=>t.latency-e.latency)),w.length>10&&w.splice(10).forEach((e=>M.delete(e.id)))}},F=e=>{const t=self.requestIdleCallback||self.setTimeout;let n=-1;return e=d(e),"hidden"===document.visibilityState?e():(n=t(e),l(e)),n},k=[200,500],A=(e,t)=>{"PerformanceEventTiming"in self&&"interactionId"in PerformanceEventTiming.prototype&&(t=t||{},v((()=>{"interactionCount"in performance||I||(I=o("event",L,{type:"event",buffered:!0,durationThreshold:0}));let r,i=a("INP");const c=e=>{F((()=>{e.forEach(x);const t=(()=>{const e=Math.min(w.length-1,Math.floor(((I?S:performance.interactionCount||0)-D)/50));return w[e]})();t&&t.latency!==i.value&&(i.value=t.latency,i.entries=t.entries,r())}))},d=o("event",c,{durationThreshold:t.durationThreshold??40});r=s(e,i,k,t.reportAllChanges),d&&(d.observe({type:"first-input",buffered:!0}),l((()=>{c(d.takeRecords()),r(!0)})),n((()=>{D=0,w.length=0,M.clear(),i=a("INP"),r=s(e,i,k,t.reportAllChanges)})))})))},_=[2500,4e3],B={},O=[800,1800],N=e=>{document.prerendering?v((()=>N(e))):"complete"!==document.readyState?addEventListener("load",(()=>N(e)),!0):setTimeout(e,0)};let j,R,q,H;const z={passive:!0,capture:!0},W=new Date,$=(e,t)=>{j||(j=t,R=e,q=new Date,V(removeEventListener),J())},J=()=>{if(R>=0&&R<q-W){const e={entryType:"first-input",name:j.type,target:j.target,cancelable:j.cancelable,startTime:j.timeStamp,processingStart:j.timeStamp+R};H.forEach((function(t){t(e)})),H=[]}},U=e=>{if(e.cancelable){const t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?((e,t)=>{const n=()=>{$(e,t),i()},r=()=>{i()},i=()=>{removeEventListener("pointerup",n,z),removeEventListener("pointercancel",r,z)};addEventListener("pointerup",n,z),addEventListener("pointercancel",r,z)})(t,e):$(t,e)}},V=e=>{["mousedown","keydown","touchstart","pointerdown"].forEach((t=>e(t,U,z)))},G=[100,300],K=e=>{if("loading"===document.readyState)return"loading";{const t=r();if(t){if(e<t.domInteractive)return"loading";if(0===t.domContentLoadedEventStart||e<t.domContentLoadedEventStart)return"dom-interactive";if(0===t.domComplete||e<t.domComplete)return"dom-content-loaded"}}return"complete"},Q=e=>{const t=e.nodeName;return 1===e.nodeType?t.toLowerCase():t.toUpperCase().replace(/^#/,"")},X=(e,t)=>{let n="";try{for(;e&&9!==e.nodeType;){const r=e,i=r.id?"#"+r.id:Q(r)+(r.classList&&r.classList.value&&r.classList.value.trim()&&r.classList.value.trim().length?"."+r.classList.value.trim().replace(/\s+/g,"."):"");if(n.length+i.length>(t||100)-1)return n||i;if(n=n?i+">"+n:i,r.id)break;e=r.parentNode}}catch(e){}return n};let Y,Z,ee=[],te=[];const ne=new WeakMap,re=new Map;let ie=-1;const ae=e=>{ee=ee.concat(e),oe()},oe=()=>{ie<0&&(ie=F(se))},se=()=>{re.size>10&&re.forEach(((e,t)=>{M.has(t)||re.delete(t)}));const e=w.map((e=>ne.get(e.entries[0]))),t=te.length-50;te=te.filter(((n,r)=>r>=t||e.includes(n)));const n=new Set;for(let e=0;e<te.length;e++){const t=te[e];ce(t.startTime,t.processingEnd).forEach((e=>{n.add(e)}))}for(let e=0;e<50;e++){const t=ee[ee.length-1-e];if(!t||t.startTime<Z)break;n.add(t)}ee=Array.from(n),ie=-1};P.push((e=>{e.interactionId&&e.target&&!re.has(e.interactionId)&&re.set(e.interactionId,e.target)}),(e=>{const t=e.startTime+e.duration;let n;Z=Math.max(Z,e.processingEnd);for(let r=te.length-1;r>=0;r--){const i=te[r];if(Math.abs(t-i.renderTime)<=8){n=i,n.startTime=Math.min(e.startTime,n.startTime),n.processingStart=Math.min(e.processingStart,n.processingStart),n.processingEnd=Math.max(e.processingEnd,n.processingEnd),n.entries.push(e);break}}n||(n={startTime:e.startTime,processingStart:e.processingStart,processingEnd:e.processingEnd,renderTime:t,entries:[e]},te.push(n)),(e.interactionId||"first-input"===e.entryType)&&ne.set(e,n),oe()}));const ce=(e,t)=>{const n=[];for(let r,i=0;r=ee[i];i++)if(!(r.startTime+r.duration<e)){if(r.startTime>t)break;n.push(r)}return n};var le=Object.freeze({__proto__:null,onCLS:(e,t)=>{((e,t)=>{t=t||{},y(d((()=>{let r,i=a("CLS",0),d=0,u=[];const m=e=>{e.forEach((e=>{if(!e.hadRecentInput){const t=u[0],n=u[u.length-1];d&&e.startTime-n.startTime<1e3&&e.startTime-t.startTime<5e3?(d+=e.value,u.push(e)):(d=e.value,u=[e])}})),d>i.value&&(i.value=d,i.entries=u,r())},p=o("layout-shift",m);p&&(r=s(e,i,E,t.reportAllChanges),l((()=>{m(p.takeRecords()),r(!0)})),n((()=>{d=0,i=a("CLS",0),r=s(e,i,E,t.reportAllChanges),c((()=>r()))})),setTimeout(r,0))})))})((t=>{const n=(e=>{let t={};if(e.entries.length){const r=e.entries.reduce(((e,t)=>e&&e.value>t.value?e:t));if(r&&r.sources&&r.sources.length){const e=(n=r.sources).find((e=>e.node&&1===e.node.nodeType))||n[0];e&&(t={largestShiftTarget:X(e.node),largestShiftTime:r.startTime,largestShiftValue:r.value,largestShiftSource:e,largestShiftEntry:r,loadState:K(r.startTime)})}}var n;return Object.assign(e,{attribution:t})})(t);e(n)}),t)},onFCP:(e,n)=>{y((n=>{const i=(e=>{let n={timeToFirstByte:0,firstByteToFCP:e.value,loadState:K(t())};if(e.entries.length){const t=r(),i=e.entries[e.entries.length-1];if(t){const r=t.activationStart||0,a=Math.max(0,t.responseStart-r);n={timeToFirstByte:a,firstByteToFCP:e.value-a,loadState:K(e.entries[0].startTime),navigationEntry:t,fcpEntry:i}}}return Object.assign(e,{attribution:n})})(n);e(i)}),n)},onINP:(e,t)=>{Y||(Y=o("long-animation-frame",ae)),A((t=>{const n=(e=>{const t=e.entries[0],n=ne.get(t),r=t.processingStart,i=n.processingEnd,a=n.entries.sort(((e,t)=>e.processingStart-t.processingStart)),o=ce(t.startTime,i),s=e.entries.find((e=>e.target)),c=s&&s.target||re.get(t.interactionId),l=[t.startTime+t.duration,i].concat(o.map((e=>e.startTime+e.duration))),d=Math.max.apply(Math,l),u={interactionTarget:X(c),interactionTargetElement:c,interactionType:t.name.startsWith("key")?"keyboard":"pointer",interactionTime:t.startTime,nextPaintTime:d,processedEventEntries:a,longAnimationFrameEntries:o,inputDelay:r-t.startTime,processingDuration:i-r,presentationDelay:Math.max(d-i,0),loadState:K(t.startTime)};return Object.assign(e,{attribution:u})})(t);e(n)}),t)},onLCP:(e,t)=>{((e,t)=>{t=t||{},v((()=>{const r=f();let u,m=a("LCP");const p=e=>{t.reportAllChanges||(e=e.slice(-1)),e.forEach((e=>{e.startTime<r.firstHiddenTime&&(m.value=Math.max(e.startTime-i(),0),m.entries=[e],u())}))},h=o("largest-contentful-paint",p);if(h){u=s(e,m,_,t.reportAllChanges);const r=d((()=>{B[m.id]||(p(h.takeRecords()),h.disconnect(),B[m.id]=!0,u(!0))}));["keydown","click"].forEach((e=>{addEventListener(e,(()=>F(r)),!0)})),l(r),n((n=>{m=a("LCP"),u=s(e,m,_,t.reportAllChanges),c((()=>{m.value=performance.now()-n.timeStamp,B[m.id]=!0,u(!0)}))}))}}))})((t=>{const n=(e=>{let t={timeToFirstByte:0,resourceLoadDelay:0,resourceLoadDuration:0,elementRenderDelay:e.value};if(e.entries.length){const n=r();if(n){const r=n.activationStart||0,i=e.entries[e.entries.length-1],a=i.url&&performance.getEntriesByType("resource").filter((e=>e.name===i.url))[0],o=Math.max(0,n.responseStart-r),s=Math.max(o,a?(a.requestStart||a.startTime)-r:0),c=Math.max(s,a?a.responseEnd-r:0),l=Math.max(c,i.startTime-r);t={element:X(i.element),timeToFirstByte:o,resourceLoadDelay:s-o,resourceLoadDuration:c-s,elementRenderDelay:l-c,navigationEntry:n,lcpEntry:i},i.url&&(t.url=i.url),a&&(t.lcpResourceEntry=a)}}return Object.assign(e,{attribution:t})})(t);e(n)}),t)},onTTFB:(e,t)=>{((e,t)=>{t=t||{};let o=a("TTFB"),c=s(e,o,O,t.reportAllChanges);N((()=>{const l=r();l&&(o.value=Math.max(l.responseStart-i(),0),o.entries=[l],c(!0),n((()=>{o=a("TTFB",0),c=s(e,o,O,t.reportAllChanges),c(!0)})))}))})((t=>{const n=(e=>{let t={waitingDuration:0,cacheDuration:0,dnsDuration:0,connectionDuration:0,requestDuration:0};if(e.entries.length){const n=e.entries[0],r=n.activationStart||0,i=Math.max((n.workerStart||n.fetchStart)-r,0),a=Math.max(n.domainLookupStart-r,0),o=Math.max(n.connectStart-r,0),s=Math.max(n.connectEnd-r,0);t={waitingDuration:i,cacheDuration:a-i,dnsDuration:o-a,connectionDuration:s-o,requestDuration:e.value-s,navigationEntry:n}}return Object.assign(e,{attribution:t})})(t);e(n)}),t)},CLSThresholds:E,FCPThresholds:T,INPThresholds:k,LCPThresholds:_,TTFBThresholds:O,onFID:(e,t)=>{((e,t)=>{t=t||{},v((()=>{const r=f();let i,c=a("FID");const u=e=>{e.startTime<r.firstHiddenTime&&(c.value=e.processingStart-e.startTime,c.entries.push(e),i(!0))},m=e=>{e.forEach(u)},p=o("first-input",m);i=s(e,c,G,t.reportAllChanges),p&&(l(d((()=>{m(p.takeRecords()),p.disconnect()}))),n((()=>{var n;c=a("FID"),i=s(e,c,G,t.reportAllChanges),H=[],R=-1,j=null,V(addEventListener),n=u,H.push(n),J()})))}))})((t=>{const n=(e=>{const t=e.entries[0],n={eventTarget:X(t.target),eventType:t.name,eventTime:t.startTime,eventEntry:t,loadState:K(t.startTime)};return Object.assign(e,{attribution:n})})(t);e(n)}),t)},FIDThresholds:G});var de=Object.freeze({__proto__:null,onEachInteraction:function(e){const t=new PerformanceObserver((t=>{const n=t.getEntries(),r=new Map,i=n.filter((e=>"interactionId"in e)).filter((e=>e.interactionId));for(const e of i){const t=r.get(e.interactionId)||[];t.push(e),r.set(e.interactionId,t)}for(const[t,n]of r.entries()){const r=n.reduce(((e,t)=>e.duration>=t.duration?e:t)),i=r.duration,a=n.find((e=>e.target));e({attribution:{interactionTargetElement:a?.target??null,interactionTime:r.startTime,interactionType:r.name.startsWith("key")?"keyboard":"pointer",interactionId:t},entries:n,value:i})}}));t.observe({type:"first-input",buffered:!0}),t.observe({type:"event",durationThreshold:0,buffered:!0})}});const ue="__chromium_devtools_metrics_reporter",{onLCP:me,onCLS:pe,onINP:he}=le,{onEachInteraction:ge}=de;function fe(e){const t=JSON.stringify(e);window[ue](t)}const ve=[];function Te(e){const t=ve.length;return ve.push(e),t}window.getNodeForIndex=e=>ve[e],function(){try{return window.self!==window.top}catch{return!0}}()||(fe({name:"reset"}),n((()=>{fe({name:"reset"})})),me((e=>{const t={name:"LCP",value:e.value},n=e.attribution.lcpEntry?.element;n&&(t.nodeIndex=Te(n)),fe(t)}),{reportAllChanges:!0}),pe((e=>{fe({name:"CLS",value:e.value})}),{reportAllChanges:!0}),he((e=>{const t={name:"INP",value:e.value,interactionType:e.attribution.interactionType},n=e.attribution.interactionTargetElement;n&&(t.nodeIndex=Te(n)),fe(t)}),{reportAllChanges:!0}),ge((e=>{const t={name:"Interaction",duration:e.value,interactionId:e.attribution.interactionId,interactionType:e.attribution.interactionType},n=e.attribution.interactionTargetElement;n&&(t.nodeIndex=Te(n)),fe(t)})))}();
