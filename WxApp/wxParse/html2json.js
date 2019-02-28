"use strict";function makeMap(e){for(var t={},r=e.split(","),o=0;o<r.length;o++)t[r[o]]=!0;return t}function q(e){return'"'+e+'"'}function removeDOCTYPE(e){return e.replace(/<\?xml.*\?>\n/,"").replace(/<.*!doctype.*\>\n/,"").replace(/<.*!DOCTYPE.*\>\n/,"")}function trimHtml(e){return e.replace(/\n+/g,"").replace(/<!--.*?-->/gi,"").replace(/\/\*.*?\*\//gi,"").replace(/[ ]+</gi,"<")}function html2json(e,t){var r=[],o={node:t,nodes:[],images:[],imageUrls:[]},s=0;return HTMLParser(e,{start:function(e,i,a){var n={node:"element",tag:e};if(0===r.length)n.index=s.toString(),s+=1;else{var l=r[0];void 0===l.nodes&&(l.nodes=[]),n.index=l.index+"."+l.nodes.length}if(block[e]?n.tagType="block":inline[e]?n.tagType="inline":closeSelf[e]&&(n.tagType="closeSelf"),0!==i.length&&(n.attr=i.reduce(function(e,t){var r=t.name,o=t.value;if("class"==r&&(n.classStr=o),"style"==r&&(n.styleStr?n.styleStr+=";"+o:n.styleStr=o),"align"==r&&(n.styleStr?n.styleStr+=";text-align:center":n.styleStr="text-align:center"),("table"==n.tag||"tr"==n.tag||"td"==n.tag)&&"width"==r){var s=t.value.split("%")[0];s=Number(s)/100;var i=Number(wx.getSystemInfoSync().windowWidth-20),a=Number(s)*i;n.styleStr?n.styleStr+=";width:"+a+"px;box-sizing: border-box;- moz - box - sizing: border - box;-webkit - box - sizing: border - box;":n.styleStr="width:"+a+"px;box-sizing: border-box;- moz - box - sizing: border - box;-webkit - box - sizing: border - box;"}return o.match(/ /)&&(o=o.split(" ")),e[r]?Array.isArray(e[r])?e[r].push(o):e[r]=[e[r],o]:e[r]=o,e},{})),"img"===n.tag){n.imgIndex=o.images.length;var d=n.attr.src;""==d[0]&&d.splice(0,1),d=wxDiscode.urlToHttpUrl(d,__placeImgeUrlHttps),n.attr.src=d,n.from=t,o.images.push(n),o.imageUrls.push(d)}if("font"===n.tag||"p"===n.tag){var c=["x-small","small","medium","large","x-large","xx-large","-webkit-xxx-large"],p=["36rpx","40rpx","48rpx","50rpx","60rpx","72rpx","104rpx"],m={color:"color",face:"font-family",size:"font-size"};"font"===n.tag&&n.hasOwnProperty("attr")&&n.attr.hasOwnProperty("style")&&(n.attr.style||(n.attr.style=[]),n.styleStr||(n.styleStr=""));for(var g in m)if("color"===g&&(n.styleStr?n.styleStr=";padding: 10rpx 0;box-sizing: border-box;- moz - box - sizing: border - box;-webkit - box - sizing: border - box;"+n.styleStr:n.styleStr="padding: 10rpx 0;box-sizing: border-box;- moz - box - sizing: border - box;-webkit - box - sizing: border - box;"),n.hasOwnProperty("attr")&&"font"===n.tag&&n.attr[g]){var b="size"===g?c[n.attr[g]-1]:n.attr[g];n.attr.hasOwnProperty("style")&&(n.attr.style.push(m[g]),n.attr.style.push(b));var x="";isNaN(n.attr[g])||(x="line-height:"+p[n.attr[g]-1]),n.styleStr+=m[g]+": "+b+";"+x}}if("source"===n.tag&&(o.source=n.attr.src),a){var l=r[0]||o;void 0===l.nodes&&(l.nodes=[]),l.nodes.push(n)}else r.unshift(n)},end:function(e){var t=r.shift();if(t.tag!==e&&console.error("invalid state: mismatch end tag"),"video"===t.tag&&o.source&&(t.attr.src=o.source,delete result.source),0===r.length)o.nodes.push(t);else{var s=r[0];void 0===s.nodes&&(s.nodes=[]),s.nodes.push(t)}},chars:function(e){e=wxDiscode.strDiscode(e);var t={node:"text",text:e,textArray:transEmojiStr(e)};if(0===r.length)o.nodes.push(t);else{var s=r[0];void 0===s.nodes&&(s.nodes=[]),t.index=s.index+"."+s.nodes.length,s.nodes.push(t)}},comment:function(e){}}),o}function transEmojiStr(e){var t=[];if(0==__emojisReg.length||!__emojis){var r={};return r.node="text",r.text=e,s=[r]}e=e.replace(/\[([^\[\]]+)\]/g,":$1:");for(var o=new RegExp("[:]"),s=e.split(o),i=0;i<s.length;i++){var a=s[i],r={};__emojis[a]?(r.node="element",r.tag="emoji",r.text=__emojis[a],r.baseSrc=__emojisBaseSrc):(r.node="text",r.text=a),t.push(r)}return t}function emojisInit(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"/wxParse/emojis/",r=arguments[2];__emojisReg=e,__emojisBaseSrc=t,__emojis=r}var __placeImgeUrlHttps="https",__emojisReg="",__emojisBaseSrc="",__emojis={},wxDiscode=require("./wxDiscode.js"),HTMLParser=require("./htmlparser.js"),empty=makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"),block=makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),inline=makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),closeSelf=makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),fillAttrs=makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),special=makeMap("wxxxcode-style,script,style,view,scroll-view,block");module.exports={html2json:html2json,emojisInit:emojisInit};