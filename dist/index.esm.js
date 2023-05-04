var LIB=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){t.exports=r(2)},function(t,e){function r(t){this.mode=o.MODE_8BIT_BYTE,this.data=t,this.parsedData=[];for(var e=0,r=this.data.length;e<r;e++){var n=[],i=this.data.charCodeAt(e);i>65536?(n[0]=240|(1835008&i)>>>18,n[1]=128|(258048&i)>>>12,n[2]=128|(4032&i)>>>6,n[3]=128|63&i):i>2048?(n[0]=224|(61440&i)>>>12,n[1]=128|(4032&i)>>>6,n[2]=128|63&i):i>128?(n[0]=192|(1984&i)>>>6,n[1]=128|63&i):n[0]=i,this.parsedData.push(n)}this.parsedData=Array.prototype.concat.apply([],this.parsedData),this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function n(t,e){this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}r.prototype={getLength:function(t){return this.parsedData.length},write:function(t){for(var e=0,r=this.parsedData.length;e<r;e++)t.put(this.parsedData[e],8)}},n.prototype={addData:function(t){var e=new r(t);this.dataList.push(e),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(t,e){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var r=0;r<this.moduleCount;r++){this.modules[r]=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++)this.modules[r][o]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(t,e),this.typeNumber>=7&&this.setupTypeNumber(t),null==this.dataCache&&(this.dataCache=n.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,e)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(this.modules[t+r][e+n]=0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=v.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){var n=t.createEmptyMovieClip(e,r);this.make();for(var o=0;o<this.modules.length;o++)for(var i=1*o,s=0;s<this.modules[o].length;s++){var a=1*s;this.modules[o][s]&&(n.beginFill(0,100),n.moveTo(a,i),n.lineTo(a+1,i),n.lineTo(a+1,i+1),n.lineTo(a,i+1),n.endFill())}return n},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=v.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],o=t[r];if(null==this.modules[n][o])for(var i=-2;i<=2;i++)for(var s=-2;s<=2;s++)this.modules[n+i][o+s]=-2==i||2==i||-2==s||2==s||0==i&&0==s}},setupTypeNumber:function(t){for(var e=v.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;r<18;r++){n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=v.getBCHTypeInfo(r),o=0;o<15;o++){var i=!t&&1==(n>>o&1);o<6?this.modules[o][8]=i:o<8?this.modules[o+1][8]=i:this.modules[this.moduleCount-15+o][8]=i}for(o=0;o<15;o++){i=!t&&1==(n>>o&1);o<8?this.modules[8][this.moduleCount-o-1]=i:o<9?this.modules[8][15-o-1+1]=i:this.modules[8][15-o-1]=i}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,o=7,i=0,s=this.moduleCount-1;s>0;s-=2)for(6==s&&s--;;){for(var a=0;a<2;a++)if(null==this.modules[n][s-a]){var u=!1;i<t.length&&(u=1==(t[i]>>>o&1)),v.getMask(e,n,s-a)&&(u=!u),this.modules[n][s-a]=u,-1==--o&&(i++,o=7)}if((n+=r)<0||this.moduleCount<=n){n-=r,r=-r;break}}}},n.PAD0=236,n.PAD1=17,n.createData=function(t,e,r){for(var o=B.getRSBlocks(t,e),i=new L,s=0;s<r.length;s++){var a=r[s];i.put(a.mode,4),i.put(a.getLength(),v.getLengthInBits(a.mode,t)),a.write(i)}var u=0;for(s=0;s<o.length;s++)u+=o[s].dataCount;if(i.getLengthInBits()>8*u)throw new Error("code length overflow. ("+i.getLengthInBits()+">"+8*u+")");for(i.getLengthInBits()+4<=8*u&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(!1);for(;!(i.getLengthInBits()>=8*u||(i.put(n.PAD0,8),i.getLengthInBits()>=8*u));)i.put(n.PAD1,8);return n.createBytes(i,o)},n.createBytes=function(t,e){for(var r=0,n=0,o=0,i=new Array(e.length),s=new Array(e.length),a=0;a<e.length;a++){var u=e[a].dataCount,h=e[a].totalCount-u;n=Math.max(n,u),o=Math.max(o,h),i[a]=new Array(u);for(var g=0;g<i[a].length;g++)i[a][g]=255&t.buffer[g+r];r+=u;var f=v.getErrorCorrectPolynomial(h),l=new _(i[a],f.getLength()-1).mod(f);s[a]=new Array(f.getLength()-1);for(g=0;g<s[a].length;g++){var c=g+l.getLength()-s[a].length;s[a][g]=c>=0?l.get(c):0}}var d=0;for(g=0;g<e.length;g++)d+=e[g].totalCount;var p=new Array(d),m=0;for(g=0;g<n;g++)for(a=0;a<e.length;a++)g<i[a].length&&(p[m++]=i[a][g]);for(g=0;g<o;g++)for(a=0;a<e.length;a++)g<s[a].length&&(p[m++]=s[a][g]);return p};for(var o={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},i=1,s=0,a=3,u=2,h=0,g=1,f=2,l=3,c=4,d=5,p=6,m=7,v={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;v.getBCHDigit(e)-v.getBCHDigit(v.G15)>=0;)e^=v.G15<<v.getBCHDigit(e)-v.getBCHDigit(v.G15);return(t<<10|e)^v.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;v.getBCHDigit(e)-v.getBCHDigit(v.G18)>=0;)e^=v.G18<<v.getBCHDigit(e)-v.getBCHDigit(v.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return v.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,r){switch(t){case h:return(e+r)%2==0;case g:return e%2==0;case f:return r%3==0;case l:return(e+r)%3==0;case c:return(Math.floor(e/2)+Math.floor(r/3))%2==0;case d:return e*r%2+e*r%3==0;case p:return(e*r%2+e*r%3)%2==0;case m:return(e*r%3+(e+r)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new _([1],0),r=0;r<t;r++)e=e.multiply(new _([1,w.gexp(r)],0));return e},getLengthInBits:function(t,e){if(1<=e&&e<10)switch(t){case o.MODE_NUMBER:return 10;case o.MODE_ALPHA_NUM:return 9;case o.MODE_8BIT_BYTE:case o.MODE_KANJI:return 8;default:throw new Error("mode:"+t)}else if(e<27)switch(t){case o.MODE_NUMBER:return 12;case o.MODE_ALPHA_NUM:return 11;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 10;default:throw new Error("mode:"+t)}else{if(!(e<41))throw new Error("type:"+e);switch(t){case o.MODE_NUMBER:return 14;case o.MODE_ALPHA_NUM:return 13;case o.MODE_8BIT_BYTE:return 16;case o.MODE_KANJI:return 12;default:throw new Error("mode:"+t)}}},getLostPoint:function(t){for(var e=t.getModuleCount(),r=0,n=0;n<e;n++)for(var o=0;o<e;o++){for(var i=0,s=t.isDark(n,o),a=-1;a<=1;a++)if(!(n+a<0||e<=n+a))for(var u=-1;u<=1;u++)o+u<0||e<=o+u||0==a&&0==u||s==t.isDark(n+a,o+u)&&i++;i>5&&(r+=3+i-5)}for(n=0;n<e-1;n++)for(o=0;o<e-1;o++){var h=0;t.isDark(n,o)&&h++,t.isDark(n+1,o)&&h++,t.isDark(n,o+1)&&h++,t.isDark(n+1,o+1)&&h++,0!=h&&4!=h||(r+=3)}for(n=0;n<e;n++)for(o=0;o<e-6;o++)t.isDark(n,o)&&!t.isDark(n,o+1)&&t.isDark(n,o+2)&&t.isDark(n,o+3)&&t.isDark(n,o+4)&&!t.isDark(n,o+5)&&t.isDark(n,o+6)&&(r+=40);for(o=0;o<e;o++)for(n=0;n<e-6;n++)t.isDark(n,o)&&!t.isDark(n+1,o)&&t.isDark(n+2,o)&&t.isDark(n+3,o)&&t.isDark(n+4,o)&&!t.isDark(n+5,o)&&t.isDark(n+6,o)&&(r+=40);var g=0;for(o=0;o<e;o++)for(n=0;n<e;n++)t.isDark(n,o)&&g++;return r+=10*(Math.abs(100*g/e/e-50)/5)}},w={glog:function(t){if(t<1)throw new Error("glog("+t+")");return w.LOG_TABLE[t]},gexp:function(t){for(;t<0;)t+=255;for(;t>=256;)t-=255;return w.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},E=0;E<8;E++)w.EXP_TABLE[E]=1<<E;for(E=8;E<256;E++)w.EXP_TABLE[E]=w.EXP_TABLE[E-4]^w.EXP_TABLE[E-5]^w.EXP_TABLE[E-6]^w.EXP_TABLE[E-8];for(E=0;E<255;E++)w.LOG_TABLE[w.EXP_TABLE[E]]=E;function _(t,e){if(null==t.length)throw new Error(t.length+"/"+e);for(var r=0;r<t.length&&0==t[r];)r++;this.num=new Array(t.length-r+e);for(var n=0;n<t.length-r;n++)this.num[n]=t[n+r]}function B(t,e){this.totalCount=t,this.dataCount=e}function L(){this.buffer=[],this.length=0}_.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),r=0;r<this.getLength();r++)for(var n=0;n<t.getLength();n++)e[r+n]^=w.gexp(w.glog(this.get(r))+w.glog(t.get(n)));return new _(e,0)},mod:function(t){if(this.getLength()-t.getLength()<0)return this;for(var e=w.glog(this.get(0))-w.glog(t.get(0)),r=new Array(this.getLength()),n=0;n<this.getLength();n++)r[n]=this.get(n);for(n=0;n<t.getLength();n++)r[n]^=w.gexp(w.glog(t.get(n))+e);return new _(r,0).mod(t)}},B.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],B.getRSBlocks=function(t,e){var r=B.getRsBlockTable(t,e);if(null==r)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+e);for(var n=r.length/3,o=[],i=0;i<n;i++)for(var s=r[3*i+0],a=r[3*i+1],u=r[3*i+2],h=0;h<s;h++)o.push(new B(a,u));return o},B.getRsBlockTable=function(t,e){switch(e){case i:return B.RS_BLOCK_TABLE[4*(t-1)+0];case s:return B.RS_BLOCK_TABLE[4*(t-1)+1];case a:return B.RS_BLOCK_TABLE[4*(t-1)+2];case u:return B.RS_BLOCK_TABLE[4*(t-1)+3];default:return}},L.prototype={get:function(t){var e=Math.floor(t/8);return 1==(this.buffer[e]>>>7-t%8&1)},put:function(t,e){for(var r=0;r<e;r++)this.putBit(1==(t>>>e-r-1&1))},getLengthInBits:function(){return this.length},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var C=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];function D(t){if(this.options={padding:0,width:256,height:256,typeNumber:4,color:"#000000",background:"#ffffff",ecl:"M"},"string"==typeof t&&(t={content:t}),t)for(var e in t)this.options[e]=t[e];if("string"!=typeof this.options.content)throw new Error("Expected 'content' as string!");if(0===this.options.content.length)throw new Error("Expected 'content' to be non-empty!");if(!(this.options.padding>=0))throw new Error("Expected 'padding' value to be non-negative!");if(!(this.options.width>0&&this.options.height>0))throw new Error("Expected 'width' or 'height' value to be higher than zero!");var r=this.options.content,o=function(t,e){for(var r=function(t){var e=encodeURI(t).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return e.length+(e.length!=t?3:0)}(t),n=1,o=0,i=0,s=C.length;i<=s;i++){var a=C[i];if(!a)throw new Error("Content too long: expected "+o+" but got "+r);switch(e){case"L":o=a[0];break;case"M":o=a[1];break;case"Q":o=a[2];break;case"H":o=a[3];break;default:throw new Error("Unknwon error correction level: "+e)}if(r<=o)break;n++}if(n>C.length)throw new Error("Content too long");return n}(r,this.options.ecl),h=function(t){switch(t){case"L":return i;case"M":return s;case"Q":return a;case"H":return u;default:throw new Error("Unknwon error correction level: "+t)}}(this.options.ecl);this.qrcode=new n(o,h),this.qrcode.addData(r),this.qrcode.make()}D.prototype.svg=function(){for(var t=this.options,e=this.qrcode.modules,r=t.width,n=t.height,o=e.length,i=r/(o+2*t.padding),s=n/(o+2*t.padding),a='<rect x="0" y="0" width="'+r+'" height="'+n+'" style="fill:'+t.background+';shape-rendering:crispEdges;"/>',u=0;u<o;u++)for(var h=0;h<o;h++){if(e[h][u])a+='<rect x="'+(h*i+t.padding*i).toString()+'" y="'+(u*s+t.padding*s).toString()+'" width="'+i+'" height="'+s+'" style="fill:'+t.color+';shape-rendering:crispEdges;"/>'}var g='<?xml version="1.0" standalone="yes"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+r+'" height="'+n+'">';return g+=a,g+="</svg>"},t.exports=function(t){return new D(t).svg()}},function(t,e,r){"use strict";r.r(e),r.d(e,"girocode",(function(){return i})),r.d(e,"GiroCode",(function(){return o}));const n=r(1);class o{constructor(t){this._config=Object.assign({service:"BCD",version:"001",encoding:"2",transfer:"SCT",bic:"",name:"",iban:"",currency:"EUR",amount:"0.00",char:"",ref:"",reason:"",hint:""},t);let e=`\n${this._config.service}\n${this._config.version}\n${this._config.encoding}\n${this._config.transfer}\n${this._config.bic}\n${this._config.name}\n${this._config.iban}\n${this._config.currency}${this._config.amount}\n${this._config.char}\n${this._config.ref}\n${this._config.reason}\n`.trim();return this._svg=n(e),this}svg(){return this._svg}svg_data_url(){return"data:image/svg+xml;utf8,"+encodeURIComponent(this._svg)}}const i=function(){return new o(...arguments)}}]);void 0===LIB&&console.error("esm-webpack-plugin: nothing exported!");const _LIB$girocode=LIB.girocode,_LIB$GiroCode=LIB.GiroCode;export{_LIB$girocode as girocode,_LIB$GiroCode as GiroCode};