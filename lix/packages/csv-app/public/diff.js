/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/diff@5.2.0/lib/index.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
function e(){}function n(e,n,t,r,i){for(var o,l=[];n;)l.push(n),o=n.previousComponent,delete n.previousComponent,n=o;l.reverse();for(var s=0,a=l.length,u=0,f=0;s<a;s++){var d=l[s];if(d.removed){if(d.value=e.join(r.slice(f,f+d.count)),f+=d.count,s&&l[s-1].added){var c=l[s-1];l[s-1]=l[s],l[s]=c}}else{if(!d.added&&i){var p=t.slice(u,u+d.count);p=p.map((function(e,n){var t=r[f+n];return t.length>e.length?t:e})),d.value=e.join(p)}else d.value=e.join(t.slice(u,u+d.count));u+=d.count,d.added||(f+=d.count)}}var h=l[a-1];return a>1&&"string"==typeof h.value&&(h.added||h.removed)&&e.equals("",h.value)&&(l[a-2].value+=h.value,l.pop()),l}e.prototype={diff:function(e,t){var r,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.callback;"function"==typeof i&&(o=i,i={}),this.options=i;var l=this;function s(e){return o?(setTimeout((function(){o(void 0,e)}),0),!0):e}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e));var a=(t=this.removeEmpty(this.tokenize(t))).length,u=e.length,f=1,d=a+u;i.maxEditLength&&(d=Math.min(d,i.maxEditLength));var c=null!==(r=i.timeout)&&void 0!==r?r:1/0,p=Date.now()+c,h=[{oldPos:-1,lastComponent:void 0}],v=this.extractCommon(h[0],t,e,0);if(h[0].oldPos+1>=u&&v+1>=a)return s([{value:this.join(t),count:t.length}]);var m=-1/0,g=1/0;function w(){for(var r=Math.max(m,-f);r<=Math.min(g,f);r+=2){var i=void 0,o=h[r-1],d=h[r+1];o&&(h[r-1]=void 0);var c=!1;if(d){var p=d.oldPos-r;c=d&&0<=p&&p<a}var w=o&&o.oldPos+1<u;if(c||w){if(i=!w||c&&o.oldPos+1<d.oldPos?l.addToPath(d,!0,void 0,0):l.addToPath(o,void 0,!0,1),v=l.extractCommon(i,t,e,r),i.oldPos+1>=u&&v+1>=a)return s(n(l,i.lastComponent,t,e,l.useLongestToken));h[r]=i,i.oldPos+1>=u&&(g=Math.min(g,r-1)),v+1>=a&&(m=Math.max(m,r+1))}else h[r]=void 0}f++}if(o)!function e(){setTimeout((function(){if(f>d||Date.now()>p)return o();w()||e()}),0)}();else for(;f<=d&&Date.now()<=p;){var y=w();if(y)return y}},addToPath:function(e,n,t,r){var i=e.lastComponent;return i&&i.added===n&&i.removed===t?{oldPos:e.oldPos+r,lastComponent:{count:i.count+1,added:n,removed:t,previousComponent:i.previousComponent}}:{oldPos:e.oldPos+r,lastComponent:{count:1,added:n,removed:t,previousComponent:i}}},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,l=e.oldPos,s=l-r,a=0;s+1<i&&l+1<o&&this.equals(n[s+1],t[l+1]);)s++,l++,a++;return a&&(e.lastComponent={count:a,previousComponent:e.lastComponent}),e.oldPos=l,s},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};var t=new e;function r(e,n,r){return t.diff(e,n,r)}function i(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}var o=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,l=/\S/,s=new e;function a(e,n,t){return t=i(t,{ignoreWhitespace:!0}),s.diff(e,n,t)}function u(e,n,t){return s.diff(e,n,t)}s.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!l.test(e)&&!l.test(n)},s.tokenize=function(e){for(var n=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&o.test(n[t])&&o.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n};var f=new e;function d(e,n,t){return f.diff(e,n,t)}function c(e,n,t){var r=i(t,{ignoreWhitespace:!0});return f.diff(e,n,r)}f.tokenize=function(e){this.options.stripTrailingCr&&(e=e.replace(/\r\n/g,"\n"));var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n};var p=new e;function h(e,n,t){return p.diff(e,n,t)}p.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var v=new e;function m(e,n,t){return v.diff(e,n,t)}function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function y(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function L(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?y(Object(t),!0).forEach((function(n){w(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):y(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function x(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return S(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return S(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}v.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var b=Object.prototype.toString,k=new e;function F(e,n,t){return k.diff(e,n,t)}function N(e,n,t,r,i){var o,l;for(n=n||[],t=t||[],r&&(e=r(i,e)),o=0;o<n.length;o+=1)if(n[o]===e)return t[o];if("[object Array]"===b.call(e)){for(n.push(e),l=new Array(e.length),t.push(l),o=0;o<e.length;o+=1)l[o]=N(e[o],n,t,r,i);return n.pop(),t.pop(),l}if(e&&e.toJSON&&(e=e.toJSON()),"object"===g(e)&&null!==e){n.push(e),l={},t.push(l);var s,a=[];for(s in e)e.hasOwnProperty(s)&&a.push(s);for(a.sort(),o=0;o<a.length;o+=1)l[s=a[o]]=N(e[s],n,t,r,s);n.pop(),t.pop()}else l=e;return l}k.useLongestToken=!0,k.tokenize=f.tokenize,k.castInput=function(e){var n=this.options,t=n.undefinedReplacement,r=n.stringifyReplacer,i=void 0===r?function(e,n){return void 0===n?t:n}:r;return"string"==typeof e?e:JSON.stringify(N(e,null,null,i),i,"  ")},k.equals=function(n,t){return e.prototype.equals.call(k,n.replace(/,([\r\n])/g,"$1"),t.replace(/,([\r\n])/g,"$1"))};var O=new e;function j(e,n,t){return O.diff(e,n,t)}function P(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.split(/\r\n|[\n\v\f\r\x85]/),r=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],i=[],o=0;function l(){var e={};for(i.push(e);o<t.length;){var r=t[o];if(/^(\-\-\-|\+\+\+|@@)\s/.test(r))break;var l=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(r);l&&(e.index=l[1]),o++}for(s(e),s(e),e.hunks=[];o<t.length;){var u=t[o];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(u))break;if(/^@@/.test(u))e.hunks.push(a());else{if(u&&n.strict)throw new Error("Unknown line "+(o+1)+" "+JSON.stringify(u));o++}}}function s(e){var n=/^(---|\+\+\+)\s+(.*)$/.exec(t[o]);if(n){var r="---"===n[1]?"old":"new",i=n[2].split("\t",2),l=i[0].replace(/\\\\/g,"\\");/^".*"$/.test(l)&&(l=l.substr(1,l.length-2)),e[r+"FileName"]=l,e[r+"Header"]=(i[1]||"").trim(),o++}}function a(){var e=o,i=t[o++].split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),l={oldStart:+i[1],oldLines:void 0===i[2]?1:+i[2],newStart:+i[3],newLines:void 0===i[4]?1:+i[4],lines:[],linedelimiters:[]};0===l.oldLines&&(l.oldStart+=1),0===l.newLines&&(l.newStart+=1);for(var s=0,a=0;o<t.length&&!(0===t[o].indexOf("--- ")&&o+2<t.length&&0===t[o+1].indexOf("+++ ")&&0===t[o+2].indexOf("@@"));o++){var u=0==t[o].length&&o!=t.length-1?" ":t[o][0];if("+"!==u&&"-"!==u&&" "!==u&&"\\"!==u)break;l.lines.push(t[o]),l.linedelimiters.push(r[o]||"\n"),"+"===u?s++:"-"===u?a++:" "===u&&(s++,a++)}if(s||1!==l.newLines||(l.newLines=0),a||1!==l.oldLines||(l.oldLines=0),n.strict){if(s!==l.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(a!==l.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return l}for(;o<t.length;)l();return i}function C(e,n,t){var r=!0,i=!1,o=!1,l=1;return function s(){if(r&&!o){if(i?l++:r=!1,e+l<=t)return l;o=!0}if(!i)return o||(r=!0),n<=e-l?-l++:(i=!0,s())}}function H(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n&&(n=P(n)),Array.isArray(n)){if(n.length>1)throw new Error("applyPatch only works with a single input.");n=n[0]}var r,i,o=e.split(/\r\n|[\n\v\f\r\x85]/),l=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],s=n.hunks,a=t.compareLine||function(e,n,t,r){return n===r},u=0,f=t.fuzzFactor||0,d=0,c=0;function p(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],i=r.length>0?r[0]:" ",l=r.length>0?r.substr(1):r;if(" "===i||"-"===i){if(!a(n+1,o[n],i,l)&&++u>f)return!1;n++}}return!0}for(var h=0;h<s.length;h++){for(var v=s[h],m=o.length-v.oldLines,g=0,w=c+v.oldStart-1,y=C(w,d,m);void 0!==g;g=y())if(p(v,w+g)){v.offset=c+=g;break}if(void 0===g)return!1;d=v.offset+v.oldStart+v.oldLines}for(var L=0,x=0;x<s.length;x++){var S=s[x],b=S.oldStart+S.offset+L-1;L+=S.newLines-S.oldLines;for(var k=0;k<S.lines.length;k++){var F=S.lines[k],N=F.length>0?F[0]:" ",O=F.length>0?F.substr(1):F,j=S.linedelimiters&&S.linedelimiters[k]||"\n";if(" "===N)b++;else if("-"===N)o.splice(b,1),l.splice(b,1);else if("+"===N)o.splice(b,0,O),l.splice(b,0,j),b++;else if("\\"===N){var H=S.lines[k-1]?S.lines[k-1][0]:null;"+"===H?r=!0:"-"===H&&(i=!0)}}}if(r)for(;!o[o.length-1];)o.pop(),l.pop();else i&&(o.push(""),l.push("\n"));for(var E=0;E<o.length-1;E++)o[E]=o[E]+l[E];return o.join("")}function E(e,n){"string"==typeof e&&(e=P(e));var t=0;!function r(){var i=e[t++];if(!i)return n.complete();n.loadFile(i,(function(e,t){if(e)return n.complete(e);var o=H(t,i,n);n.patched(i,o,(function(e){if(e)return n.complete(e);r()}))}))}()}function A(e,n,t,r,i,o,l){l||(l={}),void 0===l.context&&(l.context=4);var s=d(t,r,l);if(s){s.push({value:"",lines:[]});for(var a=[],u=0,f=0,c=[],p=1,h=1,v=function(e){var n=s[e],i=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=i,n.added||n.removed){var o;if(!u){var d=s[e-1];u=p,f=h,d&&(c=l.context>0?g(d.lines.slice(-l.context)):[],u-=c.length,f-=c.length)}(o=c).push.apply(o,x(i.map((function(e){return(n.added?"+":"-")+e})))),n.added?h+=i.length:p+=i.length}else{if(u)if(i.length<=2*l.context&&e<s.length-2){var v;(v=c).push.apply(v,x(g(i)))}else{var m,w=Math.min(i.length,l.context);(m=c).push.apply(m,x(g(i.slice(0,w))));var y={oldStart:u,oldLines:p-u+w,newStart:f,newLines:h-f+w,lines:c};if(e>=s.length-2&&i.length<=l.context){var L=/\n$/.test(t),S=/\n$/.test(r),b=0==i.length&&c.length>y.oldLines;!L&&b&&t.length>0&&c.splice(y.oldLines,0,"\\ No newline at end of file"),(L||b)&&S||c.push("\\ No newline at end of file")}a.push(y),u=0,f=0,c=[]}p+=i.length,h+=i.length}},m=0;m<s.length;m++)v(m);return{oldFileName:e,newFileName:n,oldHeader:i,newHeader:o,hunks:a}}function g(e){return e.map((function(e){return" "+e}))}}function z(e){if(Array.isArray(e))return e.map(z).join("\n");var n=[];e.oldFileName==e.newFileName&&n.push("Index: "+e.oldFileName),n.push("==================================================================="),n.push("--- "+e.oldFileName+(void 0===e.oldHeader?"":"\t"+e.oldHeader)),n.push("+++ "+e.newFileName+(void 0===e.newHeader?"":"\t"+e.newHeader));for(var t=0;t<e.hunks.length;t++){var r=e.hunks[t];0===r.oldLines&&(r.oldStart-=1),0===r.newLines&&(r.newStart-=1),n.push("@@ -"+r.oldStart+","+r.oldLines+" +"+r.newStart+","+r.newLines+" @@"),n.push.apply(n,r.lines)}return n.join("\n")+"\n"}function I(e,n,t,r,i,o,l){return z(A(e,n,t,r,i,o,l))}function $(e,n,t,r,i,o){return I(e,e,n,t,r,i,o)}function M(e,n){if(n.length>e.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function T(e){var n=ee(e.lines),t=n.oldLines,r=n.newLines;void 0!==t?e.oldLines=t:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}function D(e,n,t){e=q(e,t),n=q(n,t);var r={};(e.index||n.index)&&(r.index=e.index||n.index),(e.newFileName||n.newFileName)&&(W(e)?W(n)?(r.oldFileName=J(r,e.oldFileName,n.oldFileName),r.newFileName=J(r,e.newFileName,n.newFileName),r.oldHeader=J(r,e.oldHeader,n.oldHeader),r.newHeader=J(r,e.newHeader,n.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=n.oldFileName||e.oldFileName,r.newFileName=n.newFileName||e.newFileName,r.oldHeader=n.oldHeader||e.oldHeader,r.newHeader=n.newHeader||e.newHeader)),r.hunks=[];for(var i=0,o=0,l=0,s=0;i<e.hunks.length||o<n.hunks.length;){var a=e.hunks[i]||{oldStart:1/0},u=n.hunks[o]||{oldStart:1/0};if(R(a,u))r.hunks.push(U(a,l)),i++,s+=a.newLines-a.oldLines;else if(R(u,a))r.hunks.push(U(u,s)),o++,l+=u.newLines-u.oldLines;else{var f={oldStart:Math.min(a.oldStart,u.oldStart),oldLines:0,newStart:Math.min(a.newStart+l,u.oldStart+s),newLines:0,lines:[]};Z(f,a.oldStart,a.lines,u.oldStart,u.lines),o++,i++,r.hunks.push(f)}}return r}function q(e,n){if("string"==typeof e){if(/^@@/m.test(e)||/^Index:/m.test(e))return P(e)[0];if(!n)throw new Error("Must provide a base reference or pass in a patch");return A(void 0,void 0,n,e)}return e}function W(e){return e.newFileName&&e.newFileName!==e.oldFileName}function J(e,n,t){return n===t?n:(e.conflict=!0,{mine:n,theirs:t})}function R(e,n){return e.oldStart<n.oldStart&&e.oldStart+e.oldLines<n.oldStart}function U(e,n){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+n,newLines:e.newLines,lines:e.lines}}function Z(e,n,t,r,i){var o={offset:n,lines:t,index:0},l={offset:r,lines:i,index:0};for(Q(e,o,l),Q(e,l,o);o.index<o.lines.length&&l.index<l.lines.length;){var s=o.lines[o.index],a=l.lines[l.index];if("-"!==s[0]&&"+"!==s[0]||"-"!==a[0]&&"+"!==a[0])if("+"===s[0]&&" "===a[0]){var u;(u=e.lines).push.apply(u,x(X(o)))}else if("+"===a[0]&&" "===s[0]){var f;(f=e.lines).push.apply(f,x(X(l)))}else"-"===s[0]&&" "===a[0]?G(e,o,l):"-"===a[0]&&" "===s[0]?G(e,l,o,!0):s===a?(e.lines.push(s),o.index++,l.index++):K(e,X(o),X(l));else B(e,o,l)}V(e,o),V(e,l),T(e)}function B(e,n,t){var r,i,o=X(n),l=X(t);if(Y(o)&&Y(l)){var s,a;if(M(o,l)&&_(t,o,o.length-l.length))return void(s=e.lines).push.apply(s,x(o));if(M(l,o)&&_(n,l,l.length-o.length))return void(a=e.lines).push.apply(a,x(l))}else if(i=l,(r=o).length===i.length&&M(r,i)){var u;return void(u=e.lines).push.apply(u,x(o))}K(e,o,l)}function G(e,n,t,r){var i,o=X(n),l=function(e,n){var t=[],r=[],i=0,o=!1,l=!1;for(;i<n.length&&e.index<e.lines.length;){var s=e.lines[e.index],a=n[i];if("+"===a[0])break;if(o=o||" "!==s[0],r.push(a),i++,"+"===s[0])for(l=!0;"+"===s[0];)t.push(s),s=e.lines[++e.index];a.substr(1)===s.substr(1)?(t.push(s),e.index++):l=!0}"+"===(n[i]||"")[0]&&o&&(l=!0);if(l)return t;for(;i<n.length;)r.push(n[i++]);return{merged:r,changes:t}}(t,o);l.merged?(i=e.lines).push.apply(i,x(l.merged)):K(e,r?l:o,r?o:l)}function K(e,n,t){e.conflict=!0,e.lines.push({conflict:!0,mine:n,theirs:t})}function Q(e,n,t){for(;n.offset<t.offset&&n.index<n.lines.length;){var r=n.lines[n.index++];e.lines.push(r),n.offset++}}function V(e,n){for(;n.index<n.lines.length;){var t=n.lines[n.index++];e.lines.push(t)}}function X(e){for(var n=[],t=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===t&&"+"===r[0]&&(t="+"),t!==r[0])break;n.push(r),e.index++}return n}function Y(e){return e.reduce((function(e,n){return e&&"-"===n[0]}),!0)}function _(e,n,t){for(var r=0;r<t;r++){var i=n[n.length-t+r].substr(1);if(e.lines[e.index+r]!==" "+i)return!1}return e.index+=t,!0}function ee(e){var n=0,t=0;return e.forEach((function(e){if("string"!=typeof e){var r=ee(e.mine),i=ee(e.theirs);void 0!==n&&(r.oldLines===i.oldLines?n+=r.oldLines:n=void 0),void 0!==t&&(r.newLines===i.newLines?t+=r.newLines:t=void 0)}else void 0===t||"+"!==e[0]&&" "!==e[0]||t++,void 0===n||"-"!==e[0]&&" "!==e[0]||n++})),{oldLines:n,newLines:t}}function ne(e){return Array.isArray(e)?e.map(ne).reverse():L(L({},e),{},{oldFileName:e.newFileName,oldHeader:e.newHeader,newFileName:e.oldFileName,newHeader:e.oldHeader,hunks:e.hunks.map((function(e){return{oldLines:e.newLines,oldStart:e.newStart,newLines:e.oldLines,newStart:e.oldStart,linedelimiters:e.linedelimiters,lines:e.lines.map((function(e){return e.startsWith("-")?"+".concat(e.slice(1)):e.startsWith("+")?"-".concat(e.slice(1)):e}))}}))})}function te(e){for(var n,t,r=[],i=0;i<e.length;i++)t=(n=e[i]).added?1:n.removed?-1:0,r.push([t,n.value]);return r}function re(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];r.added?n.push("<ins>"):r.removed&&n.push("<del>"),n.push(ie(r.value)),r.added?n.push("</ins>"):r.removed&&n.push("</del>")}return n.join("")}function ie(e){var n=e;return n=(n=(n=(n=n.replace(/&/g,"&amp;")).replace(/</g,"&lt;")).replace(/>/g,"&gt;")).replace(/"/g,"&quot;")}O.tokenize=function(e){return e.slice()},O.join=O.removeEmpty=function(e){return e};export{e as Diff,H as applyPatch,E as applyPatches,N as canonicalize,te as convertChangesToDMP,re as convertChangesToXML,$ as createPatch,I as createTwoFilesPatch,j as diffArrays,r as diffChars,m as diffCss,F as diffJson,d as diffLines,h as diffSentences,c as diffTrimmedLines,a as diffWords,u as diffWordsWithSpace,z as formatPatch,D as merge,P as parsePatch,ne as reversePatch,A as structuredPatch};export default null;
//# sourceMappingURL=/sm/44defdb0bdd5b48a40d67545c5103a40cbec44c7eae3baee0175f828b47bc913.map