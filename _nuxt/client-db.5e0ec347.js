import{r as j,az as M,aA as $,aB as A,aC as T,aD as C,aE as W,aF as B,a7 as J,N as K,a2 as H,a3 as b,v as q,w as G}from"./index.d8522b0d.js";const Z=()=>{const t=new Map;return{hasItem(e){return t.has(e)},getItem(e){return t.get(e)||null},getItemRaw(e){return t.get(e)||null},setItem(e,n){t.set(e,n)},setItemRaw(e,n){t.set(e,n)},removeItem(e){t.delete(e)},getKeys(){return Array.from(t.keys())},clear(){t.clear()},dispose(){t.clear()}}};function F(t){return!t||typeof t.then!="function"?Promise.resolve(t):t}function g(t,...e){try{return F(t(...e))}catch(n){return Promise.reject(n)}}function k(t){const e=typeof t;return t===null||e!=="object"&&e!=="function"}function Q(t){const e=Object.getPrototypeOf(t);return!e||e.isPrototypeOf(Object)}function D(t){if(k(t))return String(t);if(Q(t)||Array.isArray(t))return JSON.stringify(t);if(typeof t.toJSON=="function")return D(t.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function L(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const _="base64:";function V(t){if(typeof t=="string")return t;L();const e=Buffer.from(t).toString("base64");return _+e}function X(t){return typeof t!="string"||!t.startsWith(_)?t:(L(),Buffer.from(t.slice(_.length),"base64"))}const ee=()=>{const t=new Map;return{hasItem(e){return t.has(e)},getItem(e){return t.get(e)||null},getItemRaw(e){return t.get(e)||null},setItem(e,n){t.set(e,n)},setItemRaw(e,n){t.set(e,n)},removeItem(e){t.delete(e)},getKeys(){return Array.from(t.keys())},clear(){t.clear()},dispose(){t.clear()}}},te=["hasItem","getItem","setItem","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function re(t,e){if(e=I(e),!e)return t;const n={...t};for(const a of te)n[a]=(i="",...s)=>t[a](e+i,...s);return n.getKeys=(a="",...i)=>t.getKeys(e+a,...i).then(s=>s.map(c=>c.slice(e.length))),n}function p(t){return t?t.replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function I(t){return t=p(t),t?t+":":""}function ne(t={}){const e={mounts:{"":t.driver||ee()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=r=>{for(const u of e.mountpoints)if(r.startsWith(u))return{relativeKey:r.slice(u.length),driver:e.mounts[u]};return{relativeKey:r,driver:e.mounts[""]}},a=(r,u)=>e.mountpoints.filter(o=>o.startsWith(r)||u&&r.startsWith(o)).map(o=>({relativeBase:r.length>o.length?r.slice(o.length):void 0,mountpoint:o,driver:e.mounts[o]})),i=(r,u)=>{if(e.watching){u=p(u);for(const o of e.watchListeners)o(r,u)}},s=async()=>{if(!e.watching){e.watching=!0;for(const r in e.mounts)e.unwatch[r]=await x(e.mounts[r],i,r)}},c=async()=>{if(e.watching){for(const r in e.unwatch)await e.unwatch[r]();e.unwatch={},e.watching=!1}},h={hasItem(r){r=p(r);const{relativeKey:u,driver:o}=n(r);return g(o.hasItem,u)},getItem(r){r=p(r);const{relativeKey:u,driver:o}=n(r);return g(o.getItem,u).then(l=>j(l))},getItemRaw(r){r=p(r);const{relativeKey:u,driver:o}=n(r);return o.getItemRaw?g(o.getItemRaw,u):g(o.getItem,u).then(l=>X(l))},async setItem(r,u){if(u===void 0)return h.removeItem(r);r=p(r);const{relativeKey:o,driver:l}=n(r);l.setItem&&(await g(l.setItem,o,D(u)),l.watch||i("update",r))},async setItemRaw(r,u){if(u===void 0)return h.removeItem(r);r=p(r);const{relativeKey:o,driver:l}=n(r);if(l.setItemRaw)await g(l.setItemRaw,o,u);else if(l.setItem)await g(l.setItem,o,V(u));else return;l.watch||i("update",r)},async removeItem(r,u=!0){r=p(r);const{relativeKey:o,driver:l}=n(r);l.removeItem&&(await g(l.removeItem,o),u&&await g(l.removeItem,o+"$"),l.watch||i("remove",r))},async getMeta(r,u){r=p(r);const{relativeKey:o,driver:l}=n(r),m=Object.create(null);if(l.getMeta&&Object.assign(m,await g(l.getMeta,o)),!u){const f=await g(l.getItem,o+"$").then(d=>j(d));f&&typeof f=="object"&&(typeof f.atime=="string"&&(f.atime=new Date(f.atime)),typeof f.mtime=="string"&&(f.mtime=new Date(f.mtime)),Object.assign(m,f))}return m},setMeta(r,u){return this.setItem(r+"$",u)},removeMeta(r){return this.removeItem(r+"$")},async getKeys(r){r=I(r);const u=a(r,!0);let o=[];const l=[];for(const m of u){const d=(await g(m.driver.getKeys,m.relativeBase)).map(y=>m.mountpoint+p(y)).filter(y=>!o.some(w=>y.startsWith(w)));l.push(...d),o=[m.mountpoint,...o.filter(y=>!y.startsWith(m.mountpoint))]}return r?l.filter(m=>m.startsWith(r)&&!m.endsWith("$")):l.filter(m=>!m.endsWith("$"))},async clear(r){r=I(r),await Promise.all(a(r,!1).map(async u=>{if(u.driver.clear)return g(u.driver.clear);if(u.driver.removeItem){const o=await u.driver.getKeys();return Promise.all(o.map(l=>u.driver.removeItem(l)))}}))},async dispose(){await Promise.all(Object.values(e.mounts).map(r=>P(r)))},async watch(r){return await s(),e.watchListeners.push(r),async()=>{e.watchListeners=e.watchListeners.filter(u=>u!==r),e.watchListeners.length===0&&await c()}},async unwatch(){e.watchListeners=[],await c()},mount(r,u){if(r=I(r),r&&e.mounts[r])throw new Error(`already mounted at ${r}`);return r&&(e.mountpoints.push(r),e.mountpoints.sort((o,l)=>l.length-o.length)),e.mounts[r]=u,e.watching&&Promise.resolve(x(u,i,r)).then(o=>{e.unwatch[r]=o}).catch(console.error),h},async unmount(r,u=!0){r=I(r),!(!r||!e.mounts[r])&&(e.watching&&r in e.unwatch&&(e.unwatch[r](),delete e.unwatch[r]),u&&await P(e.mounts[r]),e.mountpoints=e.mountpoints.filter(o=>o!==r),delete e.mounts[r])}};return h}function x(t,e,n){return t.watch?t.watch((a,i)=>e(a,n+i)):()=>{}}async function P(t){typeof t.dispose=="function"&&await g(t.dispose)}function ae(t={}){const e=ie(n,t.operators);function n(a,i){return typeof i!="object"||i instanceof RegExp?e.$eq(a,i):Object.keys(i||{}).every(s=>{const c=i[s];if(s.startsWith("$")&&e[s]){const h=e[s];return typeof h=="function"?h(a,c):!1}return n(M(a,s),c)})}return n}function ie(t,e={}){return{$match:(n,a)=>t(n,a),$eq:(n,a)=>a instanceof RegExp?a.test(n):n===a,$ne:(n,a)=>a instanceof RegExp?!a.test(n):n!==a,$not:(n,a)=>!t(n,a),$and:(n,a)=>($(a,"$and requires an array as condition"),a.every(i=>t(n,i))),$or:(n,a)=>($(a,"$or requires an array as condition"),a.some(i=>t(n,i))),$in:(n,a)=>A(a).some(i=>Array.isArray(n)?t(n,{$contains:i}):t(n,i)),$contains:(n,a)=>(n=Array.isArray(n)?n:String(n),A(a).every(i=>n.includes(i))),$icontains:(n,a)=>{if(typeof a!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),A(a).every(i=>n.includes(i.toLocaleLowerCase()))},$containsAny:(n,a)=>($(a,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),a.some(i=>n.includes(i))),$exists:(n,a)=>a?typeof n<"u":typeof n>"u",$type:(n,a)=>typeof n===String(a),$regex:(n,a)=>{if(!(a instanceof RegExp)){const i=String(a).match(/\/(.*)\/([dgimsuy]*)$/);a=i?new RegExp(i[1],i[2]||""):new RegExp(a)}return a.test(String(n||""))},$lt:(n,a)=>n<a,$lte:(n,a)=>n<=a,$gt:(n,a)=>n>a,$gte:(n,a)=>n>=a,...e||{}}}function R(t){const e=ae(),n=(i,{query:s,before:c,after:h})=>{const r=typeof s=="string"?{_path:s}:s,u=i.findIndex(l=>e(l,r));c=c||1,h=h||1;const o=new Array(c+h).fill(null,0);return u===-1?o:o.map((l,m)=>i[u-c+m+Number(m>=c)]||null)},a=[(i,s)=>i.filter(c=>A(s.where).every(h=>e(c,h))),(i,s)=>A(s.sort).forEach(c=>T(i,c)),(i,s)=>s.surround?n(i,s.surround):i,(i,s)=>s.skip?i.slice(s.skip):i,(i,s)=>s.limit?i.slice(0,s.limit):i,(i,s)=>C(W(s.without))(i),(i,s)=>C(B(s.only))(i)];return async i=>{const s=await t(),c=i.params(),h=a.reduce((r,u)=>u(r,c)||r,s);return c.first?h[0]:h}}var se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},z={},oe={get exports(){return z},set exports(t){z=t}};(function(t,e){(function(n,a,i){t.exports=i(),t.exports.default=i()})("slugify",se,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),a=JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');function i(s,c){if(typeof s!="string")throw new Error("slugify: string argument expected");c=typeof c=="string"?{replacement:c}:c||{};var h=a[c.locale]||{},r=c.replacement===void 0?"-":c.replacement,u=c.trim===void 0?!0:c.trim,o=s.normalize().split("").reduce(function(l,m){var f=h[m]||n[m]||m;return f===r&&(f=" "),l+f.replace(c.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return c.strict&&(o=o.replace(/[^A-Za-z0-9\s]/g,"")),u&&(o=o.trim()),o=o.replace(/\s+/g,r),c.lower&&(o=o.toLowerCase()),o}return i.extend=function(s){Object.assign(n,s)},i})})(oe);const ce=t=>t.split(/[\s-]/g).map(J).join(" ");function ue(t,e){const{navigation:n}=K().content,a=s=>({...fe(["title",...n.fields])(s),...he(s==null?void 0:s.navigation)?s.navigation:{}}),i=t.sort((s,c)=>s._path.localeCompare(c._path)).reduce((s,c)=>{const h=c._path.substring(1).split("/"),r=c._id.split(":").slice(1),u=!!r[r.length-1].match(/([1-9][0-9]*\.)?index.md/g),o=f=>({title:f.title,_path:f._path,_file:f._file,children:[],...a(f),...f._draft?{_draft:!0}:{}}),l=o(c);if(u){const f=e[l._path];if(typeof(f==null?void 0:f.navigation)<"u"&&!(f!=null&&f.navigation))return s;if(c._path!=="/"){const d=o(c);l.children.push(d)}Object.assign(l,a(f))}return h.length===1?(s.push(l),s):(h.slice(0,-1).reduce((f,d,y)=>{const w="/"+h.slice(0,y+1).join("/"),v=e[w];if(typeof(v==null?void 0:v.navigation)<"u"&&!v.navigation)return[];let O=f.find(Y=>Y._path===w);return O||(O={title:ce(d),_path:w,_file:c._file,children:[],...a(v)},f.push(O)),O.children},s).push(l),s)},[]);return N(i)}const le=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function N(t){const e=t.sort((n,a)=>le.compare(n._file,a._file));for(const n of e)n.children.length?N(n.children):delete n.children,delete n._file;return t}function fe(t){return e=>(e=e||{},t&&t.length?t.filter(n=>typeof e[n]<"u").reduce((n,a)=>Object.assign(n,{[a]:e[a]}),{}):e)}function he(t){return Object.prototype.toString.call(t)==="[object Object]"}const me=t=>G(t,K().public.content.api.baseURL),ge=re(ne({driver:Z()}),"@content"),U=()=>H("previewToken").value;function pe(t){async function e(){const n=new Set(await t.getKeys("cache:")),a=U();if(a){(await t.getItem(`${a}$`).then(r=>r||{})).ignoreBuiltContents&&n.clear();const c=await t.getKeys(`${a}:`),h=await Promise.all(c.map(r=>t.getItem(r)));for(const r of h)n.delete(`cache:${r._id}`),r.__deleted||n.add(`${a}:${r._id}`)}return await Promise.all(Array.from(n).map(s=>t.getItem(s)))}return{storage:t,fetch:R(e),query:n=>b(R(e),n)}}let S=null,E=null;async function de(){return E?await E:S||(E=ye(),S=await E),S}async function ye(){const t=q(),{content:e}=K().public,n=pe(ge),a=await n.storage.getItem("integrity");if(e.integrity!==+(a||0)){const{contents:i,navigation:s}=await $fetch(me(e.integrity?`cache.${e.integrity}.json`:"cache.json"));await Promise.all(i.map(c=>n.storage.setItem(`cache:${c._id}`,c))),await n.storage.setItem("navigation",s),await n.storage.setItem("integrity",e.integrity)}return await t.callHook("content:storage",n.storage),n}async function ve(t){const e=await de();if(!U()&&Object.keys(t||{}).length===0)return e.storage.getItem("navigation");const n=await e.query(t).where({_partial:!1,navigation:{$ne:!1}}).find(),i=(await e.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((s,c)=>{var r;((r=c.title)==null?void 0:r.toLowerCase())==="dir"&&(c.title=void 0);const h=c._path.split("/").slice(0,-1).join("/")||"/";return s[h]={...c,...c.body},s},{});return ue(n,i)}export{ge as contentStorage,pe as createDB,ve as generateNavigation,U as getPreview,de as useContentDatabase};
