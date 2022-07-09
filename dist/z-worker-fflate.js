!function(){"use strict";const{Array:e,Object:t,Math:n,Error:s,Uint8Array:r,Uint16Array:a,Uint32Array:i,Int32Array:o,DataView:c,TextEncoder:l,crypto:h,postMessage:u,TransformStream:p,ReadableStream:f,WritableStream:d,CompressionStream:g,DecompressionStream:w}=globalThis,y=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;y[e]=t}class m{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,s=0|e.length;s>n;n++)t=t>>>8^y[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class _ extends p{constructor(){super({start(){this.crc32=new m},transform(e){this.crc32.append(e)},flush(e){const t=new r(4);new c(t.buffer).setUint32(0,this.crc32.get()),e.enqueue(t)}})}}const b={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],s=b.getPartial(n);return 32===s?e.concat(t):b._shiftRight(t,s,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+b.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const s=(e=e.slice(0,n.ceil(t/32))).length;return t&=31,s>0&&t&&(e[s-1]=b.partial(t,e[s-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>n.round(e/1099511627776)||32,_shiftRight(e,t,n,s){for(void 0===s&&(s=[]);t>=32;t-=32)s.push(n),n=0;if(0===t)return s.concat(e);for(let r=0;r<e.length;r++)s.push(n|e[r]>>>t),n=e[r]<<32-t;const r=e.length?e[e.length-1]:0,a=b.getPartial(r);return s.push(b.partial(t+a&31,t+a>32?n:s.pop(),1)),s}},k={bytes:{fromBits(e){const t=b.bitLength(e)/8,n=new r(t);let s;for(let r=0;t>r;r++)0==(3&r)&&(s=e[r/4]),n[r]=s>>>24,s<<=8;return n},toBits(e){const t=[];let n,s=0;for(n=0;n<e.length;n++)s=s<<8|e[n],3==(3&n)&&(t.push(s),s=0);return 3&n&&t.push(b.partial(8*(3&n),s)),t}}},v={sha1:function(e){e?(this._h=e._h.slice(0),this._buffer=e._buffer.slice(0),this._length=e._length):this.reset()}};v.sha1.prototype={blockSize:512,reset:function(){const e=this;return e._h=this._init.slice(0),e._buffer=[],e._length=0,e},update:function(e){const t=this;"string"==typeof e&&(e=k.utf8String.toBits(e));const n=t._buffer=b.concat(t._buffer,e),r=t._length,a=t._length=r+b.bitLength(e);if(a>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const o=new i(n);let c=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);a>=e;e+=t.blockSize)t._block(o.subarray(16*c,16*(c+1))),c+=1;return n.splice(0,16*c),t},finalize:function(){const e=this;let t=e._buffer;const s=e._h;t=b.concat(t,[b.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(n.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),s},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(e,t,n,s)=>e>19?e>39?e>59?e>79?void 0:t^n^s:t&n|t&s|n&s:t^n^s:t&n|~t&s,_S:(e,t)=>t<<e|t>>>32-e,_block:function(t){const s=this,r=s._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let i=r[0],o=r[1],c=r[2],l=r[3],h=r[4];for(let e=0;79>=e;e++){16>e||(a[e]=s._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=s._S(5,i)+s._f(e,o,c,l)+h+a[e]+s._key[n.floor(e/20)]|0;h=l,l=c,c=s._S(30,o),o=i,i=t}r[0]=r[0]+i|0,r[1]=r[1]+o|0,r[2]=r[2]+c|0,r[3]=r[3]+l|0,r[4]=r[4]+h|0}};const S={getRandomValues(e){const t=new i(e.buffer),s=e=>{let t=987654321;const s=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&s,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&s)&s)/4294967296+.5)*(n.random()>.5?1:-1))};for(let r,a=0;a<e.length;a+=4){const e=s(4294967296*(r||n.random()));r=987654071*e(),t[a/4]=4294967296*e()|0}return e}},T={importKey:e=>new T.hmacSha1(k.bytes.toBits(e)),pbkdf2(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const a=1+(r>>5)<<2;let i,o,l,h,u;const p=new ArrayBuffer(a),f=new c(p);let d=0;const g=b;for(t=k.bytes.toBits(t),u=1;(a||1)>d;u++){for(i=o=e.encrypt(g.concat(t,[u])),l=1;n>l;l++)for(o=e.encrypt(o),h=0;h<o.length;h++)i[h]^=o[h];for(l=0;(a||1)>d&&l<i.length;l++)f.setInt32(d,i[l]),d+=4}return p.slice(0,r/8)},hmacSha1:class{constructor(e){const t=this,n=t._hash=v.sha1,s=[[],[]],r=n.prototype.blockSize/32;t._baseHash=[new n,new n],e.length>r&&(e=n.hash(e));for(let t=0;r>t;t++)s[0][t]=909522486^e[t],s[1][t]=1549556828^e[t];t._baseHash[0].update(s[0]),t._baseHash[1].update(s[1]),t._resultHash=new n(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},D="Invalid pasword",z=16,C={name:"PBKDF2"},I=t.assign({hash:{name:"HMAC"}},C),R=t.assign({iterations:1e3,hash:{name:"SHA-1"}},C),V=["deriveBits"],q=[8,12,16],B=[16,24,32],H=10,A=[0,0,0,0],K="undefined",P="function",x=typeof h!=K,W=x&&typeof h.subtle!=K,U=x&&typeof h.getRandomValues==P,L=x&&W&&typeof h.subtle.importKey==P,M=x&&W&&typeof h.subtle.deriveBits==P,E=k.bytes,j=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],r=t._tables[1],a=e.length;let i,o,c,l=1;if(4!==a&&6!==a&&8!==a)throw new s("invalid aes key size");for(t._key=[o=e.slice(0),c=[]],i=a;4*a+28>i;i++){let e=o[i-1];(i%a==0||8===a&&i%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],i%a==0&&(e=e<<8^e>>>24^l<<24,l=l<<1^283*(l>>7))),o[i]=o[i-a]^e}for(let e=0;i;e++,i--){const t=o[3&e?i:i-4];c[e]=4>=i||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],s=t[4],r=[],a=[];let i,o,c,l;for(let e=0;256>e;e++)a[(r[e]=e<<1^283*(e>>7))^e]=e;for(let h=i=0;!n[h];h^=o||1,i=a[i]||1){let a=i^i<<1^i<<2^i<<3^i<<4;a=a>>8^255&a^99,n[h]=a,s[a]=h,l=r[c=r[o=r[h]]];let u=16843009*l^65537*c^257*o^16843008*h,p=257*r[a]^16843008*a;for(let n=0;4>n;n++)e[n][h]=p=p<<24^p>>>8,t[n][a]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this._key[t],r=n.length/4-2,a=[0,0,0,0],i=this._tables[t],o=i[0],c=i[1],l=i[2],h=i[3],u=i[4];let p,f,d,g=e[0]^n[0],w=e[t?3:1]^n[1],y=e[2]^n[2],m=e[t?1:3]^n[3],_=4;for(let e=0;r>e;e++)p=o[g>>>24]^c[w>>16&255]^l[y>>8&255]^h[255&m]^n[_],f=o[w>>>24]^c[y>>16&255]^l[m>>8&255]^h[255&g]^n[_+1],d=o[y>>>24]^c[m>>16&255]^l[g>>8&255]^h[255&w]^n[_+2],m=o[m>>>24]^c[g>>16&255]^l[w>>8&255]^h[255&y]^n[_+3],_+=4,g=p,w=f,y=d;for(let e=0;4>e;e++)a[t?3&-e:e]=u[g>>>24]<<24^u[w>>16&255]<<16^u[y>>8&255]<<8^u[255&m]^n[_++],p=g,g=w,w=y,y=m,m=p;return a}},O=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,s=255&e;255===t?(t=0,255===n?(n=0,255===s?s=0:++s):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=s}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let s;if(!(s=t.length))return[];const r=b.bitLength(t);for(let r=0;s>r;r+=4){this.incCounter(n);const s=e.encrypt(n);t[r]^=s[0],t[r+1]^=s[1],t[r+2]^=s[2],t[r+3]^=s[3]}return b.clamp(t,r)}},F=T.hmacSha1;class G extends p{constructor(n,a,i){let o;super({start(){t.assign(this,{ready:new Promise((e=>this.resolveReady=e)),password:n,signed:a,strength:i-1,pending:new r(0)})},async transform(t,n){const a=this;if(a.password){const n=a.password;a.password=null;const r=Y(t,0,q[a.strength]+2);await(async(e,t,n)=>{await Q(e,n,Y(t,0,q[e.strength]));const r=Y(t,q[e.strength]),a=e.keys.passwordVerification;if(a[0]!=r[0]||a[1]!=r[1])throw new s(D)})(a,r,n),a.ctr=new O(new j(a.keys.key),e.from(A)),a.hmac=new F(a.keys.authentication),t=Y(t,q[a.strength]+2),a.resolveReady()}else await a.ready;const i=new r(t.length-H-(t.length-H)%z);n.enqueue(N(a,t,i,0,H,!0))},async flush(e){const t=this;await t.ready;const n=t.pending,s=Y(n,0,n.length-H),a=Y(n,n.length-H);let i=new r(0);if(s.length){const e=$(E,s);t.hmac.update(e);const n=t.ctr.update(e);i=Z(E,n)}if(o.valid=!0,t.signed){const e=Y(Z(E,t.hmac.digest()),0,H);for(let t=0;H>t;t++)e[t]!=a[t]&&(o.valid=!1)}e.enqueue(i)}}),o=this}}class J extends p{constructor(n,s){let a;super({start(){t.assign(this,{ready:new Promise((e=>this.resolveReady=e)),password:n,strength:s-1,pending:new r(0)})},async transform(t,n){const s=this;let a=new r(0);if(s.password){const t=s.password;s.password=null,a=await(async(e,t)=>{const n=(s=new r(q[e.strength]),U?h.getRandomValues(s):S.getRandomValues(s));var s;return await Q(e,t,n),X(n,e.keys.passwordVerification)})(s,t),s.ctr=new O(new j(s.keys.key),e.from(A)),s.hmac=new F(s.keys.authentication),s.resolveReady()}else await s.ready;const i=new r(a.length+t.length-t.length%z);i.set(a,0),n.enqueue(N(s,t,i,a.length,0))},async flush(e){const t=this;await t.ready;let n=new r(0);if(t.pending.length){const e=t.ctr.update($(E,t.pending));t.hmac.update(e),n=Z(E,e)}a.signature=Z(E,t.hmac.digest()).slice(0,H),e.enqueue(X(n,a.signature))}}),a=this}}function N(e,t,n,s,a,i){const o=t.length-a;let c;for(e.pending.length&&(t=X(e.pending,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new r(t)).set(n,0)}return e})(n,o-o%z)),c=0;o-z>=c;c+=z){const r=$(E,Y(t,c,c+z));i&&e.hmac.update(r);const a=e.ctr.update(r);i||e.hmac.update(a),n.set(Z(E,a),c+s)}return e.pending=Y(t,c),n}async function Q(e,n,s){const a=(e=>{if(void 0===l){const t=new r((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new l).encode(e)})(n),i=await((e,t,n,s,r)=>L?h.subtle.importKey("raw",t,n,!1,r):T.importKey(t))(0,a,I,0,V),o=await(async(e,t,n)=>M?await h.subtle.deriveBits(e,t,n):T.pbkdf2(t,e.salt,R.iterations,n))(t.assign({salt:s},R),i,8*(2*B[e.strength]+2)),c=new r(o);e.keys={key:$(E,Y(c,0,B[e.strength])),authentication:$(E,Y(c,B[e.strength],2*B[e.strength])),passwordVerification:Y(c,2*B[e.strength])}}function X(e,t){let n=e;return e.length+t.length&&(n=new r(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function Y(e,t,n){return e.subarray(t,n)}function Z(e,t){return e.fromBits(t)}function $(e,t){return e.toBits(t)}class ee extends p{constructor(e,n){let r;super({start(){t.assign(this,{password:e,passwordVerification:n}),re(this,e)},transform(e,t){const n=this;if(n.password){const t=ne(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s(D);e=e.subarray(12)}t.enqueue(ne(n,e))},flush(){r.valid=!0}}),r=this}}class te extends p{constructor(e,n){super({start(){t.assign(this,{password:e,passwordVerification:n}),re(this,e)},transform(e,t){const n=this;let s,a;if(n.password){n.password=null;const t=h.getRandomValues(new r(12));t[11]=n.passwordVerification,s=new r(e.length+t.length),s.set(se(n,t),0),a=12}else s=new r(e.length),a=0;s.set(se(n,e),a),t.enqueue(s)},flush(){}})}}function ne(e,t){const n=new r(t.length);for(let s=0;s<t.length;s++)n[s]=ie(e)^t[s],ae(e,n[s]);return n}function se(e,t){const n=new r(t.length);for(let s=0;s<t.length;s++)n[s]=ie(e)^t[s],ae(e,t[s]);return n}function re(e,t){e.keys=[305419896,591751049,878082192],e.crcKey0=new m(e.keys[0]),e.crcKey2=new m(e.keys[2]);for(let n=0;n<t.length;n++)ae(e,t.charCodeAt(n))}function ae(e,t){e.crcKey0.append([t]),e.keys[0]=~e.crcKey0.get(),e.keys[1]=ce(e.keys[1]+oe(e.keys[0])),e.keys[1]=ce(n.imul(e.keys[1],134775813)+1),e.crcKey2.append([e.keys[1]>>>24]),e.keys[2]=~e.crcKey2.get()}function ie(e){const t=2|e.keys[2];return oe(n.imul(t,1^t)>>>8)}function oe(e){return 255&e}function ce(e){return 4294967295&e}class le extends p{constructor(e,t){let n;super({start(){n=new e(t)},transform(e,t){e=n.append(e),t.enqueue(e)},flush(e){const t=n.flush();t&&e.enqueue(t)}})}}const he="Invalid signature",ue="deflate-raw",pe="undefined",fe=typeof g==pe,de=typeof w==pe;let ge=!0,we=!0;class ye extends p{constructor(e,t,{chunkSize:n},...s){super({},...s);const{compressed:r,useCompressionStream:a,password:i,passwordVerification:o,encryptionStrength:l,zipCrypto:h,signed:u}=t,p=this;let f,d,w=be(super.readable);const y=!!i;if(y&&!h||!u||([w,f]=w.tee(),f=f.pipeThrough(new _)),r)if(void 0!==a&&!a||fe&&!we)w=_e(e,w,n);else try{const e=new g(ue);w=w.pipeThrough(e)}catch(t){we=!1,w=_e(e,w,n)}y&&(h?w=w.pipeThrough(new te(i,o)):(d=new J(i,l),w=w.pipeThrough(d))),ke(p,w,(async()=>{let e;y&&!h&&(e=d.signature),y&&!h||!u||(e=await f.getReader().read(),e=new c(e.value.buffer).getUint32(0)),p.signature=e}))}}class me extends p{constructor(e,t,{chunkSize:n},...r){super({},...r);const{zipCrypto:a,password:i,passwordVerification:o,signed:l,encryptionStrength:h,compressed:u,useCompressionStream:p}=t;let f,d,g=be(super.readable);const y=!!i;if(y&&(a?g=g.pipeThrough(new ee(i,o)):(d=new G(i,l,h),g=g.pipeThrough(d))),u)if(void 0!==p&&!p||de&&!ge)g=_e(e,g,n);else try{g=g.pipeThrough(new w(ue))}catch(t){ge=!1,g=_e(e,g,n)}y&&!a||!l||([g,f]=g.tee(),f=f.pipeThrough(new _)),ke(this,g,(async()=>{if(y&&!a&&!d.valid)throw new s(he);if((!y||a)&&l){const e=await f.getReader().read();if(e!=new c(e.value.buffer).getUint32(0,!1))throw new s(he)}}))}}function _e(e,t,n){return t.pipeThrough(new le(e,{chunkSize:n}))}function be(e){return e.pipeThrough(new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ke(e,n,s){e.length=0,n=n.pipeThrough(new p({transform(t,n){t&&t.length&&(e.length+=t.length,n.enqueue(t))},flush:s})),t.defineProperty(e,"readable",{get:()=>n})}const ve="deflate",Se="inflate",Te="data",De=new Map;let ze,Ce=0;function Ie(e){if(e.data){const t=e.data;if(t&&t.length)try{e.data=t.buffer,u(e,[e.data])}catch(t){u(e)}else u(e)}else u(e)}function Re(e,n,s){return class{constructor(a){const i=this;a.hasOwnProperty("level")&&void 0===a.level&&delete a.level,i.codec=new e(t.assign({},n,a)),s(i.codec,(e=>{if(i.pendingData){const t=i.pendingData;i.pendingData=new r(t.length+e.length),i.pendingData.set(t,0),i.pendingData.set(e,t.length)}else i.pendingData=new r(e)}))}append(e){return this.codec.push(e),a(this)}flush(){return this.codec.push(new r(0),!0),a(this)}};function a(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new r(0)}}addEventListener("message",(async e=>{const t=e.data,n=t.type;try{if("start"==n&&(async e=>{try{e.scripts&&e.scripts.length&&importScripts.apply(void 0,e.scripts);const t=e.options;let n;self.initCodec&&self.initCodec(),t.codecType.startsWith(ve)?n=self.Deflate:t.codecType.startsWith(Se)&&(n=self.Inflate);const s=new f({async pull(e){let t=new Promise(((e,t)=>De.set(Ce,{resolve:e,reject:t})));Ie({type:"pull",messageId:Ce}),Ce++;const{value:n,done:s}=await t;e.enqueue(n),s&&e.close()}},{highWaterMark:1}),r=new d({write(e){Ie({type:Te,data:e})}});ze=((e,t,n,s,r)=>{const a=new AbortController,{signal:i}=a;if(s.codecType.startsWith(ve))return{run:()=>o(ye),abort:c};if(s.codecType.startsWith(Se))return{run:()=>o(me),abort:c};async function o(a){const o=new a(e,s,r);await t.pipeThrough(o,{signal:i}).pipeTo(n);const{length:c,signature:l}=o;return{length:c,signature:l}}function c(){a.abort()}})(n,s,r,t,e.config),Ie({type:"close",result:await ze.run()})}catch(e){u({error:{message:e.message,stack:e.stack}})}})(t),n==Te){const{resolve:e}=De.get(t.messageId);De.delete(t.messageId),e({value:new r(t.data),done:t.done})}"abort"==n&&ze.abort()}catch(e){u({error:{message:e.message,stack:e.stack}})}})),self.initCodec=()=>{const{Deflate:e,Inflate:t}=((e,t={},n)=>({Deflate:Re(e.Deflate,t.deflate,n),Inflate:Re(e.Inflate,t.inflate,n)}))(fflate,void 0,((e,t)=>e.ondata=t));self.Deflate=e,self.Inflate=t}}();
