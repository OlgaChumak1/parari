/**
 * @file Generate parallax page from html.
 * @namespace parari
 * @version 0.0.3
 * @require fabric.js 
 */
window.parari;


//=========================================
// Borrows fabric.min.js
//=========================================

var fabric=fabric||{version:"1.4.9"};"undefined"!=typeof exports&&(exports.fabric=fabric),"undefined"!=typeof document&&"undefined"!=typeof window?(fabric.document=document,fabric.window=window):(fabric.document=require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"),fabric.window=fabric.document.createWindow()),fabric.isTouchSupported="ontouchstart"in fabric.document.documentElement,fabric.isLikelyNode="undefined"!=typeof Buffer&&"undefined"==typeof window,fabric.SHARED_ATTRIBUTES=["display","transform","fill","fill-opacity","fill-rule","opacity","stroke","stroke-dasharray","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width"],fabric.DPI=96,function(){function t(t,e){this.__eventListeners[t]&&(e?fabric.util.removeFromArray(this.__eventListeners[t],e):this.__eventListeners[t].length=0)}function e(t,e){if(this.__eventListeners||(this.__eventListeners={}),1===arguments.length)for(var i in t)this.on(i,t[i]);else this.__eventListeners[t]||(this.__eventListeners[t]=[]),this.__eventListeners[t].push(e);return this}function i(e,i){if(this.__eventListeners){if(0===arguments.length)this.__eventListeners={};else if(1===arguments.length&&"object"==typeof arguments[0])for(var r in e)t.call(this,r,e[r]);else t.call(this,e,i);return this}}function r(t,e){if(this.__eventListeners){var i=this.__eventListeners[t];if(i){for(var r=0,s=i.length;s>r;r++)i[r].call(this,e||{});return this}}}fabric.Observable={observe:e,stopObserving:i,fire:r,on:e,off:i,trigger:r}}(),fabric.Collection={add:function(){this._objects.push.apply(this._objects,arguments);for(var t=0,e=arguments.length;e>t;t++)this._onObjectAdded(arguments[t]);return this.renderOnAddRemove&&this.renderAll(),this},insertAt:function(t,e,i){var r=this.getObjects();return i?r[e]=t:r.splice(e,0,t),this._onObjectAdded(t),this.renderOnAddRemove&&this.renderAll(),this},remove:function(){for(var t,e=this.getObjects(),i=0,r=arguments.length;r>i;i++)t=e.indexOf(arguments[i]),-1!==t&&(e.splice(t,1),this._onObjectRemoved(arguments[i]));return this.renderOnAddRemove&&this.renderAll(),this},forEachObject:function(t,e){for(var i=this.getObjects(),r=i.length;r--;)t.call(e,i[r],r,i);return this},getObjects:function(t){return"undefined"==typeof t?this._objects:this._objects.filter(function(e){return e.type===t})},item:function(t){return this.getObjects()[t]},isEmpty:function(){return 0===this.getObjects().length},size:function(){return this.getObjects().length},contains:function(t){return this.getObjects().indexOf(t)>-1},complexity:function(){return this.getObjects().reduce(function(t,e){return t+=e.complexity?e.complexity():0},0)}},function(t){var e=Math.sqrt,i=Math.atan2,r=Math.PI/180;fabric.util={removeFromArray:function(t,e){var i=t.indexOf(e);return-1!==i&&t.splice(i,1),t},getRandomInt:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},degreesToRadians:function(t){return t*r},radiansToDegrees:function(t){return t/r},rotatePoint:function(t,e,i){var r=Math.sin(i),s=Math.cos(i);t.subtractEquals(e);var n=t.x*s-t.y*r,o=t.x*r+t.y*s;return new fabric.Point(n,o).addEquals(e)},transformPoint:function(t,e,i){return i?new fabric.Point(e[0]*t.x+e[1]*t.y,e[2]*t.x+e[3]*t.y):new fabric.Point(e[0]*t.x+e[1]*t.y+e[4],e[2]*t.x+e[3]*t.y+e[5])},invertTransform:function(t){var e=t.slice(),i=1/(t[0]*t[3]-t[1]*t[2]);e=[i*t[3],-i*t[1],-i*t[2],i*t[0],0,0];var r=fabric.util.transformPoint({x:t[4],y:t[5]},e);return e[4]=-r.x,e[5]=-r.y,e},toFixed:function(t,e){return parseFloat(Number(t).toFixed(e))},parseUnit:function(t){var e=/\D{0,2}$/.exec(t),i=parseFloat(t);switch(e[0]){case"mm":return i*fabric.DPI/25.4;case"cm":return i*fabric.DPI/2.54;case"in":return i*fabric.DPI;case"pt":return i*fabric.DPI/72;case"pc":return i*fabric.DPI/72*12;default:return i}},falseFunction:function(){return!1},getKlass:function(t,e){return t=fabric.util.string.camelize(t.charAt(0).toUpperCase()+t.slice(1)),fabric.util.resolveNamespace(e)[t]},resolveNamespace:function(e){if(!e)return fabric;for(var i=e.split("."),r=i.length,s=t||fabric.window,n=0;r>n;++n)s=s[i[n]];return s},loadImage:function(t,e,i,r){if(!t)return void(e&&e.call(i,t));var s=fabric.util.createImage();s.onload=function(){e&&e.call(i,s),s=s.onload=s.onerror=null},s.onerror=function(){fabric.log("Error loading "+s.src),e&&e.call(i,null,!0),s=s.onload=s.onerror=null},0!==t.indexOf("data")&&"undefined"!=typeof r&&(s.crossOrigin=r),s.src=t},enlivenObjects:function(t,e,i,r){function s(){++o===a&&e&&e(n)}t=t||[];var n=[],o=0,a=t.length;return a?void t.forEach(function(t,e){if(!t||!t.type)return void s();var o=fabric.util.getKlass(t.type,i);o.async?o.fromObject(t,function(i,o){o||(n[e]=i,r&&r(t,n[e])),s()}):(n[e]=o.fromObject(t),r&&r(t,n[e]),s())}):void(e&&e(n))},groupSVGElements:function(t,e,i){var r;return r=new fabric.PathGroup(t,e),"undefined"!=typeof i&&r.setSourcePath(i),r},populateWithProperties:function(t,e,i){if(i&&"[object Array]"===Object.prototype.toString.call(i))for(var r=0,s=i.length;s>r;r++)i[r]in t&&(e[i[r]]=t[i[r]])},drawDashedLine:function(t,r,s,n,o,a){var h=n-r,c=o-s,l=e(h*h+c*c),u=i(c,h),f=a.length,d=0,g=!0;for(t.save(),t.translate(r,s),t.moveTo(0,0),t.rotate(u),r=0;l>r;)r+=a[d++%f],r>l&&(r=l),t[g?"lineTo":"moveTo"](r,0),g=!g;t.restore()},createCanvasElement:function(t){return t||(t=fabric.document.createElement("canvas")),t.getContext||"undefined"==typeof G_vmlCanvasManager||G_vmlCanvasManager.initElement(t),t},createImage:function(){return fabric.isLikelyNode?new(require("canvas").Image):fabric.document.createElement("img")},createAccessors:function(t){for(var e=t.prototype,i=e.stateProperties.length;i--;){var r=e.stateProperties[i],s=r.charAt(0).toUpperCase()+r.slice(1),n="set"+s,o="get"+s;e[o]||(e[o]=function(t){return new Function('return this.get("'+t+'")')}(r)),e[n]||(e[n]=function(t){return new Function("value",'return this.set("'+t+'", value)')}(r))}},clipContext:function(t,e){e.save(),e.beginPath(),t.clipTo(e),e.clip()},multiplyTransformMatrices:function(t,e){for(var i=[[t[0],t[2],t[4]],[t[1],t[3],t[5]],[0,0,1]],r=[[e[0],e[2],e[4]],[e[1],e[3],e[5]],[0,0,1]],s=[],n=0;3>n;n++){s[n]=[];for(var o=0;3>o;o++){for(var a=0,h=0;3>h;h++)a+=i[n][h]*r[h][o];s[n][o]=a}}return[s[0][0],s[1][0],s[0][1],s[1][1],s[0][2],s[1][2]]},getFunctionBody:function(t){return(String(t).match(/function[^{]*\{([\s\S]*)\}/)||{})[1]},normalizePoints:function(t,e){var i=fabric.util.array.min(t,"x"),r=fabric.util.array.min(t,"y");i=0>i?i:0,r=0>i?r:0;for(var s=0,n=t.length;n>s;s++)t[s].x-=e.width/2+i||0,t[s].y-=e.height/2+r||0},isTransparent:function(t,e,i,r){r>0&&(e>r?e-=r:e=0,i>r?i-=r:i=0);for(var s=!0,n=t.getImageData(e,i,2*r||1,2*r||1),o=3,a=n.data.length;a>o;o+=4){var h=n.data[o];if(s=0>=h,s===!1)break}return n=null,s}}}("undefined"!=typeof exports?exports:this),function(){function t(t,i,n,a,h,c,l,u,f){if(r=o.call(arguments),s[r])return s[r];var d=e(l,n,a,u,f,t,i),g=(d.x1-d.x0)*(d.x1-d.x0)+(d.y1-d.y0)*(d.y1-d.y0),p=1/g-.25;0>p&&(p=0);var v=Math.sqrt(p);c===h&&(v=-v);var b=.5*(d.x0+d.x1)-v*(d.y1-d.y0),y=.5*(d.y0+d.y1)+v*(d.x1-d.x0),m=Math.atan2(d.y0-y,d.x0-b),_=Math.atan2(d.y1-y,d.x1-b),x=_-m;0>x&&1===c?x+=2*Math.PI:x>0&&0===c&&(x-=2*Math.PI);for(var C=Math.ceil(Math.abs(x/(.5*Math.PI+.001))),S=[],w=0;C>w;w++){var O=m+w*x/C,T=m+(w+1)*x/C;S[w]=[b,y,O,T,n,a,d.sinTh,d.cosTh]}return s[r]=S,S}function e(t,e,i,r,s,n,o){var a=t*(Math.PI/180),h=Math.sin(a),c=Math.cos(a);e=Math.abs(e),i=Math.abs(i);var l=c*(r-n)+h*(s-o),u=c*(s-o)-h*(r-n),f=l*l/(e*e)+u*u/(i*i);f*=.25,f>1&&(f=Math.sqrt(f),e*=f,i*=f);var d=c/e,g=h/e,p=-h/i,v=c/i;return{x0:d*r+g*s,y0:p*r+v*s,x1:d*n+g*o,y1:p*n+v*o,sinTh:h,cosTh:c}}function i(t,e,i,s,a,h,c,l){if(r=o.call(arguments),n[r])return n[r];var u=Math.sin(i),f=Math.cos(i),d=Math.sin(s),g=Math.cos(s),p=l*a,v=-c*h,b=c*a,y=l*h,m=.25*(s-i),_=8/3*Math.sin(m)*Math.sin(m)/Math.sin(2*m),x=t+f-_*u,C=e+u+_*f,S=t+g,w=e+d,O=S+_*d,T=w-_*g;return n[r]=[p*x+v*C,b*x+y*C,p*O+v*T,b*O+y*T,p*S+v*w,b*S+y*w],n[r]}var r,s={},n={},o=Array.prototype.join;fabric.util.drawArc=function(e,r,s,n){for(var o=n[0],a=n[1],h=n[2],c=n[3],l=n[4],u=n[5],f=n[6],d=t(u,f,o,a,c,l,h,r,s),g=0;g<d.length;g++){var p=i.apply(this,d[g]);e.bezierCurveTo.apply(e,p)}}}(),function(){function t(t,e){for(var i=s.call(arguments,2),r=[],n=0,o=t.length;o>n;n++)r[n]=i.length?t[n][e].apply(t[n],i):t[n][e].call(t[n]);return r}function e(t,e){return r(t,e,function(t,e){return t>=e})}function i(t,e){return r(t,e,function(t,e){return e>t})}function r(t,e,i){if(t&&0!==t.length){var r=t.length-1,s=e?t[r][e]:t[r];if(e)for(;r--;)i(t[r][e],s)&&(s=t[r][e]);else for(;r--;)i(t[r],s)&&(s=t[r]);return s}}var s=Array.prototype.slice;Array.prototype.indexOf||(Array.prototype.indexOf=function(t){if(void 0===this||null===this)throw new TypeError;var e=Object(this),i=e.length>>>0;if(0===i)return-1;var r=0;if(arguments.length>0&&(r=Number(arguments[1]),r!==r?r=0:0!==r&&r!==Number.POSITIVE_INFINITY&&r!==Number.NEGATIVE_INFINITY&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=i)return-1;for(var s=r>=0?r:Math.max(i-Math.abs(r),0);i>s;s++)if(s in e&&e[s]===t)return s;return-1}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){for(var i=0,r=this.length>>>0;r>i;i++)i in this&&t.call(e,this[i],i,this)}),Array.prototype.map||(Array.prototype.map=function(t,e){for(var i=[],r=0,s=this.length>>>0;s>r;r++)r in this&&(i[r]=t.call(e,this[r],r,this));return i}),Array.prototype.every||(Array.prototype.every=function(t,e){for(var i=0,r=this.length>>>0;r>i;i++)if(i in this&&!t.call(e,this[i],i,this))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(t,e){for(var i=0,r=this.length>>>0;r>i;i++)if(i in this&&t.call(e,this[i],i,this))return!0;return!1}),Array.prototype.filter||(Array.prototype.filter=function(t,e){for(var i,r=[],s=0,n=this.length>>>0;n>s;s++)s in this&&(i=this[s],t.call(e,i,s,this)&&r.push(i));return r}),Array.prototype.reduce||(Array.prototype.reduce=function(t){var e,i=this.length>>>0,r=0;if(arguments.length>1)e=arguments[1];else for(;;){if(r in this){e=this[r++];break}if(++r>=i)throw new TypeError}for(;i>r;r++)r in this&&(e=t.call(null,e,this[r],r,this));return e}),fabric.util.array={invoke:t,min:i,max:e}}(),function(){function t(t,e){for(var i in e)t[i]=e[i];return t}function e(e){return t({},e)}fabric.util.object={extend:t,clone:e}}(),function(){function t(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})}function e(t,e){return t.charAt(0).toUpperCase()+(e?t.slice(1):t.slice(1).toLowerCase())}function i(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\xA0]+/,"").replace(/[\s\xA0]+$/,"")}),fabric.util.string={camelize:t,capitalize:e,escapeXml:i}}(),function(){var t=Array.prototype.slice,e=Function.prototype.apply,i=function(){};Function.prototype.bind||(Function.prototype.bind=function(r){var s,n=this,o=t.call(arguments,1);return s=o.length?function(){return e.call(n,this instanceof i?this:r,o.concat(t.call(arguments)))}:function(){return e.call(n,this instanceof i?this:r,arguments)},i.prototype=this.prototype,s.prototype=new i,s})}(),function(){function t(){}function e(t){var e=this.constructor.superclass.prototype[t];return arguments.length>1?e.apply(this,r.call(arguments,1)):e.call(this)}function i(){function i(){this.initialize.apply(this,arguments)}var n=null,a=r.call(arguments,0);"function"==typeof a[0]&&(n=a.shift()),i.superclass=n,i.subclasses=[],n&&(t.prototype=n.prototype,i.prototype=new t,n.subclasses.push(i));for(var h=0,c=a.length;c>h;h++)o(i,a[h],n);return i.prototype.initialize||(i.prototype.initialize=s),i.prototype.constructor=i,i.prototype.callSuper=e,i}var r=Array.prototype.slice,s=function(){},n=function(){for(var t in{toString:1})if("toString"===t)return!1;return!0}(),o=function(t,e,i){for(var r in e)t.prototype[r]=r in t.prototype&&"function"==typeof t.prototype[r]&&(e[r]+"").indexOf("callSuper")>-1?function(t){return function(){var r=this.constructor.superclass;this.constructor.superclass=i;var s=e[t].apply(this,arguments);return this.constructor.superclass=r,"initialize"!==t?s:void 0}}(r):e[r],n&&(e.toString!==Object.prototype.toString&&(t.prototype.toString=e.toString),e.valueOf!==Object.prototype.valueOf&&(t.prototype.valueOf=e.valueOf))};fabric.util.createClass=i}(),function(){function t(t){var e,i,r=Array.prototype.slice.call(arguments,1),s=r.length;for(i=0;s>i;i++)if(e=typeof t[r[i]],!/^(?:function|object|unknown)$/.test(e))return!1;return!0}function e(t,e){return{handler:e,wrappedHandler:i(t,e)}}function i(t,e){return function(i){e.call(o(t),i||fabric.window.event)}}function r(t,e){return function(i){if(p[t]&&p[t][e])for(var r=p[t][e],s=0,n=r.length;n>s;s++)r[s].call(this,i||fabric.window.event)}}function s(t,e){t||(t=fabric.window.event);var i=t.target||(typeof t.srcElement!==h?t.srcElement:null),r=fabric.util.getScrollLeftTop(i,e);return{x:v(t)+r.left,y:b(t)+r.top}}function n(t,e,i){var r="touchend"===t.type?"changedTouches":"touches";return t[r]&&t[r][0]?t[r][0][e]-(t[r][0][e]-t[r][0][i])||t[i]:t[i]}var o,a,h="unknown",c=function(){var t=0;return function(e){return e.__uniqueID||(e.__uniqueID="uniqueID__"+t++)}}();!function(){var t={};o=function(e){return t[e]},a=function(e,i){t[e]=i}}();var l,u,f=t(fabric.document.documentElement,"addEventListener","removeEventListener")&&t(fabric.window,"addEventListener","removeEventListener"),d=t(fabric.document.documentElement,"attachEvent","detachEvent")&&t(fabric.window,"attachEvent","detachEvent"),g={},p={};f?(l=function(t,e,i){t.addEventListener(e,i,!1)},u=function(t,e,i){t.removeEventListener(e,i,!1)}):d?(l=function(t,i,r){var s=c(t);a(s,t),g[s]||(g[s]={}),g[s][i]||(g[s][i]=[]);var n=e(s,r);g[s][i].push(n),t.attachEvent("on"+i,n.wrappedHandler)},u=function(t,e,i){var r,s=c(t);if(g[s]&&g[s][e])for(var n=0,o=g[s][e].length;o>n;n++)r=g[s][e][n],r&&r.handler===i&&(t.detachEvent("on"+e,r.wrappedHandler),g[s][e][n]=null)}):(l=function(t,e,i){var s=c(t);if(p[s]||(p[s]={}),!p[s][e]){p[s][e]=[];var n=t["on"+e];n&&p[s][e].push(n),t["on"+e]=r(s,e)}p[s][e].push(i)},u=function(t,e,i){var r=c(t);if(p[r]&&p[r][e])for(var s=p[r][e],n=0,o=s.length;o>n;n++)s[n]===i&&s.splice(n,1)}),fabric.util.addListener=l,fabric.util.removeListener=u;var v=function(t){return typeof t.clientX!==h?t.clientX:0},b=function(t){return typeof t.clientY!==h?t.clientY:0};fabric.isTouchSupported&&(v=function(t){return n(t,"pageX","clientX")},b=function(t){return n(t,"pageY","clientY")}),fabric.util.getPointer=s,fabric.util.object.extend(fabric.util,fabric.Observable)}(),function(){function t(t,e){var i=t.style;if(!i)return t;if("string"==typeof e)return t.style.cssText+=";"+e,e.indexOf("opacity")>-1?n(t,e.match(/opacity:\s*(\d?\.?\d*)/)[1]):t;for(var r in e)if("opacity"===r)n(t,e[r]);else{var s="float"===r||"cssFloat"===r?"undefined"==typeof i.styleFloat?"cssFloat":"styleFloat":r;i[s]=e[r]}return t}var e=fabric.document.createElement("div"),i="string"==typeof e.style.opacity,r="string"==typeof e.style.filter,s=/alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,n=function(t){return t};i?n=function(t,e){return t.style.opacity=e,t}:r&&(n=function(t,e){var i=t.style;return t.currentStyle&&!t.currentStyle.hasLayout&&(i.zoom=1),s.test(i.filter)?(e=e>=.9999?"":"alpha(opacity="+100*e+")",i.filter=i.filter.replace(s,e)):i.filter+=" alpha(opacity="+100*e+")",t}),fabric.util.setStyle=t}(),function(){function t(t){return"string"==typeof t?fabric.document.getElementById(t):t}function e(t,e){var i=fabric.document.createElement(t);for(var r in e)"class"===r?i.className=e[r]:"for"===r?i.htmlFor=e[r]:i.setAttribute(r,e[r]);return i}function i(t,e){t&&-1===(" "+t.className+" ").indexOf(" "+e+" ")&&(t.className+=(t.className?" ":"")+e)}function r(t,i,r){return"string"==typeof i&&(i=e(i,r)),t.parentNode&&t.parentNode.replaceChild(i,t),i.appendChild(t),i}function s(t,e){var i,r,s=0,n=0,o=fabric.document.documentElement,a=fabric.document.body||{scrollLeft:0,scrollTop:0};for(r=t;t&&t.parentNode&&!i;)t=t.parentNode,t!==fabric.document&&"fixed"===fabric.util.getElementStyle(t,"position")&&(i=t),t!==fabric.document&&r!==e&&"absolute"===fabric.util.getElementStyle(t,"position")?(s=0,n=0):t===fabric.document?(s=a.scrollLeft||o.scrollLeft||0,n=a.scrollTop||o.scrollTop||0):(s+=t.scrollLeft||0,n+=t.scrollTop||0);return{left:s,top:n}}function n(t){var e,i,r=t&&t.ownerDocument,s={left:0,top:0},n={left:0,top:0},o={borderLeftWidth:"left",borderTopWidth:"top",paddingLeft:"left",paddingTop:"top"};if(!r)return{left:0,top:0};for(var a in o)n[o[a]]+=parseInt(l(t,a),10)||0;return e=r.documentElement,"undefined"!=typeof t.getBoundingClientRect&&(s=t.getBoundingClientRect()),i=fabric.util.getScrollLeftTop(t,null),{left:s.left+i.left-(e.clientLeft||0)+n.left,top:s.top+i.top-(e.clientTop||0)+n.top}}var o,a=Array.prototype.slice,h=function(t){return a.call(t,0)};try{o=h(fabric.document.childNodes)instanceof Array}catch(c){}o||(h=function(t){for(var e=new Array(t.length),i=t.length;i--;)e[i]=t[i];return e});var l;l=fabric.document.defaultView&&fabric.document.defaultView.getComputedStyle?function(t,e){return fabric.document.defaultView.getComputedStyle(t,null)[e]}:function(t,e){var i=t.style[e];return!i&&t.currentStyle&&(i=t.currentStyle[e]),i},function(){function t(t){return"undefined"!=typeof t.onselectstart&&(t.onselectstart=fabric.util.falseFunction),r?t.style[r]="none":"string"==typeof t.unselectable&&(t.unselectable="on"),t}function e(t){return"undefined"!=typeof t.onselectstart&&(t.onselectstart=null),r?t.style[r]="":"string"==typeof t.unselectable&&(t.unselectable=""),t}var i=fabric.document.documentElement.style,r="userSelect"in i?"userSelect":"MozUserSelect"in i?"MozUserSelect":"WebkitUserSelect"in i?"WebkitUserSelect":"KhtmlUserSelect"in i?"KhtmlUserSelect":"";fabric.util.makeElementUnselectable=t,fabric.util.makeElementSelectable=e}(),function(){function t(t,e){var i=fabric.document.getElementsByTagName("head")[0],r=fabric.document.createElement("script"),s=!0;r.onload=r.onreadystatechange=function(t){if(s){if("string"==typeof this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)return;s=!1,e(t||fabric.window.event),r=r.onload=r.onreadystatechange=null}},r.src=t,i.appendChild(r)}fabric.util.getScript=t}(),fabric.util.getById=t,fabric.util.toArray=h,fabric.util.makeElement=e,fabric.util.addClass=i,fabric.util.wrapElement=r,fabric.util.getScrollLeftTop=s,fabric.util.getElementOffset=n,fabric.util.getElementStyle=l}(),function(){function t(t,e){return t+(/\?/.test(t)?"&":"?")+e}function e(){}function i(i,s){s||(s={});var n,o=s.method?s.method.toUpperCase():"GET",a=s.onComplete||function(){},h=r();return h.onreadystatechange=function(){4===h.readyState&&(a(h),h.onreadystatechange=e)},"GET"===o&&(n=null,"string"==typeof s.parameters&&(i=t(i,s.parameters))),h.open(o,i,!0),("POST"===o||"PUT"===o)&&h.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),h.send(n),h}var r=function(){for(var t=[function(){return new ActiveXObject("Microsoft.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")},function(){return new XMLHttpRequest}],e=t.length;e--;)try{var i=t[e]();if(i)return t[e]}catch(r){}}();fabric.util.request=i}(),fabric.log=function(){},fabric.warn=function(){},"undefined"!=typeof console&&["log","warn"].forEach(function(t){"undefined"!=typeof console[t]&&console[t].apply&&(fabric[t]=function(){return console[t].apply(console,arguments)})}),function(){function t(t){e(function(i){t||(t={});var r,s=i||+new Date,n=t.duration||500,o=s+n,a=t.onChange||function(){},h=t.abort||function(){return!1},c=t.easing||function(t,e,i,r){return-i*Math.cos(t/r*(Math.PI/2))+i+e},l="startValue"in t?t.startValue:0,u="endValue"in t?t.endValue:100,f=t.byValue||u-l;t.onStart&&t.onStart(),function d(i){r=i||+new Date;var u=r>o?n:r-s;return h()?void(t.onComplete&&t.onComplete()):(a(c(u,l,f,n)),r>o?void(t.onComplete&&t.onComplete()):void e(d))}(s)})}function e(){return i.apply(fabric.window,arguments)}var i=fabric.window.requestAnimationFrame||fabric.window.webkitRequestAnimationFrame||fabric.window.mozRequestAnimationFrame||fabric.window.oRequestAnimationFrame||fabric.window.msRequestAnimationFrame||function(t){fabric.window.setTimeout(t,1e3/60)};fabric.util.animate=t,fabric.util.requestAnimFrame=e}(),function(){function t(t,e,i,r){return t<Math.abs(e)?(t=e,r=i/4):r=i/(2*Math.PI)*Math.asin(e/t),{a:t,c:e,p:i,s:r}}function e(t,e,i){return t.a*Math.pow(2,10*(e-=1))*Math.sin(2*(e*i-t.s)*Math.PI/t.p)}function i(t,e,i,r){return i*((t=t/r-1)*t*t+1)+e}function r(t,e,i,r){return t/=r/2,1>t?i/2*t*t*t+e:i/2*((t-=2)*t*t+2)+e}function s(t,e,i,r){return i*(t/=r)*t*t*t+e}function n(t,e,i,r){return-i*((t=t/r-1)*t*t*t-1)+e}function o(t,e,i,r){return t/=r/2,1>t?i/2*t*t*t*t+e:-i/2*((t-=2)*t*t*t-2)+e}function a(t,e,i,r){return i*(t/=r)*t*t*t*t+e}function h(t,e,i,r){return i*((t=t/r-1)*t*t*t*t+1)+e}function c(t,e,i,r){return t/=r/2,1>t?i/2*t*t*t*t*t+e:i/2*((t-=2)*t*t*t*t+2)+e}function l(t,e,i,r){return-i*Math.cos(t/r*(Math.PI/2))+i+e}function u(t,e,i,r){return i*Math.sin(t/r*(Math.PI/2))+e}function f(t,e,i,r){return-i/2*(Math.cos(Math.PI*t/r)-1)+e}function d(t,e,i,r){return 0===t?e:i*Math.pow(2,10*(t/r-1))+e}function g(t,e,i,r){return t===r?e+i:i*(-Math.pow(2,-10*t/r)+1)+e}function p(t,e,i,r){return 0===t?e:t===r?e+i:(t/=r/2,1>t?i/2*Math.pow(2,10*(t-1))+e:i/2*(-Math.pow(2,-10*--t)+2)+e)}function v(t,e,i,r){return-i*(Math.sqrt(1-(t/=r)*t)-1)+e}function b(t,e,i,r){return i*Math.sqrt(1-(t=t/r-1)*t)+e}function y(t,e,i,r){return t/=r/2,1>t?-i/2*(Math.sqrt(1-t*t)-1)+e:i/2*(Math.sqrt(1-(t-=2)*t)+1)+e}function m(i,r,s,n){var o=1.70158,a=0,h=s;if(0===i)return r;if(i/=n,1===i)return r+s;a||(a=.3*n);var c=t(h,s,a,o);return-e(c,i,n)+r}function _(e,i,r,s){var n=1.70158,o=0,a=r;if(0===e)return i;if(e/=s,1===e)return i+r;o||(o=.3*s);var h=t(a,r,o,n);return h.a*Math.pow(2,-10*e)*Math.sin(2*(e*s-h.s)*Math.PI/h.p)+h.c+i}function x(i,r,s,n){var o=1.70158,a=0,h=s;if(0===i)return r;if(i/=n/2,2===i)return r+s;a||(a=.3*n*1.5);var c=t(h,s,a,o);return 1>i?-.5*e(c,i,n)+r:c.a*Math.pow(2,-10*(i-=1))*Math.sin(2*(i*n-c.s)*Math.PI/c.p)*.5+c.c+r}function C(t,e,i,r,s){return void 0===s&&(s=1.70158),i*(t/=r)*t*((s+1)*t-s)+e}function S(t,e,i,r,s){return void 0===s&&(s=1.70158),i*((t=t/r-1)*t*((s+1)*t+s)+1)+e}function w(t,e,i,r,s){return void 0===s&&(s=1.70158),t/=r/2,1>t?i/2*t*t*(((s*=1.525)+1)*t-s)+e:i/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+e}function O(t,e,i,r){return i-T(r-t,0,i,r)+e}function T(t,e,i,r){return(t/=r)<1/2.75?7.5625*i*t*t+e:2/2.75>t?i*(7.5625*(t-=1.5/2.75)*t+.75)+e:2.5/2.75>t?i*(7.5625*(t-=2.25/2.75)*t+.9375)+e:i*(7.5625*(t-=2.625/2.75)*t+.984375)+e}function k(t,e,i,r){return r/2>t?.5*O(2*t,0,i,r)+e:.5*T(2*t-r,0,i,r)+.5*i+e}fabric.util.ease={easeInQuad:function(t,e,i,r){return i*(t/=r)*t+e},easeOutQuad:function(t,e,i,r){return-i*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,i,r){return t/=r/2,1>t?i/2*t*t+e:-i/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,i,r){return i*(t/=r)*t*t+e},easeOutCubic:i,easeInOutCubic:r,easeInQuart:s,easeOutQuart:n,easeInOutQuart:o,easeInQuint:a,easeOutQuint:h,easeInOutQuint:c,easeInSine:l,easeOutSine:u,easeInOutSine:f,easeInExpo:d,easeOutExpo:g,easeInOutExpo:p,easeInCirc:v,easeOutCirc:b,easeInOutCirc:y,easeInElastic:m,easeOutElastic:_,easeInOutElastic:x,easeInBack:C,easeOutBack:S,easeInOutBack:w,easeInBounce:O,easeOutBounce:T,easeInOutBounce:k}}(),function(t){"use strict";function e(t){return t in m?m[t]:t}function i(t,e,i){var r,s="[object Array]"===Object.prototype.toString.call(e);return"fill"!==t&&"stroke"!==t||"none"!==e?"fillRule"===t?e="evenodd"===e?"destination-over":e:"strokeDashArray"===t?e=e.replace(/,/g," ").split(/\s+/).map(function(t){return parseInt(t)}):"transformMatrix"===t?e=i&&i.transformMatrix?y(i.transformMatrix,f.parseTransformAttribute(e)):f.parseTransformAttribute(e):"visible"===t?(e="none"===e||"hidden"===e?!1:!0,i&&i.visible===!1&&(e=!1)):"originX"===t?e="start"===e?"left":"end"===e?"right":"center":r=s?e.map(b):b(e):e="",!s&&isNaN(r)?e:r}function r(t){for(var e in _)if(t[e]&&"undefined"!=typeof t[_[e]]&&0!==t[e].indexOf("url(")){var i=new f.Color(t[e]);t[e]=i.setAlpha(v(i.getAlpha()*t[_[e]],2)).toRgba(),delete t[_[e]]}return t}function s(t,e){var i=t.match(/(normal|italic)?\s*(normal|small-caps)?\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\s*(\d+)px(?:\/(normal|[\d\.]+))?\s+(.*)/);if(i){var r=i[1],s=i[3],n=i[4],o=i[5],a=i[6];r&&(e.fontStyle=r),s&&(e.fontWeight=isNaN(parseFloat(s))?s:parseFloat(s)),n&&(e.fontSize=parseFloat(n)),a&&(e.fontFamily=a),o&&(e.lineHeight="normal"===o?1:o)}}function n(t,r){var n,o;t.replace(/;$/,"").split(";").forEach(function(t){var a=t.split(":");n=e(a[0].trim().toLowerCase()),o=i(n,a[1].trim()),"font"===n?s(o,r):r[n]=o})}function o(t,r){var n,o;for(var a in t)"undefined"!=typeof t[a]&&(n=e(a.toLowerCase()),o=i(n,t[a]),"font"===n?s(o,r):r[n]=o)}function a(t){var r=t.nodeName,s=t.getAttribute("class"),n=t.getAttribute("id"),o={};for(var a in f.cssRules){var h=s&&new RegExp("^\\."+s).test(a)||n&&new RegExp("^#"+n).test(a)||new RegExp("^"+r).test(a);if(h)for(var c in f.cssRules[a]){var l=e(c),u=i(l,f.cssRules[a][c]);o[l]=u}}return o}function h(t){for(var e=t.getElementsByTagName("use");e.length;){for(var i,r=e[0],s=r.getAttribute("xlink:href").substr(1),n=r.getAttribute("x")||0,o=r.getAttribute("y")||0,a=t.getElementById(s).cloneNode(!0),h=(r.getAttribute("transform")||"")+" translate("+n+", "+o+")",c=0,l=r.attributes,u=l.length;u>c;c++){var f=l.item(c);"x"!==f.nodeName&&"y"!==f.nodeName&&"xlink:href"!==f.nodeName&&("transform"===f.nodeName?h=h+" "+f.nodeValue:a.setAttribute(f.nodeName,f.nodeValue))}a.setAttribute("transform",h),a.removeAttribute("id"),i=r.parentNode,i.replaceChild(a,r)}}function c(t,e){if(e[3]=e[0]=e[0]>e[3]?e[3]:e[0],1!==e[0]||1!==e[3]||0!==e[4]||0!==e[5]){for(var i=document.createElement("g");null!=t.firstChild;){var r=t.firstChild;i.appendChild(r)}i.setAttribute("transform","matrix("+e[0]+" "+e[1]+" "+e[2]+" "+e[3]+" "+e[4]+" "+e[5]+")"),t.appendChild(i)}}function l(t){var e=t.objects,i=t.options;return e=e.map(function(t){return f[g(t.type)].fromObject(t)}),{objects:e,options:i}}function u(t,e,i){e[i]&&e[i].toSVG&&t.push('<pattern x="0" y="0" id="',i,'Pattern" ','width="',e[i].source.width,'" height="',e[i].source.height,'" patternUnits="userSpaceOnUse">','<image x="0" y="0" ','width="',e[i].source.width,'" height="',e[i].source.height,'" xlink:href="',e[i].source.src,'"></image></pattern>')}var f=t.fabric||(t.fabric={}),d=f.util.object.extend,g=f.util.string.capitalize,p=f.util.object.clone,v=f.util.toFixed,b=f.util.parseUnit,y=f.util.multiplyTransformMatrices,m={cx:"left",x:"left",r:"radius",cy:"top",y:"top",display:"visible",visibility:"visible",transform:"transformMatrix","fill-opacity":"fillOpacity","fill-rule":"fillRule","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","stroke-dasharray":"strokeDashArray","stroke-linecap":"strokeLineCap","stroke-linejoin":"strokeLineJoin","stroke-miterlimit":"strokeMiterLimit","stroke-opacity":"strokeOpacity","stroke-width":"strokeWidth","text-decoration":"textDecoration","text-anchor":"originX"},_={stroke:"strokeOpacity",fill:"fillOpacity"};f.parseTransformAttribute=function(){function t(t,e){var i=e[0];t[0]=Math.cos(i),t[1]=Math.sin(i),t[2]=-Math.sin(i),t[3]=Math.cos(i)}function e(t,e){var i=e[0],r=2===e.length?e[1]:e[0];t[0]=i,t[3]=r}function i(t,e){t[2]=e[0]}function r(t,e){t[1]=e[0]}function s(t,e){t[4]=e[0],2===e.length&&(t[5]=e[1])}var n=[1,0,0,1,0,0],o="(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",a="(?:\\s+,?\\s*|,\\s*)",h="(?:(skewX)\\s*\\(\\s*("+o+")\\s*\\))",c="(?:(skewY)\\s*\\(\\s*("+o+")\\s*\\))",l="(?:(rotate)\\s*\\(\\s*("+o+")(?:"+a+"("+o+")"+a+"("+o+"))?\\s*\\))",u="(?:(scale)\\s*\\(\\s*("+o+")(?:"+a+"("+o+"))?\\s*\\))",d="(?:(translate)\\s*\\(\\s*("+o+")(?:"+a+"("+o+"))?\\s*\\))",g="(?:(matrix)\\s*\\(\\s*("+o+")"+a+"("+o+")"+a+"("+o+")"+a+"("+o+")"+a+"("+o+")"+a+"("+o+")\\s*\\))",p="(?:"+g+"|"+d+"|"+u+"|"+l+"|"+h+"|"+c+")",v="(?:"+p+"(?:"+a+p+")*)",b="^\\s*(?:"+v+"?)\\s*$",y=new RegExp(b),m=new RegExp(p,"g");return function(o){var a=n.concat(),h=[];if(!o||o&&!y.test(o))return a;o.replace(m,function(o){var c=new RegExp(p).exec(o).filter(function(t){return""!==t&&null!=t}),l=c[1],u=c.slice(2).map(parseFloat);switch(l){case"translate":s(a,u);break;case"rotate":u[0]=f.util.degreesToRadians(u[0]),t(a,u);break;case"scale":e(a,u);break;case"skewX":i(a,u);break;case"skewY":r(a,u);break;case"matrix":a=u}h.push(a.concat()),a=n.concat()});for(var c=h[0];h.length>1;)h.shift(),c=f.util.multiplyTransformMatrices(c,h[0]);return c}}(),f.parseSVGDocument=function(){function t(t,e){for(;t&&(t=t.parentNode);)if(e.test(t.nodeName))return!0;return!1}var e=/^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,i="(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",r=new RegExp("^\\s*("+i+"+)\\s*,?\\s*("+i+"+)\\s*,?\\s*("+i+"+)\\s*,?\\s*("+i+"+)\\s*$");return function(i,s,n){if(i){var o=new Date;h(i);var a,l,u=i.getAttribute("viewBox"),g=parseFloat(i.getAttribute("width")),v=parseFloat(i.getAttribute("height"));if(u&&(u=u.match(r))){var b=parseFloat(u[1]),y=parseFloat(u[2]),m=1,_=1;a=parseFloat(u[3]),l=parseFloat(u[4]),g&&g!==a&&(m=g/a),v&&v!==l&&(_=v/l),c(i,[m,0,0,_,-b,-y])}var x=f.util.toArray(i.getElementsByTagName("*"));if(0===x.length&&f.isLikelyNode){x=i.selectNodes('//*[name(.)!="svg"]');for(var C=[],S=0,w=x.length;w>S;S++)C[S]=x[S];x=C}var O=x.filter(function(i){return e.test(i.tagName)&&!t(i,/^(?:pattern|defs)$/)});if(!O||O&&!O.length)return void(s&&s([],{}));var T={width:g?g:a,height:v?v:l,widthAttr:g,heightAttr:v};f.gradientDefs=d(f.getGradientDefs(i),f.gradientDefs),f.cssRules=d(f.getCSSRules(i),f.cssRules),f.parseElements(O,function(t){f.documentParsingTime=new Date-o,s&&s(t,T)},p(T),n)}}}();var x={has:function(t,e){e(!1)},get:function(){},set:function(){}};d(f,{resolveGradients:function(t){for(var e=t.length;e--;){var i=t[e].get("fill");if(/^url\(/.test(i)){var r=i.slice(5,i.length-1);f.gradientDefs[r]&&t[e].set("fill",f.Gradient.fromElement(f.gradientDefs[r],t[e]))}}},getGradientDefs:function(t){var e,i,r=t.getElementsByTagName("linearGradient"),s=t.getElementsByTagName("radialGradient"),n={};for(i=r.length;i--;)e=r[i],n[e.getAttribute("id")]=e;for(i=s.length;i--;)e=s[i],n[e.getAttribute("id")]=e;return n},parseAttributes:function(t,s){if(t){var n,o={};t.parentNode&&/^[g|a]$/i.test(t.parentNode.nodeName)&&(o=f.parseAttributes(t.parentNode,s));var h=s.reduce(function(r,s){return n=t.getAttribute(s),n&&(s=e(s),n=i(s,n,o),r[s]=n),r},{});return h=d(h,d(a(t),f.parseStyleAttribute(t))),r(d(o,h))}},parseElements:function(t,e,i,r){new f.ElementsParser(t,e,i,r).parse()},parseStyleAttribute:function(t){var e={},i=t.getAttribute("style");return i?("string"==typeof i?n(i,e):o(i,e),e):e},parsePointsAttribute:function(t){if(!t)return null;t=t.replace(/,/g," ").trim(),t=t.split(/\s+/);var e,i,r=[];for(e=0,i=t.length;i>e;e+=2)r.push({x:parseFloat(t[e]),y:parseFloat(t[e+1])});return r},getCSSRules:function(t){for(var e,i=t.getElementsByTagName("style"),r={},s=0,n=i.length;n>s;s++){var o=i[0].textContent;o=o.replace(/\/\*[\s\S]*?\*\//g,""),e=o.match(/[^{]*\{[\s\S]*?\}/g),e=e.map(function(t){return t.trim()}),e.forEach(function(t){var e=t.match(/([\s\S]*?)\s*\{([^}]*)\}/);t=e[1];var i=e[2].trim(),s=i.replace(/;$/,"").split(/\s*;\s*/);r[t]||(r[t]={});for(var n=0,o=s.length;o>n;n++){var a=s[n].split(/\s*:\s*/),h=a[0],c=a[1];r[t][h]=c}})}return r},loadSVGFromURL:function(t,e,i){function r(r){var s=r.responseXML;s&&!s.documentElement&&f.window.ActiveXObject&&r.responseText&&(s=new ActiveXObject("Microsoft.XMLDOM"),s.async="false",s.loadXML(r.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,""))),s&&s.documentElement&&f.parseSVGDocument(s.documentElement,function(i,r){x.set(t,{objects:f.util.array.invoke(i,"toObject"),options:r}),e(i,r)
},i)}t=t.replace(/^\n\s*/,"").trim(),x.has(t,function(i){i?x.get(t,function(t){var i=l(t);e(i.objects,i.options)}):new f.util.request(t,{method:"get",onComplete:r})})},loadSVGFromString:function(t,e,i){t=t.trim();var r;if("undefined"!=typeof DOMParser){var s=new DOMParser;s&&s.parseFromString&&(r=s.parseFromString(t,"text/xml"))}else f.window.ActiveXObject&&(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(t.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,"")));f.parseSVGDocument(r.documentElement,function(t,i){e(t,i)},i)},createSVGFontFacesMarkup:function(t){for(var e="",i=0,r=t.length;r>i;i++)"text"===t[i].type&&t[i].path&&(e+=["@font-face {","font-family: ",t[i].fontFamily,"; ","src: url('",t[i].path,"')","}"].join(""));return e&&(e=['<style type="text/css">',"<![CDATA[",e,"]]>","</style>"].join("")),e},createSVGRefElementsMarkup:function(t){var e=[];return u(e,t,"backgroundColor"),u(e,t,"overlayColor"),e.join("")}})}("undefined"!=typeof exports?exports:this),fabric.ElementsParser=function(t,e,i,r){this.elements=t,this.callback=e,this.options=i,this.reviver=r},fabric.ElementsParser.prototype.parse=function(){this.instances=new Array(this.elements.length),this.numElements=this.elements.length,this.createObjects()},fabric.ElementsParser.prototype.createObjects=function(){for(var t=0,e=this.elements.length;e>t;t++)!function(t,e){setTimeout(function(){t.createObject(t.elements[e],e)},0)}(this,t)},fabric.ElementsParser.prototype.createObject=function(t,e){var i=fabric[fabric.util.string.capitalize(t.tagName)];if(i&&i.fromElement)try{this._createObject(i,t,e)}catch(r){fabric.log(r)}else this.checkIfDone()},fabric.ElementsParser.prototype._createObject=function(t,e,i){if(t.async)t.fromElement(e,this.createCallback(i,e),this.options);else{var r=t.fromElement(e,this.options);this.reviver&&this.reviver(e,r),this.instances[i]=r,this.checkIfDone()}},fabric.ElementsParser.prototype.createCallback=function(t,e){var i=this;return function(r){i.reviver&&i.reviver(e,r),i.instances[t]=r,i.checkIfDone()}},fabric.ElementsParser.prototype.checkIfDone=function(){0===--this.numElements&&(this.instances=this.instances.filter(function(t){return null!=t}),fabric.resolveGradients(this.instances),this.callback(this.instances))},function(t){"use strict";function e(t,e){this.x=t,this.y=e}var i=t.fabric||(t.fabric={});return i.Point?void i.warn("fabric.Point is already defined"):(i.Point=e,void(e.prototype={constructor:e,add:function(t){return new e(this.x+t.x,this.y+t.y)},addEquals:function(t){return this.x+=t.x,this.y+=t.y,this},scalarAdd:function(t){return new e(this.x+t,this.y+t)},scalarAddEquals:function(t){return this.x+=t,this.y+=t,this},subtract:function(t){return new e(this.x-t.x,this.y-t.y)},subtractEquals:function(t){return this.x-=t.x,this.y-=t.y,this},scalarSubtract:function(t){return new e(this.x-t,this.y-t)},scalarSubtractEquals:function(t){return this.x-=t,this.y-=t,this},multiply:function(t){return new e(this.x*t,this.y*t)},multiplyEquals:function(t){return this.x*=t,this.y*=t,this},divide:function(t){return new e(this.x/t,this.y/t)},divideEquals:function(t){return this.x/=t,this.y/=t,this},eq:function(t){return this.x===t.x&&this.y===t.y},lt:function(t){return this.x<t.x&&this.y<t.y},lte:function(t){return this.x<=t.x&&this.y<=t.y},gt:function(t){return this.x>t.x&&this.y>t.y},gte:function(t){return this.x>=t.x&&this.y>=t.y},lerp:function(t,i){return new e(this.x+(t.x-this.x)*i,this.y+(t.y-this.y)*i)},distanceFrom:function(t){var e=this.x-t.x,i=this.y-t.y;return Math.sqrt(e*e+i*i)},midPointFrom:function(t){return new e(this.x+(t.x-this.x)/2,this.y+(t.y-this.y)/2)},min:function(t){return new e(Math.min(this.x,t.x),Math.min(this.y,t.y))},max:function(t){return new e(Math.max(this.x,t.x),Math.max(this.y,t.y))},toString:function(){return this.x+","+this.y},setXY:function(t,e){this.x=t,this.y=e},setFromPoint:function(t){this.x=t.x,this.y=t.y},swap:function(t){var e=this.x,i=this.y;this.x=t.x,this.y=t.y,t.x=e,t.y=i}}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){this.status=t,this.points=[]}var i=t.fabric||(t.fabric={});return i.Intersection?void i.warn("fabric.Intersection is already defined"):(i.Intersection=e,i.Intersection.prototype={appendPoint:function(t){this.points.push(t)},appendPoints:function(t){this.points=this.points.concat(t)}},i.Intersection.intersectLineLine=function(t,r,s,n){var o,a=(n.x-s.x)*(t.y-s.y)-(n.y-s.y)*(t.x-s.x),h=(r.x-t.x)*(t.y-s.y)-(r.y-t.y)*(t.x-s.x),c=(n.y-s.y)*(r.x-t.x)-(n.x-s.x)*(r.y-t.y);if(0!==c){var l=a/c,u=h/c;l>=0&&1>=l&&u>=0&&1>=u?(o=new e("Intersection"),o.points.push(new i.Point(t.x+l*(r.x-t.x),t.y+l*(r.y-t.y)))):o=new e}else o=new e(0===a||0===h?"Coincident":"Parallel");return o},i.Intersection.intersectLinePolygon=function(t,i,r){for(var s=new e,n=r.length,o=0;n>o;o++){var a=r[o],h=r[(o+1)%n],c=e.intersectLineLine(t,i,a,h);s.appendPoints(c.points)}return s.points.length>0&&(s.status="Intersection"),s},i.Intersection.intersectPolygonPolygon=function(t,i){for(var r=new e,s=t.length,n=0;s>n;n++){var o=t[n],a=t[(n+1)%s],h=e.intersectLinePolygon(o,a,i);r.appendPoints(h.points)}return r.points.length>0&&(r.status="Intersection"),r},void(i.Intersection.intersectPolygonRectangle=function(t,r,s){var n=r.min(s),o=r.max(s),a=new i.Point(o.x,n.y),h=new i.Point(n.x,o.y),c=e.intersectLinePolygon(n,a,t),l=e.intersectLinePolygon(a,o,t),u=e.intersectLinePolygon(o,h,t),f=e.intersectLinePolygon(h,n,t),d=new e;return d.appendPoints(c.points),d.appendPoints(l.points),d.appendPoints(u.points),d.appendPoints(f.points),d.points.length>0&&(d.status="Intersection"),d}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){t?this._tryParsingColor(t):this.setSource([0,0,0,1])}function i(t,e,i){return 0>i&&(i+=1),i>1&&(i-=1),1/6>i?t+6*(e-t)*i:.5>i?e:2/3>i?t+(e-t)*(2/3-i)*6:t}var r=t.fabric||(t.fabric={});return r.Color?void r.warn("fabric.Color is already defined."):(r.Color=e,r.Color.prototype={_tryParsingColor:function(t){var i;return t in e.colorNameMap&&(t=e.colorNameMap[t]),"transparent"===t?void this.setSource([255,255,255,0]):(i=e.sourceFromHex(t),i||(i=e.sourceFromRgb(t)),i||(i=e.sourceFromHsl(t)),void(i&&this.setSource(i)))},_rgbToHsl:function(t,e,i){t/=255,e/=255,i/=255;var s,n,o,a=r.util.array.max([t,e,i]),h=r.util.array.min([t,e,i]);if(o=(a+h)/2,a===h)s=n=0;else{var c=a-h;switch(n=o>.5?c/(2-a-h):c/(a+h),a){case t:s=(e-i)/c+(i>e?6:0);break;case e:s=(i-t)/c+2;break;case i:s=(t-e)/c+4}s/=6}return[Math.round(360*s),Math.round(100*n),Math.round(100*o)]},getSource:function(){return this._source},setSource:function(t){this._source=t},toRgb:function(){var t=this.getSource();return"rgb("+t[0]+","+t[1]+","+t[2]+")"},toRgba:function(){var t=this.getSource();return"rgba("+t[0]+","+t[1]+","+t[2]+","+t[3]+")"},toHsl:function(){var t=this.getSource(),e=this._rgbToHsl(t[0],t[1],t[2]);return"hsl("+e[0]+","+e[1]+"%,"+e[2]+"%)"},toHsla:function(){var t=this.getSource(),e=this._rgbToHsl(t[0],t[1],t[2]);return"hsla("+e[0]+","+e[1]+"%,"+e[2]+"%,"+t[3]+")"},toHex:function(){var t,e,i,r=this.getSource();return t=r[0].toString(16),t=1===t.length?"0"+t:t,e=r[1].toString(16),e=1===e.length?"0"+e:e,i=r[2].toString(16),i=1===i.length?"0"+i:i,t.toUpperCase()+e.toUpperCase()+i.toUpperCase()},getAlpha:function(){return this.getSource()[3]},setAlpha:function(t){var e=this.getSource();return e[3]=t,this.setSource(e),this},toGrayscale:function(){var t=this.getSource(),e=parseInt((.3*t[0]+.59*t[1]+.11*t[2]).toFixed(0),10),i=t[3];return this.setSource([e,e,e,i]),this},toBlackWhite:function(t){var e=this.getSource(),i=(.3*e[0]+.59*e[1]+.11*e[2]).toFixed(0),r=e[3];return t=t||127,i=Number(i)<Number(t)?0:255,this.setSource([i,i,i,r]),this},overlayWith:function(t){t instanceof e||(t=new e(t));for(var i=[],r=this.getAlpha(),s=.5,n=this.getSource(),o=t.getSource(),a=0;3>a;a++)i.push(Math.round(n[a]*(1-s)+o[a]*s));return i[3]=r,this.setSource(i),this}},r.Color.reRGBa=/^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,r.Color.reHSLa=/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/,r.Color.reHex=/^#?([0-9a-f]{6}|[0-9a-f]{3})$/i,r.Color.colorNameMap={aqua:"#00FFFF",black:"#000000",blue:"#0000FF",fuchsia:"#FF00FF",gray:"#808080",green:"#008000",lime:"#00FF00",maroon:"#800000",navy:"#000080",olive:"#808000",orange:"#FFA500",purple:"#800080",red:"#FF0000",silver:"#C0C0C0",teal:"#008080",white:"#FFFFFF",yellow:"#FFFF00"},r.Color.fromRgb=function(t){return e.fromSource(e.sourceFromRgb(t))},r.Color.sourceFromRgb=function(t){var i=t.match(e.reRGBa);if(i){var r=parseInt(i[1],10)/(/%$/.test(i[1])?100:1)*(/%$/.test(i[1])?255:1),s=parseInt(i[2],10)/(/%$/.test(i[2])?100:1)*(/%$/.test(i[2])?255:1),n=parseInt(i[3],10)/(/%$/.test(i[3])?100:1)*(/%$/.test(i[3])?255:1);return[parseInt(r,10),parseInt(s,10),parseInt(n,10),i[4]?parseFloat(i[4]):1]}},r.Color.fromRgba=e.fromRgb,r.Color.fromHsl=function(t){return e.fromSource(e.sourceFromHsl(t))},r.Color.sourceFromHsl=function(t){var r=t.match(e.reHSLa);if(r){var s,n,o,a=(parseFloat(r[1])%360+360)%360/360,h=parseFloat(r[2])/(/%$/.test(r[2])?100:1),c=parseFloat(r[3])/(/%$/.test(r[3])?100:1);if(0===h)s=n=o=c;else{var l=.5>=c?c*(h+1):c+h-c*h,u=2*c-l;s=i(u,l,a+1/3),n=i(u,l,a),o=i(u,l,a-1/3)}return[Math.round(255*s),Math.round(255*n),Math.round(255*o),r[4]?parseFloat(r[4]):1]}},r.Color.fromHsla=e.fromHsl,r.Color.fromHex=function(t){return e.fromSource(e.sourceFromHex(t))},r.Color.sourceFromHex=function(t){if(t.match(e.reHex)){var i=t.slice(t.indexOf("#")+1),r=3===i.length,s=r?i.charAt(0)+i.charAt(0):i.substring(0,2),n=r?i.charAt(1)+i.charAt(1):i.substring(2,4),o=r?i.charAt(2)+i.charAt(2):i.substring(4,6);return[parseInt(s,16),parseInt(n,16),parseInt(o,16),1]}},void(r.Color.fromSource=function(t){var i=new e;return i.setSource(t),i}))}("undefined"!=typeof exports?exports:this),function(){function t(t){var e,i,r=t.getAttribute("style"),s=t.getAttribute("offset");if(s=parseFloat(s)/(/%$/.test(s)?100:1),r){var n=r.split(/\s*;\s*/);""===n[n.length-1]&&n.pop();for(var o=n.length;o--;){var a=n[o].split(/\s*:\s*/),h=a[0].trim(),c=a[1].trim();"stop-color"===h?e=c:"stop-opacity"===h&&(i=c)}}return e||(e=t.getAttribute("stop-color")||"rgb(0,0,0)"),i||(i=t.getAttribute("stop-opacity")),e=new fabric.Color(e).toRgb(),{offset:s,color:e,opacity:isNaN(parseFloat(i))?1:parseFloat(i)}}function e(t){return{x1:t.getAttribute("x1")||0,y1:t.getAttribute("y1")||0,x2:t.getAttribute("x2")||"100%",y2:t.getAttribute("y2")||0}}function i(t){return{x1:t.getAttribute("fx")||t.getAttribute("cx")||"50%",y1:t.getAttribute("fy")||t.getAttribute("cy")||"50%",r1:0,x2:t.getAttribute("cx")||"50%",y2:t.getAttribute("cy")||"50%",r2:t.getAttribute("r")||"50%"}}function r(t,e){for(var i in e){if("string"==typeof e[i]&&/^\d+%$/.test(e[i])){var r=parseFloat(e[i],10);"x1"===i||"x2"===i||"r2"===i?e[i]=fabric.util.toFixed(t.width*r/100,2):("y1"===i||"y2"===i)&&(e[i]=fabric.util.toFixed(t.height*r/100,2))}s(e,i,t)}}function s(t,e,i){"x1"===e||"x2"===e?t[e]-=fabric.util.toFixed(i.width/2,2):("y1"===e||"y2"===e)&&(t[e]-=fabric.util.toFixed(i.height/2,2))}function n(t,e){for(var i in e)s(e,i,t),"x1"===i||"x2"===i||"r2"===i?e[i]=fabric.util.toFixed(e[i]/t.width*100,2)+"%":("y1"===i||"y2"===i)&&(e[i]=fabric.util.toFixed(e[i]/t.height*100,2)+"%")}fabric.Gradient=fabric.util.createClass({initialize:function(t){t||(t={});var e={};this.id=fabric.Object.__uid++,this.type=t.type||"linear",e={x1:t.coords.x1||0,y1:t.coords.y1||0,x2:t.coords.x2||0,y2:t.coords.y2||0},"radial"===this.type&&(e.r1=t.coords.r1||0,e.r2=t.coords.r2||0),this.coords=e,this.gradientUnits=t.gradientUnits||"objectBoundingBox",this.colorStops=t.colorStops.slice()},addColorStop:function(t){for(var e in t){var i=new fabric.Color(t[e]);this.colorStops.push({offset:e,color:i.toRgb(),opacity:i.getAlpha()})}return this},toObject:function(){return{type:this.type,coords:this.coords,gradientUnits:this.gradientUnits,colorStops:this.colorStops}},toSVG:function(t,e){var i,r=fabric.util.object.clone(this.coords);this.colorStops.sort(function(t,e){return t.offset-e.offset}),e&&"userSpaceOnUse"===this.gradientUnits?(r.x1+=t.width/2,r.y1+=t.height/2,r.x2+=t.width/2,r.y2+=t.height/2):"objectBoundingBox"===this.gradientUnits&&n(t,r),"linear"===this.type?i=["<linearGradient ",'id="SVGID_',this.id,'" gradientUnits="',this.gradientUnits,'" x1="',r.x1,'" y1="',r.y1,'" x2="',r.x2,'" y2="',r.y2,'">']:"radial"===this.type&&(i=["<radialGradient ",'id="SVGID_',this.id,'" gradientUnits="',this.gradientUnits,'" cx="',r.x2,'" cy="',r.y2,'" r="',r.r2,'" fx="',r.x1,'" fy="',r.y1,'">']);for(var s=0;s<this.colorStops.length;s++)i.push("<stop ",'offset="',100*this.colorStops[s].offset+"%",'" style="stop-color:',this.colorStops[s].color,this.colorStops[s].opacity?";stop-opacity: "+this.colorStops[s].opacity:";",'"/>');return i.push("linear"===this.type?"</linearGradient>":"</radialGradient>"),i.join("")},toLive:function(t){var e;if(this.type){"linear"===this.type?e=t.createLinearGradient(this.coords.x1,this.coords.y1,this.coords.x2,this.coords.y2):"radial"===this.type&&(e=t.createRadialGradient(this.coords.x1,this.coords.y1,this.coords.r1,this.coords.x2,this.coords.y2,this.coords.r2));for(var i=0,r=this.colorStops.length;r>i;i++){var s=this.colorStops[i].color,n=this.colorStops[i].opacity,o=this.colorStops[i].offset;"undefined"!=typeof n&&(s=new fabric.Color(s).setAlpha(n).toRgba()),e.addColorStop(parseFloat(o),s)}return e}}}),fabric.util.object.extend(fabric.Gradient,{fromElement:function(s,n){var o=s.getElementsByTagName("stop"),a="linearGradient"===s.nodeName?"linear":"radial",h=s.getAttribute("gradientUnits")||"objectBoundingBox",c=[],l={};"linear"===a?l=e(s):"radial"===a&&(l=i(s));for(var u=o.length;u--;)c.push(t(o[u]));return r(n,l),new fabric.Gradient({type:a,coords:l,gradientUnits:h,colorStops:c})},forObject:function(t,e){return e||(e={}),r(t,e),new fabric.Gradient(e)}})}(),fabric.Pattern=fabric.util.createClass({repeat:"repeat",offsetX:0,offsetY:0,initialize:function(t){if(t||(t={}),this.id=fabric.Object.__uid++,t.source)if("string"==typeof t.source)if("undefined"!=typeof fabric.util.getFunctionBody(t.source))this.source=new Function(fabric.util.getFunctionBody(t.source));else{var e=this;this.source=fabric.util.createImage(),fabric.util.loadImage(t.source,function(t){e.source=t})}else this.source=t.source;t.repeat&&(this.repeat=t.repeat),t.offsetX&&(this.offsetX=t.offsetX),t.offsetY&&(this.offsetY=t.offsetY)},toObject:function(){var t;return"function"==typeof this.source?t=String(this.source):"string"==typeof this.source.src&&(t=this.source.src),{source:t,repeat:this.repeat,offsetX:this.offsetX,offsetY:this.offsetY}},toSVG:function(t){var e="function"==typeof this.source?this.source():this.source,i=e.width/t.getWidth(),r=e.height/t.getHeight(),s="";return e.src?s=e.src:e.toDataURL&&(s=e.toDataURL()),'<pattern id="SVGID_'+this.id+'" x="'+this.offsetX+'" y="'+this.offsetY+'" width="'+i+'" height="'+r+'"><image x="0" y="0" width="'+e.width+'" height="'+e.height+'" xlink:href="'+s+'"></image></pattern>'},toLive:function(t){var e="function"==typeof this.source?this.source():this.source;if(!e)return"";if("undefined"!=typeof e.src){if(!e.complete)return"";if(0===e.naturalWidth||0===e.naturalHeight)return""}return t.createPattern(e,this.repeat)}}),function(t){"use strict";var e=t.fabric||(t.fabric={});return e.Shadow?void e.warn("fabric.Shadow is already defined."):(e.Shadow=e.util.createClass({color:"rgb(0,0,0)",blur:0,offsetX:0,offsetY:0,affectStroke:!1,includeDefaultValues:!0,initialize:function(t){"string"==typeof t&&(t=this._parseShadow(t));for(var i in t)this[i]=t[i];this.id=e.Object.__uid++},_parseShadow:function(t){var i=t.trim(),r=e.Shadow.reOffsetsAndBlur.exec(i)||[],s=i.replace(e.Shadow.reOffsetsAndBlur,"")||"rgb(0,0,0)";return{color:s.trim(),offsetX:parseInt(r[1],10)||0,offsetY:parseInt(r[2],10)||0,blur:parseInt(r[3],10)||0}},toString:function(){return[this.offsetX,this.offsetY,this.blur,this.color].join("px ")},toSVG:function(t){var e="SourceAlpha";return!t||t.fill!==this.color&&t.stroke!==this.color||(e="SourceGraphic"),'<filter id="SVGID_'+this.id+'" y="-40%" height="180%"><feGaussianBlur in="'+e+'" stdDeviation="'+(this.blur?this.blur/3:0)+'"></feGaussianBlur><feOffset dx="'+this.offsetX+'" dy="'+this.offsetY+'"></feOffset><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>'},toObject:function(){if(this.includeDefaultValues)return{color:this.color,blur:this.blur,offsetX:this.offsetX,offsetY:this.offsetY};var t={},i=e.Shadow.prototype;return this.color!==i.color&&(t.color=this.color),this.blur!==i.blur&&(t.blur=this.blur),this.offsetX!==i.offsetX&&(t.offsetX=this.offsetX),this.offsetY!==i.offsetY&&(t.offsetY=this.offsetY),t}}),void(e.Shadow.reOffsetsAndBlur=/(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/))}("undefined"!=typeof exports?exports:this),function(){"use strict";if(fabric.StaticCanvas)return void fabric.warn("fabric.StaticCanvas is already defined.");var t=fabric.util.object.extend,e=fabric.util.getElementOffset,i=fabric.util.removeFromArray,r=new Error("Could not initialize `canvas` element");fabric.StaticCanvas=fabric.util.createClass({initialize:function(t,e){e||(e={}),this._initStatic(t,e),fabric.StaticCanvas.activeInstance=this},backgroundColor:"",backgroundImage:null,overlayColor:"",overlayImage:null,includeDefaultValues:!0,stateful:!0,renderOnAddRemove:!0,clipTo:null,controlsAboveOverlay:!1,allowTouchScrolling:!1,imageSmoothingEnabled:!0,viewportTransform:[1,0,0,1,0,0],onBeforeScaleRotate:function(){},_initStatic:function(t,e){this._objects=[],this._createLowerCanvas(t),this._initOptions(e),this._setImageSmoothing(),e.overlayImage&&this.setOverlayImage(e.overlayImage,this.renderAll.bind(this)),e.backgroundImage&&this.setBackgroundImage(e.backgroundImage,this.renderAll.bind(this)),e.backgroundColor&&this.setBackgroundColor(e.backgroundColor,this.renderAll.bind(this)),e.overlayColor&&this.setOverlayColor(e.overlayColor,this.renderAll.bind(this)),this.calcOffset()},calcOffset:function(){return this._offset=e(this.lowerCanvasEl),this},setOverlayImage:function(t,e,i){return this.__setBgOverlayImage("overlayImage",t,e,i)},setBackgroundImage:function(t,e,i){return this.__setBgOverlayImage("backgroundImage",t,e,i)},setOverlayColor:function(t,e){return this.__setBgOverlayColor("overlayColor",t,e)},setBackgroundColor:function(t,e){return this.__setBgOverlayColor("backgroundColor",t,e)},_setImageSmoothing:function(){var t=this.getContext();t.imageSmoothingEnabled=this.imageSmoothingEnabled,t.webkitImageSmoothingEnabled=this.imageSmoothingEnabled,t.mozImageSmoothingEnabled=this.imageSmoothingEnabled,t.msImageSmoothingEnabled=this.imageSmoothingEnabled,t.oImageSmoothingEnabled=this.imageSmoothingEnabled},__setBgOverlayImage:function(t,e,i,r){return"string"==typeof e?fabric.util.loadImage(e,function(e){this[t]=new fabric.Image(e,r),i&&i()},this):(this[t]=e,i&&i()),this},__setBgOverlayColor:function(t,e,i){if(e&&e.source){var r=this;fabric.util.loadImage(e.source,function(s){r[t]=new fabric.Pattern({source:s,repeat:e.repeat,offsetX:e.offsetX,offsetY:e.offsetY}),i&&i()})}else this[t]=e,i&&i();return this},_createCanvasElement:function(){var t=fabric.document.createElement("canvas");if(t.style||(t.style={}),!t)throw r;return this._initCanvasElement(t),t},_initCanvasElement:function(t){if(fabric.util.createCanvasElement(t),"undefined"==typeof t.getContext)throw r},_initOptions:function(t){for(var e in t)this[e]=t[e];this.width=this.width||parseInt(this.lowerCanvasEl.width,10)||0,this.height=this.height||parseInt(this.lowerCanvasEl.height,10)||0,this.lowerCanvasEl.style&&(this.lowerCanvasEl.width=this.width,this.lowerCanvasEl.height=this.height,this.lowerCanvasEl.style.width=this.width+"px",this.lowerCanvasEl.style.height=this.height+"px",this.viewportTransform=this.viewportTransform.slice())},_createLowerCanvas:function(t){this.lowerCanvasEl=fabric.util.getById(t)||this._createCanvasElement(),this._initCanvasElement(this.lowerCanvasEl),fabric.util.addClass(this.lowerCanvasEl,"lower-canvas"),this.interactive&&this._applyCanvasStyle(this.lowerCanvasEl),this.contextContainer=this.lowerCanvasEl.getContext("2d")},getWidth:function(){return this.width},getHeight:function(){return this.height},setWidth:function(t){return this._setDimension("width",t)},setHeight:function(t){return this._setDimension("height",t)},setDimensions:function(t){for(var e in t)this._setDimension(e,t[e]);return this},_setDimension:function(t,e){return this.lowerCanvasEl[t]=e,this.lowerCanvasEl.style[t]=e+"px",this.upperCanvasEl&&(this.upperCanvasEl[t]=e,this.upperCanvasEl.style[t]=e+"px"),this.cacheCanvasEl&&(this.cacheCanvasEl[t]=e),this.wrapperEl&&(this.wrapperEl.style[t]=e+"px"),this[t]=e,this.calcOffset(),this.renderAll(),this},getZoom:function(){return Math.sqrt(this.viewportTransform[0]*this.viewportTransform[3])},setViewportTransform:function(t){this.viewportTransform=t,this.renderAll();for(var e=0,i=this._objects.length;i>e;e++)this._objects[e].setCoords();return this},zoomToPoint:function(t,e){var i=t;t=fabric.util.transformPoint(t,fabric.util.invertTransform(this.viewportTransform)),this.viewportTransform[0]=e,this.viewportTransform[3]=e;var r=fabric.util.transformPoint(t,this.viewportTransform);this.viewportTransform[4]+=i.x-r.x,this.viewportTransform[5]+=i.y-r.y,this.renderAll();for(var s=0,n=this._objects.length;n>s;s++)this._objects[s].setCoords();return this},setZoom:function(t){return this.zoomToPoint(new fabric.Point(0,0),t),this},absolutePan:function(t){this.viewportTransform[4]=-t.x,this.viewportTransform[5]=-t.y,this.renderAll();for(var e=0,i=this._objects.length;i>e;e++)this._objects[e].setCoords();return this},relativePan:function(t){return this.absolutePan(new fabric.Point(-t.x-this.viewportTransform[4],-t.y-this.viewportTransform[5]))},getElement:function(){return this.lowerCanvasEl},getActiveObject:function(){return null},getActiveGroup:function(){return null},_draw:function(t,e){if(e){t.save();var i=this.viewportTransform;t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),e.render(t),t.restore(),this.controlsAboveOverlay||e._renderControls(t)}},_onObjectAdded:function(t){this.stateful&&t.setupState(),t.canvas=this,t.setCoords(),this.fire("object:added",{target:t}),t.fire("added")},_onObjectRemoved:function(t){this.getActiveObject()===t&&(this.fire("before:selection:cleared",{target:t}),this._discardActiveObject(),this.fire("selection:cleared")),this.fire("object:removed",{target:t}),t.fire("removed")},clearContext:function(t){return t.clearRect(0,0,this.width,this.height),this},getContext:function(){return this.contextContainer},clear:function(){return this._objects.length=0,this.discardActiveGroup&&this.discardActiveGroup(),this.discardActiveObject&&this.discardActiveObject(),this.clearContext(this.contextContainer),this.contextTop&&this.clearContext(this.contextTop),this.fire("canvas:cleared"),this.renderAll(),this},renderAll:function(t){var e=this[t===!0&&this.interactive?"contextTop":"contextContainer"],i=this.getActiveGroup();return this.contextTop&&this.selection&&!this._groupSelector&&this.clearContext(this.contextTop),t||this.clearContext(e),this.fire("before:render"),this.clipTo&&fabric.util.clipContext(this,e),this._renderBackground(e),this._renderObjects(e,i),this._renderActiveGroup(e,i),this.clipTo&&e.restore(),this._renderOverlay(e),this.controlsAboveOverlay&&this.interactive&&this.drawControls(e),this.fire("after:render"),this},_renderObjects:function(t,e){var i,r;if(e)for(i=0,r=this._objects.length;r>i;++i)this._objects[i]&&!e.contains(this._objects[i])&&this._draw(t,this._objects[i]);else for(i=0,r=this._objects.length;r>i;++i)this._draw(t,this._objects[i])},_renderActiveGroup:function(t,e){if(e){var i=[];this.forEachObject(function(t){e.contains(t)&&i.push(t)}),e._set("objects",i),this._draw(t,e)}},_renderBackground:function(t){this.backgroundColor&&(t.fillStyle=this.backgroundColor.toLive?this.backgroundColor.toLive(t):this.backgroundColor,t.fillRect(this.backgroundColor.offsetX||0,this.backgroundColor.offsetY||0,this.width,this.height)),this.backgroundImage&&this._draw(t,this.backgroundImage)},_renderOverlay:function(t){this.overlayColor&&(t.fillStyle=this.overlayColor.toLive?this.overlayColor.toLive(t):this.overlayColor,t.fillRect(this.overlayColor.offsetX||0,this.overlayColor.offsetY||0,this.width,this.height)),this.overlayImage&&this._draw(t,this.overlayImage)},renderTop:function(){var t=this.contextTop||this.contextContainer;this.clearContext(t),this.selection&&this._groupSelector&&this._drawSelection();var e=this.getActiveGroup();return e&&e.render(t),this._renderOverlay(t),this.fire("after:render"),this},getCenter:function(){return{top:this.getHeight()/2,left:this.getWidth()/2}},centerObjectH:function(t){return this._centerObject(t,new fabric.Point(this.getCenter().left,t.getCenterPoint().y)),this.renderAll(),this},centerObjectV:function(t){return this._centerObject(t,new fabric.Point(t.getCenterPoint().x,this.getCenter().top)),this.renderAll(),this},centerObject:function(t){var e=this.getCenter();return this._centerObject(t,new fabric.Point(e.left,e.top)),this.renderAll(),this},_centerObject:function(t,e){return t.setPositionByOrigin(e,"center","center"),this},toDatalessJSON:function(t){return this.toDatalessObject(t)},toObject:function(t){return this._toObjectMethod("toObject",t)},toDatalessObject:function(t){return this._toObjectMethod("toDatalessObject",t)},_toObjectMethod:function(e,i){var r=this.getActiveGroup();r&&this.discardActiveGroup();var s={objects:this._toObjects(e,i)};return t(s,this.__serializeBgOverlay()),fabric.util.populateWithProperties(this,s,i),r&&(this.setActiveGroup(new fabric.Group(r.getObjects(),{originX:"center",originY:"center"})),r.forEachObject(function(t){t.set("active",!0)}),this._currentTransform&&(this._currentTransform.target=this.getActiveGroup())),s},_toObjects:function(t,e){return this.getObjects().map(function(i){return this._toObject(i,t,e)},this)},_toObject:function(t,e,i){var r;this.includeDefaultValues||(r=t.includeDefaultValues,t.includeDefaultValues=!1);var s=t[e](i);return this.includeDefaultValues||(t.includeDefaultValues=r),s},__serializeBgOverlay:function(){var t={background:this.backgroundColor&&this.backgroundColor.toObject?this.backgroundColor.toObject():this.backgroundColor};return this.overlayColor&&(t.overlay=this.overlayColor.toObject?this.overlayColor.toObject():this.overlayColor),this.backgroundImage&&(t.backgroundImage=this.backgroundImage.toObject()),this.overlayImage&&(t.overlayImage=this.overlayImage.toObject()),t},toSVG:function(t,e){t||(t={});var i=[];return this._setSVGPreamble(i,t),this._setSVGHeader(i,t),this._setSVGBgOverlayColor(i,"backgroundColor"),this._setSVGBgOverlayImage(i,"backgroundImage"),this._setSVGObjects(i,e),this._setSVGBgOverlayColor(i,"overlayColor"),this._setSVGBgOverlayImage(i,"overlayImage"),i.push("</svg>"),i.join("")},_setSVGPreamble:function(t,e){e.suppressPreamble||t.push('<?xml version="1.0" encoding="',e.encoding||"UTF-8",'" standalone="no" ?>','<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ','"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')},_setSVGHeader:function(t,e){t.push("<svg ",'xmlns="http://www.w3.org/2000/svg" ','xmlns:xlink="http://www.w3.org/1999/xlink" ','version="1.1" ','width="',e.viewBox?e.viewBox.width:this.width,'" ','height="',e.viewBox?e.viewBox.height:this.height,'" ',this.backgroundColor&&!this.backgroundColor.toLive?'style="background-color: '+this.backgroundColor+'" ':null,e.viewBox?'viewBox="'+e.viewBox.x+" "+e.viewBox.y+" "+e.viewBox.width+" "+e.viewBox.height+'" ':null,'xml:space="preserve">',"<desc>Created with Fabric.js ",fabric.version,"</desc>","<defs>",fabric.createSVGFontFacesMarkup(this.getObjects()),fabric.createSVGRefElementsMarkup(this),"</defs>")},_setSVGObjects:function(t,e){var i=this.getActiveGroup();i&&this.discardActiveGroup();for(var r=0,s=this.getObjects(),n=s.length;n>r;r++)t.push(s[r].toSVG(e));i&&(this.setActiveGroup(new fabric.Group(i.getObjects())),i.forEachObject(function(t){t.set("active",!0)}))},_setSVGBgOverlayImage:function(t,e){this[e]&&this[e].toSVG&&t.push(this[e].toSVG())},_setSVGBgOverlayColor:function(t,e){this[e]&&this[e].source?t.push('<rect x="',this[e].offsetX,'" y="',this[e].offsetY,'" ','width="',"repeat-y"===this[e].repeat||"no-repeat"===this[e].repeat?this[e].source.width:this.width,'" height="',"repeat-x"===this[e].repeat||"no-repeat"===this[e].repeat?this[e].source.height:this.height,'" fill="url(#'+e+'Pattern)"',"></rect>"):this[e]&&"overlayColor"===e&&t.push('<rect x="0" y="0" ','width="',this.width,'" height="',this.height,'" fill="',this[e],'"',"></rect>")},sendToBack:function(t){return i(this._objects,t),this._objects.unshift(t),this.renderAll&&this.renderAll()},bringToFront:function(t){return i(this._objects,t),this._objects.push(t),this.renderAll&&this.renderAll()},sendBackwards:function(t,e){var r=this._objects.indexOf(t);if(0!==r){var s=this._findNewLowerIndex(t,r,e);i(this._objects,t),this._objects.splice(s,0,t),this.renderAll&&this.renderAll()}return this},_findNewLowerIndex:function(t,e,i){var r;if(i){r=e;for(var s=e-1;s>=0;--s){var n=t.intersectsWithObject(this._objects[s])||t.isContainedWithinObject(this._objects[s])||this._objects[s].isContainedWithinObject(t);if(n){r=s;break}}}else r=e-1;return r},bringForward:function(t,e){var r=this._objects.indexOf(t);if(r!==this._objects.length-1){var s=this._findNewUpperIndex(t,r,e);i(this._objects,t),this._objects.splice(s,0,t),this.renderAll&&this.renderAll()}return this},_findNewUpperIndex:function(t,e,i){var r;if(i){r=e;for(var s=e+1;s<this._objects.length;++s){var n=t.intersectsWithObject(this._objects[s])||t.isContainedWithinObject(this._objects[s])||this._objects[s].isContainedWithinObject(t);if(n){r=s;break}}}else r=e+1;return r},moveTo:function(t,e){return i(this._objects,t),this._objects.splice(e,0,t),this.renderAll&&this.renderAll()},dispose:function(){return this.clear(),this.interactive&&this.removeListeners(),this},toString:function(){return"#<fabric.Canvas ("+this.complexity()+"): { objects: "+this.getObjects().length+" }>"}}),t(fabric.StaticCanvas.prototype,fabric.Observable),t(fabric.StaticCanvas.prototype,fabric.Collection),t(fabric.StaticCanvas.prototype,fabric.DataURLExporter),t(fabric.StaticCanvas,{EMPTY_JSON:'{"objects": [], "background": "white"}',supports:function(t){var e=fabric.util.createCanvasElement();if(!e||!e.getContext)return null;var i=e.getContext("2d");if(!i)return null;switch(t){case"getImageData":return"undefined"!=typeof i.getImageData;case"setLineDash":return"undefined"!=typeof i.setLineDash;case"toDataURL":return"undefined"!=typeof e.toDataURL;case"toDataURLWithQuality":try{return e.toDataURL("image/jpeg",0),!0}catch(r){}return!1;default:return null}}}),fabric.StaticCanvas.prototype.toJSON=fabric.StaticCanvas.prototype.toObject}(),fabric.BaseBrush=fabric.util.createClass({color:"rgb(0, 0, 0)",width:1,shadow:null,strokeLineCap:"round",strokeLineJoin:"round",setShadow:function(t){return this.shadow=new fabric.Shadow(t),this},_setBrushStyles:function(){var t=this.canvas.contextTop;t.strokeStyle=this.color,t.lineWidth=this.width,t.lineCap=this.strokeLineCap,t.lineJoin=this.strokeLineJoin},_setShadow:function(){if(this.shadow){var t=this.canvas.contextTop;t.shadowColor=this.shadow.color,t.shadowBlur=this.shadow.blur,t.shadowOffsetX=this.shadow.offsetX,t.shadowOffsetY=this.shadow.offsetY}},_resetShadow:function(){var t=this.canvas.contextTop;t.shadowColor="",t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0}}),function(){var t=fabric.util.array.min,e=fabric.util.array.max;fabric.PencilBrush=fabric.util.createClass(fabric.BaseBrush,{initialize:function(t){this.canvas=t,this._points=[]},onMouseDown:function(t){this._prepareForDrawing(t),this._captureDrawingPath(t),this._render()
},onMouseMove:function(t){this._captureDrawingPath(t),this.canvas.clearContext(this.canvas.contextTop),this._render()},onMouseUp:function(){this._finalizeAndAddPath()},_prepareForDrawing:function(t){var e=new fabric.Point(t.x,t.y);this._reset(),this._addPoint(e),this.canvas.contextTop.moveTo(e.x,e.y)},_addPoint:function(t){this._points.push(t)},_reset:function(){this._points.length=0,this._setBrushStyles(),this._setShadow()},_captureDrawingPath:function(t){var e=new fabric.Point(t.x,t.y);this._addPoint(e)},_render:function(){var t=this.canvas.contextTop,e=this.canvas.viewportTransform,i=this._points[0],r=this._points[1];t.save(),t.transform(e[0],e[1],e[2],e[3],e[4],e[5]),t.beginPath(),2===this._points.length&&i.x===r.x&&i.y===r.y&&(i.x-=.5,r.x+=.5),t.moveTo(i.x,i.y);for(var s=1,n=this._points.length;n>s;s++){var o=i.midPointFrom(r);t.quadraticCurveTo(i.x,i.y,o.x,o.y),i=this._points[s],r=this._points[s+1]}t.lineTo(i.x,i.y),t.stroke(),t.restore()},_getSVGPathData:function(){return this.box=this.getPathBoundingBox(this._points),this.convertPointsToSVGPath(this._points,this.box.minX,this.box.minY)},getPathBoundingBox:function(i){for(var r=[],s=[],n=i[0],o=i[1],a=n,h=1,c=i.length;c>h;h++){var l=n.midPointFrom(o);r.push(a.x),r.push(l.x),s.push(a.y),s.push(l.y),n=i[h],o=i[h+1],a=l}return r.push(n.x),s.push(n.y),{minX:t(r),minY:t(s),maxX:e(r),maxY:e(s)}},convertPointsToSVGPath:function(t,e,i){var r=[],s=new fabric.Point(t[0].x-e,t[0].y-i),n=new fabric.Point(t[1].x-e,t[1].y-i);r.push("M ",t[0].x-e," ",t[0].y-i," ");for(var o=1,a=t.length;a>o;o++){var h=s.midPointFrom(n);r.push("Q ",s.x," ",s.y," ",h.x," ",h.y," "),s=new fabric.Point(t[o].x-e,t[o].y-i),o+1<t.length&&(n=new fabric.Point(t[o+1].x-e,t[o+1].y-i))}return r.push("L ",s.x," ",s.y," "),r},createPath:function(t){var e=new fabric.Path(t);return e.fill=null,e.stroke=this.color,e.strokeWidth=this.width,e.strokeLineCap=this.strokeLineCap,e.strokeLineJoin=this.strokeLineJoin,this.shadow&&(this.shadow.affectStroke=!0,e.setShadow(this.shadow)),e},_finalizeAndAddPath:function(){var t=this.canvas.contextTop;t.closePath();var e=this._getSVGPathData().join("");if("M 0 0 Q 0 0 0 0 L 0 0"===e)return void this.canvas.renderAll();var i=this.box.minx+(this.box.maxx-this.box.minx)/2,r=this.box.miny+(this.box.maxy-this.box.miny)/2;this.canvas.contextTop.arc(i,r,3,0,2*Math.PI,!1);var s=this.createPath(e);s.set({left:i,top:r,originX:"center",originY:"center"}),this.canvas.add(s),s.setCoords(),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderAll(),this.canvas.fire("path:created",{path:s})}})}(),fabric.CircleBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,initialize:function(t){this.canvas=t,this.points=[]},drawDot:function(t){var e=this.addPoint(t),i=this.canvas.contextTop,r=this.canvas.viewportTransform;i.save(),i.transform(r[0],r[1],r[2],r[3],r[4],r[5]),i.fillStyle=e.fill,i.beginPath(),i.arc(e.x,e.y,e.radius,0,2*Math.PI,!1),i.closePath(),i.fill(),i.restore()},onMouseDown:function(t){this.points.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.drawDot(t)},onMouseMove:function(t){this.drawDot(t)},onMouseUp:function(){var t=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;for(var e=[],i=0,r=this.points.length;r>i;i++){var s=this.points[i],n=new fabric.Circle({radius:s.radius,left:s.x,top:s.y,originX:"center",originY:"center",fill:s.fill});this.shadow&&n.setShadow(this.shadow),e.push(n)}var o=new fabric.Group(e,{originX:"center",originY:"center"});o.canvas=this.canvas,this.canvas.add(o),this.canvas.fire("path:created",{path:o}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=t,this.canvas.renderAll()},addPoint:function(t){var e=new fabric.Point(t.x,t.y),i=fabric.util.getRandomInt(Math.max(0,this.width-20),this.width+20)/2,r=new fabric.Color(this.color).setAlpha(fabric.util.getRandomInt(0,100)/100).toRgba();return e.radius=i,e.fill=r,this.points.push(e),e}}),fabric.SprayBrush=fabric.util.createClass(fabric.BaseBrush,{width:10,density:20,dotWidth:1,dotWidthVariance:1,randomOpacity:!1,optimizeOverlapping:!0,initialize:function(t){this.canvas=t,this.sprayChunks=[]},onMouseDown:function(t){this.sprayChunks.length=0,this.canvas.clearContext(this.canvas.contextTop),this._setShadow(),this.addSprayChunk(t),this.render()},onMouseMove:function(t){this.addSprayChunk(t),this.render()},onMouseUp:function(){var t=this.canvas.renderOnAddRemove;this.canvas.renderOnAddRemove=!1;for(var e=[],i=0,r=this.sprayChunks.length;r>i;i++)for(var s=this.sprayChunks[i],n=0,o=s.length;o>n;n++){var a=new fabric.Rect({width:s[n].width,height:s[n].width,left:s[n].x+1,top:s[n].y+1,originX:"center",originY:"center",fill:this.color});this.shadow&&a.setShadow(this.shadow),e.push(a)}this.optimizeOverlapping&&(e=this._getOptimizedRects(e));var h=new fabric.Group(e,{originX:"center",originY:"center"});h.canvas=this.canvas,this.canvas.add(h),this.canvas.fire("path:created",{path:h}),this.canvas.clearContext(this.canvas.contextTop),this._resetShadow(),this.canvas.renderOnAddRemove=t,this.canvas.renderAll()},_getOptimizedRects:function(t){for(var e,i={},r=0,s=t.length;s>r;r++)e=t[r].left+""+t[r].top,i[e]||(i[e]=t[r]);var n=[];for(e in i)n.push(i[e]);return n},render:function(){var t=this.canvas.contextTop;t.fillStyle=this.color;var e=this.canvas.viewportTransform;t.save(),t.transform(e[0],e[1],e[2],e[3],e[4],e[5]);for(var i=0,r=this.sprayChunkPoints.length;r>i;i++){var s=this.sprayChunkPoints[i];"undefined"!=typeof s.opacity&&(t.globalAlpha=s.opacity),t.fillRect(s.x,s.y,s.width,s.width)}t.restore()},addSprayChunk:function(t){this.sprayChunkPoints=[];for(var e,i,r,s=this.width/2,n=0;n<this.density;n++){e=fabric.util.getRandomInt(t.x-s,t.x+s),i=fabric.util.getRandomInt(t.y-s,t.y+s),r=this.dotWidthVariance?fabric.util.getRandomInt(Math.max(1,this.dotWidth-this.dotWidthVariance),this.dotWidth+this.dotWidthVariance):this.dotWidth;var o=new fabric.Point(e,i);o.width=r,this.randomOpacity&&(o.opacity=fabric.util.getRandomInt(0,100)/100),this.sprayChunkPoints.push(o)}this.sprayChunks.push(this.sprayChunkPoints)}}),fabric.PatternBrush=fabric.util.createClass(fabric.PencilBrush,{getPatternSrc:function(){var t=20,e=5,i=fabric.document.createElement("canvas"),r=i.getContext("2d");return i.width=i.height=t+e,r.fillStyle=this.color,r.beginPath(),r.arc(t/2,t/2,t/2,0,2*Math.PI,!1),r.closePath(),r.fill(),i},getPatternSrcFunction:function(){return String(this.getPatternSrc).replace("this.color",'"'+this.color+'"')},getPattern:function(){return this.canvas.contextTop.createPattern(this.source||this.getPatternSrc(),"repeat")},_setBrushStyles:function(){this.callSuper("_setBrushStyles"),this.canvas.contextTop.strokeStyle=this.getPattern()},createPath:function(t){var e=this.callSuper("createPath",t);return e.stroke=new fabric.Pattern({source:this.source||this.getPatternSrcFunction()}),e}}),function(){var t=fabric.util.getPointer,e=fabric.util.degreesToRadians,i=fabric.util.radiansToDegrees,r=Math.atan2,s=Math.abs,n=.5;fabric.Canvas=fabric.util.createClass(fabric.StaticCanvas,{initialize:function(t,e){e||(e={}),this._initStatic(t,e),this._initInteractive(),this._createCacheCanvas(),fabric.Canvas.activeInstance=this},uniScaleTransform:!1,centeredScaling:!1,centeredRotation:!1,interactive:!0,selection:!0,selectionColor:"rgba(100, 100, 255, 0.3)",selectionDashArray:[],selectionBorderColor:"rgba(255, 255, 255, 0.3)",selectionLineWidth:1,hoverCursor:"move",moveCursor:"move",defaultCursor:"default",freeDrawingCursor:"crosshair",rotationCursor:"crosshair",containerClass:"canvas-container",perPixelTargetFind:!1,targetFindTolerance:0,skipTargetFind:!1,_initInteractive:function(){this._currentTransform=null,this._groupSelector=null,this._initWrapperElement(),this._createUpperCanvas(),this._initEventListeners(),this.freeDrawingBrush=fabric.PencilBrush&&new fabric.PencilBrush(this),this.calcOffset()},_resetCurrentTransform:function(t){var e=this._currentTransform;e.target.set({scaleX:e.original.scaleX,scaleY:e.original.scaleY,left:e.original.left,top:e.original.top}),this._shouldCenterTransform(t,e.target)?"rotate"===e.action?this._setOriginToCenter(e.target):("center"!==e.originX&&(e.mouseXSign="right"===e.originX?-1:1),"center"!==e.originY&&(e.mouseYSign="bottom"===e.originY?-1:1),e.originX="center",e.originY="center"):(e.originX=e.original.originX,e.originY=e.original.originY)},containsPoint:function(t,e){var i=this.getPointer(t,!0),r=this._normalizePointer(e,i);return e.containsPoint(r)||e._findTargetCorner(i)},_normalizePointer:function(t,e){var i,r=this.getActiveGroup(),s=e.x,n=e.y,o=r&&"group"!==t.type&&r.contains(t);return o&&(i=new fabric.Point(r.left,r.top),i=fabric.util.transformPoint(i,this.viewportTransform,!0),s-=i.x,n-=i.y),{x:s,y:n}},isTargetTransparent:function(t,e,i){var r=t.hasBorders,s=t.transparentCorners;t.hasBorders=t.transparentCorners=!1,this._draw(this.contextCache,t),t.hasBorders=r,t.transparentCorners=s;var n=fabric.util.isTransparent(this.contextCache,e,i,this.targetFindTolerance);return this.clearContext(this.contextCache),n},_shouldClearSelection:function(t,e){var i=this.getActiveGroup(),r=this.getActiveObject();return!e||e&&i&&!i.contains(e)&&i!==e&&!t.shiftKey||e&&!e.evented||e&&!e.selectable&&r&&r!==e},_shouldCenterTransform:function(t,e){if(e){var i,r=this._currentTransform;return"scale"===r.action||"scaleX"===r.action||"scaleY"===r.action?i=this.centeredScaling||e.centeredScaling:"rotate"===r.action&&(i=this.centeredRotation||e.centeredRotation),i?!t.altKey:t.altKey}},_getOriginFromCorner:function(t,e){var i={x:t.originX,y:t.originY};return"ml"===e||"tl"===e||"bl"===e?i.x="right":("mr"===e||"tr"===e||"br"===e)&&(i.x="left"),"tl"===e||"mt"===e||"tr"===e?i.y="bottom":("bl"===e||"mb"===e||"br"===e)&&(i.y="top"),i},_getActionFromCorner:function(t,e){var i="drag";return e&&(i="ml"===e||"mr"===e?"scaleX":"mt"===e||"mb"===e?"scaleY":"mtr"===e?"rotate":"scale"),i},_setupCurrentTransform:function(t,i){if(i){var r=this.getPointer(t),s=i._findTargetCorner(this.getPointer(t,!0)),n=this._getActionFromCorner(i,s),o=this._getOriginFromCorner(i,s);this._currentTransform={target:i,action:n,scaleX:i.scaleX,scaleY:i.scaleY,offsetX:r.x-i.left,offsetY:r.y-i.top,originX:o.x,originY:o.y,ex:r.x,ey:r.y,left:i.left,top:i.top,theta:e(i.angle),width:i.width*i.scaleX,mouseXSign:1,mouseYSign:1},this._currentTransform.original={left:i.left,top:i.top,scaleX:i.scaleX,scaleY:i.scaleY,originX:o.x,originY:o.y},this._resetCurrentTransform(t)}},_translateObject:function(t,e){var i=this._currentTransform.target;i.get("lockMovementX")||i.set("left",t-this._currentTransform.offsetX),i.get("lockMovementY")||i.set("top",e-this._currentTransform.offsetY)},_scaleObject:function(t,e,i){var r=this._currentTransform,s=r.target,n=s.get("lockScalingX"),o=s.get("lockScalingY");if(!n||!o){var a=s.translateToOriginPoint(s.getCenterPoint(),r.originX,r.originY),h=s.toLocalPoint(new fabric.Point(t,e),r.originX,r.originY);this._setLocalMouse(h,r),this._setObjectScale(h,r,n,o,i),s.setPositionByOrigin(a,r.originX,r.originY)}},_setObjectScale:function(t,e,i,r,s){var n=e.target;e.newScaleX=n.scaleX,e.newScaleY=n.scaleY,"equally"!==s||i||r?s?"x"!==s||n.get("lockUniScaling")?"y"!==s||n.get("lockUniScaling")||(e.newScaleY=t.y/(n.height+n.strokeWidth),r||n.set("scaleY",e.newScaleY)):(e.newScaleX=t.x/(n.width+n.strokeWidth),i||n.set("scaleX",e.newScaleX)):(e.newScaleX=t.x/(n.width+n.strokeWidth),e.newScaleY=t.y/(n.height+n.strokeWidth),i||n.set("scaleX",e.newScaleX),r||n.set("scaleY",e.newScaleY)):this._scaleObjectEqually(t,n,e),this._flipObject(e)},_scaleObjectEqually:function(t,e,i){var r=t.y+t.x,s=(e.height+e.strokeWidth)*i.original.scaleY+(e.width+e.strokeWidth)*i.original.scaleX;i.newScaleX=i.original.scaleX*r/s,i.newScaleY=i.original.scaleY*r/s,e.set("scaleX",i.newScaleX),e.set("scaleY",i.newScaleY)},_flipObject:function(t){t.newScaleX<0&&("left"===t.originX?t.originX="right":"right"===t.originX&&(t.originX="left")),t.newScaleY<0&&("top"===t.originY?t.originY="bottom":"bottom"===t.originY&&(t.originY="top"))},_setLocalMouse:function(t,e){var i=e.target;"right"===e.originX?t.x*=-1:"center"===e.originX&&(t.x*=2*e.mouseXSign,t.x<0&&(e.mouseXSign=-e.mouseXSign)),"bottom"===e.originY?t.y*=-1:"center"===e.originY&&(t.y*=2*e.mouseYSign,t.y<0&&(e.mouseYSign=-e.mouseYSign)),s(t.x)>i.padding?t.x<0?t.x+=i.padding:t.x-=i.padding:t.x=0,s(t.y)>i.padding?t.y<0?t.y+=i.padding:t.y-=i.padding:t.y=0},_rotateObject:function(t,e){var s=this._currentTransform;if(!s.target.get("lockRotation")){var n=r(s.ey-s.top,s.ex-s.left),o=r(e-s.top,t-s.left),a=i(o-n+s.theta);0>a&&(a=360+a),s.target.angle=a}},setCursor:function(t){this.upperCanvasEl.style.cursor=t},_resetObjectTransform:function(t){t.scaleX=1,t.scaleY=1,t.setAngle(0)},_drawSelection:function(){var t=this.contextTop,e=this._groupSelector,i=e.left,r=e.top,o=s(i),a=s(r);if(t.fillStyle=this.selectionColor,t.fillRect(e.ex-(i>0?0:-i),e.ey-(r>0?0:-r),o,a),t.lineWidth=this.selectionLineWidth,t.strokeStyle=this.selectionBorderColor,this.selectionDashArray.length>1){var h=e.ex+n-(i>0?0:o),c=e.ey+n-(r>0?0:a);t.beginPath(),fabric.util.drawDashedLine(t,h,c,h+o,c,this.selectionDashArray),fabric.util.drawDashedLine(t,h,c+a-1,h+o,c+a-1,this.selectionDashArray),fabric.util.drawDashedLine(t,h,c,h,c+a,this.selectionDashArray),fabric.util.drawDashedLine(t,h+o-1,c,h+o-1,c+a,this.selectionDashArray),t.closePath(),t.stroke()}else t.strokeRect(e.ex+n-(i>0?0:o),e.ey+n-(r>0?0:a),o,a)},_isLastRenderedObject:function(t){return this.controlsAboveOverlay&&this.lastRenderedObjectWithControlsAboveOverlay&&this.lastRenderedObjectWithControlsAboveOverlay.visible&&this.containsPoint(t,this.lastRenderedObjectWithControlsAboveOverlay)&&this.lastRenderedObjectWithControlsAboveOverlay._findTargetCorner(this.getPointer(t,!0))},findTarget:function(t,e){if(!this.skipTargetFind){if(this._isLastRenderedObject(t))return this.lastRenderedObjectWithControlsAboveOverlay;var i=this.getActiveGroup();if(i&&!e&&this.containsPoint(t,i))return i;var r=this._searchPossibleTargets(t);return this._fireOverOutEvents(r),r}},_fireOverOutEvents:function(t){t?this._hoveredTarget!==t&&(this.fire("mouse:over",{target:t}),t.fire("mouseover"),this._hoveredTarget&&(this.fire("mouse:out",{target:this._hoveredTarget}),this._hoveredTarget.fire("mouseout")),this._hoveredTarget=t):this._hoveredTarget&&(this.fire("mouse:out",{target:this._hoveredTarget}),this._hoveredTarget.fire("mouseout"),this._hoveredTarget=null)},_checkTarget:function(t,e,i){if(e&&e.visible&&e.evented&&this.containsPoint(t,e)){if(!this.perPixelTargetFind&&!e.perPixelTargetFind||e.isEditing)return!0;var r=this.isTargetTransparent(e,i.x,i.y);if(!r)return!0}},_searchPossibleTargets:function(t){for(var e,i=this.getPointer(t,!0),r=this._objects.length;r--;)if(this._checkTarget(t,this._objects[r],i)){this.relatedTarget=this._objects[r],e=this._objects[r];break}return e},getPointer:function(e,i,r){r||(r=this.upperCanvasEl);var s,n=t(e,r),o=r.getBoundingClientRect();return n.x=n.x-this._offset.left,n.y=n.y-this._offset.top,i||(n=fabric.util.transformPoint(n,fabric.util.invertTransform(this.viewportTransform))),s=0===o.width||0===o.height?{width:1,height:1}:{width:r.width/o.width,height:r.height/o.height},{x:n.x*s.width,y:n.y*s.height}},_createUpperCanvas:function(){var t=this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/,"");this.upperCanvasEl=this._createCanvasElement(),fabric.util.addClass(this.upperCanvasEl,"upper-canvas "+t),this.wrapperEl.appendChild(this.upperCanvasEl),this._copyCanvasStyle(this.lowerCanvasEl,this.upperCanvasEl),this._applyCanvasStyle(this.upperCanvasEl),this.contextTop=this.upperCanvasEl.getContext("2d")},_createCacheCanvas:function(){this.cacheCanvasEl=this._createCanvasElement(),this.cacheCanvasEl.setAttribute("width",this.width),this.cacheCanvasEl.setAttribute("height",this.height),this.contextCache=this.cacheCanvasEl.getContext("2d")},_initWrapperElement:function(){this.wrapperEl=fabric.util.wrapElement(this.lowerCanvasEl,"div",{"class":this.containerClass}),fabric.util.setStyle(this.wrapperEl,{width:this.getWidth()+"px",height:this.getHeight()+"px",position:"relative"}),fabric.util.makeElementUnselectable(this.wrapperEl)},_applyCanvasStyle:function(t){var e=this.getWidth()||t.width,i=this.getHeight()||t.height;fabric.util.setStyle(t,{position:"absolute",width:e+"px",height:i+"px",left:0,top:0}),t.width=e,t.height=i,fabric.util.makeElementUnselectable(t)},_copyCanvasStyle:function(t,e){e.style.cssText=t.style.cssText},getSelectionContext:function(){return this.contextTop},getSelectionElement:function(){return this.upperCanvasEl},_setActiveObject:function(t){this._activeObject&&this._activeObject.set("active",!1),this._activeObject=t,t.set("active",!0)},setActiveObject:function(t,e){return this._setActiveObject(t),this.renderAll(),this.fire("object:selected",{target:t,e:e}),t.fire("selected",{e:e}),this},getActiveObject:function(){return this._activeObject},_discardActiveObject:function(){this._activeObject&&this._activeObject.set("active",!1),this._activeObject=null},discardActiveObject:function(t){return this._discardActiveObject(),this.renderAll(),this.fire("selection:cleared",{e:t}),this},_setActiveGroup:function(t){this._activeGroup=t,t&&t.set("active",!0)},setActiveGroup:function(t,e){return this._setActiveGroup(t),t&&(this.fire("object:selected",{target:t,e:e}),t.fire("selected",{e:e})),this},getActiveGroup:function(){return this._activeGroup},_discardActiveGroup:function(){var t=this.getActiveGroup();t&&t.destroy(),this.setActiveGroup(null)},discardActiveGroup:function(t){return this._discardActiveGroup(),this.fire("selection:cleared",{e:t}),this},deactivateAll:function(){for(var t=this.getObjects(),e=0,i=t.length;i>e;e++)t[e].set("active",!1);return this._discardActiveGroup(),this._discardActiveObject(),this},deactivateAllWithDispatch:function(t){var e=this.getActiveGroup()||this.getActiveObject();return e&&this.fire("before:selection:cleared",{target:e,e:t}),this.deactivateAll(),e&&this.fire("selection:cleared",{e:t}),this},drawControls:function(t){var e=this.getActiveGroup();e?this._drawGroupControls(t,e):this._drawObjectsControls(t)},_drawGroupControls:function(t,e){e._renderControls(t)},_drawObjectsControls:function(t){for(var e=0,i=this._objects.length;i>e;++e)this._objects[e]&&this._objects[e].active&&(this._objects[e]._renderControls(t),this.lastRenderedObjectWithControlsAboveOverlay=this._objects[e])}});for(var o in fabric.StaticCanvas)"prototype"!==o&&(fabric.Canvas[o]=fabric.StaticCanvas[o]);fabric.isTouchSupported&&(fabric.Canvas.prototype._setCursorFromEvent=function(){}),fabric.Element=fabric.Canvas}(),function(){var t={mt:0,tr:1,mr:2,br:3,mb:4,bl:5,ml:6,tl:7},e=fabric.util.addListener,i=fabric.util.removeListener;fabric.util.object.extend(fabric.Canvas.prototype,{cursorMap:["n-resize","ne-resize","e-resize","se-resize","s-resize","sw-resize","w-resize","nw-resize"],_initEventListeners:function(){this._bindEvents(),e(fabric.window,"resize",this._onResize),e(this.upperCanvasEl,"mousedown",this._onMouseDown),e(this.upperCanvasEl,"mousemove",this._onMouseMove),e(this.upperCanvasEl,"mousewheel",this._onMouseWheel),e(this.upperCanvasEl,"touchstart",this._onMouseDown),e(this.upperCanvasEl,"touchmove",this._onMouseMove),"undefined"!=typeof Event&&"add"in Event&&(Event.add(this.upperCanvasEl,"gesture",this._onGesture),Event.add(this.upperCanvasEl,"drag",this._onDrag),Event.add(this.upperCanvasEl,"orientation",this._onOrientationChange),Event.add(this.upperCanvasEl,"shake",this._onShake))},_bindEvents:function(){this._onMouseDown=this._onMouseDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onResize=this._onResize.bind(this),this._onGesture=this._onGesture.bind(this),this._onDrag=this._onDrag.bind(this),this._onShake=this._onShake.bind(this),this._onOrientationChange=this._onOrientationChange.bind(this),this._onMouseWheel=this._onMouseWheel.bind(this)},removeListeners:function(){i(fabric.window,"resize",this._onResize),i(this.upperCanvasEl,"mousedown",this._onMouseDown),i(this.upperCanvasEl,"mousemove",this._onMouseMove),i(this.upperCanvasEl,"mousewheel",this._onMouseWheel),i(this.upperCanvasEl,"touchstart",this._onMouseDown),i(this.upperCanvasEl,"touchmove",this._onMouseMove),"undefined"!=typeof Event&&"remove"in Event&&(Event.remove(this.upperCanvasEl,"gesture",this._onGesture),Event.remove(this.upperCanvasEl,"drag",this._onDrag),Event.remove(this.upperCanvasEl,"orientation",this._onOrientationChange),Event.remove(this.upperCanvasEl,"shake",this._onShake))},_onGesture:function(t,e){this.__onTransformGesture&&this.__onTransformGesture(t,e)},_onDrag:function(t,e){this.__onDrag&&this.__onDrag(t,e)},_onMouseWheel:function(t,e){this.__onMouseWheel&&this.__onMouseWheel(t,e)},_onOrientationChange:function(t,e){this.__onOrientationChange&&this.__onOrientationChange(t,e)},_onShake:function(t,e){this.__onShake&&this.__onShake(t,e)},_onMouseDown:function(t){this.__onMouseDown(t),e(fabric.document,"touchend",this._onMouseUp),e(fabric.document,"touchmove",this._onMouseMove),i(this.upperCanvasEl,"mousemove",this._onMouseMove),i(this.upperCanvasEl,"touchmove",this._onMouseMove),"touchstart"===t.type?i(this.upperCanvasEl,"mousedown",this._onMouseDown):(e(fabric.document,"mouseup",this._onMouseUp),e(fabric.document,"mousemove",this._onMouseMove))},_onMouseUp:function(t){if(this.__onMouseUp(t),i(fabric.document,"mouseup",this._onMouseUp),i(fabric.document,"touchend",this._onMouseUp),i(fabric.document,"mousemove",this._onMouseMove),i(fabric.document,"touchmove",this._onMouseMove),e(this.upperCanvasEl,"mousemove",this._onMouseMove),e(this.upperCanvasEl,"touchmove",this._onMouseMove),"touchend"===t.type){var r=this;setTimeout(function(){e(r.upperCanvasEl,"mousedown",r._onMouseDown)},400)}},_onMouseMove:function(t){!this.allowTouchScrolling&&t.preventDefault&&t.preventDefault(),this.__onMouseMove(t)},_onResize:function(){this.calcOffset()},_shouldRender:function(t,e){var i=this.getActiveGroup()||this.getActiveObject();return!!(t&&(t.isMoving||t!==i)||!t&&i||!t&&!i&&!this._groupSelector||e&&this._previousPointer&&this.selection&&(e.x!==this._previousPointer.x||e.y!==this._previousPointer.y))},__onMouseUp:function(t){var e;if(this.isDrawingMode&&this._isCurrentlyDrawing)return void this._onMouseUpInDrawingMode(t);this._currentTransform?(this._finalizeCurrentTransform(),e=this._currentTransform.target):e=this.findTarget(t,!0);var i=this._shouldRender(e,this.getPointer(t));this._maybeGroupObjects(t),e&&(e.isMoving=!1),i&&this.renderAll(),this._handleCursorAndEvent(t,e)},_handleCursorAndEvent:function(t,e){this._setCursorFromEvent(t,e);var i=this;setTimeout(function(){i._setCursorFromEvent(t,e)},50),this.fire("mouse:up",{target:e,e:t}),e&&e.fire("mouseup",{e:t})},_finalizeCurrentTransform:function(){var t=this._currentTransform,e=t.target;e._scaling&&(e._scaling=!1),e.setCoords(),this.stateful&&e.hasStateChanged()&&(this.fire("object:modified",{target:e}),e.fire("modified")),this._restoreOriginXY(e)},_restoreOriginXY:function(t){if(this._previousOriginX&&this._previousOriginY){var e=t.translateToOriginPoint(t.getCenterPoint(),this._previousOriginX,this._previousOriginY);t.originX=this._previousOriginX,t.originY=this._previousOriginY,t.left=e.x,t.top=e.y,this._previousOriginX=null,this._previousOriginY=null}},_onMouseDownInDrawingMode:function(t){this._isCurrentlyDrawing=!0,this.discardActiveObject(t).renderAll(),this.clipTo&&fabric.util.clipContext(this,this.contextTop);var e=fabric.util.invertTransform(this.viewportTransform),i=fabric.util.transformPoint(this.getPointer(t,!0),e);this.freeDrawingBrush.onMouseDown(i),this.fire("mouse:down",{e:t})},_onMouseMoveInDrawingMode:function(t){if(this._isCurrentlyDrawing){var e=fabric.util.invertTransform(this.viewportTransform),i=fabric.util.transformPoint(this.getPointer(t,!0),e);this.freeDrawingBrush.onMouseMove(i)}this.setCursor(this.freeDrawingCursor),this.fire("mouse:move",{e:t})},_onMouseUpInDrawingMode:function(t){this._isCurrentlyDrawing=!1,this.clipTo&&this.contextTop.restore(),this.freeDrawingBrush.onMouseUp(),this.fire("mouse:up",{e:t})},__onMouseDown:function(t){var e="which"in t?1===t.which:1===t.button;if(e||fabric.isTouchSupported){if(this.isDrawingMode)return void this._onMouseDownInDrawingMode(t);if(!this._currentTransform){var i=this.findTarget(t),r=this.getPointer(t,!0);this._previousPointer=r;var s=this._shouldRender(i,r),n=this._shouldGroup(t,i);this._shouldClearSelection(t,i)?this._clearSelection(t,i,r):n&&(this._handleGrouping(t,i),i=this.getActiveGroup()),i&&i.selectable&&!n&&(this._beforeTransform(t,i),this._setupCurrentTransform(t,i)),s&&this.renderAll(),this.fire("mouse:down",{target:i,e:t}),i&&i.fire("mousedown",{e:t})}}},_beforeTransform:function(t,e){var i;this.stateful&&e.saveState(),(i=e._findTargetCorner(this.getPointer(t)))&&this.onBeforeScaleRotate(e),e!==this.getActiveGroup()&&e!==this.getActiveObject()&&(this.deactivateAll(),this.setActiveObject(e,t))},_clearSelection:function(t,e,i){this.deactivateAllWithDispatch(t),e&&e.selectable?this.setActiveObject(e,t):this.selection&&(this._groupSelector={ex:i.x,ey:i.y,top:0,left:0})},_setOriginToCenter:function(t){this._previousOriginX=this._currentTransform.target.originX,this._previousOriginY=this._currentTransform.target.originY;var e=t.getCenterPoint();t.originX="center",t.originY="center",t.left=e.x,t.top=e.y,this._currentTransform.left=t.left,this._currentTransform.top=t.top},_setCenterToOrigin:function(t){var e=t.translateToOriginPoint(t.getCenterPoint(),this._previousOriginX,this._previousOriginY);t.originX=this._previousOriginX,t.originY=this._previousOriginY,t.left=e.x,t.top=e.y,this._previousOriginX=null,this._previousOriginY=null},__onMouseMove:function(t){var e,i;if(this.isDrawingMode)return void this._onMouseMoveInDrawingMode(t);var r=this._groupSelector;r?(i=this.getPointer(t,!0),r.left=i.x-r.ex,r.top=i.y-r.ey,this.renderTop()):this._currentTransform?this._transformObject(t):(e=this.findTarget(t),!e||e&&!e.selectable?this.setCursor(this.defaultCursor):this._setCursorFromEvent(t,e)),this.fire("mouse:move",{target:e,e:t}),e&&e.fire("mousemove",{e:t})},_transformObject:function(t){var e=this.getPointer(t),i=this._currentTransform;i.reset=!1,i.target.isMoving=!0,this._beforeScaleTransform(t,i),this._performTransformAction(t,i,e),this.renderAll()},_performTransformAction:function(t,e,i){var r=i.x,s=i.y,n=e.target,o=e.action;"rotate"===o?(this._rotateObject(r,s),this._fire("rotating",n,t)):"scale"===o?(this._onScale(t,e,r,s),this._fire("scaling",n,t)):"scaleX"===o?(this._scaleObject(r,s,"x"),this._fire("scaling",n,t)):"scaleY"===o?(this._scaleObject(r,s,"y"),this._fire("scaling",n,t)):(this._translateObject(r,s),this._fire("moving",n,t),this.setCursor(this.moveCursor))},_fire:function(t,e,i){this.fire("object:"+t,{target:e,e:i}),e.fire(t,{e:i})},_beforeScaleTransform:function(t,e){if("scale"===e.action||"scaleX"===e.action||"scaleY"===e.action){var i=this._shouldCenterTransform(t,e.target);(i&&("center"!==e.originX||"center"!==e.originY)||!i&&"center"===e.originX&&"center"===e.originY)&&(this._resetCurrentTransform(t),e.reset=!0)}},_onScale:function(t,e,i,r){!t.shiftKey&&!this.uniScaleTransform||e.target.get("lockUniScaling")?(e.reset||"scale"!==e.currentAction||this._resetCurrentTransform(t,e.target),e.currentAction="scaleEqually",this._scaleObject(i,r,"equally")):(e.currentAction="scale",this._scaleObject(i,r))},_setCursorFromEvent:function(t,e){if(!e||!e.selectable)return this.setCursor(this.defaultCursor),!1;var i=this.getActiveGroup(),r=e._findTargetCorner&&(!i||!i.contains(e))&&e._findTargetCorner(this.getPointer(t,!0));return r?this._setCornerCursor(r,e):this.setCursor(e.hoverCursor||this.hoverCursor),!0},_setCornerCursor:function(e,i){if(e in t)this.setCursor(this._getRotatedCornerCursor(e,i));else{if("mtr"!==e||!i.hasRotatingPoint)return this.setCursor(this.defaultCursor),!1;this.setCursor(this.rotationCursor)}},_getRotatedCornerCursor:function(e,i){var r=Math.round(i.getAngle()%360/45);return 0>r&&(r+=8),r+=t[e],r%=8,this.cursorMap[r]}})}(),function(){var t=Math.min,e=Math.max;fabric.util.object.extend(fabric.Canvas.prototype,{_shouldGroup:function(t,e){var i=this.getActiveObject();return t.shiftKey&&(this.getActiveGroup()||i&&i!==e)&&this.selection},_handleGrouping:function(t,e){(e!==this.getActiveGroup()||(e=this.findTarget(t,!0),e&&!e.isType("group")))&&(this.getActiveGroup()?this._updateActiveGroup(e,t):this._createActiveGroup(e,t),this._activeGroup&&this._activeGroup.saveCoords())},_updateActiveGroup:function(t,e){var i=this.getActiveGroup();if(i.contains(t)){if(i.removeWithUpdate(t),this._resetObjectTransform(i),t.set("active",!1),1===i.size())return this.discardActiveGroup(e),void this.setActiveObject(i.item(0))}else i.addWithUpdate(t),this._resetObjectTransform(i);this.fire("selection:created",{target:i,e:e}),i.set("active",!0)},_createActiveGroup:function(t,e){if(this._activeObject&&t!==this._activeObject){var i=this._createGroup(t);i.addWithUpdate(),this.setActiveGroup(i),this._activeObject=null,this.fire("selection:created",{target:i,e:e})}t.set("active",!0)},_createGroup:function(t){var e=this.getObjects(),i=e.indexOf(this._activeObject)<e.indexOf(t),r=i?[this._activeObject,t]:[t,this._activeObject];return new fabric.Group(r,{originX:"center",originY:"center",canvas:this})},_groupSelectedObjects:function(t){var e=this._collectObjects();1===e.length?this.setActiveObject(e[0],t):e.length>1&&(e=new fabric.Group(e.reverse(),{originX:"center",originY:"center",canvas:this}),e.addWithUpdate(),this.setActiveGroup(e,t),e.saveCoords(),this.fire("selection:created",{target:e}),this.renderAll())},_collectObjects:function(){for(var i,r=[],s=this._groupSelector.ex,n=this._groupSelector.ey,o=s+this._groupSelector.left,a=n+this._groupSelector.top,h=new fabric.Point(t(s,o),t(n,a)),c=new fabric.Point(e(s,o),e(n,a)),l=s===o&&n===a,u=this._objects.length;u--&&(i=this._objects[u],!(i&&i.selectable&&i.visible&&(i.intersectsWithRect(h,c)||i.isContainedWithinRect(h,c)||i.containsPoint(h)||i.containsPoint(c))&&(i.set("active",!0),r.push(i),l))););return r},_maybeGroupObjects:function(t){this.selection&&this._groupSelector&&this._groupSelectedObjects(t);var e=this.getActiveGroup();e&&(e.setObjectsCoords().setCoords(),e.isMoving=!1,this.setCursor(this.defaultCursor)),this._groupSelector=null,this._currentTransform=null}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{toDataURL:function(t){t||(t={});var e=t.format||"png",i=t.quality||1,r=t.multiplier||1,s={left:t.left,top:t.top,width:t.width,height:t.height};return 1!==r?this.__toDataURLWithMultiplier(e,i,s,r):this.__toDataURL(e,i,s)},__toDataURL:function(t,e,i){this.renderAll(!0);var r=this.upperCanvasEl||this.lowerCanvasEl,s=this.__getCroppedCanvas(r,i);"jpg"===t&&(t="jpeg");var n=fabric.StaticCanvas.supports("toDataURLWithQuality")?(s||r).toDataURL("image/"+t,e):(s||r).toDataURL("image/"+t);return this.contextTop&&this.clearContext(this.contextTop),this.renderAll(),s&&(s=null),n},__getCroppedCanvas:function(t,e){var i,r,s="left"in e||"top"in e||"width"in e||"height"in e;return s&&(i=fabric.util.createCanvasElement(),r=i.getContext("2d"),i.width=e.width||this.width,i.height=e.height||this.height,r.drawImage(t,-e.left||0,-e.top||0)),i},__toDataURLWithMultiplier:function(t,e,i,r){var s=this.getWidth(),n=this.getHeight(),o=s*r,a=n*r,h=this.getActiveObject(),c=this.getActiveGroup(),l=this.contextTop||this.contextContainer;r>1&&this.setWidth(o).setHeight(a),l.scale(r,r),i.left&&(i.left*=r),i.top&&(i.top*=r),i.width?i.width*=r:1>r&&(i.width=o),i.height?i.height*=r:1>r&&(i.height=a),c?this._tempRemoveBordersControlsFromGroup(c):h&&this.deactivateAll&&this.deactivateAll(),this.renderAll(!0);var u=this.__toDataURL(t,e,i);return this.width=s,this.height=n,l.scale(1/r,1/r),this.setWidth(s).setHeight(n),c?this._restoreBordersControlsOnGroup(c):h&&this.setActiveObject&&this.setActiveObject(h),this.contextTop&&this.clearContext(this.contextTop),this.renderAll(),u
},toDataURLWithMultiplier:function(t,e,i){return this.toDataURL({format:t,multiplier:e,quality:i})},_tempRemoveBordersControlsFromGroup:function(t){t.origHasControls=t.hasControls,t.origBorderColor=t.borderColor,t.hasControls=!0,t.borderColor="rgba(0,0,0,0)",t.forEachObject(function(t){t.origBorderColor=t.borderColor,t.borderColor="rgba(0,0,0,0)"})},_restoreBordersControlsOnGroup:function(t){t.hideControls=t.origHideControls,t.borderColor=t.origBorderColor,t.forEachObject(function(t){t.borderColor=t.origBorderColor,delete t.origBorderColor})}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{loadFromDatalessJSON:function(t,e,i){return this.loadFromJSON(t,e,i)},loadFromJSON:function(t,e,i){if(t){var r="string"==typeof t?JSON.parse(t):t;this.clear();var s=this;return this._enlivenObjects(r.objects,function(){s._setBgOverlay(r,e)},i),this}},_setBgOverlay:function(t,e){var i=this,r={backgroundColor:!1,overlayColor:!1,backgroundImage:!1,overlayImage:!1};if(!(t.backgroundImage||t.overlayImage||t.background||t.overlay))return void(e&&e());var s=function(){r.backgroundImage&&r.overlayImage&&r.backgroundColor&&r.overlayColor&&(i.renderAll(),e&&e())};this.__setBgOverlay("backgroundImage",t.backgroundImage,r,s),this.__setBgOverlay("overlayImage",t.overlayImage,r,s),this.__setBgOverlay("backgroundColor",t.background,r,s),this.__setBgOverlay("overlayColor",t.overlay,r,s),s()},__setBgOverlay:function(t,e,i,r){var s=this;return e?void("backgroundImage"===t||"overlayImage"===t?fabric.Image.fromObject(e,function(e){s[t]=e,i[t]=!0,r&&r()}):this["set"+fabric.util.string.capitalize(t,!0)](e,function(){i[t]=!0,r&&r()})):void(i[t]=!0)},_enlivenObjects:function(t,e,i){var r=this;if(!t||0===t.length)return void(e&&e());var s=this.renderOnAddRemove;this.renderOnAddRemove=!1,fabric.util.enlivenObjects(t,function(t){t.forEach(function(t,e){r.insertAt(t,e,!0)}),r.renderOnAddRemove=s,e&&e()},null,i)},_toDataURL:function(t,e){this.clone(function(i){e(i.toDataURL(t))})},_toDataURLWithMultiplier:function(t,e,i){this.clone(function(r){i(r.toDataURLWithMultiplier(t,e))})},clone:function(t,e){var i=JSON.stringify(this.toJSON(e));this.cloneWithoutData(function(e){e.loadFromJSON(i,function(){t&&t(e)})})},cloneWithoutData:function(t){var e=fabric.document.createElement("canvas");e.width=this.getWidth(),e.height=this.getHeight();var i=new fabric.Canvas(e);i.clipTo=this.clipTo,this.backgroundImage?(i.setBackgroundImage(this.backgroundImage.src,function(){i.renderAll(),t&&t(i)}),i.backgroundImageOpacity=this.backgroundImageOpacity,i.backgroundImageStretch=this.backgroundImageStretch):t&&t(i)}}),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.toFixed,s=e.util.string.capitalize,n=e.util.degreesToRadians,o=e.StaticCanvas.supports("setLineDash");e.Object||(e.Object=e.util.createClass({type:"object",originX:"left",originY:"top",top:0,left:0,width:0,height:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1,opacity:1,angle:0,cornerSize:12,transparentCorners:!0,hoverCursor:null,padding:0,borderColor:"rgba(102,153,255,0.75)",cornerColor:"rgba(102,153,255,0.5)",centeredScaling:!1,centeredRotation:!0,fill:"rgb(0,0,0)",fillRule:"source-over",backgroundColor:"",stroke:null,strokeWidth:1,strokeDashArray:null,strokeLineCap:"butt",strokeLineJoin:"miter",strokeMiterLimit:10,shadow:null,borderOpacityWhenMoving:.4,borderScaleFactor:1,transformMatrix:null,minScaleLimit:.01,selectable:!0,evented:!0,visible:!0,hasControls:!0,hasBorders:!0,hasRotatingPoint:!0,rotatingPointOffset:40,perPixelTargetFind:!1,includeDefaultValues:!0,clipTo:null,lockMovementX:!1,lockMovementY:!1,lockRotation:!1,lockScalingX:!1,lockScalingY:!1,lockUniScaling:!1,stateProperties:"top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule shadow clipTo visible backgroundColor".split(" "),initialize:function(t){t&&this.setOptions(t)},_initGradient:function(t){!t.fill||!t.fill.colorStops||t.fill instanceof e.Gradient||this.set("fill",new e.Gradient(t.fill))},_initPattern:function(t){!t.fill||!t.fill.source||t.fill instanceof e.Pattern||this.set("fill",new e.Pattern(t.fill)),!t.stroke||!t.stroke.source||t.stroke instanceof e.Pattern||this.set("stroke",new e.Pattern(t.stroke))},_initClipping:function(t){if(t.clipTo&&"string"==typeof t.clipTo){var i=e.util.getFunctionBody(t.clipTo);"undefined"!=typeof i&&(this.clipTo=new Function("ctx",i))}},setOptions:function(t){for(var e in t)this.set(e,t[e]);this._initGradient(t),this._initPattern(t),this._initClipping(t)},transform:function(t,e){this.group&&this.group.transform(t,e),t.globalAlpha=this.opacity;var i=e?this._getLeftTopCoords():this.getCenterPoint();t.translate(i.x,i.y),t.rotate(n(this.angle)),t.scale(this.scaleX*(this.flipX?-1:1),this.scaleY*(this.flipY?-1:1))},toObject:function(t){var i=e.Object.NUM_FRACTION_DIGITS,s={type:this.type,originX:this.originX,originY:this.originY,left:r(this.left,i),top:r(this.top,i),width:r(this.width,i),height:r(this.height,i),fill:this.fill&&this.fill.toObject?this.fill.toObject():this.fill,stroke:this.stroke&&this.stroke.toObject?this.stroke.toObject():this.stroke,strokeWidth:r(this.strokeWidth,i),strokeDashArray:this.strokeDashArray,strokeLineCap:this.strokeLineCap,strokeLineJoin:this.strokeLineJoin,strokeMiterLimit:r(this.strokeMiterLimit,i),scaleX:r(this.scaleX,i),scaleY:r(this.scaleY,i),angle:r(this.getAngle(),i),flipX:this.flipX,flipY:this.flipY,opacity:r(this.opacity,i),shadow:this.shadow&&this.shadow.toObject?this.shadow.toObject():this.shadow,visible:this.visible,clipTo:this.clipTo&&String(this.clipTo),backgroundColor:this.backgroundColor};return this.includeDefaultValues||(s=this._removeDefaultValues(s)),e.util.populateWithProperties(this,s,t),s},toDatalessObject:function(t){return this.toObject(t)},_removeDefaultValues:function(t){var i=e.util.getKlass(t.type).prototype,r=i.stateProperties;return r.forEach(function(e){t[e]===i[e]&&delete t[e]}),t},toString:function(){return"#<fabric."+s(this.type)+">"},get:function(t){return this[t]},_setObject:function(t){for(var e in t)this._set(e,t[e])},set:function(t,e){return"object"==typeof t?this._setObject(t):"function"==typeof e&&"clipTo"!==t?this._set(t,e(this.get(t))):this._set(t,e),this},_set:function(t,i){var s="scaleX"===t||"scaleY"===t;return s&&(i=this._constrainScale(i)),"scaleX"===t&&0>i?(this.flipX=!this.flipX,i*=-1):"scaleY"===t&&0>i?(this.flipY=!this.flipY,i*=-1):"width"===t||"height"===t?this.minScaleLimit=r(Math.min(.1,1/Math.max(this.width,this.height)),2):"shadow"!==t||!i||i instanceof e.Shadow||(i=new e.Shadow(i)),this[t]=i,this},toggle:function(t){var e=this.get(t);return"boolean"==typeof e&&this.set(t,!e),this},setSourcePath:function(t){return this.sourcePath=t,this},getViewportTransform:function(){return this.canvas&&this.canvas.viewportTransform?this.canvas.viewportTransform:[1,0,0,1,0,0]},render:function(t,i){if(0!==this.width&&0!==this.height&&this.visible){t.save(),this._setupFillRule(t),this._transform(t,i),this._setStrokeStyles(t),this._setFillStyles(t);var r=this.transformMatrix;r&&this.group&&(t.translate(-this.group.width/2,-this.group.height/2),t.transform(r[0],r[1],r[2],r[3],r[4],r[5])),this._setShadow(t),this.clipTo&&e.util.clipContext(this,t),this._render(t,i),this.clipTo&&t.restore(),this._removeShadow(t),this._restoreFillRule(t),t.restore()}},_transform:function(t,e){var i=this.transformMatrix;i&&!this.group&&t.setTransform(i[0],i[1],i[2],i[3],i[4],i[5]),e||this.transform(t)},_setStrokeStyles:function(t){this.stroke&&(t.lineWidth=this.strokeWidth,t.lineCap=this.strokeLineCap,t.lineJoin=this.strokeLineJoin,t.miterLimit=this.strokeMiterLimit,t.strokeStyle=this.stroke.toLive?this.stroke.toLive(t):this.stroke)},_setFillStyles:function(t){this.fill&&(t.fillStyle=this.fill.toLive?this.fill.toLive(t):this.fill)},_renderControls:function(t,i){var r=this.getViewportTransform();if(t.save(),this.active&&!i){var s;this.group&&(s=e.util.transformPoint(this.group.getCenterPoint(),r),t.translate(s.x,s.y),t.rotate(n(this.group.angle))),s=e.util.transformPoint(this.getCenterPoint(),r,null!=this.group),this.group&&(s.x*=this.group.scaleX,s.y*=this.group.scaleY),t.translate(s.x,s.y),t.rotate(n(this.angle)),this.drawBorders(t),this.drawControls(t)}t.restore()},_setShadow:function(t){this.shadow&&(t.shadowColor=this.shadow.color,t.shadowBlur=this.shadow.blur,t.shadowOffsetX=this.shadow.offsetX,t.shadowOffsetY=this.shadow.offsetY)},_removeShadow:function(t){this.shadow&&(t.shadowColor="",t.shadowBlur=t.shadowOffsetX=t.shadowOffsetY=0)},_renderFill:function(t){this.fill&&(this.fill.toLive&&(t.save(),t.translate(-this.width/2+this.fill.offsetX||0,-this.height/2+this.fill.offsetY||0)),"destination-over"===this.fillRule?t.fill("evenodd"):t.fill(),this.fill.toLive&&t.restore(),this.shadow&&!this.shadow.affectStroke&&this._removeShadow(t))},_renderStroke:function(t){this.stroke&&0!==this.strokeWidth&&(t.save(),this.strokeDashArray?(1&this.strokeDashArray.length&&this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray),o?(t.setLineDash(this.strokeDashArray),this._stroke&&this._stroke(t)):this._renderDashedStroke&&this._renderDashedStroke(t),t.stroke()):this._stroke?this._stroke(t):t.stroke(),this._removeShadow(t),t.restore())},clone:function(t,i){return this.constructor.fromObject?this.constructor.fromObject(this.toObject(i),t):new e.Object(this.toObject(i))},cloneAsImage:function(t){var i=this.toDataURL();return e.util.loadImage(i,function(i){t&&t(new e.Image(i))}),this},toDataURL:function(t){t||(t={});var i=e.util.createCanvasElement(),r=this.getBoundingRect();i.width=r.width,i.height=r.height,e.util.wrapElement(i,"div");var s=new e.Canvas(i);"jpg"===t.format&&(t.format="jpeg"),"jpeg"===t.format&&(s.backgroundColor="#fff");var n={active:this.get("active"),left:this.getLeft(),top:this.getTop()};this.set("active",!1),this.setPositionByOrigin(new e.Point(i.width/2,i.height/2),"center","center");var o=this.canvas;s.add(this);var a=s.toDataURL(t);return this.set(n).setCoords(),this.canvas=o,s.dispose(),s=null,a},isType:function(t){return this.type===t},complexity:function(){return 0},toJSON:function(t){return this.toObject(t)},setGradient:function(t,i){i||(i={});var r={colorStops:[]};r.type=i.type||(i.r1||i.r2?"radial":"linear"),r.coords={x1:i.x1,y1:i.y1,x2:i.x2,y2:i.y2},(i.r1||i.r2)&&(r.coords.r1=i.r1,r.coords.r2=i.r2);for(var s in i.colorStops){var n=new e.Color(i.colorStops[s]);r.colorStops.push({offset:s,color:n.toRgb(),opacity:n.getAlpha()})}return this.set(t,e.Gradient.forObject(this,r))},setPatternFill:function(t){return this.set("fill",new e.Pattern(t))},setShadow:function(t){return this.set("shadow",t?new e.Shadow(t):null)},setColor:function(t){return this.set("fill",t),this},setAngle:function(t){var e=("center"!==this.originX||"center"!==this.originY)&&this.centeredRotation;return e&&this._setOriginToCenter(),this.set("angle",t),e&&this._resetOrigin(),this},centerH:function(){return this.canvas.centerObjectH(this),this},centerV:function(){return this.canvas.centerObjectV(this),this},center:function(){return this.canvas.centerObject(this),this},remove:function(){return this.canvas.remove(this),this},getLocalPointer:function(t,e){e=e||this.canvas.getPointer(t);var i=this.translateToOriginPoint(this.getCenterPoint(),"left","top");return{x:e.x-i.x,y:e.y-i.y}},_setupFillRule:function(t){this.fillRule&&(this._prevFillRule=t.globalCompositeOperation,t.globalCompositeOperation=this.fillRule)},_restoreFillRule:function(t){this.fillRule&&this._prevFillRule&&(t.globalCompositeOperation=this._prevFillRule)}}),e.util.createAccessors(e.Object),e.Object.prototype.rotate=e.Object.prototype.setAngle,i(e.Object.prototype,e.Observable),e.Object.NUM_FRACTION_DIGITS=2,e.Object.__uid=0)}("undefined"!=typeof exports?exports:this),function(){var t=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{translateToCenterPoint:function(e,i,r){var s=e.x,n=e.y,o=this.stroke?this.strokeWidth:0;return"left"===i?s=e.x+(this.getWidth()+o*this.scaleX)/2:"right"===i&&(s=e.x-(this.getWidth()+o*this.scaleX)/2),"top"===r?n=e.y+(this.getHeight()+o*this.scaleY)/2:"bottom"===r&&(n=e.y-(this.getHeight()+o*this.scaleY)/2),fabric.util.rotatePoint(new fabric.Point(s,n),e,t(this.angle))},translateToOriginPoint:function(e,i,r){var s=e.x,n=e.y,o=this.stroke?this.strokeWidth:0;return"left"===i?s=e.x-(this.getWidth()+o*this.scaleX)/2:"right"===i&&(s=e.x+(this.getWidth()+o*this.scaleX)/2),"top"===r?n=e.y-(this.getHeight()+o*this.scaleY)/2:"bottom"===r&&(n=e.y+(this.getHeight()+o*this.scaleY)/2),fabric.util.rotatePoint(new fabric.Point(s,n),e,t(this.angle))},getCenterPoint:function(){var t=new fabric.Point(this.left,this.top);return this.translateToCenterPoint(t,this.originX,this.originY)},getPointByOrigin:function(t,e){var i=this.getCenterPoint();return this.translateToOriginPoint(i,t,e)},toLocalPoint:function(e,i,r){var s,n,o=this.getCenterPoint(),a=this.stroke?this.strokeWidth:0;return i&&r?(s="left"===i?o.x-(this.getWidth()+a*this.scaleX)/2:"right"===i?o.x+(this.getWidth()+a*this.scaleX)/2:o.x,n="top"===r?o.y-(this.getHeight()+a*this.scaleY)/2:"bottom"===r?o.y+(this.getHeight()+a*this.scaleY)/2:o.y):(s=this.left,n=this.top),fabric.util.rotatePoint(new fabric.Point(e.x,e.y),o,-t(this.angle)).subtractEquals(new fabric.Point(s,n))},setPositionByOrigin:function(t,e,i){var r=this.translateToCenterPoint(t,e,i),s=this.translateToOriginPoint(r,this.originX,this.originY);this.set("left",s.x),this.set("top",s.y)},adjustPosition:function(e){var i=t(this.angle),r=this.getWidth()/2,s=Math.cos(i)*r,n=Math.sin(i)*r,o=this.getWidth(),a=Math.cos(i)*o,h=Math.sin(i)*o;"center"===this.originX&&"left"===e||"right"===this.originX&&"center"===e?(this.left-=s,this.top-=n):"left"===this.originX&&"center"===e||"center"===this.originX&&"right"===e?(this.left+=s,this.top+=n):"left"===this.originX&&"right"===e?(this.left+=a,this.top+=h):"right"===this.originX&&"left"===e&&(this.left-=a,this.top-=h),this.setCoords(),this.originX=e},_setOriginToCenter:function(){this._originalOriginX=this.originX,this._originalOriginY=this.originY;var t=this.getCenterPoint();this.originX="center",this.originY="center",this.left=t.x,this.top=t.y},_resetOrigin:function(){var t=this.translateToOriginPoint(this.getCenterPoint(),this._originalOriginX,this._originalOriginY);this.originX=this._originalOriginX,this.originY=this._originalOriginY,this.left=t.x,this.top=t.y,this._originalOriginX=null,this._originalOriginY=null},_getLeftTopCoords:function(){return this.translateToOriginPoint(this.getCenterPoint(),"left","center")}})}(),function(){var t=fabric.util.degreesToRadians;fabric.util.object.extend(fabric.Object.prototype,{oCoords:null,intersectsWithRect:function(t,e){var i=this.oCoords,r=new fabric.Point(i.tl.x,i.tl.y),s=new fabric.Point(i.tr.x,i.tr.y),n=new fabric.Point(i.bl.x,i.bl.y),o=new fabric.Point(i.br.x,i.br.y),a=fabric.Intersection.intersectPolygonRectangle([r,s,o,n],t,e);return"Intersection"===a.status},intersectsWithObject:function(t){function e(t){return{tl:new fabric.Point(t.tl.x,t.tl.y),tr:new fabric.Point(t.tr.x,t.tr.y),bl:new fabric.Point(t.bl.x,t.bl.y),br:new fabric.Point(t.br.x,t.br.y)}}var i=e(this.oCoords),r=e(t.oCoords),s=fabric.Intersection.intersectPolygonPolygon([i.tl,i.tr,i.br,i.bl],[r.tl,r.tr,r.br,r.bl]);return"Intersection"===s.status},isContainedWithinObject:function(t){var e=t.getBoundingRect(),i=new fabric.Point(e.left,e.top),r=new fabric.Point(e.left+e.width,e.top+e.height);return this.isContainedWithinRect(i,r)},isContainedWithinRect:function(t,e){var i=this.getBoundingRect();return i.left>=t.x&&i.left+i.width<=e.x&&i.top>=t.y&&i.top+i.height<=e.y},containsPoint:function(t){var e=this._getImageLines(this.oCoords),i=this._findCrossPoints(t,e);return 0!==i&&i%2===1},_getImageLines:function(t){return{topline:{o:t.tl,d:t.tr},rightline:{o:t.tr,d:t.br},bottomline:{o:t.br,d:t.bl},leftline:{o:t.bl,d:t.tl}}},_findCrossPoints:function(t,e){var i,r,s,n,o,a,h,c=0;for(var l in e)if(h=e[l],!(h.o.y<t.y&&h.d.y<t.y||h.o.y>=t.y&&h.d.y>=t.y||(h.o.x===h.d.x&&h.o.x>=t.x?(o=h.o.x,a=t.y):(i=0,r=(h.d.y-h.o.y)/(h.d.x-h.o.x),s=t.y-i*t.x,n=h.o.y-r*h.o.x,o=-(s-n)/(i-r),a=s+i*o),o>=t.x&&(c+=1),2!==c)))break;return c},getBoundingRectWidth:function(){return this.getBoundingRect().width},getBoundingRectHeight:function(){return this.getBoundingRect().height},getBoundingRect:function(){this.oCoords||this.setCoords();var t=[this.oCoords.tl.x,this.oCoords.tr.x,this.oCoords.br.x,this.oCoords.bl.x],e=fabric.util.array.min(t),i=fabric.util.array.max(t),r=Math.abs(e-i),s=[this.oCoords.tl.y,this.oCoords.tr.y,this.oCoords.br.y,this.oCoords.bl.y],n=fabric.util.array.min(s),o=fabric.util.array.max(s),a=Math.abs(n-o);return{left:e,top:n,width:r,height:a}},getWidth:function(){return this.width*this.scaleX},getHeight:function(){return this.height*this.scaleY},_constrainScale:function(t){return Math.abs(t)<this.minScaleLimit?0>t?-this.minScaleLimit:this.minScaleLimit:t},scale:function(t){return t=this._constrainScale(t),0>t&&(this.flipX=!this.flipX,this.flipY=!this.flipY,t*=-1),this.scaleX=t,this.scaleY=t,this.setCoords(),this},scaleToWidth:function(t){var e=this.getBoundingRectWidth()/this.getWidth();return this.scale(t/this.width/e)},scaleToHeight:function(t){var e=this.getBoundingRectHeight()/this.getHeight();return this.scale(t/this.height/e)},setCoords:function(){var e=this.strokeWidth>1?this.strokeWidth:0,i=t(this.angle),r=this.getViewportTransform(),s=function(t){return fabric.util.transformPoint(t,r)},n=this.width,o=this.height,a="round"===this.strokeLineCap||"square"===this.strokeLineCap,h="line"===this.type&&1===this.width,c="line"===this.type&&1===this.height,l=a&&c||"line"!==this.type,u=a&&h||"line"!==this.type;h?n=e:c&&(o=e),l&&(n+=e),u&&(o+=e),this.currentWidth=n*this.scaleX,this.currentHeight=o*this.scaleY,this.currentWidth<0&&(this.currentWidth=Math.abs(this.currentWidth));var f=Math.sqrt(Math.pow(this.currentWidth/2,2)+Math.pow(this.currentHeight/2,2)),d=Math.atan(isFinite(this.currentHeight/this.currentWidth)?this.currentHeight/this.currentWidth:0),g=Math.cos(d+i)*f,p=Math.sin(d+i)*f,v=Math.sin(i),b=Math.cos(i),y=this.getCenterPoint(),m=new fabric.Point(this.currentWidth,this.currentHeight),_=new fabric.Point(y.x-g,y.y-p),x=new fabric.Point(_.x+m.x*b,_.y+m.x*v),C=new fabric.Point(_.x-m.y*v,_.y+m.y*b),S=new fabric.Point(_.x+m.x/2*b,_.y+m.x/2*v),w=s(_),O=s(x),T=s(new fabric.Point(x.x-m.y*v,x.y+m.y*b)),k=s(C),j=s(new fabric.Point(_.x-m.y/2*v,_.y+m.y/2*b)),A=s(S),P=s(new fabric.Point(x.x-m.y/2*v,x.y+m.y/2*b)),E=s(new fabric.Point(C.x+m.x/2*b,C.y+m.x/2*v)),I=s(new fabric.Point(S.x,S.y)),D=Math.cos(d+i)*this.padding*Math.sqrt(2),M=Math.sin(d+i)*this.padding*Math.sqrt(2);return w=w.add(new fabric.Point(-D,-M)),O=O.add(new fabric.Point(M,-D)),T=T.add(new fabric.Point(D,M)),k=k.add(new fabric.Point(-M,D)),j=j.add(new fabric.Point((-D-M)/2,(-M+D)/2)),A=A.add(new fabric.Point((M-D)/2,-(M+D)/2)),P=P.add(new fabric.Point((M+D)/2,(M-D)/2)),E=E.add(new fabric.Point((D-M)/2,(D+M)/2)),I=I.add(new fabric.Point((M-D)/2,-(M+D)/2)),this.oCoords={tl:w,tr:O,br:T,bl:k,ml:j,mt:A,mr:P,mb:E,mtr:I},this._setCornerCoords&&this._setCornerCoords(),this}})}(),fabric.util.object.extend(fabric.Object.prototype,{sendToBack:function(){return this.group?fabric.StaticCanvas.prototype.sendToBack.call(this.group,this):this.canvas.sendToBack(this),this},bringToFront:function(){return this.group?fabric.StaticCanvas.prototype.bringToFront.call(this.group,this):this.canvas.bringToFront(this),this},sendBackwards:function(t){return this.group?fabric.StaticCanvas.prototype.sendBackwards.call(this.group,this,t):this.canvas.sendBackwards(this,t),this},bringForward:function(t){return this.group?fabric.StaticCanvas.prototype.bringForward.call(this.group,this,t):this.canvas.bringForward(this,t),this},moveTo:function(t){return this.group?fabric.StaticCanvas.prototype.moveTo.call(this.group,this,t):this.canvas.moveTo(this,t),this}}),fabric.util.object.extend(fabric.Object.prototype,{getSvgStyles:function(){var t=this.fill?this.fill.toLive?"url(#SVGID_"+this.fill.id+")":this.fill:"none",e=this.stroke?this.stroke.toLive?"url(#SVGID_"+this.stroke.id+")":this.stroke:"none",i=this.strokeWidth?this.strokeWidth:"0",r=this.strokeDashArray?this.strokeDashArray.join(" "):"",s=this.strokeLineCap?this.strokeLineCap:"butt",n=this.strokeLineJoin?this.strokeLineJoin:"miter",o=this.strokeMiterLimit?this.strokeMiterLimit:"4",a="undefined"!=typeof this.opacity?this.opacity:"1",h=this.visible?"":" visibility: hidden;",c=this.shadow&&"text"!==this.type?"filter: url(#SVGID_"+this.shadow.id+");":"";return["stroke: ",e,"; ","stroke-width: ",i,"; ","stroke-dasharray: ",r,"; ","stroke-linecap: ",s,"; ","stroke-linejoin: ",n,"; ","stroke-miterlimit: ",o,"; ","fill: ",t,"; ","opacity: ",a,";",c,h].join("")},getSvgTransform:function(){var t=fabric.util.toFixed,e=this.getAngle(),i=this.getViewportTransform(),r=fabric.util.transformPoint(this.getCenterPoint(),i),s=fabric.Object.NUM_FRACTION_DIGITS,n="translate("+t(r.x,s)+" "+t(r.y,s)+")",o=0!==e?" rotate("+t(e,s)+")":"",a=1===this.scaleX&&1===this.scaleY&&1===i[0]&&1===i[3]?"":" scale("+t(this.scaleX*i[0],s)+" "+t(this.scaleY*i[3],s)+")",h=this.flipX?"matrix(-1 0 0 1 0 0) ":"",c=this.flipY?"matrix(1 0 0 -1 0 0)":"";return[n,o,a,h,c].join("")},_createBaseSVGMarkup:function(){var t=[];return this.fill&&this.fill.toLive&&t.push(this.fill.toSVG(this,!1)),this.stroke&&this.stroke.toLive&&t.push(this.stroke.toSVG(this,!1)),this.shadow&&t.push(this.shadow.toSVG(this)),t}}),fabric.util.object.extend(fabric.Object.prototype,{hasStateChanged:function(){return this.stateProperties.some(function(t){return this.get(t)!==this.originalState[t]},this)},saveState:function(t){return this.stateProperties.forEach(function(t){this.originalState[t]=this.get(t)},this),t&&t.stateProperties&&t.stateProperties.forEach(function(t){this.originalState[t]=this.get(t)},this),this},setupState:function(){return this.originalState={},this.saveState(),this}}),function(){var t=fabric.util.degreesToRadians,e=function(){return"undefined"!=typeof G_vmlCanvasManager};fabric.util.object.extend(fabric.Object.prototype,{_controlsVisibility:null,_findTargetCorner:function(t){if(!this.hasControls||!this.active)return!1;var e,i,r=t.x,s=t.y;for(var n in this.oCoords)if(this.isControlVisible(n)&&("mtr"!==n||this.hasRotatingPoint)&&(!this.get("lockUniScaling")||"mt"!==n&&"mr"!==n&&"mb"!==n&&"ml"!==n)&&(i=this._getImageLines(this.oCoords[n].corner),e=this._findCrossPoints({x:r,y:s},i),0!==e&&e%2===1))return this.__corner=n,n;return!1},_setCornerCoords:function(){var e=this.oCoords,i=t(this.angle),r=t(45-this.angle),s=Math.sqrt(2*Math.pow(this.cornerSize,2))/2,n=s*Math.cos(r),o=s*Math.sin(r),a=Math.sin(i),h=Math.cos(i);e.tl.corner={tl:{x:e.tl.x-o,y:e.tl.y-n},tr:{x:e.tl.x+n,y:e.tl.y-o},bl:{x:e.tl.x-n,y:e.tl.y+o},br:{x:e.tl.x+o,y:e.tl.y+n}},e.tr.corner={tl:{x:e.tr.x-o,y:e.tr.y-n},tr:{x:e.tr.x+n,y:e.tr.y-o},br:{x:e.tr.x+o,y:e.tr.y+n},bl:{x:e.tr.x-n,y:e.tr.y+o}},e.bl.corner={tl:{x:e.bl.x-o,y:e.bl.y-n},bl:{x:e.bl.x-n,y:e.bl.y+o},br:{x:e.bl.x+o,y:e.bl.y+n},tr:{x:e.bl.x+n,y:e.bl.y-o}},e.br.corner={tr:{x:e.br.x+n,y:e.br.y-o},bl:{x:e.br.x-n,y:e.br.y+o},br:{x:e.br.x+o,y:e.br.y+n},tl:{x:e.br.x-o,y:e.br.y-n}},e.ml.corner={tl:{x:e.ml.x-o,y:e.ml.y-n},tr:{x:e.ml.x+n,y:e.ml.y-o},bl:{x:e.ml.x-n,y:e.ml.y+o},br:{x:e.ml.x+o,y:e.ml.y+n}},e.mt.corner={tl:{x:e.mt.x-o,y:e.mt.y-n},tr:{x:e.mt.x+n,y:e.mt.y-o},bl:{x:e.mt.x-n,y:e.mt.y+o},br:{x:e.mt.x+o,y:e.mt.y+n}},e.mr.corner={tl:{x:e.mr.x-o,y:e.mr.y-n},tr:{x:e.mr.x+n,y:e.mr.y-o},bl:{x:e.mr.x-n,y:e.mr.y+o},br:{x:e.mr.x+o,y:e.mr.y+n}},e.mb.corner={tl:{x:e.mb.x-o,y:e.mb.y-n},tr:{x:e.mb.x+n,y:e.mb.y-o},bl:{x:e.mb.x-n,y:e.mb.y+o},br:{x:e.mb.x+o,y:e.mb.y+n}},e.mtr.corner={tl:{x:e.mtr.x-o+a*this.rotatingPointOffset,y:e.mtr.y-n-h*this.rotatingPointOffset},tr:{x:e.mtr.x+n+a*this.rotatingPointOffset,y:e.mtr.y-o-h*this.rotatingPointOffset},bl:{x:e.mtr.x-n+a*this.rotatingPointOffset,y:e.mtr.y+o-h*this.rotatingPointOffset},br:{x:e.mtr.x+o+a*this.rotatingPointOffset,y:e.mtr.y+n-h*this.rotatingPointOffset}}},drawBorders:function(t){if(!this.hasBorders)return this;var e=this.padding,i=2*e,r=this.getViewportTransform();t.save(),t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,t.strokeStyle=this.borderColor;var s=1/this._constrainScale(this.scaleX),n=1/this._constrainScale(this.scaleY);t.lineWidth=1/this.borderScaleFactor;var o=this.getWidth(),a=this.getHeight(),h=this.strokeWidth>1?this.strokeWidth:0,c="round"===this.strokeLineCap||"square"===this.strokeLineCap,l="line"===this.type&&1===this.width,u="line"===this.type&&1===this.height,f=c&&u||"line"!==this.type,d=c&&l||"line"!==this.type;l?o=h/s:u&&(a=h/n),f&&(o+=h/s),d&&(a+=h/n);var g=fabric.util.transformPoint(new fabric.Point(o,a),r,!0),p=g.x,v=g.y;if(this.group&&(p*=this.group.scaleX,v*=this.group.scaleY),t.strokeRect(~~(-(p/2)-e)-.5,~~(-(v/2)-e)-.5,~~(p+i)+1,~~(v+i)+1),this.hasRotatingPoint&&this.isControlVisible("mtr")&&!this.get("lockRotation")&&this.hasControls){var b=(this.flipY?v+2*e:-v-2*e)/2;t.beginPath(),t.moveTo(0,b),t.lineTo(0,b+(this.flipY?this.rotatingPointOffset:-this.rotatingPointOffset)),t.closePath(),t.stroke()}return t.restore(),this},drawControls:function(t){if(!this.hasControls)return this;var e=this.cornerSize,i=e/2,r=this.getViewportTransform(),s=this.strokeWidth>1?this.strokeWidth:0,n=this.width,o=this.height,a="round"===this.strokeLineCap||"square"===this.strokeLineCap,h="line"===this.type&&1===this.width,c="line"===this.type&&1===this.height,l=a&&c||"line"!==this.type,u=a&&h||"line"!==this.type;h?n=s:c&&(o=s),l&&(n+=s),u&&(o+=s),n*=this.scaleX,o*=this.scaleY;var f=fabric.util.transformPoint(new fabric.Point(n,o),r,!0),d=f.x,g=f.y,p=-(d/2),v=-(g/2),b=this.padding,y=i,m=i-e,_=this.transparentCorners?"strokeRect":"fillRect";return t.save(),t.lineWidth=1,t.globalAlpha=this.isMoving?this.borderOpacityWhenMoving:1,t.strokeStyle=t.fillStyle=this.cornerColor,this._drawControl("tl",t,_,p-y-b,v-y-b),this._drawControl("tr",t,_,p+d-y+b,v-y-b),this._drawControl("bl",t,_,p-y-b,v+g+m+b),this._drawControl("br",t,_,p+d+m+b,v+g+m+b),this.get("lockUniScaling")||(this._drawControl("mt",t,_,p+d/2-y,v-y-b),this._drawControl("mb",t,_,p+d/2-y,v+g+m+b),this._drawControl("mr",t,_,p+d+m+b,v+g/2-y),this._drawControl("ml",t,_,p-y-b,v+g/2-y)),this.hasRotatingPoint&&this._drawControl("mtr",t,_,p+d/2-y,this.flipY?v+g+this.rotatingPointOffset-this.cornerSize/2+b:v-this.rotatingPointOffset-this.cornerSize/2-b),t.restore(),this},_drawControl:function(t,i,r,s,n){var o=this.cornerSize;this.isControlVisible(t)&&(e()||this.transparentCorners||i.clearRect(s,n,o,o),i[r](s,n,o,o))},isControlVisible:function(t){return this._getControlsVisibility()[t]},setControlVisible:function(t,e){return this._getControlsVisibility()[t]=e,this},setControlsVisibility:function(t){t||(t={});for(var e in t)this.setControlVisible(e,t[e]);return this},_getControlsVisibility:function(){return this._controlsVisibility||(this._controlsVisibility={tl:!0,tr:!0,br:!0,bl:!0,ml:!0,mt:!0,mr:!0,mb:!0,mtr:!0}),this._controlsVisibility}})}(),fabric.util.object.extend(fabric.StaticCanvas.prototype,{FX_DURATION:500,fxCenterObjectH:function(t,e){e=e||{};var i=function(){},r=e.onComplete||i,s=e.onChange||i,n=this;return fabric.util.animate({startValue:t.get("left"),endValue:this.getCenter().left,duration:this.FX_DURATION,onChange:function(e){t.set("left",e),n.renderAll(),s()},onComplete:function(){t.setCoords(),r()}}),this},fxCenterObjectV:function(t,e){e=e||{};var i=function(){},r=e.onComplete||i,s=e.onChange||i,n=this;return fabric.util.animate({startValue:t.get("top"),endValue:this.getCenter().top,duration:this.FX_DURATION,onChange:function(e){t.set("top",e),n.renderAll(),s()},onComplete:function(){t.setCoords(),r()}}),this},fxRemove:function(t,e){e=e||{};var i=function(){},r=e.onComplete||i,s=e.onChange||i,n=this;return fabric.util.animate({startValue:t.get("opacity"),endValue:0,duration:this.FX_DURATION,onStart:function(){t.set("active",!1)},onChange:function(e){t.set("opacity",e),n.renderAll(),s()},onComplete:function(){n.remove(t),r()}}),this}}),fabric.util.object.extend(fabric.Object.prototype,{animate:function(){if(arguments[0]&&"object"==typeof arguments[0]){var t,e,i=[];for(t in arguments[0])i.push(t);for(var r=0,s=i.length;s>r;r++)t=i[r],e=r!==s-1,this._animate(t,arguments[0][t],arguments[1],e)}else this._animate.apply(this,arguments);return this},_animate:function(t,e,i,r){var s,n=this;e=e.toString(),i=i?fabric.util.object.clone(i):{},~t.indexOf(".")&&(s=t.split("."));var o=s?this.get(s[0])[s[1]]:this.get(t);"from"in i||(i.from=o),e=~e.indexOf("=")?o+parseFloat(e.replace("=","")):parseFloat(e),fabric.util.animate({startValue:i.from,endValue:e,byValue:i.by,easing:i.easing,duration:i.duration,abort:i.abort&&function(){return i.abort.call(n)},onChange:function(e){s?n[s[0]][s[1]]=e:n.set(t,e),r||i.onChange&&i.onChange()},onComplete:function(){r||(n.setCoords(),i.onComplete&&i.onComplete())}})}}),function(t){"use strict";function e(t,e){var i=t.origin,r=t.axis1,s=t.axis2,n=t.dimension,o=e.nearest,a=e.center,h=e.farthest;return function(){switch(this.get(i)){case o:return Math.min(this.get(r),this.get(s));case a:return Math.min(this.get(r),this.get(s))+.5*this.get(n);case h:return Math.max(this.get(r),this.get(s))}}}var i=t.fabric||(t.fabric={}),r=i.util.object.extend,s={x1:1,x2:1,y1:1,y2:1},n=i.StaticCanvas.supports("setLineDash");return i.Line?void i.warn("fabric.Line is already defined"):(i.Line=i.util.createClass(i.Object,{type:"line",x1:0,y1:0,x2:0,y2:0,initialize:function(t,e){e=e||{},t||(t=[0,0,0,0]),this.callSuper("initialize",e),this.set("x1",t[0]),this.set("y1",t[1]),this.set("x2",t[2]),this.set("y2",t[3]),this._setWidthHeight(e)},_setWidthHeight:function(t){t||(t={}),this.width=Math.abs(this.x2-this.x1)||1,this.height=Math.abs(this.y2-this.y1)||1,this.left="left"in t?t.left:this._getLeftToOriginX(),this.top="top"in t?t.top:this._getTopToOriginY()},_set:function(t,e){return this[t]=e,"undefined"!=typeof s[t]&&this._setWidthHeight(),this},_getLeftToOriginX:e({origin:"originX",axis1:"x1",axis2:"x2",dimension:"width"},{nearest:"left",center:"center",farthest:"right"}),_getTopToOriginY:e({origin:"originY",axis1:"y1",axis2:"y2",dimension:"height"},{nearest:"top",center:"center",farthest:"bottom"}),_render:function(t){t.beginPath();var e=this.group&&"path-group"===this.group.type;if(e){var i=this.getCenterPoint();t.translate(i.x,i.y),this.transformMatrix||t.translate(-this.group.width/2,-this.group.height/2)}if(!this.strokeDashArray||this.strokeDashArray&&n){var r=this.x1<=this.x2?-1:1,s=this.y1<=this.y2?-1:1;t.moveTo(1===this.width?0:r*this.width/2,1===this.height?0:s*this.height/2),t.lineTo(1===this.width?0:-1*r*this.width/2,1===this.height?0:-1*s*this.height/2)}t.lineWidth=this.strokeWidth;var o=t.strokeStyle;t.strokeStyle=this.stroke||t.fillStyle,this.stroke&&this._renderStroke(t),t.strokeStyle=o},_renderDashedStroke:function(t){var e=this.x1<=this.x2?-1:1,r=this.y1<=this.y2?-1:1,s=1===this.width?0:e*this.width/2,n=1===this.height?0:r*this.height/2;t.beginPath(),i.util.drawDashedLine(t,s,n,-s,-n,this.strokeDashArray),t.closePath()},toObject:function(t){return r(this.callSuper("toObject",t),{x1:this.get("x1"),y1:this.get("y1"),x2:this.get("x2"),y2:this.get("y2")})},toSVG:function(t){var e=this._createBaseSVGMarkup();return e.push("<line ",'x1="',this.get("x1"),'" y1="',this.get("y1"),'" x2="',this.get("x2"),'" y2="',this.get("y2"),'" style="',this.getSvgStyles(),'"/>'),t?t(e.join("")):e.join("")},complexity:function(){return 1}}),i.Line.ATTRIBUTE_NAMES=i.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")),i.Line.fromElement=function(t,e){var s=i.parseAttributes(t,i.Line.ATTRIBUTE_NAMES),n=[s.x1||0,s.y1||0,s.x2||0,s.y2||0];return new i.Line(n,r(s,e))},void(i.Line.fromObject=function(t){var e=[t.x1,t.y1,t.x2,t.y2];return new i.Line(e,t)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";
function e(t){return"radius"in t&&t.radius>0}var i=t.fabric||(t.fabric={}),r=2*Math.PI,s=i.util.object.extend;return i.Circle?void i.warn("fabric.Circle is already defined."):(i.Circle=i.util.createClass(i.Object,{type:"circle",radius:0,initialize:function(t){t=t||{},this.set("radius",t.radius||0),this.callSuper("initialize",t)},_set:function(t,e){return this.callSuper("_set",t,e),"radius"===t&&this.setRadius(e),this},toObject:function(t){return s(this.callSuper("toObject",t),{radius:this.get("radius")})},toSVG:function(t){var e=this._createBaseSVGMarkup();return e.push("<circle ",'cx="0" cy="0" ','r="',this.radius,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(e.join("")):e.join("")},_render:function(t,e){t.beginPath(),t.globalAlpha=this.group?t.globalAlpha*this.opacity:this.opacity,t.arc(e?this.left:0,e?this.top:0,this.radius,0,r,!1),this._renderFill(t),this.stroke&&this._renderStroke(t)},getRadiusX:function(){return this.get("radius")*this.get("scaleX")},getRadiusY:function(){return this.get("radius")*this.get("scaleY")},setRadius:function(t){this.radius=t,this.set("width",2*t).set("height",2*t)},complexity:function(){return 1}}),i.Circle.ATTRIBUTE_NAMES=i.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")),i.Circle.fromElement=function(t,r){r||(r={});var n=i.parseAttributes(t,i.Circle.ATTRIBUTE_NAMES);if(!e(n))throw new Error("value of `r` attribute is required and can not be negative");"left"in n||(n.left=0),"top"in n||(n.top=0),"transformMatrix"in n||(n.left-=r.width?r.width/2:0,n.top-=r.height?r.height/2:0);var o=new i.Circle(s(n,r));return o.cx=parseFloat(t.getAttribute("cx"))||0,o.cy=parseFloat(t.getAttribute("cy"))||0,o},void(i.Circle.fromObject=function(t){return new i.Circle(t)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});return e.Triangle?void e.warn("fabric.Triangle is already defined"):(e.Triangle=e.util.createClass(e.Object,{type:"triangle",initialize:function(t){t=t||{},this.callSuper("initialize",t),this.set("width",t.width||100).set("height",t.height||100)},_render:function(t){var e=this.width/2,i=this.height/2;t.beginPath(),t.moveTo(-e,i),t.lineTo(0,-i),t.lineTo(e,i),t.closePath(),this._renderFill(t),this._renderStroke(t)},_renderDashedStroke:function(t){var i=this.width/2,r=this.height/2;t.beginPath(),e.util.drawDashedLine(t,-i,r,0,-r,this.strokeDashArray),e.util.drawDashedLine(t,0,-r,i,r,this.strokeDashArray),e.util.drawDashedLine(t,i,r,-i,r,this.strokeDashArray),t.closePath()},toSVG:function(t){var e=this._createBaseSVGMarkup(),i=this.width/2,r=this.height/2,s=[-i+" "+r,"0 "+-r,i+" "+r].join(",");return e.push("<polygon ",'points="',s,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(e.join("")):e.join("")},complexity:function(){return 1}}),void(e.Triangle.fromObject=function(t){return new e.Triangle(t)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=2*Math.PI,r=e.util.object.extend;return e.Ellipse?void e.warn("fabric.Ellipse is already defined."):(e.Ellipse=e.util.createClass(e.Object,{type:"ellipse",rx:0,ry:0,initialize:function(t){t=t||{},this.callSuper("initialize",t),this.set("rx",t.rx||0),this.set("ry",t.ry||0),this.set("width",2*this.get("rx")),this.set("height",2*this.get("ry"))},toObject:function(t){return r(this.callSuper("toObject",t),{rx:this.get("rx"),ry:this.get("ry")})},toSVG:function(t){var e=this._createBaseSVGMarkup();return e.push("<ellipse ",'rx="',this.get("rx"),'" ry="',this.get("ry"),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(e.join("")):e.join("")},render:function(t,e){return 0!==this.rx&&0!==this.ry?this.callSuper("render",t,e):void 0},_render:function(t,e){t.beginPath(),t.globalAlpha=this.group?t.globalAlpha*this.opacity:this.opacity,t.save(),t.transform(1,0,0,this.ry/this.rx,0,0),t.arc(e?this.left:0,e?this.top*this.rx/this.ry:0,this.rx,0,i,!1),t.restore(),this._renderFill(t),this._renderStroke(t)},complexity:function(){return 1}}),e.Ellipse.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")),e.Ellipse.fromElement=function(t,i){i||(i={});var s=e.parseAttributes(t,e.Ellipse.ATTRIBUTE_NAMES);"left"in s||(s.left=0),"top"in s||(s.top=0),"transformMatrix"in s||(s.left-=i.width?i.width/2:0,s.top-=i.height?i.height/2:0);var n=new e.Ellipse(r(s,i));return n.cx=parseFloat(t.getAttribute("cx"))||0,n.cy=parseFloat(t.getAttribute("cy"))||0,n},void(e.Ellipse.fromObject=function(t){return new e.Ellipse(t)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){return t.left=t.left||0,t.top=t.top||0,t}var i=t.fabric||(t.fabric={}),r=i.util.object.extend;if(i.Rect)return void console.warn("fabric.Rect is already defined");var s=i.Object.prototype.stateProperties.concat();s.push("rx","ry","x","y"),i.Rect=i.util.createClass(i.Object,{stateProperties:s,type:"rect",rx:0,ry:0,x:0,y:0,strokeDashArray:null,initialize:function(t){t=t||{},this.callSuper("initialize",t),this._initRxRy(),this.x=t.x||0,this.y=t.y||0},_initRxRy:function(){this.rx&&!this.ry?this.ry=this.rx:this.ry&&!this.rx&&(this.rx=this.ry)},_render:function(t){if(1===this.width&&1===this.height)return void t.fillRect(0,0,1,1);var e=this.rx?Math.min(this.rx,this.width/2):0,i=this.ry?Math.min(this.ry,this.height/2):0,r=this.width,s=this.height,n=-r/2,o=-s/2,a=this.group&&"path-group"===this.group.type,h=0!==e||0!==i,c=.4477152502;t.beginPath(),t.globalAlpha=a?t.globalAlpha*this.opacity:this.opacity,this.transformMatrix&&a&&t.translate(this.width/2+this.x,this.height/2+this.y),!this.transformMatrix&&a&&t.translate(-this.group.width/2+this.width/2+this.x,-this.group.height/2+this.height/2+this.y),t.moveTo(n+e,o),t.lineTo(n+r-e,o),h&&t.bezierCurveTo(n+r-c*e,o,n+r,o+c*i,n+r,o+i),t.lineTo(n+r,o+s-i),h&&t.bezierCurveTo(n+r,o+s-c*i,n+r-c*e,o+s,n+r-e,o+s),t.lineTo(n+e,o+s),h&&t.bezierCurveTo(n+c*e,o+s,n,o+s-c*i,n,o+s-i),t.lineTo(n,o+i),h&&t.bezierCurveTo(n,o+c*i,n+c*e,o,n+e,o),t.closePath(),this._renderFill(t),this._renderStroke(t)},_renderDashedStroke:function(t){var e=-this.width/2,r=-this.height/2,s=this.width,n=this.height;t.beginPath(),i.util.drawDashedLine(t,e,r,e+s,r,this.strokeDashArray),i.util.drawDashedLine(t,e+s,r,e+s,r+n,this.strokeDashArray),i.util.drawDashedLine(t,e+s,r+n,e,r+n,this.strokeDashArray),i.util.drawDashedLine(t,e,r+n,e,r,this.strokeDashArray),t.closePath()},_normalizeLeftTopProperties:function(t){return"left"in t&&this.set("left",t.left+this.getWidth()/2),this.set("x",t.left||0),"top"in t&&this.set("top",t.top+this.getHeight()/2),this.set("y",t.top||0),this},toObject:function(t){var e=r(this.callSuper("toObject",t),{rx:this.get("rx")||0,ry:this.get("ry")||0,x:this.get("x"),y:this.get("y")});return this.includeDefaultValues||this._removeDefaultValues(e),e},toSVG:function(t){var e=this._createBaseSVGMarkup();return e.push("<rect ",'x="',-1*this.width/2,'" y="',-1*this.height/2,'" rx="',this.get("rx"),'" ry="',this.get("ry"),'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(e.join("")):e.join("")},complexity:function(){return 1}}),i.Rect.ATTRIBUTE_NAMES=i.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")),i.Rect.fromElement=function(t,s){if(!t)return null;var n=i.parseAttributes(t,i.Rect.ATTRIBUTE_NAMES);n=e(n);var o=new i.Rect(r(s?i.util.object.clone(s):{},n));return o._normalizeLeftTopProperties(n),o},i.Rect.fromObject=function(t){return new i.Rect(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.toFixed;return e.Polyline?void e.warn("fabric.Polyline is already defined"):(e.Polyline=e.util.createClass(e.Object,{type:"polyline",points:null,initialize:function(t,e,i){e=e||{},this.set("points",t),this.callSuper("initialize",e),this._calcDimensions(i)},_calcDimensions:function(t){return e.Polygon.prototype._calcDimensions.call(this,t)},toObject:function(t){return e.Polygon.prototype.toObject.call(this,t)},toSVG:function(t){for(var e=[],r=this._createBaseSVGMarkup(),s=0,n=this.points.length;n>s;s++)e.push(i(this.points[s].x,2),",",i(this.points[s].y,2)," ");return r.push("<polyline ",'points="',e.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(r.join("")):r.join("")},_render:function(t){var e;t.beginPath(),t.moveTo(this.points[0].x,this.points[0].y);for(var i=0,r=this.points.length;r>i;i++)e=this.points[i],t.lineTo(e.x,e.y);this._renderFill(t),this._renderStroke(t)},_renderDashedStroke:function(t){var i,r;t.beginPath();for(var s=0,n=this.points.length;n>s;s++)i=this.points[s],r=this.points[s+1]||i,e.util.drawDashedLine(t,i.x,i.y,r.x,r.y,this.strokeDashArray)},complexity:function(){return this.get("points").length}}),e.Polyline.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(),e.Polyline.fromElement=function(t,i){if(!t)return null;i||(i={});var r=e.parsePointsAttribute(t.getAttribute("points")),s=e.parseAttributes(t,e.Polyline.ATTRIBUTE_NAMES);return"transformMatrix"in s||e.util.normalizePoints(r,i),new e.Polyline(r,e.util.object.extend(s,i),!0)},void(e.Polyline.fromObject=function(t){var i=t.points;return new e.Polyline(i,t,!0)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.min,s=e.util.array.max,n=e.util.toFixed;return e.Polygon?void e.warn("fabric.Polygon is already defined"):(e.Polygon=e.util.createClass(e.Object,{type:"polygon",points:null,initialize:function(t,e,i){e=e||{},this.points=t,this.callSuper("initialize",e),this._calcDimensions(i)},_calcDimensions:function(t){var e=this.points,i=r(e,"x"),n=r(e,"y"),o=s(e,"x"),a=s(e,"y");if(this.width=o-i||1,this.height=a-n||1,this.minX=i,this.minY=n,!t){var h=this.width/2+this.minX,c=this.height/2+this.minY;this.points.forEach(function(t){t.x-=h,t.y-=c},this)}},toObject:function(t){return i(this.callSuper("toObject",t),{points:this.points.concat()})},toSVG:function(t){for(var e=[],i=this._createBaseSVGMarkup(),r=0,s=this.points.length;s>r;r++)e.push(n(this.points[r].x,2),",",n(this.points[r].y,2)," ");return i.push("<polygon ",'points="',e.join(""),'" style="',this.getSvgStyles(),'" transform="',this.getSvgTransform(),'"/>'),t?t(i.join("")):i.join("")},_render:function(t){var e;t.beginPath(),t.globalAlpha=this.group?t.globalAlpha*this.opacity:this.opacity,t.moveTo(this.points[0].x,this.points[0].y);for(var i=0,r=this.points.length;r>i;i++)e=this.points[i],t.lineTo(e.x,e.y);this._renderFill(t),(this.stroke||this.strokeDashArray)&&(t.closePath(),this._renderStroke(t))},_renderDashedStroke:function(t){var i,r;t.beginPath();for(var s=0,n=this.points.length;n>s;s++)i=this.points[s],r=this.points[s+1]||this.points[0],e.util.drawDashedLine(t,i.x,i.y,r.x,r.y,this.strokeDashArray);t.closePath()},complexity:function(){return this.points.length}}),e.Polygon.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat(),e.Polygon.fromElement=function(t,r){if(!t)return null;r||(r={});var s=e.parsePointsAttribute(t.getAttribute("points")),n=e.parseAttributes(t,e.Polygon.ATTRIBUTE_NAMES);return"transformMatrix"in n||e.util.normalizePoints(s,r),new e.Polygon(s,i(n,r),!0)},void(e.Polygon.fromObject=function(t){return new e.Polygon(t.points,t,!0)}))}("undefined"!=typeof exports?exports:this),function(t){"use strict";function e(t){return"H"===t[0]?t[1]:t[t.length-2]}function i(t){return"V"===t[0]?t[1]:t[t.length-1]}var r=t.fabric||(t.fabric={}),s=r.util.array.min,n=r.util.array.max,o=r.util.object.extend,a=Object.prototype.toString,h=r.util.drawArc,c={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7},l={m:"l",M:"L"};return r.Path?void r.warn("fabric.Path is already defined"):(r.Path=r.util.createClass(r.Object,{type:"path",path:null,initialize:function(t,e){if(e=e||{},this.setOptions(e),!t)throw new Error("`path` argument is required");var i="[object Array]"===a.call(t);this.path=i?t:t.match&&t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi),this.path&&(i||(this.path=this._parsePath()),this._initializePath(e),e.sourcePath&&this.setSourcePath(e.sourcePath))},_initializePath:function(t){var e="width"in t&&null!=t.width,i="height"in t&&null!=t.width,r="left"in t,s="top"in t,n=r?this.left:0,a=s?this.top:0;e&&i?(s||(this.top=this.height/2),r||(this.left=this.width/2)):(o(this,this._parseDimensions()),e&&(this.width=t.width),i&&(this.height=t.height)),this.pathOffset=this.pathOffset||this._calculatePathOffset(n,a)},_calculatePathOffset:function(t,e){return{x:this.left-t-this.width/2,y:this.top-e-this.height/2}},_render:function(t,e){var i,r,s,n,o,a=null,c=0,l=0,u=0,f=0,d=0,g=0,p=-(this.width/2+this.pathOffset.x),v=-(this.height/2+this.pathOffset.y);e&&(p+=this.width/2,v+=this.height/2);for(var b=0,y=this.path.length;y>b;++b){switch(i=this.path[b],i[0]){case"l":u+=i[1],f+=i[2],t.lineTo(u+p,f+v);break;case"L":u=i[1],f=i[2],t.lineTo(u+p,f+v);break;case"h":u+=i[1],t.lineTo(u+p,f+v);break;case"H":u=i[1],t.lineTo(u+p,f+v);break;case"v":f+=i[1],t.lineTo(u+p,f+v);break;case"V":f=i[1],t.lineTo(u+p,f+v);break;case"m":u+=i[1],f+=i[2],c=u,l=f,t.moveTo(u+p,f+v);break;case"M":u=i[1],f=i[2],c=u,l=f,t.moveTo(u+p,f+v);break;case"c":r=u+i[5],s=f+i[6],d=u+i[3],g=f+i[4],t.bezierCurveTo(u+i[1]+p,f+i[2]+v,d+p,g+v,r+p,s+v),u=r,f=s;break;case"C":u=i[5],f=i[6],d=i[3],g=i[4],t.bezierCurveTo(i[1]+p,i[2]+v,d+p,g+v,u+p,f+v);break;case"s":r=u+i[3],s=f+i[4],d=d?2*u-d:u,g=g?2*f-g:f,t.bezierCurveTo(d+p,g+v,u+i[1]+p,f+i[2]+v,r+p,s+v),d=u+i[1],g=f+i[2],u=r,f=s;break;case"S":r=i[3],s=i[4],d=2*u-d,g=2*f-g,t.bezierCurveTo(d+p,g+v,i[1]+p,i[2]+v,r+p,s+v),u=r,f=s,d=i[1],g=i[2];break;case"q":r=u+i[3],s=f+i[4],d=u+i[1],g=f+i[2],t.quadraticCurveTo(d+p,g+v,r+p,s+v),u=r,f=s;break;case"Q":r=i[3],s=i[4],t.quadraticCurveTo(i[1]+p,i[2]+v,r+p,s+v),u=r,f=s,d=i[1],g=i[2];break;case"t":r=u+i[1],s=f+i[2],null===a[0].match(/[QqTt]/)?(d=u,g=f):"t"===a[0]?(d=2*u-n,g=2*f-o):"q"===a[0]&&(d=2*u-d,g=2*f-g),n=d,o=g,t.quadraticCurveTo(d+p,g+v,r+p,s+v),u=r,f=s,d=u+i[1],g=f+i[2];break;case"T":r=i[1],s=i[2],d=2*u-d,g=2*f-g,t.quadraticCurveTo(d+p,g+v,r+p,s+v),u=r,f=s;break;case"a":h(t,u+p,f+v,[i[1],i[2],i[3],i[4],i[5],i[6]+u+p,i[7]+f+v]),u+=i[6],f+=i[7];break;case"A":h(t,u+p,f+v,[i[1],i[2],i[3],i[4],i[5],i[6]+p,i[7]+v]),u=i[6],f=i[7];break;case"z":case"Z":u=c,f=l,t.closePath()}a=i}},render:function(t,e){if(this.visible){t.save(),e&&t.translate(-this.width/2,-this.height/2);var i=this.transformMatrix;i&&t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),e||this.transform(t),this._setStrokeStyles(t),this._setFillStyles(t),this._setShadow(t),this.clipTo&&r.util.clipContext(this,t),t.beginPath(),t.globalAlpha=this.group?t.globalAlpha*this.opacity:this.opacity,this._render(t,e),this._renderFill(t),this._renderStroke(t),this.clipTo&&t.restore(),this._removeShadow(t),t.restore()}},toString:function(){return"#<fabric.Path ("+this.complexity()+'): { "top": '+this.top+', "left": '+this.left+" }>"},toObject:function(t){var e=o(this.callSuper("toObject",t),{path:this.path.map(function(t){return t.slice()}),pathOffset:this.pathOffset});return this.sourcePath&&(e.sourcePath=this.sourcePath),this.transformMatrix&&(e.transformMatrix=this.transformMatrix),e},toDatalessObject:function(t){var e=this.toObject(t);return this.sourcePath&&(e.path=this.sourcePath),delete e.sourcePath,e},toSVG:function(t){for(var e=[],i=this._createBaseSVGMarkup(),r=0,s=this.path.length;s>r;r++)e.push(this.path[r].join(" "));var n=e.join(" ");return i.push('<g transform="',this.group?"":this.getSvgTransform(),'">',"<path ",'d="',n,'" style="',this.getSvgStyles(),'" transform="translate(',-this.width/2," ",-this.height/2,")",'" stroke-linecap="round" ',"/>","</g>"),t?t(i.join("")):i.join("")},complexity:function(){return this.path.length},_parsePath:function(){for(var t,e,i,r,s,n=[],o=[],a=/([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi,h=0,u=this.path.length;u>h;h++){for(t=this.path[h],r=t.slice(1).trim(),o.length=0;i=a.exec(r);)o.push(i[0]);s=[t.charAt(0)];for(var f=0,d=o.length;d>f;f++)e=parseFloat(o[f]),isNaN(e)||s.push(e);var g=s[0],p=c[g.toLowerCase()],v=l[g]||g;if(s.length-1>p)for(var b=1,y=s.length;y>b;b+=p)n.push([g].concat(s.slice(b,b+p))),g=v;else n.push(s)}return n},_parseDimensions:function(){var t=[],e=[],i={};this.path.forEach(function(r,s){this._getCoordsFromCommand(r,s,t,e,i)},this);var r=s(t),o=s(e),a=n(t),h=n(e),c=a-r,l=h-o,u={left:this.left+(r+c/2),top:this.top+(o+l/2),width:c,height:l};return u},_getCoordsFromCommand:function(t,r,s,n,o){var a=!1;"H"!==t[0]&&(o.x=e(0===r?t:this.path[r-1])),"V"!==t[0]&&(o.y=i(0===r?t:this.path[r-1])),t[0]===t[0].toLowerCase()&&(a=!0);var h,c=this._getXY(t,a,o);h=parseInt(c.x,10),isNaN(h)||s.push(h),h=parseInt(c.y,10),isNaN(h)||n.push(h)},_getXY:function(t,r,s){var n=r?s.x+e(t):"V"===t[0]?s.x:e(t),o=r?s.y+i(t):"H"===t[0]?s.y:i(t);return{x:n,y:o}}}),r.Path.fromObject=function(t,e){"string"==typeof t.path?r.loadSVGFromURL(t.path,function(i){var s=i[0],n=t.path;delete t.path,r.util.object.extend(s,t),s.setSourcePath(n),e(s)}):e(new r.Path(t.path,t))},r.Path.ATTRIBUTE_NAMES=r.SHARED_ATTRIBUTES.concat(["d"]),r.Path.fromElement=function(t,e,i){var s=r.parseAttributes(t,r.Path.ATTRIBUTE_NAMES);e&&e(new r.Path(s.d,o(s,i)))},void(r.Path.async=!0))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.invoke,s=e.Object.prototype.toObject;return e.PathGroup?void e.warn("fabric.PathGroup is already defined"):(e.PathGroup=e.util.createClass(e.Path,{type:"path-group",fill:"",initialize:function(t,e){e=e||{},this.paths=t||[];for(var i=this.paths.length;i--;)this.paths[i].group=this;this.setOptions(e),e.widthAttr&&(this.scaleX=e.widthAttr/e.width),e.heightAttr&&(this.scaleY=e.heightAttr/e.height),this.setCoords(),e.sourcePath&&this.setSourcePath(e.sourcePath)},render:function(t){if(this.visible){t.save();var i=this.transformMatrix;i&&t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),this.transform(t),this._setShadow(t),this.clipTo&&e.util.clipContext(this,t);for(var r=0,s=this.paths.length;s>r;++r)this.paths[r].render(t,!0);this.clipTo&&t.restore(),this._removeShadow(t),t.restore()}},_set:function(t,e){if("fill"===t&&e&&this.isSameColor())for(var i=this.paths.length;i--;)this.paths[i]._set(t,e);return this.callSuper("_set",t,e)},toObject:function(t){var e=i(s.call(this,t),{paths:r(this.getObjects(),"toObject",t)});return this.sourcePath&&(e.sourcePath=this.sourcePath),e},toDatalessObject:function(t){var e=this.toObject(t);return this.sourcePath&&(e.paths=this.sourcePath),e},toSVG:function(t){for(var e=this.getObjects(),i=["<g ",'style="',this.getSvgStyles(),'" ','transform="',this.getSvgTransform(),'" ',">"],r=0,s=e.length;s>r;r++)i.push(e[r].toSVG(t));return i.push("</g>"),t?t(i.join("")):i.join("")},toString:function(){return"#<fabric.PathGroup ("+this.complexity()+"): { top: "+this.top+", left: "+this.left+" }>"},isSameColor:function(){var t=(this.getObjects()[0].get("fill")||"").toLowerCase();return this.getObjects().every(function(e){return(e.get("fill")||"").toLowerCase()===t})},complexity:function(){return this.paths.reduce(function(t,e){return t+(e&&e.complexity?e.complexity():0)},0)},getObjects:function(){return this.paths}}),e.PathGroup.fromObject=function(t,i){"string"==typeof t.paths?e.loadSVGFromURL(t.paths,function(r){var s=t.paths;delete t.paths;var n=e.util.groupSVGElements(r,t,s);i(n)}):e.util.enlivenObjects(t.paths,function(r){delete t.paths,i(new e.PathGroup(r,t))})},void(e.PathGroup.async=!0))}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.array.min,s=e.util.array.max,n=e.util.array.invoke;if(!e.Group){var o={lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0};e.Group=e.util.createClass(e.Object,e.Collection,{type:"group",initialize:function(t,e){e=e||{},this._objects=t||[];for(var r=this._objects.length;r--;)this._objects[r].group=this;this.originalState={},this.callSuper("initialize"),this._calcBounds(),this._updateObjectsCoords(),e&&i(this,e),this._setOpacityIfSame(),this.setCoords(),this.saveCoords()},_updateObjectsCoords:function(){this.forEachObject(this._updateObjectCoords,this)},_updateObjectCoords:function(t){var e=t.getLeft(),i=t.getTop();t.set({originalLeft:e,originalTop:i,left:e-this.left,top:i-this.top}),t.setCoords(),t.__origHasControls=t.hasControls,t.hasControls=!1},toString:function(){return"#<fabric.Group: ("+this.complexity()+")>"},addWithUpdate:function(t){return this._restoreObjectsState(),t&&(this._objects.push(t),t.group=this),this.forEachObject(this._setObjectActive,this),this._calcBounds(),this._updateObjectsCoords(),this},_setObjectActive:function(t){t.set("active",!0),t.group=this},removeWithUpdate:function(t){return this._moveFlippedObject(t),this._restoreObjectsState(),this.forEachObject(this._setObjectActive,this),this.remove(t),this._calcBounds(),this._updateObjectsCoords(),this},_onObjectAdded:function(t){t.group=this},_onObjectRemoved:function(t){delete t.group,t.set("active",!1)},delegatedProperties:{fill:!0,opacity:!0,fontFamily:!0,fontWeight:!0,fontSize:!0,fontStyle:!0,lineHeight:!0,textDecoration:!0,textAlign:!0,backgroundColor:!0},_set:function(t,e){if(t in this.delegatedProperties){var i=this._objects.length;for(this[t]=e;i--;)this._objects[i].set(t,e)}else this[t]=e},toObject:function(t){return i(this.callSuper("toObject",t),{objects:n(this._objects,"toObject",t)})},render:function(t){if(this.visible){t.save(),this.clipTo&&e.util.clipContext(this,t);for(var i=0,r=this._objects.length;r>i;i++)this._renderObject(this._objects[i],t);this.clipTo&&t.restore(),t.restore()}},_renderControls:function(t,e){this.callSuper("_renderControls",t,e);for(var i=0,r=this._objects.length;r>i;i++)this._objects[i]._renderControls(t)},_renderObject:function(t,e){var i=t.hasRotatingPoint;t.visible&&(t.hasRotatingPoint=!1,t.render(e),t.hasRotatingPoint=i)},_restoreObjectsState:function(){return this._objects.forEach(this._restoreObjectState,this),this},_moveFlippedObject:function(t){var e=t.get("originX"),i=t.get("originY"),r=t.getCenterPoint();t.set({originX:"center",originY:"center",left:r.x,top:r.y}),this._toggleFlipping(t);var s=t.getPointByOrigin(e,i);return t.set({originX:e,originY:i,left:s.x,top:s.y}),this},_toggleFlipping:function(t){this.flipX&&(t.toggle("flipX"),t.set("left",-t.get("left")),t.setAngle(-t.getAngle())),this.flipY&&(t.toggle("flipY"),t.set("top",-t.get("top")),t.setAngle(-t.getAngle()))},_restoreObjectState:function(t){return this._setObjectPosition(t),t.setCoords(),t.hasControls=t.__origHasControls,delete t.__origHasControls,t.set("active",!1),t.setCoords(),delete t.group,this},_setObjectPosition:function(t){var e=this.getLeft(),i=this.getTop(),r=this._getRotatedLeftTop(t);t.set({angle:t.getAngle()+this.getAngle(),left:e+r.left,top:i+r.top,scaleX:t.get("scaleX")*this.get("scaleX"),scaleY:t.get("scaleY")*this.get("scaleY")})},_getRotatedLeftTop:function(t){var e=this.getAngle()*(Math.PI/180);return{left:-Math.sin(e)*t.getTop()*this.get("scaleY")+Math.cos(e)*t.getLeft()*this.get("scaleX"),top:Math.cos(e)*t.getTop()*this.get("scaleY")+Math.sin(e)*t.getLeft()*this.get("scaleX")}},destroy:function(){return this._objects.forEach(this._moveFlippedObject,this),this._restoreObjectsState()},saveCoords:function(){return this._originalLeft=this.get("left"),this._originalTop=this.get("top"),this},hasMoved:function(){return this._originalLeft!==this.get("left")||this._originalTop!==this.get("top")},setObjectsCoords:function(){return this.forEachObject(function(t){t.setCoords()}),this},_setOpacityIfSame:function(){var t=this.getObjects(),e=t[0]?t[0].get("opacity"):1,i=t.every(function(t){return t.get("opacity")===e});i&&(this.opacity=e)},_calcBounds:function(t){for(var e,i=[],r=[],s=0,n=this._objects.length;n>s;++s){e=this._objects[s],e.setCoords();for(var o in e.oCoords)i.push(e.oCoords[o].x),r.push(e.oCoords[o].y)}this.set(this._getBounds(i,r,t))},_getBounds:function(t,i,n){var o=e.util.invertTransform(this.getViewportTransform()),a=e.util.transformPoint(new e.Point(r(t),r(i)),o),h=e.util.transformPoint(new e.Point(s(t),s(i)),o),c={width:h.x-a.x||0,height:h.y-a.y||0};return n||(c.left=(a.x+h.x)/2||0,c.top=(a.y+h.y)/2||0),c},toSVG:function(t){for(var e=["<g ",'transform="',this.getSvgTransform(),'">'],i=0,r=this._objects.length;r>i;i++)e.push(this._objects[i].toSVG(t));return e.push("</g>"),t?t(e.join("")):e.join("")},get:function(t){if(t in o){if(this[t])return this[t];for(var e=0,i=this._objects.length;i>e;e++)if(this._objects[e][t])return!0;return!1}return t in this.delegatedProperties?this._objects[0]&&this._objects[0].get(t):this[t]}}),e.Group.fromObject=function(t,i){e.util.enlivenObjects(t.objects,function(r){delete t.objects,i&&i(new e.Group(r,t))})},e.Group.async=!0}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=fabric.util.object.extend;return t.fabric||(t.fabric={}),t.fabric.Image?void fabric.warn("fabric.Image is already defined."):(fabric.Image=fabric.util.createClass(fabric.Object,{type:"image",crossOrigin:"",initialize:function(t,e){e||(e={}),this.filters=[],this.callSuper("initialize",e),this._initElement(t,e),this._initConfig(e),e.filters&&(this.filters=e.filters,this.applyFilters())},getElement:function(){return this._element},setElement:function(t,e){return this._element=t,this._originalElement=t,this._initConfig(),0!==this.filters.length&&this.applyFilters(e),this},setCrossOrigin:function(t){return this.crossOrigin=t,this._element.crossOrigin=t,this},getOriginalSize:function(){var t=this.getElement();return{width:t.width,height:t.height}},render:function(t,e){if(this.visible){t.save();var i=this.transformMatrix,r=this.group&&"path-group"===this.group.type;r&&t.translate(-this.group.width/2,-this.group.height/2),i&&t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),e||this.transform(t),r&&t.translate(this.width/2,this.height/2),this._setShadow(t),this.clipTo&&fabric.util.clipContext(this,t),this._render(t),this.shadow&&!this.shadow.affectStroke&&this._removeShadow(t),this._renderStroke(t),this.clipTo&&t.restore(),t.restore()}},_stroke:function(t){t.save(),this._setStrokeStyles(t),t.beginPath(),t.strokeRect(-this.width/2,-this.height/2,this.width,this.height),t.closePath(),t.restore()},_renderDashedStroke:function(t){var e=-this.width/2,i=-this.height/2,r=this.width,s=this.height;t.save(),this._setStrokeStyles(t),t.beginPath(),fabric.util.drawDashedLine(t,e,i,e+r,i,this.strokeDashArray),fabric.util.drawDashedLine(t,e+r,i,e+r,i+s,this.strokeDashArray),fabric.util.drawDashedLine(t,e+r,i+s,e,i+s,this.strokeDashArray),fabric.util.drawDashedLine(t,e,i+s,e,i,this.strokeDashArray),t.closePath(),t.restore()},toObject:function(t){return e(this.callSuper("toObject",t),{src:this._originalElement.src||this._originalElement._src,filters:this.filters.map(function(t){return t&&t.toObject()}),crossOrigin:this.crossOrigin})},toSVG:function(t){var e=[];if(e.push('<g transform="',this.getSvgTransform(),'">','<image xlink:href="',this.getSvgSrc(),'" style="',this.getSvgStyles(),'" transform="translate('+-this.width/2+" "+-this.height/2+")",'" width="',this.width,'" height="',this.height,'" preserveAspectRatio="none"',"></image>"),this.stroke||this.strokeDashArray){var i=this.fill;this.fill=null,e.push("<rect ",'x="',-1*this.width/2,'" y="',-1*this.height/2,'" width="',this.width,'" height="',this.height,'" style="',this.getSvgStyles(),'"/>'),this.fill=i}return e.push("</g>"),t?t(e.join("")):e.join("")},getSrc:function(){return this.getElement()?this.getElement().src||this.getElement()._src:void 0},toString:function(){return'#<fabric.Image: { src: "'+this.getSrc()+'" }>'},clone:function(t,e){this.constructor.fromObject(this.toObject(e),t)},applyFilters:function(t){if(this._originalElement){if(0===this.filters.length)return this._element=this._originalElement,void(t&&t());var e=this._originalElement,i=fabric.util.createCanvasElement(),r=fabric.util.createImage(),s=this;return i.width=e.width,i.height=e.height,i.getContext("2d").drawImage(e,0,0,e.width,e.height),this.filters.forEach(function(t){t&&t.applyTo(i)}),r.width=e.width,r.height=e.height,fabric.isLikelyNode?(r.src=i.toBuffer(void 0,fabric.Image.pngCompression),s._element=r,t&&t()):(r.onload=function(){s._element=r,t&&t(),r.onload=i=e=null},r.src=i.toDataURL("image/png")),this}},_render:function(t){this._element&&t.drawImage(this._element,-this.width/2,-this.height/2,this.width,this.height)},_resetWidthHeight:function(){var t=this.getElement();this.set("width",t.width),this.set("height",t.height)},_initElement:function(t){this.setElement(fabric.util.getById(t)),fabric.util.addClass(this.getElement(),fabric.Image.CSS_CANVAS)},_initConfig:function(t){t||(t={}),this.setOptions(t),this._setWidthHeight(t),this._element&&this.crossOrigin&&(this._element.crossOrigin=this.crossOrigin)},_initFilters:function(t,e){t.filters&&t.filters.length?fabric.util.enlivenObjects(t.filters,function(t){e&&e(t)},"fabric.Image.filters"):e&&e()},_setWidthHeight:function(t){this.width="width"in t?t.width:this.getElement()?this.getElement().width||0:0,this.height="height"in t?t.height:this.getElement()?this.getElement().height||0:0},complexity:function(){return 1}}),fabric.Image.CSS_CANVAS="canvas-img",fabric.Image.prototype.getSvgSrc=fabric.Image.prototype.getSrc,fabric.Image.fromObject=function(t,e){fabric.util.loadImage(t.src,function(i){fabric.Image.prototype._initFilters.call(t,t,function(r){t.filters=r||[];var s=new fabric.Image(i,t);e&&e(s)})},null,t.crossOrigin)},fabric.Image.fromURL=function(t,e,i){fabric.util.loadImage(t,function(t){e(new fabric.Image(t,i))},null,i&&i.crossOrigin)},fabric.Image.ATTRIBUTE_NAMES=fabric.SHARED_ATTRIBUTES.concat("x y width height xlink:href".split(" ")),fabric.Image.fromElement=function(t,i,r){var s=fabric.parseAttributes(t,fabric.Image.ATTRIBUTE_NAMES);fabric.Image.fromURL(s["xlink:href"],i,e(r?fabric.util.object.clone(r):{},s))},fabric.Image.async=!0,void(fabric.Image.pngCompression=1))}("undefined"!=typeof exports?exports:this),fabric.util.object.extend(fabric.Object.prototype,{_getAngleValueForStraighten:function(){var t=this.getAngle()%360;return t>0?90*Math.round((t-1)/90):90*Math.round(t/90)},straighten:function(){return this.setAngle(this._getAngleValueForStraighten()),this},fxStraighten:function(t){t=t||{};var e=function(){},i=t.onComplete||e,r=t.onChange||e,s=this;return fabric.util.animate({startValue:this.get("angle"),endValue:this._getAngleValueForStraighten(),duration:this.FX_DURATION,onChange:function(t){s.setAngle(t),r()},onComplete:function(){s.setCoords(),i()},onStart:function(){s.set("active",!1)}}),this}}),fabric.util.object.extend(fabric.StaticCanvas.prototype,{straightenObject:function(t){return t.straighten(),this.renderAll(),this},fxStraightenObject:function(t){return t.fxStraighten({onChange:this.renderAll.bind(this)}),this}}),fabric.Image.filters=fabric.Image.filters||{},fabric.Image.filters.BaseFilter=fabric.util.createClass({type:"BaseFilter",toObject:function(){return{type:this.type}},toJSON:function(){return this.toObject()}}),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Brightness=e.util.createClass(e.Image.filters.BaseFilter,{type:"Brightness",initialize:function(t){t=t||{},this.brightness=t.brightness||0},applyTo:function(t){for(var e=t.getContext("2d"),i=e.getImageData(0,0,t.width,t.height),r=i.data,s=this.brightness,n=0,o=r.length;o>n;n+=4)r[n]+=s,r[n+1]+=s,r[n+2]+=s;e.putImageData(i,0,0)},toObject:function(){return i(this.callSuper("toObject"),{brightness:this.brightness})}}),e.Image.filters.Brightness.fromObject=function(t){return new e.Image.filters.Brightness(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Convolute=e.util.createClass(e.Image.filters.BaseFilter,{type:"Convolute",initialize:function(t){t=t||{},this.opaque=t.opaque,this.matrix=t.matrix||[0,0,0,0,1,0,0,0,0];
var i=e.util.createCanvasElement();this.tmpCtx=i.getContext("2d")},_createImageData:function(t,e){return this.tmpCtx.createImageData(t,e)},applyTo:function(t){for(var e=this.matrix,i=t.getContext("2d"),r=i.getImageData(0,0,t.width,t.height),s=Math.round(Math.sqrt(e.length)),n=Math.floor(s/2),o=r.data,a=r.width,h=r.height,c=a,l=h,u=this._createImageData(c,l),f=u.data,d=this.opaque?1:0,g=0;l>g;g++)for(var p=0;c>p;p++){for(var v=g,b=p,y=4*(g*c+p),m=0,_=0,x=0,C=0,S=0;s>S;S++)for(var w=0;s>w;w++){var O=v+S-n,T=b+w-n;if(!(0>O||O>h||0>T||T>a)){var k=4*(O*a+T),j=e[S*s+w];m+=o[k]*j,_+=o[k+1]*j,x+=o[k+2]*j,C+=o[k+3]*j}}f[y]=m,f[y+1]=_,f[y+2]=x,f[y+3]=C+d*(255-C)}i.putImageData(u,0,0)},toObject:function(){return i(this.callSuper("toObject"),{opaque:this.opaque,matrix:this.matrix})}}),e.Image.filters.Convolute.fromObject=function(t){return new e.Image.filters.Convolute(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.GradientTransparency=e.util.createClass(e.Image.filters.BaseFilter,{type:"GradientTransparency",initialize:function(t){t=t||{},this.threshold=t.threshold||100},applyTo:function(t){for(var e=t.getContext("2d"),i=e.getImageData(0,0,t.width,t.height),r=i.data,s=this.threshold,n=r.length,o=0,a=r.length;a>o;o+=4)r[o+3]=s+255*(n-o)/n;e.putImageData(i,0,0)},toObject:function(){return i(this.callSuper("toObject"),{threshold:this.threshold})}}),e.Image.filters.GradientTransparency.fromObject=function(t){return new e.Image.filters.GradientTransparency(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Image.filters.Grayscale=e.util.createClass(e.Image.filters.BaseFilter,{type:"Grayscale",applyTo:function(t){for(var e,i=t.getContext("2d"),r=i.getImageData(0,0,t.width,t.height),s=r.data,n=r.width*r.height*4,o=0;n>o;)e=(s[o]+s[o+1]+s[o+2])/3,s[o]=e,s[o+1]=e,s[o+2]=e,o+=4;i.putImageData(r,0,0)}}),e.Image.filters.Grayscale.fromObject=function(){return new e.Image.filters.Grayscale}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Image.filters.Invert=e.util.createClass(e.Image.filters.BaseFilter,{type:"Invert",applyTo:function(t){var e,i=t.getContext("2d"),r=i.getImageData(0,0,t.width,t.height),s=r.data,n=s.length;for(e=0;n>e;e+=4)s[e]=255-s[e],s[e+1]=255-s[e+1],s[e+2]=255-s[e+2];i.putImageData(r,0,0)}}),e.Image.filters.Invert.fromObject=function(){return new e.Image.filters.Invert}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Mask=e.util.createClass(e.Image.filters.BaseFilter,{type:"Mask",initialize:function(t){t=t||{},this.mask=t.mask,this.channel=[0,1,2,3].indexOf(t.channel)>-1?t.channel:0},applyTo:function(t){if(this.mask){var i,r=t.getContext("2d"),s=r.getImageData(0,0,t.width,t.height),n=s.data,o=this.mask.getElement(),a=e.util.createCanvasElement(),h=this.channel,c=s.width*s.height*4;a.width=o.width,a.height=o.height,a.getContext("2d").drawImage(o,0,0,o.width,o.height);var l=a.getContext("2d").getImageData(0,0,o.width,o.height),u=l.data;for(i=0;c>i;i+=4)n[i+3]=u[i+h];r.putImageData(s,0,0)}},toObject:function(){return i(this.callSuper("toObject"),{mask:this.mask.toObject(),channel:this.channel})}}),e.Image.filters.Mask.fromObject=function(t,i){e.util.loadImage(t.mask.src,function(r){t.mask=new e.Image(r,t.mask),i&&i(new e.Image.filters.Mask(t))})},e.Image.filters.Mask.async=!0}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Noise=e.util.createClass(e.Image.filters.BaseFilter,{type:"Noise",initialize:function(t){t=t||{},this.noise=t.noise||0},applyTo:function(t){for(var e,i=t.getContext("2d"),r=i.getImageData(0,0,t.width,t.height),s=r.data,n=this.noise,o=0,a=s.length;a>o;o+=4)e=(.5-Math.random())*n,s[o]+=e,s[o+1]+=e,s[o+2]+=e;i.putImageData(r,0,0)},toObject:function(){return i(this.callSuper("toObject"),{noise:this.noise})}}),e.Image.filters.Noise.fromObject=function(t){return new e.Image.filters.Noise(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Pixelate=e.util.createClass(e.Image.filters.BaseFilter,{type:"Pixelate",initialize:function(t){t=t||{},this.blocksize=t.blocksize||4},applyTo:function(t){var e,i,r,s,n,o,a,h=t.getContext("2d"),c=h.getImageData(0,0,t.width,t.height),l=c.data,u=c.height,f=c.width;for(i=0;u>i;i+=this.blocksize)for(r=0;f>r;r+=this.blocksize){e=4*i*f+4*r,s=l[e],n=l[e+1],o=l[e+2],a=l[e+3];for(var d=i,g=i+this.blocksize;g>d;d++)for(var p=r,v=r+this.blocksize;v>p;p++)e=4*d*f+4*p,l[e]=s,l[e+1]=n,l[e+2]=o,l[e+3]=a}h.putImageData(c,0,0)},toObject:function(){return i(this.callSuper("toObject"),{blocksize:this.blocksize})}}),e.Image.filters.Pixelate.fromObject=function(t){return new e.Image.filters.Pixelate(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.RemoveWhite=e.util.createClass(e.Image.filters.BaseFilter,{type:"RemoveWhite",initialize:function(t){t=t||{},this.threshold=t.threshold||30,this.distance=t.distance||20},applyTo:function(t){for(var e,i,r,s=t.getContext("2d"),n=s.getImageData(0,0,t.width,t.height),o=n.data,a=this.threshold,h=this.distance,c=255-a,l=Math.abs,u=0,f=o.length;f>u;u+=4)e=o[u],i=o[u+1],r=o[u+2],e>c&&i>c&&r>c&&l(e-i)<h&&l(e-r)<h&&l(i-r)<h&&(o[u+3]=1);s.putImageData(n,0,0)},toObject:function(){return i(this.callSuper("toObject"),{threshold:this.threshold,distance:this.distance})}}),e.Image.filters.RemoveWhite.fromObject=function(t){return new e.Image.filters.RemoveWhite(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Image.filters.Sepia=e.util.createClass(e.Image.filters.BaseFilter,{type:"Sepia",applyTo:function(t){var e,i,r=t.getContext("2d"),s=r.getImageData(0,0,t.width,t.height),n=s.data,o=n.length;for(e=0;o>e;e+=4)i=.3*n[e]+.59*n[e+1]+.11*n[e+2],n[e]=i+100,n[e+1]=i+50,n[e+2]=i+255;r.putImageData(s,0,0)}}),e.Image.filters.Sepia.fromObject=function(){return new e.Image.filters.Sepia}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={});e.Image.filters.Sepia2=e.util.createClass(e.Image.filters.BaseFilter,{type:"Sepia2",applyTo:function(t){var e,i,r,s,n=t.getContext("2d"),o=n.getImageData(0,0,t.width,t.height),a=o.data,h=a.length;for(e=0;h>e;e+=4)i=a[e],r=a[e+1],s=a[e+2],a[e]=(.393*i+.769*r+.189*s)/1.351,a[e+1]=(.349*i+.686*r+.168*s)/1.203,a[e+2]=(.272*i+.534*r+.131*s)/2.14;n.putImageData(o,0,0)}}),e.Image.filters.Sepia2.fromObject=function(){return new e.Image.filters.Sepia2}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Tint=e.util.createClass(e.Image.filters.BaseFilter,{type:"Tint",initialize:function(t){t=t||{},this.color=t.color||"#000000",this.opacity="undefined"!=typeof t.opacity?t.opacity:new e.Color(this.color).getAlpha()},applyTo:function(t){var i,r,s,n,o,a,h,c,l,u=t.getContext("2d"),f=u.getImageData(0,0,t.width,t.height),d=f.data,g=d.length;for(l=new e.Color(this.color).getSource(),r=l[0]*this.opacity,s=l[1]*this.opacity,n=l[2]*this.opacity,c=1-this.opacity,i=0;g>i;i+=4)o=d[i],a=d[i+1],h=d[i+2],d[i]=r+o*c,d[i+1]=s+a*c,d[i+2]=n+h*c;u.putImageData(f,0,0)},toObject:function(){return i(this.callSuper("toObject"),{color:this.color,opacity:this.opacity})}}),e.Image.filters.Tint.fromObject=function(t){return new e.Image.filters.Tint(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend;e.Image.filters.Multiply=e.util.createClass(e.Image.filters.BaseFilter,{type:"Multiply",initialize:function(t){t=t||{},this.color=t.color||"#000000"},applyTo:function(t){var i,r,s=t.getContext("2d"),n=s.getImageData(0,0,t.width,t.height),o=n.data,a=o.length;for(r=new e.Color(this.color).getSource(),i=0;a>i;i+=4)o[i]*=r[0]/255,o[i+1]*=r[1]/255,o[i+2]*=r[2]/255;s.putImageData(n,0,0)},toObject:function(){return i(this.callSuper("toObject"),{color:this.color})}}),e.Image.filters.Multiply.fromObject=function(t){return new e.Image.filters.Multiply(t)}}("undefined"!=typeof exports?exports:this),function(t){"use strict";var e=t.fabric||(t.fabric={}),i=e.util.object.extend,r=e.util.object.clone,s=e.util.toFixed,n=e.StaticCanvas.supports("setLineDash");if(e.Text)return void e.warn("fabric.Text is already defined");var o=e.Object.prototype.stateProperties.concat();o.push("fontFamily","fontWeight","fontSize","text","textDecoration","textAlign","fontStyle","lineHeight","textBackgroundColor","useNative","path"),e.Text=e.util.createClass(e.Object,{_dimensionAffectingProps:{fontSize:!0,fontWeight:!0,fontFamily:!0,textDecoration:!0,fontStyle:!0,lineHeight:!0,stroke:!0,strokeWidth:!0,text:!0},_reNewline:/\r?\n/,type:"text",fontSize:40,fontWeight:"normal",fontFamily:"Times New Roman",textDecoration:"",textAlign:"left",fontStyle:"",lineHeight:1.3,textBackgroundColor:"",path:null,useNative:!0,stateProperties:o,stroke:null,shadow:null,initialize:function(t,e){e=e||{},this.text=t,this.__skipDimension=!0,this.setOptions(e),this.__skipDimension=!1,this._initDimensions()},_initDimensions:function(){if(!this.__skipDimension){var t=e.util.createCanvasElement();this._render(t.getContext("2d"))}},toString:function(){return"#<fabric.Text ("+this.complexity()+'): { "text": "'+this.text+'", "fontFamily": "'+this.fontFamily+'" }>'},_render:function(t){"undefined"==typeof Cufon||this.useNative===!0?this._renderViaNative(t):this._renderViaCufon(t)},_renderViaNative:function(t){var i=this.text.split(this._reNewline);this._setTextStyles(t),this.width=this._getTextWidth(t,i),this.height=this._getTextHeight(t,i),this.clipTo&&e.util.clipContext(this,t),this._renderTextBackground(t,i),this._translateForTextAlign(t),this._renderText(t,i),"left"!==this.textAlign&&"justify"!==this.textAlign&&t.restore(),this._renderTextDecoration(t,i),this.clipTo&&t.restore(),this._setBoundaries(t,i),this._totalLineHeight=0},_renderText:function(t,e){t.save(),this._setShadow(t),this._renderTextFill(t,e),this._renderTextStroke(t,e),this._removeShadow(t),t.restore()},_translateForTextAlign:function(t){"left"!==this.textAlign&&"justify"!==this.textAlign&&(t.save(),t.translate("center"===this.textAlign?this.width/2:this.width,0))},_setBoundaries:function(t,e){this._boundaries=[];for(var i=0,r=e.length;r>i;i++){var s=this._getLineWidth(t,e[i]),n=this._getLineLeftOffset(s);this._boundaries.push({height:this.fontSize*this.lineHeight,width:s,left:n})}},_setTextStyles:function(t){this._setFillStyles(t),this._setStrokeStyles(t),t.textBaseline="alphabetic",this.skipTextAlign||(t.textAlign=this.textAlign),t.font=this._getFontDeclaration()},_getTextHeight:function(t,e){return this.fontSize*e.length*this.lineHeight},_getTextWidth:function(t,e){for(var i=t.measureText(e[0]||"|").width,r=1,s=e.length;s>r;r++){var n=t.measureText(e[r]).width;n>i&&(i=n)}return i},_renderChars:function(t,e,i,r,s){e[t](i,r,s)},_renderTextLine:function(t,e,i,r,s,n){if(s-=this.fontSize/4,"justify"!==this.textAlign)return void this._renderChars(t,e,i,r,s,n);var o=e.measureText(i).width,a=this.width;if(a>o)for(var h=i.split(/\s+/),c=e.measureText(i.replace(/\s+/g,"")).width,l=a-c,u=h.length-1,f=l/u,d=0,g=0,p=h.length;p>g;g++)this._renderChars(t,e,h[g],r+d,s,n),d+=e.measureText(h[g]).width+f;else this._renderChars(t,e,i,r,s,n)},_getLeftOffset:function(){return e.isLikelyNode?0:-this.width/2},_getTopOffset:function(){return-this.height/2},_renderTextFill:function(t,e){if(this.fill||this._skipFillStrokeCheck){this._boundaries=[];for(var i=0,r=0,s=e.length;s>r;r++){var n=this._getHeightOfLine(t,r,e);i+=n,this._renderTextLine("fillText",t,e[r],this._getLeftOffset(),this._getTopOffset()+i,r)}}},_renderTextStroke:function(t,e){if(this.stroke&&0!==this.strokeWidth||this._skipFillStrokeCheck){var i=0;t.save(),this.strokeDashArray&&(1&this.strokeDashArray.length&&this.strokeDashArray.push.apply(this.strokeDashArray,this.strokeDashArray),n&&t.setLineDash(this.strokeDashArray)),t.beginPath();for(var r=0,s=e.length;s>r;r++){var o=this._getHeightOfLine(t,r,e);i+=o,this._renderTextLine("strokeText",t,e[r],this._getLeftOffset(),this._getTopOffset()+i,r)}t.closePath(),t.restore()}},_getHeightOfLine:function(){return this.fontSize*this.lineHeight},_renderTextBackground:function(t,e){this._renderTextBoxBackground(t),this._renderTextLinesBackground(t,e)},_renderTextBoxBackground:function(t){this.backgroundColor&&(t.save(),t.fillStyle=this.backgroundColor,t.fillRect(this._getLeftOffset(),this._getTopOffset(),this.width,this.height),t.restore())},_renderTextLinesBackground:function(t,e){if(this.textBackgroundColor){t.save(),t.fillStyle=this.textBackgroundColor;for(var i=0,r=e.length;r>i;i++)if(""!==e[i]){var s=this._getLineWidth(t,e[i]),n=this._getLineLeftOffset(s);t.fillRect(this._getLeftOffset()+n,this._getTopOffset()+i*this.fontSize*this.lineHeight,s,this.fontSize*this.lineHeight)}t.restore()}},_getLineLeftOffset:function(t){return"center"===this.textAlign?(this.width-t)/2:"right"===this.textAlign?this.width-t:0},_getLineWidth:function(t,e){return"justify"===this.textAlign?this.width:t.measureText(e).width},_renderTextDecoration:function(t,e){function i(i){for(var n=0,o=e.length;o>n;n++){var a=s._getLineWidth(t,e[n]),h=s._getLineLeftOffset(a);t.fillRect(s._getLeftOffset()+h,~~(i+n*s._getHeightOfLine(t,n,e)-r),a,1)}}if(this.textDecoration){var r=this._getTextHeight(t,e)/2,s=this;this.textDecoration.indexOf("underline")>-1&&i(this.fontSize*this.lineHeight),this.textDecoration.indexOf("line-through")>-1&&i(this.fontSize*this.lineHeight-this.fontSize/2),this.textDecoration.indexOf("overline")>-1&&i(this.fontSize*this.lineHeight-this.fontSize)}},_getFontDeclaration:function(){return[e.isLikelyNode?this.fontWeight:this.fontStyle,e.isLikelyNode?this.fontStyle:this.fontWeight,this.fontSize+"px",e.isLikelyNode?'"'+this.fontFamily+'"':this.fontFamily].join(" ")},render:function(t,e){if(this.visible){t.save(),this._transform(t,e);var i=this.transformMatrix,r=this.group&&"path-group"===this.group.type;r&&t.translate(-this.group.width/2,-this.group.height/2),i&&t.transform(i[0],i[1],i[2],i[3],i[4],i[5]),r&&t.translate(this.left,this.top),this._render(t),t.restore()}},toObject:function(t){var e=i(this.callSuper("toObject",t),{text:this.text,fontSize:this.fontSize,fontWeight:this.fontWeight,fontFamily:this.fontFamily,fontStyle:this.fontStyle,lineHeight:this.lineHeight,textDecoration:this.textDecoration,textAlign:this.textAlign,path:this.path,textBackgroundColor:this.textBackgroundColor,useNative:this.useNative});return this.includeDefaultValues||this._removeDefaultValues(e),e},toSVG:function(t){var e=[],i=this.text.split(this._reNewline),r=this._getSVGLeftTopOffsets(i),s=this._getSVGTextAndBg(r.lineTop,r.textLeft,i),n=this._getSVGShadows(r.lineTop,i);return r.textTop+=this._fontAscent?this._fontAscent/5*this.lineHeight:0,this._wrapSVGTextAndBg(e,s,n,r),t?t(e.join("")):e.join("")},_getSVGLeftTopOffsets:function(t){var e=this.useNative?this.fontSize*this.lineHeight:-this._fontAscent-this._fontAscent/5*this.lineHeight,i=-(this.width/2),r=this.useNative?this.fontSize-1:this.height/2-t.length*this.fontSize-this._totalLineHeight;return{textLeft:i,textTop:r,lineTop:e}},_wrapSVGTextAndBg:function(t,e,i,r){t.push('<g transform="',this.getSvgTransform(),'">',e.textBgRects.join(""),"<text ",this.fontFamily?'font-family="'+this.fontFamily.replace(/"/g,"'")+'" ':"",this.fontSize?'font-size="'+this.fontSize+'" ':"",this.fontStyle?'font-style="'+this.fontStyle+'" ':"",this.fontWeight?'font-weight="'+this.fontWeight+'" ':"",this.textDecoration?'text-decoration="'+this.textDecoration+'" ':"",'style="',this.getSvgStyles(),'" ','transform="translate(',s(r.textLeft,2)," ",s(r.textTop,2),')">',i.join(""),e.textSpans.join(""),"</text>","</g>")},_getSVGShadows:function(t,i){var r,n,o=[],a=1;if(!this.shadow||!this._boundaries)return o;for(r=0,n=i.length;n>r;r++)if(""!==i[r]){var h=this._boundaries&&this._boundaries[r]?this._boundaries[r].left:0;o.push('<tspan x="',s(h+a+this.shadow.offsetX,2),0===r||this.useNative?'" y':'" dy','="',s(this.useNative?t*r-this.height/2+this.shadow.offsetY:t+(0===r?this.shadow.offsetY:0),2),'" ',this._getFillAttributes(this.shadow.color),">",e.util.string.escapeXml(i[r]),"</tspan>"),a=1}else a++;return o},_getSVGTextAndBg:function(t,e,i){var r=[],s=[],n=1;this._setSVGBg(s);for(var o=0,a=i.length;a>o;o++)""!==i[o]?(this._setSVGTextLineText(i[o],o,r,t,n,s),n=1):n++,this.textBackgroundColor&&this._boundaries&&this._setSVGTextLineBg(s,o,e,t);return{textSpans:r,textBgRects:s}},_setSVGTextLineText:function(t,i,r,n,o){var a=this._boundaries&&this._boundaries[i]?s(this._boundaries[i].left,2):0;r.push('<tspan x="',a,'" ',0===i||this.useNative?"y":"dy",'="',s(this.useNative?n*i-this.height/2:n*o,2),'" ',this._getFillAttributes(this.fill),">",e.util.string.escapeXml(t),"</tspan>")},_setSVGTextLineBg:function(t,e,i,r){t.push("<rect ",this._getFillAttributes(this.textBackgroundColor),' x="',s(i+this._boundaries[e].left,2),'" y="',s(r*e-this.height/2,2),'" width="',s(this._boundaries[e].width,2),'" height="',s(this._boundaries[e].height,2),'"></rect>')},_setSVGBg:function(t){this.backgroundColor&&this._boundaries&&t.push("<rect ",this._getFillAttributes(this.backgroundColor),' x="',s(-this.width/2,2),'" y="',s(-this.height/2,2),'" width="',s(this.width,2),'" height="',s(this.height,2),'"></rect>')},_getFillAttributes:function(t){var i=t&&"string"==typeof t?new e.Color(t):"";return i&&i.getSource()&&1!==i.getAlpha()?'opacity="'+i.getAlpha()+'" fill="'+i.setAlpha(1).toRgb()+'"':'fill="'+t+'"'},_set:function(t,e){"fontFamily"===t&&this.path&&(this.path=this.path.replace(/(.*?)([^\/]*)(\.font\.js)/,"$1"+e+"$3")),this.callSuper("_set",t,e),t in this._dimensionAffectingProps&&(this._initDimensions(),this.setCoords())},complexity:function(){return 1}}),e.Text.ATTRIBUTE_NAMES=e.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")),e.Text.DEFAULT_SVG_FONT_SIZE=16,e.Text.fromElement=function(t,i){if(!t)return null;var r=e.parseAttributes(t,e.Text.ATTRIBUTE_NAMES);i=e.util.object.extend(i?e.util.object.clone(i):{},r),"dx"in r&&(i.left+=r.dx),"dy"in r&&(i.top+=r.dy),"fontSize"in i||(i.fontSize=e.Text.DEFAULT_SVG_FONT_SIZE),i.originX||(i.originX="left");var s=new e.Text(t.textContent,i),n=0;return"left"===s.originX&&(n=s.getWidth()/2),"right"===s.originX&&(n=-s.getWidth()/2),s.set({left:s.getLeft()+n,top:s.getTop()-s.getHeight()/2}),s},e.Text.fromObject=function(t){return new e.Text(t.text,r(t))},e.util.createAccessors(e.Text)}("undefined"!=typeof exports?exports:this),function(){var t=fabric.util.object.clone;fabric.IText=fabric.util.createClass(fabric.Text,fabric.Observable,{type:"i-text",selectionStart:0,selectionEnd:0,selectionColor:"rgba(17,119,255,0.3)",isEditing:!1,editable:!0,editingBorderColor:"rgba(102,153,255,0.25)",cursorWidth:2,cursorColor:"#333",cursorDelay:1e3,cursorDuration:600,styles:null,caching:!0,_skipFillStrokeCheck:!0,_reSpace:/\s|\n/,_fontSizeFraction:4,_currentCursorOpacity:0,_selectionDirection:null,_abortCursorAnimation:!1,_charWidthsCache:{},initialize:function(t,e){this.styles=e?e.styles||{}:{},this.callSuper("initialize",t,e),this.initBehavior(),fabric.IText.instances.push(this),this.__lineWidths={},this.__lineHeights={},this.__lineOffsets={}},isEmptyStyles:function(){if(!this.styles)return!0;var t=this.styles;for(var e in t)for(var i in t[e])for(var r in t[e][i])return!1;return!0},setSelectionStart:function(t){this.selectionStart!==t&&(this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this})),this.selectionStart=t,this.hiddenTextarea&&(this.hiddenTextarea.selectionStart=t)},setSelectionEnd:function(t){this.selectionEnd!==t&&(this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this})),this.selectionEnd=t,this.hiddenTextarea&&(this.hiddenTextarea.selectionEnd=t)},getSelectionStyles:function(t,e){if(2===arguments.length){for(var i=[],r=t;e>r;r++)i.push(this.getSelectionStyles(r));return i}var s=this.get2DCursorLocation(t);return this.styles[s.lineIndex]?this.styles[s.lineIndex][s.charIndex]||{}:{}},setSelectionStyles:function(t){if(this.selectionStart===this.selectionEnd)this._extendStyles(this.selectionStart,t);else for(var e=this.selectionStart;e<this.selectionEnd;e++)this._extendStyles(e,t);return this},_extendStyles:function(t,e){var i=this.get2DCursorLocation(t);this.styles[i.lineIndex]||(this.styles[i.lineIndex]={}),this.styles[i.lineIndex][i.charIndex]||(this.styles[i.lineIndex][i.charIndex]={}),fabric.util.object.extend(this.styles[i.lineIndex][i.charIndex],e)},_render:function(t){this.callSuper("_render",t),this.ctx=t,this.isEditing&&this.renderCursorOrSelection()},renderCursorOrSelection:function(){if(this.active){var t,e=this.text.split("");this.selectionStart===this.selectionEnd?(t=this._getCursorBoundaries(e,"cursor"),this.renderCursor(t)):(t=this._getCursorBoundaries(e,"selection"),this.renderSelection(e,t))}},get2DCursorLocation:function(t){"undefined"==typeof t&&(t=this.selectionStart);var e=this.text.slice(0,t),i=e.split(this._reNewline);return{lineIndex:i.length-1,charIndex:i[i.length-1].length}},getCurrentCharStyle:function(t,e){var i=this.styles[t]&&this.styles[t][0===e?0:e-1];return{fontSize:i&&i.fontSize||this.fontSize,fill:i&&i.fill||this.fill,textBackgroundColor:i&&i.textBackgroundColor||this.textBackgroundColor,textDecoration:i&&i.textDecoration||this.textDecoration,fontFamily:i&&i.fontFamily||this.fontFamily,fontWeight:i&&i.fontWeight||this.fontWeight,fontStyle:i&&i.fontStyle||this.fontStyle,stroke:i&&i.stroke||this.stroke,strokeWidth:i&&i.strokeWidth||this.strokeWidth}},getCurrentCharFontSize:function(t,e){return this.styles[t]&&this.styles[t][0===e?0:e-1]&&this.styles[t][0===e?0:e-1].fontSize||this.fontSize},getCurrentCharColor:function(t,e){return this.styles[t]&&this.styles[t][0===e?0:e-1]&&this.styles[t][0===e?0:e-1].fill||this.cursorColor},_getCursorBoundaries:function(t,e){var i=this.get2DCursorLocation(),r=this.text.split(this._reNewline),s=Math.round(this._getLeftOffset()),n=-this.height/2,o=this._getCursorBoundariesOffsets(t,e,i,r);return{left:s,top:n,leftOffset:o.left+o.lineLeft,topOffset:o.top}},_getCursorBoundariesOffsets:function(t,e,i,r){for(var s=0,n=0,o=0,a=0,h="cursor"===e?this._getHeightOfLine(this.ctx,0)-this.getCurrentCharFontSize(i.lineIndex,i.charIndex):0,c=0;c<this.selectionStart;c++){if("\n"===t[c]){a=0;var l=n+("cursor"===e?1:0);h+=this._getCachedLineHeight(l),n++,o=0}else a+=this._getWidthOfChar(this.ctx,t[c],n,o),o++;s=this._getCachedLineOffset(n,r)}return this._clearCache(),{top:h,left:a,lineLeft:s}},_clearCache:function(){this.__lineWidths={},this.__lineHeights={},this.__lineOffsets={}},_getCachedLineHeight:function(t){return this.__lineHeights[t]||(this.__lineHeights[t]=this._getHeightOfLine(this.ctx,t))},_getCachedLineWidth:function(t,e){return this.__lineWidths[t]||(this.__lineWidths[t]=this._getWidthOfLine(this.ctx,t,e))},_getCachedLineOffset:function(t,e){var i=this._getCachedLineWidth(t,e);return this.__lineOffsets[t]||(this.__lineOffsets[t]=this._getLineLeftOffset(i))},renderCursor:function(t){var e=this.ctx;e.save();var i=this.get2DCursorLocation(),r=i.lineIndex,s=i.charIndex,n=this.getCurrentCharFontSize(r,s),o=0===r&&0===s?this._getCachedLineOffset(r,this.text.split(this._reNewline)):t.leftOffset;e.fillStyle=this.getCurrentCharColor(r,s),e.globalAlpha=this.__isMousedown?1:this._currentCursorOpacity,e.fillRect(t.left+o,t.top+t.topOffset,this.cursorWidth/this.scaleX,n),e.restore()},renderSelection:function(t,e){var i=this.ctx;i.save(),i.fillStyle=this.selectionColor;for(var r=this.get2DCursorLocation(this.selectionStart),s=this.get2DCursorLocation(this.selectionEnd),n=r.lineIndex,o=s.lineIndex,a=this.text.split(this._reNewline),h=n;o>=h;h++){var c=this._getCachedLineOffset(h,a)||0,l=this._getCachedLineHeight(h),u=0;if(h===n)for(var f=0,d=a[h].length;d>f;f++)f>=r.charIndex&&(h!==o||f<s.charIndex)&&(u+=this._getWidthOfChar(i,a[h][f],h,f)),f<r.charIndex&&(c+=this._getWidthOfChar(i,a[h][f],h,f));else if(h>n&&o>h)u+=this._getCachedLineWidth(h,a)||5;else if(h===o)for(var g=0,p=s.charIndex;p>g;g++)u+=this._getWidthOfChar(i,a[h][g],h,g);i.fillRect(e.left+c,e.top+e.topOffset,u,l),e.topOffset+=l}i.restore()},_renderChars:function(t,e,i,r,s,n){if(this.isEmptyStyles())return this._renderCharsFast(t,e,i,r,s);this.skipTextAlign=!0,r-="center"===this.textAlign?this.width/2:"right"===this.textAlign?this.width:0;var o,a=this.text.split(this._reNewline),h=this._getWidthOfLine(e,n,a),c=this._getHeightOfLine(e,n,a),l=this._getLineLeftOffset(h),u=i.split(""),f="";r+=l||0,e.save();for(var d=0,g=u.length;g>=d;d++){o=o||this.getCurrentCharStyle(n,d);var p=this.getCurrentCharStyle(n,d+1);(this._hasStyleChanged(o,p)||d===g)&&(this._renderChar(t,e,n,d-1,f,r,s,c),f="",o=p),f+=u[d]}e.restore()},_renderCharsFast:function(t,e,i,r,s){this.skipTextAlign=!1,"fillText"===t&&this.fill&&this.callSuper("_renderChars",t,e,i,r,s),"strokeText"===t&&this.stroke&&this.callSuper("_renderChars",t,e,i,r,s)},_renderChar:function(t,e,i,r,s,n,o,a){var h,c,l;if(this.styles&&this.styles[i]&&(h=this.styles[i][r])){var u=h.stroke||this.stroke,f=h.fill||this.fill;e.save(),c=this._applyCharStylesGetWidth(e,s,i,r,h),l=this._getHeightOfChar(e,s,i,r),f&&e.fillText(s,n,o),u&&e.strokeText(s,n,o),this._renderCharDecoration(e,h,n,o,c,a,l),e.restore(),e.translate(c,0)}else"strokeText"===t&&this.stroke&&e[t](s,n,o),"fillText"===t&&this.fill&&e[t](s,n,o),c=this._applyCharStylesGetWidth(e,s,i,r),this._renderCharDecoration(e,null,n,o,c,a),e.translate(e.measureText(s).width,0)},_hasStyleChanged:function(t,e){return t.fill!==e.fill||t.fontSize!==e.fontSize||t.textBackgroundColor!==e.textBackgroundColor||t.textDecoration!==e.textDecoration||t.fontFamily!==e.fontFamily||t.fontWeight!==e.fontWeight||t.fontStyle!==e.fontStyle||t.stroke!==e.stroke||t.strokeWidth!==e.strokeWidth},_renderCharDecoration:function(t,e,i,r,s,n,o){var a=e?e.textDecoration||this.textDecoration:this.textDecoration,h=(e?e.fontSize:null)||this.fontSize;a&&(a.indexOf("underline")>-1&&this._renderCharDecorationAtOffset(t,i,r+this.fontSize/this._fontSizeFraction,s,0,this.fontSize/20),a.indexOf("line-through")>-1&&this._renderCharDecorationAtOffset(t,i,r+this.fontSize/this._fontSizeFraction,s,o/2,h/20),a.indexOf("overline")>-1&&this._renderCharDecorationAtOffset(t,i,r,s,n-this.fontSize/this._fontSizeFraction,this.fontSize/20))},_renderCharDecorationAtOffset:function(t,e,i,r,s,n){t.fillRect(e,i-s,r,n)},_renderTextLine:function(t,e,i,r,s,n){s+=this.fontSize/4,this.callSuper("_renderTextLine",t,e,i,r,s,n)},_renderTextDecoration:function(t,e){return this.isEmptyStyles()?this.callSuper("_renderTextDecoration",t,e):void 0},_renderTextLinesBackground:function(t,e){if(this.textBackgroundColor||this.styles){t.save(),this.textBackgroundColor&&(t.fillStyle=this.textBackgroundColor);for(var i=0,r=this.fontSize/this._fontSizeFraction,s=0,n=e.length;n>s;s++){var o=this._getHeightOfLine(t,s,e);if(""!==e[s]){var a=this._getWidthOfLine(t,s,e),h=this._getLineLeftOffset(a);if(this.textBackgroundColor&&(t.fillStyle=this.textBackgroundColor,t.fillRect(this._getLeftOffset()+h,this._getTopOffset()+i+r,a,o)),this.styles[s])for(var c=0,l=e[s].length;l>c;c++)if(this.styles[s]&&this.styles[s][c]&&this.styles[s][c].textBackgroundColor){var u=e[s][c];t.fillStyle=this.styles[s][c].textBackgroundColor,t.fillRect(this._getLeftOffset()+h+this._getWidthOfCharsAt(t,s,c,e),this._getTopOffset()+i+r,this._getWidthOfChar(t,u,s,c,e)+1,o)}i+=o}else i+=o}t.restore()}},_getCacheProp:function(t,e){return t+e.fontFamily+e.fontSize+e.fontWeight+e.fontStyle+e.shadow},_applyCharStylesGetWidth:function(e,i,r,s,n){var o=n||this.styles[r]&&this.styles[r][s];o=o?t(o):{},this._applyFontStyles(o);var a=this._getCacheProp(i,o);if(this.isEmptyStyles()&&this._charWidthsCache[a]&&this.caching)return this._charWidthsCache[a];"string"==typeof o.shadow&&(o.shadow=new fabric.Shadow(o.shadow));var h=o.fill||this.fill;return e.fillStyle=h.toLive?h.toLive(e):h,o.stroke&&(e.strokeStyle=o.stroke&&o.stroke.toLive?o.stroke.toLive(e):o.stroke),e.lineWidth=o.strokeWidth||this.strokeWidth,e.font=this._getFontDeclaration.call(o),this._setShadow.call(o,e),this.caching?(this._charWidthsCache[a]||(this._charWidthsCache[a]=e.measureText(i).width),this._charWidthsCache[a]):e.measureText(i).width},_applyFontStyles:function(t){t.fontFamily||(t.fontFamily=this.fontFamily),t.fontSize||(t.fontSize=this.fontSize),t.fontWeight||(t.fontWeight=this.fontWeight),t.fontStyle||(t.fontStyle=this.fontStyle)},_getStyleDeclaration:function(e,i){return this.styles[e]&&this.styles[e][i]?t(this.styles[e][i]):{}},_getWidthOfChar:function(t,e,i,r){var s=this._getStyleDeclaration(i,r);this._applyFontStyles(s);var n=this._getCacheProp(e,s);if(this._charWidthsCache[n]&&this.caching)return this._charWidthsCache[n];if(t){t.save();var o=this._applyCharStylesGetWidth(t,e,i,r);return t.restore(),o}},_getHeightOfChar:function(t,e,i,r){return this.styles[i]&&this.styles[i][r]?this.styles[i][r].fontSize||this.fontSize:this.fontSize},_getWidthOfCharAt:function(t,e,i,r){r=r||this.text.split(this._reNewline);var s=r[e].split("")[i];return this._getWidthOfChar(t,s,e,i)},_getHeightOfCharAt:function(t,e,i,r){r=r||this.text.split(this._reNewline);var s=r[e].split("")[i];return this._getHeightOfChar(t,s,e,i)},_getWidthOfCharsAt:function(t,e,i,r){for(var s=0,n=0;i>n;n++)s+=this._getWidthOfCharAt(t,e,n,r);return s},_getWidthOfLine:function(t,e,i){return this._getWidthOfCharsAt(t,e,i[e].length,i)},_getTextWidth:function(t,e){if(this.isEmptyStyles())return this.callSuper("_getTextWidth",t,e);for(var i=this._getWidthOfLine(t,0,e),r=1,s=e.length;s>r;r++){var n=this._getWidthOfLine(t,r,e);n>i&&(i=n)}return i},_getHeightOfLine:function(t,e,i){i=i||this.text.split(this._reNewline);for(var r=this._getHeightOfChar(t,i[e][0],e,0),s=i[e],n=s.split(""),o=1,a=n.length;a>o;o++){var h=this._getHeightOfChar(t,n[o],e,o);h>r&&(r=h)}return r*this.lineHeight},_getTextHeight:function(t,e){for(var i=0,r=0,s=e.length;s>r;r++)i+=this._getHeightOfLine(t,r,e);return i},_getTopOffset:function(){var t=fabric.Text.prototype._getTopOffset.call(this);return t-this.fontSize/this._fontSizeFraction},_renderTextBoxBackground:function(t){this.backgroundColor&&(t.save(),t.fillStyle=this.backgroundColor,t.fillRect(this._getLeftOffset(),this._getTopOffset()+this.fontSize/this._fontSizeFraction,this.width,this.height),t.restore())},toObject:function(e){return fabric.util.object.extend(this.callSuper("toObject",e),{styles:t(this.styles)})}}),fabric.IText.fromObject=function(e){return new fabric.IText(e.text,t(e))},fabric.IText.instances=[]}(),function(){var t=fabric.util.object.clone;fabric.util.object.extend(fabric.IText.prototype,{initBehavior:function(){this.initAddedHandler(),this.initCursorSelectionHandlers(),this.initDoubleClickSimulation()},initSelectedHandler:function(){this.on("selected",function(){var t=this;setTimeout(function(){t.selected=!0},100)})},initAddedHandler:function(){this.on("added",function(){this.canvas&&!this.canvas._hasITextHandlers&&(this.canvas._hasITextHandlers=!0,this._initCanvasHandlers())})},_initCanvasHandlers:function(){this.canvas.on("selection:cleared",function(){fabric.IText.prototype.exitEditingOnOthers.call()}),this.canvas.on("mouse:up",function(){fabric.IText.instances.forEach(function(t){t.__isMousedown=!1})}),this.canvas.on("object:selected",function(t){fabric.IText.prototype.exitEditingOnOthers.call(t.target)})},_tick:function(){var t=this;this._abortCursorAnimation||this.animate("_currentCursorOpacity",1,{duration:this.cursorDuration,onComplete:function(){t._onTickComplete()},onChange:function(){t.canvas&&t.canvas.renderAll()
},abort:function(){return t._abortCursorAnimation}})},_onTickComplete:function(){if(!this._abortCursorAnimation){var t=this;this._cursorTimeout1&&clearTimeout(this._cursorTimeout1),this._cursorTimeout1=setTimeout(function(){t.animate("_currentCursorOpacity",0,{duration:this.cursorDuration/2,onComplete:function(){t._tick()},onChange:function(){t.canvas&&t.canvas.renderAll()},abort:function(){return t._abortCursorAnimation}})},100)}},initDelayedCursor:function(t){var e=this,i=t?0:this.cursorDelay;t&&(this._abortCursorAnimation=!0,clearTimeout(this._cursorTimeout1),this._currentCursorOpacity=1,this.canvas&&this.canvas.renderAll()),this._cursorTimeout2&&clearTimeout(this._cursorTimeout2),this._cursorTimeout2=setTimeout(function(){e._abortCursorAnimation=!1,e._tick()},i)},abortCursorAnimation:function(){this._abortCursorAnimation=!0,clearTimeout(this._cursorTimeout1),clearTimeout(this._cursorTimeout2),this._currentCursorOpacity=0,this.canvas&&this.canvas.renderAll();var t=this;setTimeout(function(){t._abortCursorAnimation=!1},10)},selectAll:function(){this.selectionStart=0,this.selectionEnd=this.text.length,this.fire("selection:changed"),this.canvas&&this.canvas.fire("text:selection:changed",{target:this})},getSelectedText:function(){return this.text.slice(this.selectionStart,this.selectionEnd)},findWordBoundaryLeft:function(t){var e=0,i=t-1;if(this._reSpace.test(this.text.charAt(i)))for(;this._reSpace.test(this.text.charAt(i));)e++,i--;for(;/\S/.test(this.text.charAt(i))&&i>-1;)e++,i--;return t-e},findWordBoundaryRight:function(t){var e=0,i=t;if(this._reSpace.test(this.text.charAt(i)))for(;this._reSpace.test(this.text.charAt(i));)e++,i++;for(;/\S/.test(this.text.charAt(i))&&i<this.text.length;)e++,i++;return t+e},findLineBoundaryLeft:function(t){for(var e=0,i=t-1;!/\n/.test(this.text.charAt(i))&&i>-1;)e++,i--;return t-e},findLineBoundaryRight:function(t){for(var e=0,i=t;!/\n/.test(this.text.charAt(i))&&i<this.text.length;)e++,i++;return t+e},getNumNewLinesInSelectedText:function(){for(var t=this.getSelectedText(),e=0,i=0,r=t.split(""),s=r.length;s>i;i++)"\n"===r[i]&&e++;return e},searchWordBoundary:function(t,e){for(var i=this._reSpace.test(this.text.charAt(t))?t-1:t,r=this.text.charAt(i),s=/[ \n\.,;!\?\-]/;!s.test(r)&&i>0&&i<this.text.length;)i+=e,r=this.text.charAt(i);return s.test(r)&&"\n"!==r&&(i+=1===e?0:1),i},selectWord:function(t){var e=this.searchWordBoundary(t,-1),i=this.searchWordBoundary(t,1);this.setSelectionStart(e),this.setSelectionEnd(i),this.initDelayedCursor(!0)},selectLine:function(t){var e=this.findLineBoundaryLeft(t),i=this.findLineBoundaryRight(t);this.setSelectionStart(e),this.setSelectionEnd(i),this.initDelayedCursor(!0)},enterEditing:function(){return!this.isEditing&&this.editable?(this.exitEditingOnOthers(),this.isEditing=!0,this.initHiddenTextarea(),this._updateTextarea(),this._saveEditingProps(),this._setEditingProps(),this._tick(),this.canvas&&this.canvas.renderAll(),this.fire("editing:entered"),this.canvas&&this.canvas.fire("text:editing:entered",{target:this}),this):void 0},exitEditingOnOthers:function(){fabric.IText.instances.forEach(function(t){t.selected=!1,t.isEditing&&t.exitEditing()},this)},_setEditingProps:function(){this.hoverCursor="text",this.canvas&&(this.canvas.defaultCursor=this.canvas.moveCursor="text"),this.borderColor=this.editingBorderColor,this.hasControls=this.selectable=!1,this.lockMovementX=this.lockMovementY=!0},_updateTextarea:function(){this.hiddenTextarea&&(this.hiddenTextarea.value=this.text,this.hiddenTextarea.selectionStart=this.selectionStart)},_saveEditingProps:function(){this._savedProps={hasControls:this.hasControls,borderColor:this.borderColor,lockMovementX:this.lockMovementX,lockMovementY:this.lockMovementY,hoverCursor:this.hoverCursor,defaultCursor:this.canvas&&this.canvas.defaultCursor,moveCursor:this.canvas&&this.canvas.moveCursor}},_restoreEditingProps:function(){this._savedProps&&(this.hoverCursor=this._savedProps.overCursor,this.hasControls=this._savedProps.hasControls,this.borderColor=this._savedProps.borderColor,this.lockMovementX=this._savedProps.lockMovementX,this.lockMovementY=this._savedProps.lockMovementY,this.canvas&&(this.canvas.defaultCursor=this._savedProps.defaultCursor,this.canvas.moveCursor=this._savedProps.moveCursor))},exitEditing:function(){return this.selected=!1,this.isEditing=!1,this.selectable=!0,this.selectionEnd=this.selectionStart,this.hiddenTextarea&&this.canvas&&this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea),this.hiddenTextarea=null,this.abortCursorAnimation(),this._restoreEditingProps(),this._currentCursorOpacity=0,this.fire("editing:exited"),this.canvas&&this.canvas.fire("text:editing:exited",{target:this}),this},_removeExtraneousStyles:function(){var t=this.text.split(this._reNewline);for(var e in this.styles)t[e]||delete this.styles[e]},_removeCharsFromTo:function(t,e){for(var i=e;i!==t;){var r=this.get2DCursorLocation(i).charIndex;i--;var s=this.get2DCursorLocation(i).charIndex,n=s>r;n?this.removeStyleObject(n,i+1):this.removeStyleObject(0===this.get2DCursorLocation(i).charIndex,i)}this.text=this.text.slice(0,t)+this.text.slice(e)},insertChars:function(t){var e="\n"===this.text.slice(this.selectionStart,this.selectionStart+1);this.text=this.text.slice(0,this.selectionStart)+t+this.text.slice(this.selectionEnd),this.selectionStart===this.selectionEnd&&this.insertStyleObjects(t,e,this.copiedStyles),this.selectionStart+=t.length,this.selectionEnd=this.selectionStart,this.canvas&&this.canvas.renderAll().renderAll(),this.setCoords(),this.fire("changed"),this.canvas&&this.canvas.fire("text:changed",{target:this})},insertNewlineStyleObject:function(e,i,r){this.shiftLineStyles(e,1),this.styles[e+1]||(this.styles[e+1]={});var s=this.styles[e][i-1],n={};if(r)n[0]=t(s),this.styles[e+1]=n;else{for(var o in this.styles[e])parseInt(o,10)>=i&&(n[parseInt(o,10)-i]=this.styles[e][o],delete this.styles[e][o]);this.styles[e+1]=n}},insertCharStyleObject:function(e,i,r){var s=this.styles[e],n=t(s);0!==i||r||(i=1);for(var o in n){var a=parseInt(o,10);a>=i&&(s[a+1]=n[a])}this.styles[e][i]=r||t(s[i-1])},insertStyleObjects:function(t,e,i){if(!this.isEmptyStyles()){var r=this.get2DCursorLocation(),s=r.lineIndex,n=r.charIndex;this.styles[s]||(this.styles[s]={}),"\n"===t?this.insertNewlineStyleObject(s,n,e):i?this._insertStyles(i):this.insertCharStyleObject(s,n)}},_insertStyles:function(t){for(var e=0,i=t.length;i>e;e++){var r=this.get2DCursorLocation(this.selectionStart+e),s=r.lineIndex,n=r.charIndex;this.insertCharStyleObject(s,n,t[e])}},shiftLineStyles:function(e,i){var r=t(this.styles);for(var s in this.styles){var n=parseInt(s,10);n>e&&(this.styles[n+i]=r[n])}},removeStyleObject:function(e,i){var r=this.get2DCursorLocation(i),s=r.lineIndex,n=r.charIndex;if(e){var o=this.text.split(this._reNewline),a=o[s-1],h=a?a.length:0;this.styles[s-1]||(this.styles[s-1]={});for(n in this.styles[s])this.styles[s-1][parseInt(n,10)+h]=this.styles[s][n];this.shiftLineStyles(s,-1)}else{var c=this.styles[s];if(c){var l=this.selectionStart===this.selectionEnd?-1:0;delete c[n+l]}var u=t(c);for(var f in u){var d=parseInt(f,10);d>=n&&0!==d&&(c[d-1]=u[d],delete c[d])}}},insertNewline:function(){this.insertChars("\n")}})}(),fabric.util.object.extend(fabric.IText.prototype,{initDoubleClickSimulation:function(){this.__lastClickTime=+new Date,this.__lastLastClickTime=+new Date,this.__lastPointer={},this.on("mousedown",this.onMouseDown.bind(this))},onMouseDown:function(t){this.__newClickTime=+new Date;var e=this.canvas.getPointer(t.e);this.isTripleClick(e)?(this.fire("tripleclick",t),this._stopEvent(t.e)):this.isDoubleClick(e)&&(this.fire("dblclick",t),this._stopEvent(t.e)),this.__lastLastClickTime=this.__lastClickTime,this.__lastClickTime=this.__newClickTime,this.__lastPointer=e,this.__lastIsEditing=this.isEditing,this.__lastSelected=this.selected},isDoubleClick:function(t){return this.__newClickTime-this.__lastClickTime<500&&this.__lastPointer.x===t.x&&this.__lastPointer.y===t.y&&this.__lastIsEditing},isTripleClick:function(t){return this.__newClickTime-this.__lastClickTime<500&&this.__lastClickTime-this.__lastLastClickTime<500&&this.__lastPointer.x===t.x&&this.__lastPointer.y===t.y},_stopEvent:function(t){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation()},initCursorSelectionHandlers:function(){this.initSelectedHandler(),this.initMousedownHandler(),this.initMousemoveHandler(),this.initMouseupHandler(),this.initClicks()},initClicks:function(){this.on("dblclick",function(t){this.selectWord(this.getSelectionStartFromPointer(t.e))}),this.on("tripleclick",function(t){this.selectLine(this.getSelectionStartFromPointer(t.e))})},initMousedownHandler:function(){this.on("mousedown",function(t){var e=this.canvas.getPointer(t.e);this.__mousedownX=e.x,this.__mousedownY=e.y,this.__isMousedown=!0,this.hiddenTextarea&&this.canvas&&this.canvas.wrapperEl.appendChild(this.hiddenTextarea),this.selected&&this.setCursorByClick(t.e),this.isEditing&&(this.__selectionStartOnMouseDown=this.selectionStart,this.initDelayedCursor(!0))})},initMousemoveHandler:function(){this.on("mousemove",function(t){if(this.__isMousedown&&this.isEditing){var e=this.getSelectionStartFromPointer(t.e);e>=this.__selectionStartOnMouseDown?(this.setSelectionStart(this.__selectionStartOnMouseDown),this.setSelectionEnd(e)):(this.setSelectionStart(e),this.setSelectionEnd(this.__selectionStartOnMouseDown))}})},_isObjectMoved:function(t){var e=this.canvas.getPointer(t);return this.__mousedownX!==e.x||this.__mousedownY!==e.y},initMouseupHandler:function(){this.on("mouseup",function(t){this.__isMousedown=!1,this._isObjectMoved(t.e)||(this.__lastSelected&&(this.enterEditing(),this.initDelayedCursor(!0)),this.selected=!0)})},setCursorByClick:function(t){var e=this.getSelectionStartFromPointer(t);t.shiftKey?e<this.selectionStart?(this.setSelectionEnd(this.selectionStart),this.setSelectionStart(e)):this.setSelectionEnd(e):(this.setSelectionStart(e),this.setSelectionEnd(e))},_getLocalRotatedPointer:function(t){var e=this.canvas.getPointer(t),i=new fabric.Point(e.x,e.y),r=new fabric.Point(this.left,this.top),s=fabric.util.rotatePoint(i,r,fabric.util.degreesToRadians(-this.angle));return this.getLocalPointer(t,s)},getSelectionStartFromPointer:function(t){for(var e,i=this._getLocalRotatedPointer(t),r=this.text.split(this._reNewline),s=0,n=0,o=0,a=0,h=0,c=r.length;c>h;h++){o+=this._getHeightOfLine(this.ctx,h)*this.scaleY;var l=this._getWidthOfLine(this.ctx,h,r),u=this._getLineLeftOffset(l);n=u*this.scaleX,this.flipX&&(r[h]=r[h].split("").reverse().join(""));for(var f=0,d=r[h].length;d>f;f++){var g=r[h][f];if(s=n,n+=this._getWidthOfChar(this.ctx,g,h,this.flipX?d-f:f)*this.scaleX,!(o<=i.y||n<=i.x))return this._getNewSelectionStartFromOffset(i,s,n,a+h,d);a++}if(i.y<o)return this._getNewSelectionStartFromOffset(i,s,n,a+h,d,f)}return"undefined"==typeof e?this.text.length:void 0},_getNewSelectionStartFromOffset:function(t,e,i,r,s,n){var o=t.x-e,a=i-t.x,h=a>o?0:1,c=r+h;return this.flipX&&(c=s-c),c>this.text.length&&(c=this.text.length),n===s&&c--,c}}),fabric.util.object.extend(fabric.IText.prototype,{initHiddenTextarea:function(){this.hiddenTextarea=fabric.document.createElement("textarea"),this.hiddenTextarea.setAttribute("autocapitalize","off"),this.hiddenTextarea.style.cssText="position: absolute; top: 0; left: -9999px",fabric.document.body.appendChild(this.hiddenTextarea),fabric.util.addListener(this.hiddenTextarea,"keydown",this.onKeyDown.bind(this)),fabric.util.addListener(this.hiddenTextarea,"keypress",this.onKeyPress.bind(this)),fabric.util.addListener(this.hiddenTextarea,"copy",this.copy.bind(this)),fabric.util.addListener(this.hiddenTextarea,"paste",this.paste.bind(this)),!this._clickHandlerInitialized&&this.canvas&&(fabric.util.addListener(this.canvas.upperCanvasEl,"click",this.onClick.bind(this)),this._clickHandlerInitialized=!0)},_keysMap:{8:"removeChars",13:"insertNewline",37:"moveCursorLeft",38:"moveCursorUp",39:"moveCursorRight",40:"moveCursorDown",46:"forwardDelete"},_ctrlKeysMap:{65:"selectAll",88:"cut"},onClick:function(){this.hiddenTextarea&&this.hiddenTextarea.focus()},onKeyDown:function(t){if(this.isEditing){if(t.keyCode in this._keysMap)this[this._keysMap[t.keyCode]](t);else{if(!(t.keyCode in this._ctrlKeysMap&&(t.ctrlKey||t.metaKey)))return;this[this._ctrlKeysMap[t.keyCode]](t)}t.stopPropagation(),this.canvas&&this.canvas.renderAll()}},forwardDelete:function(t){this.selectionStart===this.selectionEnd&&this.moveCursorRight(t),this.removeChars(t)},copy:function(t){var e=this.getSelectedText(),i=this._getClipboardData(t);i&&i.setData("text",e),this.copiedText=e,this.copiedStyles=this.getSelectionStyles(this.selectionStart,this.selectionEnd)},paste:function(t){var e=null,i=this._getClipboardData(t);e=i?i.getData("text"):this.copiedText,e&&this.insertChars(e)},cut:function(t){this.selectionStart!==this.selectionEnd&&(this.copy(),this.removeChars(t))},_getClipboardData:function(t){return t&&(t.clipboardData||fabric.window.clipboardData)},onKeyPress:function(t){!this.isEditing||t.metaKey||t.ctrlKey||8===t.keyCode||13===t.keyCode||(this.insertChars(String.fromCharCode(t.which)),t.stopPropagation())},getDownCursorOffset:function(t,e){var i,r,s=e?this.selectionEnd:this.selectionStart,n=this.text.split(this._reNewline),o=this.text.slice(0,s),a=this.text.slice(s),h=o.slice(o.lastIndexOf("\n")+1),c=a.match(/(.*)\n?/)[1],l=(a.match(/.*\n(.*)\n?/)||{})[1]||"",u=this.get2DCursorLocation(s);if(u.lineIndex===n.length-1||t.metaKey)return this.text.length-s;var f=this._getWidthOfLine(this.ctx,u.lineIndex,n);r=this._getLineLeftOffset(f);for(var d=r,g=u.lineIndex,p=0,v=h.length;v>p;p++)i=h[p],d+=this._getWidthOfChar(this.ctx,i,g,p);var b=this._getIndexOnNextLine(u,l,d,n);return c.length+1+b},_getIndexOnNextLine:function(t,e,i,r){for(var s,n=t.lineIndex+1,o=this._getWidthOfLine(this.ctx,n,r),a=this._getLineLeftOffset(o),h=a,c=0,l=0,u=e.length;u>l;l++){var f=e[l],d=this._getWidthOfChar(this.ctx,f,n,l);if(h+=d,h>i){s=!0;var g=h-d,p=h,v=Math.abs(g-i),b=Math.abs(p-i);c=v>b?l+1:l;break}}return s||(c=e.length),c},moveCursorDown:function(t){this.abortCursorAnimation(),this._currentCursorOpacity=1;var e=this.getDownCursorOffset(t,"right"===this._selectionDirection);t.shiftKey?this.moveCursorDownWithShift(e):this.moveCursorDownWithoutShift(e),this.initDelayedCursor()},moveCursorDownWithoutShift:function(t){this._selectionDirection="right",this.selectionStart+=t,this.selectionStart>this.text.length&&(this.selectionStart=this.text.length),this.selectionEnd=this.selectionStart},moveCursorDownWithShift:function(t){return"left"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?(this.selectionStart+=t,void(this._selectionDirection="left")):(this._selectionDirection="right",this.selectionEnd+=t,this.selectionEnd>this.text.length&&(this.selectionEnd=this.text.length),void 0)},getUpCursorOffset:function(t,e){var i=e?this.selectionEnd:this.selectionStart,r=this.get2DCursorLocation(i);if(0===r.lineIndex||t.metaKey)return i;for(var s,n=this.text.slice(0,i),o=n.slice(n.lastIndexOf("\n")+1),a=(n.match(/\n?(.*)\n.*$/)||{})[1]||"",h=this.text.split(this._reNewline),c=this._getWidthOfLine(this.ctx,r.lineIndex,h),l=this._getLineLeftOffset(c),u=l,f=r.lineIndex,d=0,g=o.length;g>d;d++)s=o[d],u+=this._getWidthOfChar(this.ctx,s,f,d);var p=this._getIndexOnPrevLine(r,a,u,h);return a.length-p+o.length},_getIndexOnPrevLine:function(t,e,i,r){for(var s,n=t.lineIndex-1,o=this._getWidthOfLine(this.ctx,n,r),a=this._getLineLeftOffset(o),h=a,c=0,l=0,u=e.length;u>l;l++){var f=e[l],d=this._getWidthOfChar(this.ctx,f,n,l);if(h+=d,h>i){s=!0;var g=h-d,p=h,v=Math.abs(g-i),b=Math.abs(p-i);c=v>b?l:l-1;break}}return s||(c=e.length-1),c},moveCursorUp:function(t){this.abortCursorAnimation(),this._currentCursorOpacity=1;var e=this.getUpCursorOffset(t,"right"===this._selectionDirection);t.shiftKey?this.moveCursorUpWithShift(e):this.moveCursorUpWithoutShift(e),this.initDelayedCursor()},moveCursorUpWithShift:function(t){if(this.selectionStart===this.selectionEnd)this.selectionStart-=t;else{if("right"===this._selectionDirection)return this.selectionEnd-=t,void(this._selectionDirection="right");this.selectionStart-=t}this.selectionStart<0&&(this.selectionStart=0),this._selectionDirection="left"},moveCursorUpWithoutShift:function(t){this.selectionStart===this.selectionEnd&&(this.selectionStart-=t),this.selectionStart<0&&(this.selectionStart=0),this.selectionEnd=this.selectionStart,this._selectionDirection="left"},moveCursorLeft:function(t){(0!==this.selectionStart||0!==this.selectionEnd)&&(this.abortCursorAnimation(),this._currentCursorOpacity=1,t.shiftKey?this.moveCursorLeftWithShift(t):this.moveCursorLeftWithoutShift(t),this.initDelayedCursor())},_move:function(t,e,i){t.altKey?this[e]=this["findWordBoundary"+i](this[e]):t.metaKey?this[e]=this["findLineBoundary"+i](this[e]):this[e]+="Left"===i?-1:1},_moveLeft:function(t,e){this._move(t,e,"Left")},_moveRight:function(t,e){this._move(t,e,"Right")},moveCursorLeftWithoutShift:function(t){this._selectionDirection="left",this.selectionEnd===this.selectionStart&&this._moveLeft(t,"selectionStart"),this.selectionEnd=this.selectionStart},moveCursorLeftWithShift:function(t){"right"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?this._moveLeft(t,"selectionEnd"):(this._selectionDirection="left",this._moveLeft(t,"selectionStart"),"\n"===this.text.charAt(this.selectionStart)&&this.selectionStart--,this.selectionStart<0&&(this.selectionStart=0))},moveCursorRight:function(t){this.selectionStart>=this.text.length&&this.selectionEnd>=this.text.length||(this.abortCursorAnimation(),this._currentCursorOpacity=1,t.shiftKey?this.moveCursorRightWithShift(t):this.moveCursorRightWithoutShift(t),this.initDelayedCursor())},moveCursorRightWithShift:function(t){"left"===this._selectionDirection&&this.selectionStart!==this.selectionEnd?this._moveRight(t,"selectionStart"):(this._selectionDirection="right",this._moveRight(t,"selectionEnd"),"\n"===this.text.charAt(this.selectionEnd-1)&&this.selectionEnd++,this.selectionEnd>this.text.length&&(this.selectionEnd=this.text.length))},moveCursorRightWithoutShift:function(t){this._selectionDirection="right",this.selectionStart===this.selectionEnd?(this._moveRight(t,"selectionStart"),this.selectionEnd=this.selectionStart):(this.selectionEnd+=this.getNumNewLinesInSelectedText(),this.selectionEnd>this.text.length&&(this.selectionEnd=this.text.length),this.selectionStart=this.selectionEnd)},removeChars:function(t){this.selectionStart===this.selectionEnd?this._removeCharsNearCursor(t):this._removeCharsFromTo(this.selectionStart,this.selectionEnd),this.selectionEnd=this.selectionStart,this._removeExtraneousStyles(),this.canvas&&this.canvas.renderAll().renderAll(),this.setCoords(),this.fire("changed"),this.canvas&&this.canvas.fire("text:changed",{target:this})},_removeCharsNearCursor:function(t){if(0!==this.selectionStart)if(t.metaKey){var e=this.findLineBoundaryLeft(this.selectionStart);this._removeCharsFromTo(e,this.selectionStart),this.selectionStart=e}else if(t.altKey){var i=this.findWordBoundaryLeft(this.selectionStart);this._removeCharsFromTo(i,this.selectionStart),this.selectionStart=i}else{var r="\n"===this.text.slice(this.selectionStart-1,this.selectionStart);this.removeStyleObject(r),this.selectionStart--,this.text=this.text.slice(0,this.selectionStart)+this.text.slice(this.selectionStart+1)}}}),fabric.util.object.extend(fabric.IText.prototype,{_setSVGTextLineText:function(t,e,i,r,s,n){this.styles[e]?this._setSVGTextLineChars(t,e,i,r,s,n):this.callSuper("_setSVGTextLineText",t,e,i,r,s)},_setSVGTextLineChars:function(t,e,i,r,s,n){for(var o=0===e||this.useNative?"y":"dy",a=t.split(""),h=0,c=this._getSVGLineLeftOffset(e),l=this._getSVGLineTopOffset(e),u=this._getHeightOfLine(this.ctx,e),f=0,d=a.length;d>f;f++){var g=this.styles[e][f]||{};i.push(this._createTextCharSpan(a[f],g,c,l,o,h));var p=this._getWidthOfChar(this.ctx,a[f],e,f);g.textBackgroundColor&&n.push(this._createTextCharBg(g,c,l,u,p,h)),h+=p}},_getSVGLineLeftOffset:function(t){return this._boundaries&&this._boundaries[t]?fabric.util.toFixed(this._boundaries[t].left,2):0},_getSVGLineTopOffset:function(t){for(var e=0,i=0;t>=i;i++)e+=this._getHeightOfLine(this.ctx,i);return e-this.height/2},_createTextCharBg:function(t,e,i,r,s,n){return['<rect fill="',t.textBackgroundColor,'" transform="translate(',-this.width/2," ",-this.height+r,")",'" x="',e+n,'" y="',i+r,'" width="',s,'" height="',r,'"></rect>'].join("")},_createTextCharSpan:function(t,e,i,r,s,n){var o=this.getSvgStyles.call(fabric.util.object.extend({visible:!0,fill:this.fill,stroke:this.stroke,type:"text"},e));return['<tspan x="',i+n,'" ',s,'="',r,'" ',e.fontFamily?'font-family="'+e.fontFamily.replace(/"/g,"'")+'" ':"",e.fontSize?'font-size="'+e.fontSize+'" ':"",e.fontStyle?'font-style="'+e.fontStyle+'" ':"",e.fontWeight?'font-weight="'+e.fontWeight+'" ':"",e.textDecoration?'text-decoration="'+e.textDecoration+'" ':"",'style="',o,'">',fabric.util.string.escapeXml(t),"</tspan>"].join("")}}),function(){function request(t,e,i){var r=URL.parse(t);r.port||(r.port=0===r.protocol.indexOf("https:")?443:80);var s=443===r.port?HTTPS:HTTP,n=s.request({hostname:r.hostname,port:r.port,path:r.path,method:"GET"},function(t){var r="";e&&t.setEncoding(e),t.on("end",function(){i(r)}),t.on("data",function(e){200===t.statusCode&&(r+=e)})});n.on("error",function(t){fabric.log(t.errno===process.ECONNREFUSED?"ECONNREFUSED: connection refused to "+r.hostname+":"+r.port:t.message)}),n.end()}function requestFs(t,e){var i=require("fs");i.readFile(t,function(t,i){if(t)throw fabric.log(t),t;e(i)})}if("undefined"==typeof document||"undefined"==typeof window){var DOMParser=require("xmldom").DOMParser,URL=require("url"),HTTP=require("http"),HTTPS=require("https"),Canvas=require("canvas"),Image=require("canvas").Image;fabric.util.loadImage=function(t,e,i){function r(r){s.src=new Buffer(r,"binary"),s._src=t,e&&e.call(i,s)}var s=new Image;t&&(t instanceof Buffer||0===t.indexOf("data"))?(s.src=s._src=t,e&&e.call(i,s)):t&&0!==t.indexOf("http")?requestFs(t,r):t?request(t,"binary",r):e&&e.call(i,t)},fabric.loadSVGFromURL=function(t,e,i){t=t.replace(/^\n\s*/,"").replace(/\?.*$/,"").trim(),0!==t.indexOf("http")?requestFs(t,function(t){fabric.loadSVGFromString(t.toString(),e,i)}):request(t,"",function(t){fabric.loadSVGFromString(t,e,i)})},fabric.loadSVGFromString=function(t,e,i){var r=(new DOMParser).parseFromString(t);fabric.parseSVGDocument(r.documentElement,function(t,i){e&&e(t,i)},i)},fabric.util.getScript=function(url,callback){request(url,"",function(body){eval(body),callback&&callback()})},fabric.Image.fromObject=function(t,e){fabric.util.loadImage(t.src,function(i){var r=new fabric.Image(i);r._initConfig(t),r._initFilters(t,function(t){r.filters=t||[],e&&e(r)})})},fabric.createCanvasForNode=function(t,e,i,r){r=r||i;var s=fabric.document.createElement("canvas"),n=new Canvas(t||600,e||600,r);s.style={},s.width=n.width,s.height=n.height;var o=fabric.Canvas||fabric.StaticCanvas,a=new o(s,i);return a.contextContainer=n.getContext("2d"),a.nodeCanvas=n,a.Font=Canvas.Font,a},fabric.StaticCanvas.prototype.createPNGStream=function(){return this.nodeCanvas.createPNGStream()},fabric.StaticCanvas.prototype.createJPEGStream=function(t){return this.nodeCanvas.createJPEGStream(t)};var origSetWidth=fabric.StaticCanvas.prototype.setWidth;fabric.StaticCanvas.prototype.setWidth=function(t){return origSetWidth.call(this,t),this.nodeCanvas.width=t,this},fabric.Canvas&&(fabric.Canvas.prototype.setWidth=fabric.StaticCanvas.prototype.setWidth);var origSetHeight=fabric.StaticCanvas.prototype.setHeight;fabric.StaticCanvas.prototype.setHeight=function(t){return origSetHeight.call(this,t),this.nodeCanvas.height=t,this},fabric.Canvas&&(fabric.Canvas.prototype.setHeight=fabric.StaticCanvas.prototype.setHeight)}}();
;


//=========================================
//  parari
//=========================================
window.parari = (function (parari) {
"use strict";

    /**
	 * Utilities for parari.
	 * @membrerof parari
	 * @namespace utilities
	 */
	(function (pr, document) {
	    "use strict";
	    var u = {
	        /**
	         * Reduce function to concat. Should be passed to Array.prototype.reduce.
	         * @param {*} prev - Previous entry.
	         * @param {*} cur - Current entry.
	         * @returns {*}
	         */
	        concatReduce: function (prev, cur) {
	            return prev.concat(cur);
	        },
	        /**
	         * Camelize a string.
	         * @param {string} string - String to camelize.
	         * @returns {string} - Camlized string.
	         */
	        camelize: function (string) {
	            string = string.replace(/(?:^|[-_])(\w)/g, u._camlizeReplace);
	            string = string.substr(0, 1).toLowerCase() + string.substr(1);
	            return string;
	        },
	        _camlizeReplace: function (_, letter) {
	            return letter ? letter.toUpperCase() : '';
	        },
	        /**
	         * Composite functions.
	         * @param {...function} actions - Functions to compositse.
	         * @returns {function} - Composited function.
	         */
	        composite: function () {
	            var actions = u.toArray(arguments);
	            return function () {
	                var s = this, args = arguments,
	                    results = [];
	                for (var i = 0; i < actions.length; i++) {
	                    var result = actions[i].apply(s, args);
	                    results.push(result);
	                }
	                return results;
	            }
	        },
	        /**
	         * Copy object.
	         * @param {object} src - Object to copy from.
	         * @param {object} dest - Object to copy to.
	         * @returns {object} - Destination object.
	         */
	        copy: function (src, dest) {
	            for (var key in src) {
	                if (src.hasOwnProperty(key)) {
	                    dest[key] = src[key];
	                }
	            }
	            return dest;
	        },
	        /**
	         * Device pixel ratio.
	         */
	        devicePixelRatio: window.devicePixelRatio || 1,
	        /**
	         * Extract number from text.
	         * @param {string} text - Text to extract from.
	         * @returns {number} - Extracted number.
	         * @example extractNumber('20px')
	         */
	        extractNumber: function (text) {
	            return Number(text.replace(/[^\d\.]/g, ''));
	        },
	        /**
	         * Get offset x for an event.
	         * @param {Event} e - Event
	         * @returns {Number} - Offset x value.
	         */
	        eventOffsetX: function (e) {
	            return (e.offsetX == undefined) ? e.layerX : e.offsetX;
	        },
	        /**
	         * Get offset y for an event.
	         * @param {Event} e - Event
	         * @returns {Number} - Offset y value.
	         */
	        eventOffsetY: function (e) {
	            return (e.offsetY == undefined) ? e.layerY : e.offsetY;
	        },
	        /**
	         * Get style of an element.
	         * @param {HTMLElement} elm - Element
	         * @returns {CSSStyleDeclaration|*}
	         */
	        getComputedStyle: function (elm) {
	            return window.getComputedStyle(elm, '');
	        },
	        /**
	         * Is Internet Explorer or not.
	         * @param {HTMLDocument} document - Document to detect.
	         */
	        isIE: function (document) {
	            return !!document.all;
	        },
	        /**
	         * Detecit if ie8 or older.
	         * @param {HTMLDocument} document - Document to detect.
	         * @returns {boolean}
	         */
	        isIE8orOlder: function (document) {
	            return isIE(document) && !document.addEventListener;
	        },
	        /**
	         * Detect textNode or not.
	         * @param {HTMLNode} node - A node to detect.
	         * @returns {boolean} - Is a text node or not.
	         */
	        isTextNode: function (node) {
	            return !!node && (node.nodeType === Node.TEXT_NODE);
	        },
	        /**
	         * Detect elementNode or not.
	         * @param {HTMLNode} node - A node to detect.
	         * @returns {boolean} - Is an element node or not.
	         */
	        isElementNode: function (node) {
	            return !!node && (node.nodeType === Node.ELEMENT_NODE);
	        },
	        /**
	         * Get max value.
	         * @param {number...} values - Values to compare.
	         */
	        max: function () {
	            return u.toArray(arguments)
	                .sort(function (a, b) {
	                    return b - a;
	                })[0];
	        },
	        /**
	         * Get min value.
	         * @param {number...} values - Values to compare.
	         */
	        min: function () {
	            return u.toArray(arguments)
	                .sort(function (a, b) {
	                    return a - b;
	                })[0];
	        },
	        /**
	         * Get offset from window.
	         * @param {HTMLElement} elm
	         * @returns {{top: number, left: number}}
	         */
	        offsetSum: function (elm) {
	            var top = 0, left = 0;
	            while (elm) {
	                top = top + parseInt(elm.offsetTop, 10);
	                left = left + parseInt(elm.offsetLeft, 10);
	                elm = elm.offsetParent;
	            }
	            return {top: top, left: left};
	        },
	        /**
	         * Optimize canvas pixel rate.
	         * @param {HTMLElement} canvas
	         */
	        optimizeCanvasRatio: function (canvas) {
	            var ratio = u.devicePixelRatio;
	            if (!ratio) {
	                return;
	            }
	            var w = canvas.width,
	                h = canvas.height;
	            canvas.width = w * ratio;
	            canvas.height = h * ratio;
	            canvas.getContext('2d').scale(ratio, ratio);
	            canvas.style.width = w + 'px';
	            canvas.style.height = h + 'px';
	        },
	        /**
	         * Get random value.
	         * @returns {number} - Random value.
	         */
	        random: Math.random.bind(Math),
	        /**
	         * Get random int.
	         * @param {number} [min=0] - Min value.
	         * @param {number} [max=Infinity] - Max value.
	         */
	        randomInt: function (min, max) {
	            min = (min === undefined) ? 0 : min;
	            max = (max === undefined) ? Infinity : max;
	            var range = max - min;
	            return parseInt(Math.random() * range, 10) + min;
	        },
	        /**
	         * Round a value.
	         * @param {number} value - Value to round.
	         * @returns {number} - Rounded value.
	         */
	        round: Math.round.bind(Math),
	        /**
	         * Detect canvas supports.
	         * @param {HTMLDocument} document - Document to work with.
	         * @returns {boolean} - Supports or not.
	         */
	        supportsCanvas: function (document) {
	            return !!document.createElement('canvas').getContext;
	        },
	        /**
	         * Detect property defining supports.
	         * @param {window} Window - Window.
	         * @returns {boolean}
	         */
	        supportsPropertyDefining: function (window) {
	            return !!window.Object.defineProperty;
	        },
	        /**
	         * Convert an iteratable object to array.
	         * @param iteratable
	         * @returns {Array}
	         */
	        toArray: function (iteratable) {
	            return Array.prototype.slice.call(iteratable, 0);
	        },
	        /**
	         * Make sure that element is a HTML element.
	         * @param {HTMLElement|string} elm - Html element or element id.
	         * @returns {HTMLElement}
	         */
	        toElement: function (elm) {
	            if (typeof(elm) === 'string') {
	                return document.getElementById(elm);
	            }
	            return elm;
	        },
	        /**
	         * Trigger a event.
	         * @param {HTMLElement} elm - A html element.
	         * @param {string} eventName - Evenet name.
	         */
	        triggerEvent: function (elm, eventName) {
	            var event;
	            if (document.createEvent) {
	                event = document.createEvent("HTMLEvents");
	                event.initEvent(eventName, true, true);
	                elm.dispatchEvent(event);
	            } else {
	                event = document.createEventObject();
	                event.eventType = eventName;
	                elm.fireEvent('on' + eventName, event);
	            }
	        },
	        /**
	         * Generate a UUID.
	         * @returns {string} - UUID string.
	         */
	        uuid: function () {
	            var S4 = u._uuidS4;
	            return  [S4() + S4() , S4() , S4() , S4() , S4() + S4() + S4()].join('-');
	        },
	        _uuidS4: function () {
	            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	        }
	    }
	    pr.utilities = u;
	
	})(window.parari = window.parari || {}, document);

    /**
	 * Constants for parari.
	 * @membrerof parari
	 * @member constants
	 */
	(function (pr) {
	    "use strict";
	
	    var prefix = 'pr',
	        prefixed = function (name) {
	            return [prefix, name].join('-');
	        }
	
	    /**
	     * @lends constants
	     */
	    var c = {
	        PREFIX: prefix,
	        PREFIX_PATTERN: new RegExp("^" + prefix),
	        classNames: {
	            SRC: prefixed('src'),
	            CANVAS_CONTINER:prefixed('canvas-container'),
	            SCREEN: prefixed('screen'),
	            SCREEN_CONTAINER: prefixed('screen-container'),
	            FRAGMENT: prefixed('fragment'),
	            ROOT: prefixed('root')
	        },
	        FRAGMENT_SELECOTR: '[data-' + prefixed('fragment') + ']'
	    };
	
	    pr.constants = c;
	
	
	})(window.parari = window.parari || {});

    /**
	 * Append prefix.
	 * @membrerof parari
	 * @function prefixed
	 * @param {string} value - String value to add prefix.
	 */
	(function (pr) {
	    "use strict";
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	    /** @lends prefixed */
	    function prefixed(value) {
	        return [c.PREFIX, value].join('-');
	    }
	
	    pr.prefixed = prefixed;
	
	
	})(window.parari = window.parari || {});

    /**
	 * Remove prefix.
	 * @membrerof parari
	 * @function unprefixed
	 * @param {string} value - String value to remove prefix.
	 */
	(function (pr) {
	    "use strict";
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	    /** @lends unprefixed */
	    function unprefixed(name) {
	        name = name.replace(c.PREFIX_PATTERN, '').replace(/^\-/, '');
	        return  name.substr(0, 1).toLowerCase() + name.substr(1);
	    }
	
	    pr.unprefixed = unprefixed;
	
	
	})(window.parari = window.parari || {});

    /**
	 * Object to represent rectangle.
	 * @membrerof parari
	 * @constructor Rect
	 * @param {number} left - Left position.
	 * @param {number} top - Top position.
	 * @param {number} width - Horizontal size.
	 * @param {number} height - Vertical size.
	 */
	(function (pr) {
	    "use strict";
	
	    var u = pr.utilities;
	
	    /** @lends Rect */
	    function Rect(left, top, width, height) {
	        var s = this;
	        s.left = left;
	        s.top = top;
	        s.width = width;
	        s.height = height;
	    }
	
	    Rect.prototype = {
	        /** Left position */
	        left: 0,
	        /** Top position */
	        top: 0,
	        /** Right position. */
	        get right() {
	            var s = this;
	            return s.left + s.width;
	        },
	        /** Bottom position */
	        get bottom() {
	            var s = this;
	            return s.top + s.height;
	        },
	        /** Height */
	        width: 0,
	        /** With */
	        height: 0,
	        /**
	         * Center point.
	         * @returns {{x: number, y: number}}
	         */
	        get center() {
	            var s = this;
	            return {
	                x: s.left + s.width / 2,
	                y: s.top + s.height / 2
	            }
	        },
	        /**
	         * Create a clone of this rect.
	         * @returns {Rect}
	         */
	        clone: function () {
	            var s = this;
	            return new Rect(s.left, s.top, s.width, s.height);
	        },
	        /**
	         * Contains a porint or not.
	         * @param {number} x - X position.
	         * @param {number} y - Y position.
	         * @returns {boolean} - Contains or not.
	         */
	        contains: function (x, y) {
	            var s = this;
	            return (s.left <= x) && (x <= s.right) &&
	                (s.top <= y) && (y <= s.bottom);
	        },
	        /**
	         * Create a clipped rect.
	         * @param {Rect} bounds
	         * @returns {Rect} - Clpped rect.
	         */
	        clip: function (bounds) {
	            var s = this;
	            var left = u.max(s.left, bounds.left),
	                top = u.max(s.top, bounds.top),
	                right = u.min(s.right, bounds.right),
	                bottom = u.min(s.bottom, bounds.bottom);
	            var w = right - left, h = bottom - top;
	            return new Rect(left, top, w, h);
	        },
	        /**
	         * Create a relative rect.
	         * @param {Rect} bounds - Bounds rect.
	         */
	        relative: function (bounds) {
	            var s = this;
	            var left = s.left - bounds.left,
	                top = s.top - bounds.top,
	                w = s.width,
	                h = s.height;
	            return new Rect(left, top, w, h);
	
	        }
	    };
	
	
	    pr.Rect = Rect;
	
	    /**
	     * Rect for an element.
	     * @param {HTMLElement} elm - Element.
	     */
	    pr.Rect.ofElement = function (elm, bounds) {
	        var offset = u.offsetSum(elm),
	            left = offset.left,
	            top = offset.top,
	            w = elm.offsetWidth,
	            h = elm.offsetHeight;
	        var rect = new Rect(left, top, w, h);
	        return bounds ? rect.relative(bounds) : rect;
	    };
	
	    /**
	     * Zero rect.
	     * @returns {Rect}
	     * @constructor
	     */
	    pr.Rect.RectZero = function () {
	        return new Rect(0, 0, 0, 0);
	    }
	
	
	})(window.parari = window.parari || {});

    /**
	 * Object to get body scroll amount.
	 * @membrerof parari
	 * @member bodyScroller
	 * @property {number} scrollLeft - Scroll left position.
	 * @property {number} scrollTop - Scroll top position.
	 */
	(function (pr) {
	    "use strict";
	
	    var u = pr.utilities;
	
	    pr.bodyScroller = {
	        _scrollValueForKey: function (key) {
	            return document.documentElement[key] || document.body[key];
	        },
	        get scrollLeft() {
	            var s = this;
	            return s._scrollValueForKey('scrollLeft');
	        },
	        get scrollTop() {
	            var s = this;
	            return s._scrollValueForKey('scrollTop');
	        }
	    };
	
	
	})(window.parari = window.parari || {});

    /**
	 * Detect browser support.
	 * @member parari
	 * @function isSupported
	 * @param {Window} window
	 */
	(function (pr, document) {
	    "use strict";
	
	    var u = pr.utilities;
	
	    /** @lends isSupported */
	    function isSupported(window) {
	        var document = window.document;
	
	        var isIE = u.isIE(document);
	        if (isIE) {
	            var isIE8orOlder = u.isIE8orOlder(document);
	            if (isIE8orOlder) {
	                return false;
	            }
	        }
	
	        return u.supportsCanvas(document)
	            && u.supportsPropertyDefining(window);
	    }
	
	
	    pr.isSupported = isSupported;
	
	})(
	    window.parari = window.parari || {},
	    document);

    /**
	 * Present not supported message.
	 * @function presentNotSupported
	 * @param {HTMLElement} - Root element
	 */
	(function (pr, document) {
	    "use strict";
	
	    /** @lends presentNotSupported */
	    function presentNotSupported(root) {
	        var lang = 'en';
	        var div = presentNotSupported._createMessageDiv(lang);
	        if (root.firstChild) {
	            root.insertBefore(div, root.firstChild);
	        } else {
	            root.append(div);
	        }
	    }
	
	    presentNotSupported._createMessageDiv = function (lang) {
	        var div = document.createElement('div');
	        div.className = pr.prefixed('message-div');
	        div.innerHTML = presentNotSupported._msg[lang || 'en'];
	        return div;
	    };
	
	    presentNotSupported._msg = {
	        'en': [
	            '<span class="pr-caution">&#9888;</span>Your browser is not supported!.',
	            'Please try modern browser like <a href="https://www.google.com/intl/en/chrome/browser/"><i>chrome</i></a>.'
	        ].join('<br />')
	    };
	
	    pr.presentNotSupported = presentNotSupported;
	})(
	    window.parari = window.parari || {},
	    document);
	

    /**
	 * Resolve a texture by name.
	 * @membrerof parari
	 * @function resolveTexture
	 * @param {string} name - Name to resolve.
	 * @returns {parari.textures.Texture} - Resolve texture.
	 */
	(function (pr) {
	    "use strict";
	
	    var u = pr.utilities;
	
	    /** @lends resolveTexture */
	    function resolveTexture(name) {
	        name = u.camelize(name);
	        return pr.textures._textureNameMap[name] || pr.textures[name];
	    }
	
	    pr.resolveTexture = resolveTexture;
	
	})(window.parari = window.parari || {});
	

    /**
	 * Parari drawable.
	 * @memberof parari
	 * @constructor Drawable
	 * @param {fabric.Object[]} objects.
	 * @requires fabric
	 */
	(function (pr, f, document) {
	    "use strict";
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	    /** @lends Drawable */
	    function Drawable(elm) {
	        var s = this;
	
	        s.__proto__ = u.copy(Drawable.prototype, new f.Group([], {
	            selectable: false,
	            hasRotatingPoint: false,
	        }));
	        s.__isPrDrawable = true;
	
	        s.loadElement(elm);
	
	
	    };
	
	    Drawable.prototype = {
	        /**
	         * Load html element.
	         * @param {HTMLElement} elm - An element to load.
	         */
	        loadElement: function (elm) {
	            var s = this,
	                style = u.getComputedStyle(elm);
	            s.addAll(
	                [
	                    Drawable.background(style),
	                    Drawable.text(Drawable.textValue(elm), style),
	                ]
	                    .filter(Drawable._filters.emptyRejecter)
	                    .concat(Drawable.children(elm))
	            );
	            if (elm.src) {
	                f.Image.fromURL(elm.src, function (image) {
	                    s.add(image);
	                    s.layout();
	                    u.triggerEvent(elm, 'pr-img-load');
	                });
	            }
	            if (elm.href) {
	                s._highlightable = true;
	                s.onclick = function () {
	                    elm.click();
	                    return true;
	                }
	            }
	            s.elm = elm;
	        },
	        /**
	         * Layout drawable contents.
	         */
	        layout: function () {
	            var s = this,
	                w = s.elm.offsetWidth,
	                h = s.elm.offsetHeight;
	            s.set({
	                width: w,
	                height: h,
	                originX: 'center',
	                originY: 'center'
	            });
	            var bounds = {
	                width: u.round(w),
	                height: u.round(h),
	                left: 0,
	                top: 0,
	            };
	            var baseOffset = u.offsetSum(s.elm);
	            s.getObjects().forEach(function (object) {
	                var isDrawable = Drawable.isDrawable(object);
	                if (isDrawable) {
	                    var offset = u.offsetSum(object.elm);
	                    object.set({
	                        top: u.round(offset.top - baseOffset.top),
	                        left: u.round(offset.left - baseOffset.left)
	                    });
	                    object.layout();
	                } else {
	                    object.set(bounds);
	                }
	            });
	        },
	        /**
	         * Add all objects.
	         * @param {fabric.Object[]} objects - Objects add.
	         */
	        addAll: function (objects) {
	            var s = this;
	            objects = [].concat(objects)
	                .forEach(function (object) {
	                    s.add(object);
	                });
	        },
	        /**
	         * Remove all objects.
	         * @returns {fabric.Object[]} - Removed objects.
	         */
	        removeAll: function () {
	            var s = this,
	                removed = [];
	            var obj;
	            while (obj = s.remove()) {
	                removed.push(obj);
	            }
	            return removed;
	        },
	        _frameRect: null,
	        getFrame: function () {
	            var s = this,
	                rect = s._frameRect;
	            if (!rect) {
	                rect = s._frameRect = pr.Rect.RectZero();//Reuse rect instance for performance reason.
	            }
	            var h = s.getHeight(),
	                w = s.getWidth();
	            rect.top = s.getTop();
	            rect.left = s.getLeft();
	            rect.width = w;
	            rect.height = h;
	            return rect;
	        },
	        /**
	         * Handle an event.
	         * @param {event} e - Event to handle.
	         * @returns {boolean} - Consumed or not.
	         */
	        handleEvent: function (e) {
	            var s = this;
	            var child = s._hitChild(e);
	            if (child) {
	                return child.handleEvent(e);
	            }
	            var handler = 'on' + e.type;
	            if (s[handler]) {
	                return s[handler](e);
	            }
	            return false;
	        },
	        _hitChild: function (e) {
	            var s = this,
	                x = u.eventOffsetX(e) - s.getLeft(),
	                y = u.eventOffsetY(e) - s.getTop(),
	                children = s.getDrawableChildren();
	            for (var i = children.length - 1; i >= 0; i--) {
	                var child = children[i],
	                    hit = child.getFrame().contains(x, y);
	                if (hit) {
	                    return child;
	                }
	            }
	            return null;
	        },
	        /**
	         * Get drawable children.
	         * @returns {Drawable[]} - Children.
	         */
	        getDrawableChildren: function () {
	            var s = this;
	            return s.getObjects().filter(Drawable.isDrawable);
	        },
	        /**
	         * Handle mouse down event.
	         * @param {Event} e - Mousedown event.
	         */
	        onmousedown: function (e) {
	            var s = this;
	            s.toggleHighlighted(true);
	            return true;
	        },
	        /**
	         * Handle mouse up event.
	         * @param {Event} e - Mouseup event.
	         */
	        onmouseup: function (e) {
	            var s = this;
	            s.toggleHighlighted(false);
	            return true;
	        },
	        /**
	         * Toggle highlighted state.
	         * @param {boolean} highlighted
	         */
	        toggleHighlighted: function (highlighted) {
	            var s = this;
	            if (s._highlightable) {
	                var opacity = Drawable.getHighlightOpacity(highlighted);
	                s.setOpacity(opacity);
	            }
	        },
	        /**
	         * Handle click event.
	         * @param {Event} e - Click event.
	         */
	        onclick: function (e) {
	            var s = this;
	            s.toggleHighlighted(false);
	            return true;
	        }
	
	    };
	
	    u.copy(
	        /** @lends Drawable */
	        {
	            /**
	             * Create a background.
	             * @param {CSSStyleDeclaration} style - Style object.
	             * @returns {fabric.Rect} - Rect object.
	             */
	            background: function (style) {
	                return new f.Rect({
	                    selectable: false,
	                    hasRotatingPoint: false,
	                    fill: style.backgroundColor
	                });
	            },
	            /**
	             * Create a text.
	             * @param {string} text - Text
	             * @param {CSSStyleDeclaration} style - Style object.
	             * @returns {fabric.Text} - Rect object.
	             */
	            text: function (text, style) {
	                return new f.Text(text, {
	                    selectable: false,
	                    hasRotatingPoint: false,
	                    fontSize: Math.round(u.extractNumber(style.fontSize)),
	                    fill: style.color,
	                    fontFamily: style.fontFamily,
	                    fontStyle: style.fontStyle,
	                    fontWeight: style.fontWeight,
	                    textAlign: Drawable._styleDictionary.textAlign[style.textAlign],
	                });
	            },
	            /**
	             * Style dictionary.
	             * Some of css style values is not supported in fabric.js and
	             * needs to be altenated with another value.
	             */
	            _styleDictionary: {
	                textAlign: {
	                    start: 'left',
	                    left: 'left',
	                    center: 'center',
	                    right: 'right',
	                    justify: 'center',
	                    initial: 'left',
	                    inherit: 'left'
	                }
	            },
	            /**
	             * Create children.
	             * @param {HTMLElement} elm - Elmeent
	             * @returns {*}
	             */
	            children: function (elm) {
	                return u.toArray(elm.childNodes)
	                    .filter(Drawable._filters.elementFilter)
	                    .map(Drawable._maps.drawableMap)
	                    .reduce(u.concatReduce, []);
	            },
	            /**
	             * Get text value of a elmenet.
	             * @param {HTMLElement} elm - An html element.
	             * @returns {string} - Elment text value.
	             */
	            textValue: function (elm) {
	                return u.toArray(elm.childNodes)
	                    .map(function (node) {
	                        var isText = u.isTextNode(node),
	                            nodeValue = node.nodeValue || node.textContent || ''
	                        if (isText) {
	                            return nodeValue;
	                        } else {
	                            return node.textContent.replace(/./g, " ");
	                        }
	                    })
	                    .join('');
	            },
	            _filters: {
	                emptyRejecter: function (value) {
	                    return !!value;
	                },
	                elementFilter: function (elm) {
	                    return u.isElementNode(elm);
	                },
	                textNodeFileter: function (node) {
	                    return u.isTextNode(node);
	                }
	            },
	            _maps: {
	                drawableMap: function (elm) {
	                    return new Drawable(elm);
	                },
	                nodeValueMap: function (node) {
	                    return node.nodeValue;
	                }
	            },
	            /**
	             * Is drawable or not.
	             * @param object
	             * @returns {boolean} - Is a drawable or not.
	             */
	            isDrawable: function (object) {
	                return !!(object && object.__isPrDrawable);
	            },
	            /**
	             * Get highligted opacity
	             * @param {boolean} highlighted - Highlighted or not.
	             * @returns {number} - Highlight opacity.
	             */
	            getHighlightOpacity: function (highlighted) {
	                return highlighted ? 0.75 : 1;
	            }
	        }, Drawable);
	
	
	    pr.Drawable = Drawable;
	
	})(
	    window.parari = window.parari || {},
	    window.fabric,
	    document
	);

    /**
	 * Parari fragment.
	 * @memberof parari
	 * @constructor Fragment
	 * @param {HTMLElement} elm - Html element.
	 * @requires fabric
	 */
	(function (pr, f, document) {
	    "use strict";
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	    /** @lends Fragment */
	    function Fragment(elm) {
	        elm.classList.add(c.classNames.FRAGMENT);
	        var s = this;
	        s.load(elm);
	    };
	
	    Fragment.prototype = {
	
	        /**
	         * Drawable object.
	         * @type fabric.Oect
	         */
	        drawable: null,
	        /**
	         * Load data from fragment elment.
	         * @param {HTMLElement} elm
	         */
	        load: function (elm) {
	            var s = this;
	
	            s.elm = elm;
	            s.drawable = new pr.Drawable(elm);
	
	            var properties = Fragment.fromDataset(elm.dataset);
	            u.copy(properties, s);
	
	            s.refresh();
	        },
	        /**
	         *  Unload fragment element data.
	         */
	        unload: function () {
	            var s = this;
	            if (s.drawable) {
	                s.drawable.removeAll();
	                s.drawable = null;
	            }
	            if (s.elm) {
	                s.elm.removeEventListener('pr-img-load');
	                s.elm = null;
	            }
	        },
	        /**
	         * Reload element.
	         */
	        reload: function () {
	            var s = this;
	            s.unload();
	            s.load(s.elm);
	        },
	        /**
	         * Refresh fragments.
	         */
	        refresh: function () {
	            var s = this;
	            s.toggleVisibility(s.isVisible());
	        },
	        /**
	         * Move to point.
	         * @param {number} scrollX - X position.
	         * @param {number} scrollY - Y position.
	         */
	        move: function (scrollX, scrollY) {
	            var s = this,
	                amount = s._moveAmount(scrollX, scrollY);
	            var frame = s.frame,
	                w = frame.width, h = frame.height;
	
	            s.drawable.set({
	                width: u.round(w),
	                height: u.round(h),
	                left: u.round(frame.left + amount.x),
	                top: u.round(frame.top + amount.y),
	                originX: 'center',
	                originY: 'center'
	            });
	
	            s.refresh();
	        },
	        /**
	         * Get move amount.
	         * @param {number} scrollX - Horizontal Scroll amount.
	         * @param {number} scrollY - Vertical scroll amount.
	         * @returns {{x: number, y: number}}
	         * @private
	         */
	        _moveAmount: function (scrollX, scrollY) {
	            var s = this,
	                v = Number(s.velocity);
	            var dx = u.round(s.hLock ? 0 : s.dx * (1 - v)),
	                dy = u.round(s.vLock ? 0 : s.dy * (1 - v));
	            return {
	                x: -(scrollX * v + dx),
	                y: -(scrollY * v + dy)
	            }
	        },
	        /**
	         * Synchorize with source element.
	         * @param {pr.Rect} bounds - Canvas bounds.
	         */
	        sync: function (bounds) {
	            var s = this;
	            var frame = pr.Rect.ofElement(s.elm, bounds);
	            s.dx = u.round(frame.center.x - bounds.width / 2);
	            s.dy = u.round(frame.center.y - bounds.height / 2);
	            s.frame = frame;
	            s.bounds = bounds;
	            s.drawable.layout();
	        },
	        isVisible: function (bounds) {
	            var s = this;
	            return s.isVisibleInBounds(s.bounds);
	        },
	        /**
	         * Detect that the drawable visible or not.
	         * @param {parari.Rect} bounds - Bounds to work with.
	         */
	        isVisibleInBounds: function (bounds) {
	            if (!bounds) {
	                return false;
	            }
	            var s = this,
	                f = s.drawable.getFrame();
	            return   (bounds.top < f.bottom)
	                && (f.top < bounds.bottom)
	                && (bounds.left < f.right)
	                && (f.left < bounds.right);
	        },
	        /**
	         * Hits a point or not.
	         * @param {number} x
	         * @param {number} y
	         * @param {boolean} - Hit or not.
	         */
	        hits: function (x, y) {
	            var s = this,
	                f = s.drawable.getFrame();
	            return f.contains(x, y);
	        },
	        /**
	         * Handle an event.
	         * @param {event} e - Event to handle.
	         * @returns {boolean} - Consumed or not.
	         */
	        handleEvent: function (e) {
	            var s = this;
	            return s.drawable.handleEvent(e);
	        },
	        /**
	         * Toggle drawable visibility.
	         * @param {boolean} visible - Is visible or not.
	         */
	        toggleVisibility: function (visible) {
	            var s = this,
	                d = s.drawable;
	            var needsChange = d.getVisible() !== visible;
	            if (needsChange) {
	                d.setVisible(visible);
	            }
	        },
	        /**
	         * Frame of the element.
	         */
	        frame: pr.Rect.RectZero(),
	        velocity: 1,
	        /** Horizontal distance from bounds center. */
	        dx: 0,
	        /** Vertical distance from bounds center. */
	        dy: 0,
	        /** Should lock horizontaly. */
	        hLock: true,
	        /** Should lock verticaly. */
	        vLock: false
	    };
	
	
	    /**
	     * Get proeprty data from dataset.
	     * @param {DOMStringMap} dataset - Element data set.
	     * @returns {object} - Parari property values.
	     */
	    Fragment.fromDataset = function (dataset) {
	        var values = {},
	            keys = Object.keys(dataset).filter(Fragment.fromDataset._keyFilter);
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            values[pr.unprefixed(key)] = dataset[key];
	        }
	        return values;
	    };
	    Fragment.fromDataset._keyFilter = function (key) {
	        return !!key.match(c.PREFIX_PATTERN);
	    }
	
	
	    pr.Fragment = Fragment;
	
	})(
	    window.parari = window.parari || {},
	    window.fabric,
	    document
	);

    /**
	 * Data source.
	 * @memberof parari
	 * @constructor Src
	 * @param {HTMLElement} elm - Element which contains the slide data source.
	 */
	(function (pr, document) {
	    "use strict";
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	    /** @lends Src */
	    function Src(elm) {
	        var s = this;
	        s.loadElement(elm);
	    };
	
	    Src.prototype = {
	        /**
	         * Source element.
	         */
	        elm: null,
	        /**
	         * Load element.
	         * @param {HTMLElement} elm - Element to load.
	         */
	        loadElement: function (elm) {
	            var s = this;
	            elm.classList.add(c.classNames.SRC);
	            Src.wrapTextNodesRecursive(elm);
	            s.elm = elm;
	        },
	        _findObjectElements: function () {
	            var s = this,
	                selector = c.FRAGMENT_SELECOTR,
	                elements = s.elm.querySelectorAll(selector);
	            return u.toArray(elements);
	        },
	        /**
	         * Create fragments from src.
	         * @param {object} properties - Fragment properties.
	         * @returns {pr.Fragment[]}
	         */
	        createFragments: function (properties) {
	            var s = this;
	            return s._findObjectElements()
	                .map(function (elm) {
	                    return new pr.Fragment(elm,properties);
	                });
	        }
	    }
	
	    u.copy(
	        /** @lends Src */
	        {
	            /**
	             * Wrap all text nodes with span recursively.
	             * @param {HTMLElement} elm - Element to work with.
	             */
	            wrapTextNodesRecursive: function (elm) {
	                if (!elm) {
	                    return;
	                }
	                var nodes = elm.childNodes;
	                for (var i = 0; i < nodes.length; i++) {
	                    var node = nodes[i];
	                    if (u.isTextNode(node)) {
	                        var wrapper = document.createElement('span');
	                        wrapper.innerHTML = Src._convertTextNode(node);
	                        node.parentNode.insertBefore(wrapper, node)
	                        node.parentNode.removeChild(node);
	                    }
	                    if (u.isElementNode(node)) {
	                        Src.wrapTextNodesRecursive(node);
	                    }
	                }
	            },
	            _convertTextNode: function (node) {
	                var text = (node.nodeValue || ''),
	                    onSpan = false,
	                    result = '';
	                for (var i = 0; i < text.length; i++) {
	                    var isTrimmable = !!text[i].match(/[\s\n\t]/);
	                    var shouldStartSpan = !isTrimmable && !onSpan;
	                    if (shouldStartSpan) {
	                        result += '<span>';
	                        onSpan = true;
	                    }
	                    var shouldEndSpan = isTrimmable && onSpan;
	                    if (shouldEndSpan) {
	                        result += '</span>';
	                        onSpan = false;
	                    }
	                    result += text[i];
	                }
	                if (onSpan) {
	                    result += '</span>';
	                }
	                return result;
	            },
	        }
	        , Src
	    );
	
	    pr.Src = Src;
	
	})(window.parari = window.parari || {}, document);

    /**
	 * Screen.
	 * @memberof parari
	 * @constructor Screen
	 * @param {HTMLElement} container - Element to contains screen.
	 * @param {object} options - Optional settings.
	 * @requires fabric
	 */
	(function (pr, document, f) {
	    "use strict";
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	    /** @lends Screen */
	    function Screen(container, options) {
	        var s = this;
	        container = u.toElement(container);
	        if (!container) {
	            throw new Error('Screen container not found:', container);
	        }
	
	        container.classList.add(c.classNames.SCREEN_CONTAINER);
	
	        u.copy(options || {}, s);
	
	
	        var canvases = Screen.createCanvaseElements(2);
	
	        var elm = Screen._newScreenElement(canvases);
	        container.appendChild(elm);
	
	        'click,mousedown,mouseup'.split(',').forEach(function (eventName) {
	            elm.addEventListener(eventName, s.captureEvent.bind(s), false);
	        });
	
	
	        s.textureCanvas = Screen.newFabricCanvas(canvases[0].id, 'texture');
	        s.fragmentsCanvas = Screen.newFabricCanvas(canvases[1].id, 'fragment');
	
	        s.fragments = [];
	        s.textures = [];
	
	        s.startLooping(s._renderInterval);
	
	    }
	
	    Screen.prototype = {
	        _renderInterval: 5000,
	        _renderTimer: null,
	        _needsSync: false,
	        /**
	         * Find a fragment to hit the point.
	         * @param {number} x - X position.
	         * @param {number} y - Y potision.
	         * @returns {parari.Fragment}
	         * @private
	         */
	        _hitFragment: function (x, y) {
	            var s = this;
	            for (var i = s.fragments.length - 1; i >= 0; i--) {
	                var fragment = s.fragments[i];
	                var hit = fragment.hits(x, y);
	                if (hit) {
	                    return fragment;
	                }
	            }
	            return null;
	        },
	        captureEvent: function (e) {
	            var s = this,
	                x = u.eventOffsetX(e),
	                y = u.eventOffsetY(e),
	                fragment = s._hitFragment(x, y);
	            if (fragment) {
	                var shouldRender = fragment.handleEvent(e);
	                if (shouldRender) {
	                    s.fragmentsCanvas.renderAll();
	                }
	            }
	        },
	        /**
	         * Fabirc canvas.
	         * @type fabric.Canvas
	         */
	        fragmentsCanvas: null,
	        /**
	         * Fragment objects.
	         * @type {parari.Fragment[]}
	         */
	        fragments: null,
	        /**
	         * Textures.
	         * @type {parari.textures.Texture}
	         */
	        textures: null,
	        /**
	         * Element to fit size with.
	         */
	        sizer: null,
	        /**
	         * Element to scroll with.
	         */
	        scroller: null,
	        /**
	         * Register a fragment object.
	         * @param {parari.Fragment} fragment - Fragment to register.
	         */
	        registerFragment: function (fragment) {
	            var s = this;
	            s.fragments.push(fragment);
	            s.fragmentsCanvas.add(fragment.drawable);
	        },
	        /**
	         * Register a texture object.
	         * @param {parari.textures.Texture} texture - Texture to register.
	         */
	        registerTexture: function (texture) {
	            var s = this;
	            s.textures.push(texture);
	        },
	        /**
	         * Register fragment objects.
	         * @param {parari.Fragment[]} fragments - Fragments to register.
	         */
	        registerFragments: function (fragments) {
	            var s = this;
	            [].concat(fragments).forEach(function (fragment) {
	                s.registerFragment(fragment);
	            });
	        },
	        /**
	         * Register textures.
	         * @param {parari.textures.Texture[]} textures - Textures to register.
	         */
	        registerTextures: function (textures) {
	            var s = this;
	            [].concat(textures).forEach(function (texture) {
	                s.registerTexture(texture);
	            });
	        },
	        /**
	         * Draw screen.
	         * @param {number} scrollX
	         * @param {number} scrollY
	         */
	        draw: function (scrollX, scrollY) {
	            var s = this;
	            s.drawTextures(scrollX, scrollY);
	            s.drawFragments(scrollX, scrollY);
	        },
	        /**
	         * Draw textures.
	         * @param {number} scrollX
	         * @param {number} scrollY
	         */
	        drawTextures: function (scrollX, scrollY) {
	            var s = this,
	                canvas = s.textureCanvas,
	                ctx = canvas.getContext();
	            ctx.clearRect(0, 0, canvas.width, canvas.height);
	            for (var j = 0; j < s.textures.length; j++) {
	                var texture = s.textures[j];
	                texture.render(ctx, scrollX, scrollY);
	            }
	        },
	        /**
	         * Draw fragmens.
	         * @param {number} scrollX
	         * @param {number} scrollY
	         */
	        drawFragments: function (scrollX, scrollY) {
	            var s = this;
	            for (var i = 0, len = s.fragments.length; i < len; i++) {
	                var fragment = s.fragments[i];
	                fragment.move(scrollX, scrollY);
	            }
	            s.fragmentsCanvas.renderAll();
	        },
	        /**
	         * Redraw screen.
	         */
	        redraw: function () {
	            var s = this,
	                x = s.scroller.scrollLeft,
	                y = s.scroller.scrollTop;
	            s.draw(x, y);
	        },
	        /**
	         * Set size.
	         * @param {number} w - Screen width.
	         * @param {number} h - Screen height.
	         */
	        size: function (w, h) {
	            var s = this;
	            Screen.changeCanvasSize(s.fragmentsCanvas, w, h);
	            Screen.changeCanvasSize(s.textureCanvas, w, h);
	
	            var bounds = s.getCanvasBounds();
	            s.syncFragments(bounds);
	            s.syncTextures(bounds);
	            s.redraw();
	        },
	        /**
	         * Get canvas bounds.
	         * @returns {parari.Rect}
	         */
	        getCanvasBounds: function () {
	            var s = this,
	                elm = s.fragmentsCanvas.getElement();
	            return new pr.Rect.ofElement(elm);
	        },
	        /**
	         * Resize screen.
	         */
	        resize: function () {
	            var s = this,
	                rect = Screen._visibleRect(s.sizer);
	            s.size(rect.width, rect.height);
	        },
	        /**
	         * Sync all fragments.
	         * @param {pr.Rect} bounds - Canvas bounds.
	         */
	        syncFragments: function (bounds) {
	            var s = this;
	            for (var i = 0, len = s.fragments.length; i < len; i++) {
	                var fragment = s.fragments[i];
	                fragment.sync(bounds);
	            }
	        },
	        /**
	         * Sync textures.
	         * @param {pr.Rect} bounds - Canvas bounds.
	         */
	        syncTextures: function (bounds) {
	            var s = this;
	            for (var i = 0, len = s.textures.length; i < len; i++) {
	                var texture = s.textures[i];
	                texture.sync(bounds);
	            }
	        },
	        /**
	         * Start render loop.
	         * @param {number} interval - Time interval to run render method.
	         */
	        startLooping: function (interval) {
	            var s = this;
	            s.stopLooping();
	            s._renderTimer = setInterval(function () {
	                s.fragmentsCanvas.renderAll()
	            }, interval);
	        },
	        /**
	         * Stop render loop.
	         */
	        stopLooping: function () {
	            var s = this;
	            clearInterval(s._renderTimer);
	        },
	        _reservations: null,
	        /**
	         * Reserve an action.
	         * @param {string} name
	         */
	        reserve: function (name, action, timeout) {
	            var s = this;
	            if (!s._reservations) {
	                s._reservations = {};
	            }
	            s._reservations[name] = action;
	            setTimeout(function () {
	                var action = s._reservations[name];
	                if (action) {
	                    action.call(s);
	                }
	                s._reservations[name] = null;
	            }, timeout || 500);
	        }
	    };
	
	    u.copy(
	        /** @lends Screen */
	        {
	
	            /**
	             * Create multipe canvases.
	             * @param {number} count - Number of canvases.
	             * @returns {HTMLCanvasElemnt[]} - Canvas elementes.
	             */
	            createCanvaseElements: function (count) {
	                var result = [];
	                for (var i = 0; i < count; i++) {
	                    var canvas = Screen._newCanvasElement();
	                    result.push(canvas);
	                }
	                return result;
	            },
	            /**
	             * Create a new canva element.
	             * @returns {HTMLCanvasElement} - A canvas element.
	             * @private
	             */
	            _newCanvasElement: function () {
	                var id = ['canvas' , u.uuid().replace(/\-/g, '')].join('-'),
	                    canvas = document.createElement('canvas');
	                canvas.id = pr.prefixed(id);
	                return canvas;
	            },
	            /**
	             * Create a new screen element.
	             * @param {HTMLCanvasElements[]} canvasElements - Canvas elements.
	             * @returns {HTMLElement} - A screen element.
	             * @private
	             */
	            _newScreenElement: function (canvasElements) {
	                var div = document.createElement('div');
	                div.classList.add(c.classNames.SCREEN);
	
	                var canvasContainer = document.createElement('div');
	                canvasContainer.classList.add(c.classNames.CANVAS_CONTINER);
	                div.appendChild(canvasContainer);
	
	                for (var i = 0; i < canvasElements.length; i++) {
	                    canvasContainer.appendChild(canvasElements[i]);
	                }
	                return div;
	            },
	            /**
	             * Get visible rect
	             * @param {HTMLElement} elm - Elemnt to work with.
	             * @returns {parari.Rect} - Visible rectangle.
	             * @private
	             */
	            _visibleRect: function (elm) {
	                var offset = u.offsetSum(elm),
	                    rect = new pr.Rect(
	                        offset.left,
	                        offset.top,
	                        elm.offsetWidth,
	                        elm.offsetHeight
	                    ),
	                    bounds = new pr.Rect(
	                        0, 0, window.innerWidth, window.innerHeight
	                    );
	                return rect.clip(bounds);
	            },
	            /**
	             * Create a new canvas.
	             * @param {string} canvasId - Canvas element id.
	             * @param {string} name - Canvas name.
	             * @returns {fabric.StaticCanvas}
	             */
	            newFabricCanvas: function (canvasId, name) {
	                var canvas = new f.StaticCanvas(canvasId, {
	                    renderOnAddRemove: false,
	                    selection: false,
	                });
	                var elm = canvas.getElement();
	                var className = pr.prefixed([name, 'canvas'].join('-'));
	                elm.classList.add(className);
	                return  canvas;
	            },
	            /**
	             * Change canvas size.
	             * @param {fabric.Canvas} canvas - Canvas to change.
	             * @param {number} w - Canvas width.
	             * @param {number} h - Canvas height.
	             */
	            changeCanvasSize: function (canvas, w, h) {
	                canvas.setWidth(w);
	                canvas.setHeight(h);
	
	                var elm = canvas.getElement();
	                u.optimizeCanvasRatio(elm);
	
	                var container = elm.parentNode;
	                container.style.width = w + 'px';
	                container.style.height = h + 'px';
	            }
	        },
	        Screen
	    );
	
	    pr.Screen = Screen;
	
	})(
	    window.parari = window.parari || {},
	    document,
	    window.fabric
	);

    /**
	 * Parari textures.
	 * @memberof parari
	 * @member textures
	 */
	(function (pr, document) {
	    "use strict";
	
	    /** @lends textures */
	    pr.textures = {
	        /** Short names for textures. */
	        get _textureNameMap() {
	            return {
				    resolve: pr.textures.ResolveTexture,
				    starFlow: pr.textures.StarFlowTexture
				};
	        }
	    };
	
	
	})(window.parari = window.parari || {}, document);

    /**
	 * Parari texture
	 * @memberof parari
	 * @constructore Texture
	 * @param {object} options - Optional settings.
	 */
	(function (pr, document) {
	    "use strict";
	
	    var u = pr.utilities;
	
	    /** @lends Texture */
	    function Texture(options) {
	        var s = this;
	        u.copy(options || {}, s);
	    }
	
	    Texture.prototype = {
	        /**
	         * Render texture.
	         * @param {CanvasRenderingContext2D} ctx - Canvas 2d context.
	         * @param {number} scrollX
	         * @param {number} scrollY
	         */
	        render: function (ctx, scrollX, scrollY) {
	
	        },
	        /**
	         * Sync texture.
	         * @param {parari.Rect} canvasBounds - Bounds of the canvas.
	         */
	        sync: function (canvasBounds) {
	            var s = this,
	                w = canvasBounds.width,
	                h = canvasBounds.height;
	            s.bounds = new pr.Rect(0, 0, w, h);
	        }
	    };
	
	    u.copy(
	        /** @lends Texture */
	        {
	            /**
	             * Create a new canvas.
	             * @param {nubmer} width - Canvas width.
	             * @param {number} height - Canvas height.
	             * @returns {*}
	             */
	            newCanvas: function (width, height) {
	                var canvas = document.createElement('canvas');
	                canvas.width = width;
	                canvas.height = height;
	                u.optimizeCanvasRatio(canvas);
	                return canvas;
	            }
	        },
	        Texture
	    );
	
	    pr.textures.Texture = Texture;
	
	})(window.parari = window.parari || {}, document);

    /**
	 * Parari texture
	 * @memberof parari
	 * @augments Texture
	 * @constructore StarFlowTexture
	 * @param {object} options - Optional settings.
	 */
	(function (pr, document) {
	    "use strict";
	
	    var u = pr.utilities,
	        Texture = pr.textures.Texture;
	
	    /** @lends StarFlowTexture */
	    function StarFlowTexture(options) {
	        var s = this;
	        u.copy(options || {}, s);
	
	        s.starLayers = [].concat(options.layers || {}).map(function (options, i, array) {
	            options.velocity = options.velocity || ((array.length - i) / (array.length + 1));
	            return new StarFlowTexture.StarLayer(options);
	        });
	    }
	
	    StarFlowTexture.prototype = u.copy(
	        /** @lends StarFlowTexture.prototype */
	        {
	            starLayers: null,
	            backgroundColor: '#AAE',
	            /**
	             * Star pattern image.
	             */
	            _patternImage: null,
	            /**
	             * Render texture.
	             * @param {CanvasRenderingContext2D} ctx - Canvas 2d context.
	             * @param {number} scrollX
	             * @param {number} scrollY
	             */
	            render: function (ctx, scrollX, scrollY) {
	                var s = this,
	                    bounds = s.bounds;
	                if (!bounds) {
	                    return;
	                }
	                ctx.save();
	                s.renderBackground(ctx, bounds);
	                var xFactor = scrollX / bounds.width,
	                    yFactor = scrollY / bounds.height;
	                for (var i = 0; i < s.starLayers.length; i++) {
	                    var layer = s.starLayers[i];
	                    layer.move(xFactor, yFactor);
	                    s.renderLayer(ctx, bounds, layer);
	                }
	                ctx.restore();
	            },
	            renderBackground: function (ctx, bounds) {
	                var s = this;
	                ctx.fillStyle = s.backgroundColor;
	                ctx.fillRect(bounds.left, bounds.top, bounds.width, bounds.height);
	            },
	            /**
	             * Fill image.
	             * @param ctx
	             */
	            renderLayer: function (ctx, bounds, layer) {
	                var s = this,
	                    img = layer.img;
	                if (!bounds) {
	                    return;
	                }
	                var w = img.width,
	                    h = img.height;
	                var baseX = u.round(bounds.left - layer.x),
	                    baseY = u.round(bounds.top - layer.y);
	
	                var rows = u.round(parseInt(bounds.height / h, 10)) + 2,
	                    cols = u.round(parseInt(bounds.width / w, 10)) + 2;
	
	                for (var row = 0; row < rows; row++) {
	                    for (var col = 0; col < cols; col++) {
	                        var x = baseX + w * col,
	                            y = baseY + h * row;
	                        ctx.drawImage(img, x, y, w, h);
	                    }
	                }
	
	            }
	
	        },
	        new Texture({})
	    );
	
	    u.copy(Texture, StarFlowTexture);
	    u.copy(
	        /** @lends StarFlowTexture */
	        {
	            /**
	             * @constructor StarLayer
	             */
	            StarLayer: (function () {
	                /** @lends StarLayer */
	                function StarLayer(options) {
	                    var s = this;
	                    u.copy(options || {}, s);
	                    var size = s.patternSize;
	                    s.img = s.createImage(size, size);
	                }
	
	                StarLayer.prototype = {
	                    x: 0,
	                    y: 0,
	                    patternSize: 150,
	                    countPerPattern: 20,
	                    radius: 1,
	                    color: '#FFF',
	                    velocity: 1,
	                    move: function (x, y) {
	                        var s = this,
	                            v = s.velocity,
	                            img = s.img;
	                        var w = img.width,
	                            h = img.height;
	                        s.x = w * (x * v % 1);
	                        s.y = h * (y * v % 1);
	                    },
	                    createImage: function (w, h) {
	                        var s = this;
	
	                        var canvas = Texture.newCanvas(w, h),
	                            ctx = canvas.getContext('2d');
	
	                        var count = s.countPerPattern,
	                            radius = s.radius,
	                            color = s.color;
	
	                        ctx.fillStyle = color;
	
	                        for (var i = 0; i < count; i++) {
	                            var x = u.randomInt(radius, w - radius),
	                                y = u.randomInt(radius, w - radius);
	                            ctx.beginPath();
	                            ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	                            ctx.closePath();
	                            ctx.fill();
	                        }
	                        canvas.velocity = s.velocity;
	                        return canvas;
	                    }
	                };
	                return StarLayer;
	            })()
	        },
	        StarFlowTexture);
	
	    pr.textures.StarFlowTexture = StarFlowTexture;
	
	})(window.parari = window.parari || {}, document);

    /**
	 * Start parari.
	 * @memberof parari
	 * @function start
	 * @param {HTMLElement|string} root - Root element.
	 * @param {object} options - Optional settings.
	 * @param {boolean} [options.vLock] - Should lock vertical scroll.
	 * @param {boolean} [options.hLock] - Should lock horizontal scroll.
	 * @param {HTMLElement} [options.scroller=parari.bodyScroller] - Elemnt to scroll with.
	 * @param {Window|HTMLElement} - [options.sizer=root] - Element to size fit.
	 * @param {HTMLElement} [options.screenContainer=document.body] - Element to contains screen.
	 */
	
	(function (pr, document, window) {
	    "use strict";
	
	    var isSupported = pr.isSupported(window);
	
	
	    var u = pr.utilities,
	        c = pr.constants;
	
	
	    /** @lends start */
	    pr.start = function (root, options) {
	        root = u.toElement(root);
	        if (!root) {
	            throw new Error('Root not found: "' + root + '"');
	        }
	        root.classList.add(c.classNames.ROOT);
	
	        if (!isSupported) {
	            pr.presentNotSupported(root);
	            return;
	        }
	
	
	        var body = document.body,
	            o = u.copy(options || {}, {
	                vLock: false,
	                hLock: false,
	                scroller: pr.bodyScroller,
	                sizer: root,
	                screenContainer: body,
	                textures: []
	            });
	
	        var src = new pr.Src(root),
	            screen = new pr.Screen(o.screenContainer, {
	                sizer: o.sizer,
	                scroller: o.scroller
	            });
	
	        var redraw = screen.redraw.bind(screen),
	            resize = screen.resize.bind(screen),
	            reload = u.composite(redraw, resize);
	
	        window.addEventListener('scroll', redraw, false);
	        window.addEventListener('resize', resize, false);
	        window.addEventListener('pr-img-load', function () {
	            screen.reserve('reload', reload, 200);
	        });
	
	
	        var fragments = src.createFragments({
	            vLock: o.vLock,
	            hLock: o.hLock
	        });
	        screen.registerFragments(fragments);
	
	        var textures = pr.start._createTextures(o.textures, {
	            vLock: o.vLock,
	            hLock: o.hLock
	        });
	        screen.registerTextures(textures);
	
	        reload();
	    };
	
	    /**
	     * Create textures.
	     * @param {object} textures - Texture data.
	     * @param {object} defaultOptions - Texture defaultOptions.
	     * @returns {parari.textures.Texture} - Textures.
	     * @private
	     */
	    pr.start._createTextures = function (textures, defaultOptions) {
	        return Object.keys(textures)
	            .map(function (name) {
	                var Texture = pr.resolveTexture(name);
	                if (!Texture) {
	//                throw new Error('Invalid texture: ' + name);
	                    return []; //FIXME
	                }
	                return [].concat(textures[name]).map(function (option) {
	                    option = u.copy(option, u.copy(defaultOptions, {}))
	                    return  new Texture(option);
	                });
	            })
	            .reduce(function (prev, cur) {
	                return prev.concat(cur);
	            }, []);
	
	    };
	
	
	})(
	    window.parari = window.parari || {},
	    document,
	    window);


return parari;
})(window.parari = window.parari || {});
