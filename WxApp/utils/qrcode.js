"use strict";var QR=function(){function r(r,o){var f;r>o&&(f=r,r=o,o=f),f=o,f*=o,f+=o,f>>=1,f+=r,M[f]=1}function o(o,f){var e;for(S[o+s*f]=1,e=-2;e<2;e++)S[o+e+s*(f-2)]=1,S[o-2+s*(f+e+1)]=1,S[o+2+s*(f+e)]=1,S[o+e+1+s*(f+2)]=1;for(e=0;e<2;e++)r(o-1,f+e),r(o+1,f-e),r(o-e,f-1),r(o+e,f+1)}function f(r){for(;r>=255;)r-=255,r=(r>>8)+(255&r);return r}function e(r,o,e,t){var n,a,c;for(n=0;n<t;n++)k[e+n]=0;for(n=0;n<o;n++){if(255!=(c=w[k[r+n]^k[e]]))for(a=1;a<t;a++)k[e+a-1]=k[e+a]^m[f(c+F[t-a])];else for(a=e;a<e+t;a++)k[a]=k[a+1];k[e+t-1]=255==c?0:m[f(c+F[0])]}}function t(r,o){var f;return r>o&&(f=r,r=o,o=f),f=o,f+=o*o,f>>=1,f+=r,M[f]}function n(r){var o,f,e,n;switch(r){case 0:for(f=0;f<s;f++)for(o=0;o<s;o++)o+f&1||t(o,f)||(S[o+f*s]^=1);break;case 1:for(f=0;f<s;f++)for(o=0;o<s;o++)1&f||t(o,f)||(S[o+f*s]^=1);break;case 2:for(f=0;f<s;f++)for(e=0,o=0;o<s;o++,e++)3==e&&(e=0),e||t(o,f)||(S[o+f*s]^=1);break;case 3:for(n=0,f=0;f<s;f++,n++)for(3==n&&(n=0),e=n,o=0;o<s;o++,e++)3==e&&(e=0),e||t(o,f)||(S[o+f*s]^=1);break;case 4:for(f=0;f<s;f++)for(e=0,n=f>>1&1,o=0;o<s;o++,e++)3==e&&(e=0,n=!n),n||t(o,f)||(S[o+f*s]^=1);break;case 5:for(n=0,f=0;f<s;f++,n++)for(3==n&&(n=0),e=0,o=0;o<s;o++,e++)3==e&&(e=0),(o&f&1)+!(!e|!n)||t(o,f)||(S[o+f*s]^=1);break;case 6:for(n=0,f=0;f<s;f++,n++)for(3==n&&(n=0),e=0,o=0;o<s;o++,e++)3==e&&(e=0),(o&f&1)+(e&&e==n)&1||t(o,f)||(S[o+f*s]^=1);break;case 7:for(n=0,f=0;f<s;f++,n++)for(3==n&&(n=0),e=0,o=0;o<s;o++,e++)3==e&&(e=0),(e&&e==n)+(o+f&1)&1||t(o,f)||(S[o+f*s]^=1)}}function a(r){var o,f=0;for(o=0;o<=r;o++)O[o]>=5&&(f+=p+O[o]-5);for(o=3;o<r-1;o+=2)O[o-2]==O[o+2]&&O[o+2]==O[o-1]&&O[o-1]==O[o+1]&&3*O[o-1]==O[o]&&(0==O[o-3]||o+3>r||3*O[o-3]>=4*O[o]||3*O[o+3]>=4*O[o])&&(f+=Q);return f}function c(){var r,o,f,e,t,n=0,c=0;for(o=0;o<s-1;o++)for(r=0;r<s-1;r++)(S[r+s*o]&&S[r+1+s*o]&&S[r+s*(o+1)]&&S[r+1+s*(o+1)]||!(S[r+s*o]||S[r+1+s*o]||S[r+s*(o+1)]||S[r+1+s*(o+1)]))&&(n+=A);for(o=0;o<s;o++){for(O[0]=0,f=e=r=0;r<s;r++)(t=S[r+s*o])==e?O[f]++:O[++f]=1,e=t,c+=e?1:-1;n+=a(f)}c<0&&(c=-c);var i=c,u=0;for(i+=i<<2,i<<=1;i>s*s;)i-=s*s,u++;for(n+=u*y,r=0;r<s;r++){for(O[0]=0,f=e=o=0;o<s;o++)(t=S[r+s*o])==e?O[f]++:O[++f]=1,e=t;n+=a(f)}return n}function i(a){var i,O,p,A,Q,y,z,N;A=a.length,u=0;do{if(u++,p=4*(x-1)+16*(u-1),l=j[p++],v=j[p++],d=j[p++],h=j[p],p=d*(l+v)+v-3+(u<=9),A<=p)break}while(u<40);for(s=17+4*u,Q=d+(d+h)*(l+v)+v,A=0;A<Q;A++)R[A]=0;for(k=a.slice(0),A=0;A<s*s;A++)S[A]=0;for(A=0;A<(s*(s+1)+1)/2;A++)M[A]=0;for(A=0;A<3;A++){for(p=0,O=0,1==A&&(p=s-7),2==A&&(O=s-7),S[O+3+s*(p+3)]=1,i=0;i<6;i++)S[O+i+s*p]=1,S[O+s*(p+i+1)]=1,S[O+6+s*(p+i)]=1,S[O+i+1+s*(p+6)]=1;for(i=1;i<5;i++)r(O+i,p+1),r(O+1,p+i+1),r(O+5,p+i),r(O+i+1,p+5);for(i=2;i<4;i++)S[O+i+s*(p+2)]=1,S[O+2+s*(p+i+1)]=1,S[O+4+s*(p+i)]=1,S[O+i+1+s*(p+4)]=1}if(u>1)for(A=b[u],O=s-7;;){for(i=s-7;i>A-3&&(o(i,O),!(i<A));)i-=A;if(O<=A+9)break;O-=A,o(6,O),o(O,6)}for(S[8+s*(s-8)]=1,O=0;O<7;O++)r(7,O),r(s-8,O),r(7,O+s-7);for(i=0;i<8;i++)r(i,7),r(i+s-8,7),r(i,s-8);for(i=0;i<9;i++)r(i,8);for(i=0;i<8;i++)r(i+s-8,8),r(8,i);for(O=0;O<7;O++)r(8,O+s-7);for(i=0;i<s-14;i++)1&i?(r(8+i,6),r(6,8+i)):(S[8+i+6*s]=1,S[6+s*(8+i)]=1);if(u>6)for(A=g[u-7],p=17,i=0;i<6;i++)for(O=0;O<3;O++,p--)1&(p>11?u>>p-12:A>>p)?(S[5-i+s*(2-O+s-11)]=1,S[2-O+s-11+s*(5-i)]=1):(r(5-i,2-O+s-11),r(2-O+s-11,5-i));for(O=0;O<s;O++)for(i=0;i<=O;i++)S[i+s*O]&&r(i,O);for(Q=k.length,y=0;y<Q;y++)R[y]=k.charCodeAt(y);if(k=R.slice(0),i=d*(l+v)+v,Q>=i-2&&(Q=i-2,u>9&&Q--),y=Q,u>9){for(k[y+2]=0,k[y+3]=0;y--;)A=k[y],k[y+3]|=255&A<<4,k[y+2]=A>>4;k[2]|=255&Q<<4,k[1]=Q>>4,k[0]=64|Q>>12}else{for(k[y+1]=0,k[y+2]=0;y--;)A=k[y],k[y+2]|=255&A<<4,k[y+1]=A>>4;k[1]|=255&Q<<4,k[0]=64|Q>>4}for(y=Q+3-(u<10);y<i;)k[y++]=236,k[y++]=17;for(F[0]=1,y=0;y<h;y++){for(F[y+1]=1,z=y;z>0;z--)F[z]=F[z]?F[z-1]^m[f(w[F[z]]+y)]:F[z-1];F[0]=m[f(w[F[0]]+y)]}for(y=0;y<=h;y++)F[y]=w[F[y]];for(p=i,O=0,y=0;y<l;y++)e(O,d,p,h),O+=d,p+=h;for(y=0;y<v;y++)e(O,d+1,p,h),O+=d+1,p+=h;for(O=0,y=0;y<d;y++){for(z=0;z<l;z++)R[O++]=k[y+z*d];for(z=0;z<v;z++)R[O++]=k[l*d+y+z*(d+1)]}for(z=0;z<v;z++)R[O++]=k[l*d+y+z*(d+1)];for(y=0;y<h;y++)for(z=0;z<l+v;z++)R[O++]=k[i+y+z*h];for(k=R,i=O=s-1,p=Q=1,N=(d+h)*(l+v)+v,y=0;y<N;y++)for(A=k[y],z=0;z<8;z++,A<<=1){128&A&&(S[i+s*O]=1);do{Q?i--:(i++,p?0!=O?O--:(i-=2,p=!p,6==i&&(i--,O=9)):O!=s-1?O++:(i-=2,p=!p,6==i&&(i--,O-=8))),Q=!Q}while(t(i,O))}for(k=S.slice(0),A=0,O=3e4,p=0;p<8&&(n(p),i=c(),i<O&&(O=i,A=p),7!=A);p++)S=k.slice(0);for(A!=p&&n(A),O=C[A+(x-1<<3)],p=0;p<8;p++,O>>=1)1&O&&(S[s-1-p+8*s]=1,p<6?S[8+s*p]=1:S[8+s*(p+1)]=1);for(p=0;p<7;p++,O>>=1)1&O&&(S[8+s*(s-7+p)]=1,p?S[6-p+8*s]=1:S[7+8*s]=1);return S}var u,s,l,v,d,h,b=[0,11,15,19,23,27,31,16,18,20,22,24,26,28,20,22,24,24,26,28,28,22,24,24,26,26,28,28,24,24,26,26,26,28,28,24,26,26,26,28,28],g=[3220,1468,2713,1235,3062,1890,2119,1549,2344,2936,1117,2583,1330,2470,1667,2249,2028,3780,481,4011,142,3098,831,3445,592,2517,1776,2234,1951,2827,1070,2660,1345,3177],C=[30660,29427,32170,30877,26159,25368,27713,26998,21522,20773,24188,23371,17913,16590,20375,19104,13663,12392,16177,14854,9396,8579,11994,11245,5769,5054,7399,6608,1890,597,3340,2107],j=[1,0,19,7,1,0,16,10,1,0,13,13,1,0,9,17,1,0,34,10,1,0,28,16,1,0,22,22,1,0,16,28,1,0,55,15,1,0,44,26,2,0,17,18,2,0,13,22,1,0,80,20,2,0,32,18,2,0,24,26,4,0,9,16,1,0,108,26,2,0,43,24,2,2,15,18,2,2,11,22,2,0,68,18,4,0,27,16,4,0,19,24,4,0,15,28,2,0,78,20,4,0,31,18,2,4,14,18,4,1,13,26,2,0,97,24,2,2,38,22,4,2,18,22,4,2,14,26,2,0,116,30,3,2,36,22,4,4,16,20,4,4,12,24,2,2,68,18,4,1,43,26,6,2,19,24,6,2,15,28,4,0,81,20,1,4,50,30,4,4,22,28,3,8,12,24,2,2,92,24,6,2,36,22,4,6,20,26,7,4,14,28,4,0,107,26,8,1,37,22,8,4,20,24,12,4,11,22,3,1,115,30,4,5,40,24,11,5,16,20,11,5,12,24,5,1,87,22,5,5,41,24,5,7,24,30,11,7,12,24,5,1,98,24,7,3,45,28,15,2,19,24,3,13,15,30,1,5,107,28,10,1,46,28,1,15,22,28,2,17,14,28,5,1,120,30,9,4,43,26,17,1,22,28,2,19,14,28,3,4,113,28,3,11,44,26,17,4,21,26,9,16,13,26,3,5,107,28,3,13,41,26,15,5,24,30,15,10,15,28,4,4,116,28,17,0,42,26,17,6,22,28,19,6,16,30,2,7,111,28,17,0,46,28,7,16,24,30,34,0,13,24,4,5,121,30,4,14,47,28,11,14,24,30,16,14,15,30,6,4,117,30,6,14,45,28,11,16,24,30,30,2,16,30,8,4,106,26,8,13,47,28,7,22,24,30,22,13,15,30,10,2,114,28,19,4,46,28,28,6,22,28,33,4,16,30,8,4,122,30,22,3,45,28,8,26,23,30,12,28,15,30,3,10,117,30,3,23,45,28,4,31,24,30,11,31,15,30,7,7,116,30,21,7,45,28,1,37,23,30,19,26,15,30,5,10,115,30,19,10,47,28,15,25,24,30,23,25,15,30,13,3,115,30,2,29,46,28,42,1,24,30,23,28,15,30,17,0,115,30,10,23,46,28,10,35,24,30,19,35,15,30,17,1,115,30,14,21,46,28,29,19,24,30,11,46,15,30,13,6,115,30,14,23,46,28,44,7,24,30,59,1,16,30,12,7,121,30,12,26,47,28,39,14,24,30,22,41,15,30,6,14,121,30,6,34,47,28,46,10,24,30,2,64,15,30,17,4,122,30,29,14,46,28,49,10,24,30,24,46,15,30,4,18,122,30,13,32,46,28,48,14,24,30,42,32,15,30,20,4,117,30,40,7,47,28,43,22,24,30,10,67,15,30,19,6,118,30,18,31,47,28,34,34,24,30,20,61,15,30],w=[255,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175],m=[1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,0],k=[],R=[],S=[],M=[],O=[],x=2,F=[],p=3,A=3,Q=40,y=10,z=null,N={get ecclevel(){return x},set ecclevel(r){x=r},get size(){return _size},set size(r){_size=r},get canvas(){return z},set canvas(r){z=r},getFrame:function(r){return i(r)},utf16to8:function(r){var o,f,e,t;for(o="",e=r.length,f=0;f<e;f++)t=r.charCodeAt(f),t>=1&&t<=127?o+=r.charAt(f):t>2047?(o+=String.fromCharCode(224|t>>12&15),o+=String.fromCharCode(128|t>>6&63),o+=String.fromCharCode(128|t>>0&63)):(o+=String.fromCharCode(192|t>>6&31),o+=String.fromCharCode(128|t>>0&63));return o},draw:function(r,o,f,e,t){if(x=t||x,!(o=o||z))return void console.warn("No canvas provided to draw QR code in!");var n=Math.min(f,e);r=this.utf16to8(r),console.log(r);var a=this.getFrame(r),c=wx.createCanvasContext(o),i=Math.round(n/(s+8)),u=i*(s+8),l=Math.floor((n-u)/2);n=u,c.clearRect(0,0,f,f),c.setFillStyle("#000000");for(var v=0;v<s;v++)for(var d=0;d<s;d++)a[d*s+v]&&c.fillRect(i*(4+v)+l,i*(4+d)+l,i,i);c.draw()},init:function(r,o,f,e,t,n,a){if(x=a||x,!(o=o||z))return void console.warn("No canvas provided to draw QR code in!");var c=Math.min(t,n);r=this.utf16to8(r),console.log(r);var i=this.getFrame(r),u=wx.createCanvasContext(o),l=Math.round(c/(s+8)),v=l*(s+8),d=Math.floor((c-v)/2);c=v,u.clearRect(f,e,t,n),u.setFillStyle("#000000");for(var h=0;h<s;h++)for(var b=0;b<s;b++)i[b*s+h]&&u.fillRect(l*(4+h)+d+f,l*(4+b)+d+e,l,l);u.draw()}};module.exports={qrApi:N}}();