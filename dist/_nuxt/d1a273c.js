(window.webpackJsonp=window.webpackJsonp||[]).push([[6,4,7,8],{202:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r},t.exports.default=t.exports,t.exports.__esModule=!0},203:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},204:function(t,e,r){var n=r(205);r(35),r(79),r(56),r(207),r(11),r(57),r(45),r(350),r(23),r(152),r(108),r(36);var o=r(362),l=r(198),c=r(354),d=["Common","Dark Sclera","Glowing","Innocent","Swirl","Uncommon","Unusual"];function f(data){return{data:data,id:function(){return this.data.id},name:function(){return this.data.name},displayName:function(){return"".concat(this.name(),"#").concat(this.id())},gender:function(){return this.data.gender},breed:function(){return this.data.breed},flight:function(){return this.data.flight},eyes:function(){return this.data.eyes},hasNormalEyes:function(){return d.includes(this.eyes())},primaryColor:function(){return this.data.primaryColor},primaryGene:function(){return this.data.primaryGene},secondaryColor:function(){return this.data.secondaryColor},secondaryGene:function(){return this.data.secondaryGene},tertiaryColor:function(){return this.data.tertiaryColor},tertiaryGene:function(){return this.data.tertiaryGene},dateOfBirth:function(){return this.data.dateOfBirth},isFirstGen:function(){return this.data.isFirstGen},isBred:function(){return this.data.isBred},isAncient:function(){var t=this;return c.find((function(e){return e.name===t.breed()})).is_ancient},hasSilhouette:function(){return this.data.hasSilhouette},isPermababy:function(){return this.data.isPermababy},thumbnailImageUrl:function(){return"https://www1.flightrising.com/rendern/avatars/".concat(Math.ceil(this.data.id/100),"/").concat(this.data.id,".png")},colorPattern:function(){return t=this.data.primaryColor,e=this.data.secondaryColor,r=this.data.tertiaryColor,t===e&&t===r?"XXX":t===e&&t!==r?"XXY":t!==e&&e===r?"XYY":t===r&&t!==e?"XYX":"XYZ";var t,e,r},digits:function(){return Math.ceil(Math.log(this.data.id)/Math.log(10))},tags:function(){return this.data.tags},hasTag:function(t){return this.data.tags.includes(t)},pushTag:function(t){this.data.tags||(this.data.tags=[]),this.data.tags.push(t)},removeTag:function(t){this.data.tags&&(this.data.tags=[].concat(n(this.data.tags.slice(0,t)),n(this.data.tags.slice(t+1))))}}}function h(t){var e=function(e,r){var n=t(".dragon-profile-stat-icon-value")[e];return r?t(n).html().split("<")[0].trim():t("strong",n).html()},r=t(".dragon-profile-header-number").html(),n=f({id:parseInt(r.substr(0,r.length-1).substr(2)),name:t(".dragon-profile-header-name").html(),gender:-1===t('[data-tooltip-source="#dragon-profile-icon-sex-tooltip"] img').attr("src").search("female")?"Male":"Female",isFirstGen:!t(".dragon-profile-lineage-parents a")[0],isBred:!!t(".dragon-profile-lineage-offspring a")[0],hasSilhouette:!!t('[data-tooltip-source="#dragon-profile-icon-silhouette-tooltip"]')[0],isPermababy:!!t('[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]')[0],primaryColor:e(0,!0),primaryGene:e(0,!1),secondaryColor:e(1,!0),secondaryGene:e(1,!1),tertiaryColor:e(2,!0),tertiaryGene:e(2,!1),breed:e(4,!1),flight:e(5,!0),eyes:e(5,!1),dateOfBirth:l(e(3,!1),"MMM DD, YYYY").format("YYYY-MM-DD"),tags:[]});return t(".dragon-profile-lineage-parents em")[0]&&"none (Raffle Prize)"===t(".dragon-profile-lineage-parents em").text()&&("XXX"===n.colorPattern()&&n.pushTag("Roundsey triples"),"XYZ"!==n.colorPattern()&&n.pushTag("Roundsey doubles"),"Primal"===n.eyes()&&n.pushTag("Roundsey primals"),"XYZ"===n.colorPattern()&&"Primal"!==n.eyes()&&n.pushTag("Roundsey others")),n.name().length<3&&n.pushTag("2 Letter names"),n}function m(t){return t(".lair-page-dragon").map((function(i){return function(t,e){var r=t(".lair-page-dragon-tumbnail",e).attr("rel"),n=t(r),o=f({id:parseInt(r.split("-")[1]),name:t("div",n).eq(1).text(),gender:t("div",n).eq(2).text().split(" ")[1],isFirstGen:"First Generation"===t("span",n).eq(2).text(),isBred:null,hasSilhouette:!!t('[data-tooltip-source="#icon-silhouette-tooltip"]',e)[0],isPermababy:!!t('[data-tooltip-source="#icon-eternal-youth-tooltip"]',e)[0],primaryColor:t("div",n).eq(8).text().split(" ")[2],primaryGene:t("div",n).eq(8).text().split(" ")[3],secondaryColor:t("div",n).eq(9).text().split(" ")[2],secondaryGene:t("div",n).eq(9).text().split(" ")[3],tertiaryColor:t("div",n).eq(10).text().split(" ")[2],tertiaryGene:t("div",n).eq(10).text().split(" ")[3],breed:t("div",n).eq(2).text().split(" ")[0],flight:t("div",n).eq(11).text().split(" ")[2],eyes:t("div",n).eq(11).text().split(" ")[3],dateOfBirth:null,tags:[]});o.name().length<3&&o.pushTag("2 Letter names");return o}(t,t(".lair-page-dragon").eq(i))})).toArray()}t.exports={Dragon:f,dragonLookup:function(t){try{var e=o.load(t),r=[];if(e("#error-404")[0])return null;if(e('meta[property="og:url"]')[0]&&"https://www1.flightrising.com/dragon/"===e('meta[property="og:url"]').attr("content").substr(0,37))r.push(h(e));else if(e("#lair-view-page")[0])r=r.concat(m(e));else{if(!e(".dragon-profile-header-title")[0]||!e(".dragon-profile-lineage-offspring")[0])return null;r.push(h(e))}return r}catch(t){}return null}}},205:function(t,e,r){var n=r(347),o=r(348),l=r(208),c=r(349);t.exports=function(t){return n(t)||o(t)||l(t)||c()},t.exports.default=t.exports,t.exports.__esModule=!0},207:function(t,e,r){"use strict";var n=r(2),o=r(58).find,l=r(109),c=r(38),d="find",f=!0,h=c(d);d in[]&&Array(1).find((function(){f=!1})),n({target:"Array",proto:!0,forced:f||!h},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),l(d)},208:function(t,e,r){var n=r(202);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},347:function(t,e,r){var n=r(202);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.default=t.exports,t.exports.__esModule=!0},348:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.default=t.exports,t.exports.__esModule=!0},349:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},350:function(t,e,r){"use strict";var n=r(2),o=r(351).trim;n({target:"String",proto:!0,forced:r(352)("trim")},{trim:function(){return o(this)}})},351:function(t,e,r){var n=r(15),o="["+r(203)+"]",l=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),d=function(t){return function(e){var r=String(n(e));return 1&t&&(r=r.replace(l,"")),2&t&&(r=r.replace(c,"")),r}};t.exports={start:d(1),end:d(2),trim:d(3)}},352:function(t,e,r){var n=r(4),o=r(203);t.exports=function(t){return n((function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t}))}},354:function(t,e){t.exports=[{name:"Banescale",is_ancient:!0},{name:"Bogsneak",is_ancient:!1},{name:"Coatl",is_ancient:!1},{name:"Fae",is_ancient:!1},{name:"Gaoler",is_ancient:!0},{name:"Guardian",is_ancient:!1},{name:"Imperial",is_ancient:!1},{name:"Mirror",is_ancient:!1},{name:"Nocturne",is_ancient:!1},{name:"Pearlcatcher",is_ancient:!1},{name:"Ridgeback",is_ancient:!1},{name:"Skydancer",is_ancient:!1},{name:"Snapper",is_ancient:!1},{name:"Spiral",is_ancient:!1},{name:"Tundra",is_ancient:!1},{name:"Veilspun",is_ancient:!0},{name:"Wildclaw",is_ancient:!1}]},357:function(t,e,r){"use strict";r.r(e);var n=r(14),o=r(204),l="This does not look like a valid source. Please make sure you've followed the listed directions.<br/> It is possible you have not selected enough of the page - please click the question mark above for a guide.<br/> You can also copy paste the entire dragon's page.",c="This isn't a g1 :(",d={name:"DragonSelectorRichText",data:function(){return{error:"",showTutorial:!1}},methods:{loadDragon:function(t){this.error="";var e="";try{window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/html"));var r=Object(o.dragonLookup)(e),d=Object(n.a)(r,1)[0];d?d.isFirstGen()?(this.$emit("loaded",[d]),this.$refs.dragonImportTextarea.value=""):this.error=c:this.error=l}catch(t){this.error=l}}}},f=r(34),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bg-indigo-300 rounded-lg  p-3 text-left ring-4 ring-indigo-300"},[r("h1",{staticClass:"text-2xl text-indigo-800 font-light"},[t._v("Select Dragons")]),t._v(" "),r("ol",{staticClass:"list-decimal ml-5 my-3"},[t._v("\n    Copy your dragon's profile and paste it into the box below.\n    "),r("button",{staticClass:"cursor-pointer bg-indigo-800 text-indigo-300 rounded-lg px-2",on:{click:function(){return t.showTutorial=!t.showTutorial}}},[t._v("?")])]),t._v(" "),t.showTutorial?r("div",{staticClass:"bg-indigo-500 text-center m-2 p-5 rounded-lg"},[r("img",{staticClass:"w-100 md:w-1/2 m-auto",attrs:{src:"/fr-tools/ref/dragon_selector_richtext.png"}})]):t._e(),t._v(" "),r("div",{staticClass:"flex"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg rounded-r-none p-2",attrs:{rows:"2"},on:{paste:t.loadDragon,input:function(t){return t.target.value=""}}})]),t._v(" "),t.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:t._s(t.error)}}):t._e()])}),[],!1,null,null,null);e.default=component.exports},358:function(t,e,r){"use strict";r.r(e);var n={name:"Alert"},o=r(34),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-3 bg-pink-700 text-pink-200 text-left rounded-lg flex border-pink-800"},[t._m(0),t._v(" "),r("div",{staticClass:"p-3 flex-1"},[t._t("default")],2)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-2xl bg-pink-800 text-pink-300 rounded-lg rounded-r-none font-bold p-5 flex items-center"},[r("span",[t._v("!")])])}],!1,null,null,null);e.default=component.exports},359:function(t,e,r){"use strict";r.r(e);var n=r(358),o=r(204),l={name:"DragonSelectorSource",components:{Alert:n.default},data:function(){return{error:""}},methods:{loadDragons:function(t){var e;window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/plain")),this.error="";var r=Object(o.dragonLookup)(e);r?(this.$emit("loaded",r),this.$refs.dragonImportTextarea.value=""):"view-source:"===e.substr(0,12)?this.error="You have copied a URL instead of the page source.<br/> <b>COPY PASTE THIS URL INTO YOUR ADDRESS BAR</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box.":"https://"===e.substr(0,8)?this.error="You have copied a URL instead of the page source.<br/> Copy this into your address bar: <b>view-source:".concat(e,"</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box."):"<html "===e.substr(0,6)?this.error="Sorry, I don't recognise this page! Please use either the dragon's profile page, or a lair/den page.":this.error="This does not look like a valid source. Please make sure you've followed the listed directions."}}},c=r(34),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bg-indigo-300 rounded-lg p-3 text-left ring-4 ring-indigo-300"},[r("br"),t._v(" "),r("Alert",[r("h4",{staticClass:"text-2xl"},[t._v("WARNING!")]),t._v(" "),r("ul",[r("li",[t._v("You are in SOURCE SELECTOR mode.")]),t._v(" "),r("li",[t._v("This can be used for bulk imports, but is more difficult to use.")]),t._v(" "),r("li",[t._v("Unless you know what you're doing, we recommend use of the STANDARD SELECTOR.")])]),t._v(" "),r("button",{staticClass:"cursor-pointer bg-pink-800 text-pink-300 p-2 mt-2 font-bold rounded-lg px-5 block",on:{click:function(e){return t.$emit("swapSelectorMode")}}},[t._v("Swap Back!")])]),t._v(" "),r("h1",{staticClass:"text-2xl text-indigo-800 font-light mt-2"},[t._v("Select Dragons (Source Selector Mode)")]),t._v(" "),t._m(0),t._v(" "),r("div",{staticClass:"flex"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg rounded-r-none p-2",attrs:{rows:"2"},on:{paste:t.loadDragons,input:function(t){return t.target.value=""}}})]),t._v(" "),t.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:t._s(t.error)}}):t._e(),t._v(" "),r("Alert",[r("ul",[r("li",[t._v("Lair/Den view will not load bred status or birth date.")]),t._v(" "),r("li",[r("b",[t._v("Check")]),t._v(" your bred dragons.")]),t._v(" "),r("li",[r("b",[t._v("Fill in")]),t._v(" birth date if you want special date pinglists.")])])])],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ol",{staticClass:"list-decimal ml-5 mb-3"},[r("li",[t._v("\n      Go to your lair tab, hibden tab, or to the dragon's page.\n    ")]),t._v(" "),r("li",[t._v('\n      Add "view-source:" to the beginning of the url and follow the link, eg:\n      '),r("div",{staticClass:"ml-5"},[r("u",{staticClass:"text-indigo-800"},[t._v("view-source:https://www1.flightrising.com/lair/318564/1720336/1")])])]),t._v(" "),r("li",[t._v("\n      Select the ENTIRE PAGE and copy paste it into the textbox below.\n    ")])])}],!1,null,null,null);e.default=component.exports},365:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},366:function(t,e,r){var map={"./af":211,"./af.js":211,"./ar":212,"./ar-dz":213,"./ar-dz.js":213,"./ar-kw":214,"./ar-kw.js":214,"./ar-ly":215,"./ar-ly.js":215,"./ar-ma":216,"./ar-ma.js":216,"./ar-sa":217,"./ar-sa.js":217,"./ar-tn":218,"./ar-tn.js":218,"./ar.js":212,"./az":219,"./az.js":219,"./be":220,"./be.js":220,"./bg":221,"./bg.js":221,"./bm":222,"./bm.js":222,"./bn":223,"./bn-bd":224,"./bn-bd.js":224,"./bn.js":223,"./bo":225,"./bo.js":225,"./br":226,"./br.js":226,"./bs":227,"./bs.js":227,"./ca":228,"./ca.js":228,"./cs":229,"./cs.js":229,"./cv":230,"./cv.js":230,"./cy":231,"./cy.js":231,"./da":232,"./da.js":232,"./de":233,"./de-at":234,"./de-at.js":234,"./de-ch":235,"./de-ch.js":235,"./de.js":233,"./dv":236,"./dv.js":236,"./el":237,"./el.js":237,"./en-au":238,"./en-au.js":238,"./en-ca":239,"./en-ca.js":239,"./en-gb":240,"./en-gb.js":240,"./en-ie":241,"./en-ie.js":241,"./en-il":242,"./en-il.js":242,"./en-in":243,"./en-in.js":243,"./en-nz":244,"./en-nz.js":244,"./en-sg":245,"./en-sg.js":245,"./eo":246,"./eo.js":246,"./es":247,"./es-do":248,"./es-do.js":248,"./es-mx":249,"./es-mx.js":249,"./es-us":250,"./es-us.js":250,"./es.js":247,"./et":251,"./et.js":251,"./eu":252,"./eu.js":252,"./fa":253,"./fa.js":253,"./fi":254,"./fi.js":254,"./fil":255,"./fil.js":255,"./fo":256,"./fo.js":256,"./fr":257,"./fr-ca":258,"./fr-ca.js":258,"./fr-ch":259,"./fr-ch.js":259,"./fr.js":257,"./fy":260,"./fy.js":260,"./ga":261,"./ga.js":261,"./gd":262,"./gd.js":262,"./gl":263,"./gl.js":263,"./gom-deva":264,"./gom-deva.js":264,"./gom-latn":265,"./gom-latn.js":265,"./gu":266,"./gu.js":266,"./he":267,"./he.js":267,"./hi":268,"./hi.js":268,"./hr":269,"./hr.js":269,"./hu":270,"./hu.js":270,"./hy-am":271,"./hy-am.js":271,"./id":272,"./id.js":272,"./is":273,"./is.js":273,"./it":274,"./it-ch":275,"./it-ch.js":275,"./it.js":274,"./ja":276,"./ja.js":276,"./jv":277,"./jv.js":277,"./ka":278,"./ka.js":278,"./kk":279,"./kk.js":279,"./km":280,"./km.js":280,"./kn":281,"./kn.js":281,"./ko":282,"./ko.js":282,"./ku":283,"./ku.js":283,"./ky":284,"./ky.js":284,"./lb":285,"./lb.js":285,"./lo":286,"./lo.js":286,"./lt":287,"./lt.js":287,"./lv":288,"./lv.js":288,"./me":289,"./me.js":289,"./mi":290,"./mi.js":290,"./mk":291,"./mk.js":291,"./ml":292,"./ml.js":292,"./mn":293,"./mn.js":293,"./mr":294,"./mr.js":294,"./ms":295,"./ms-my":296,"./ms-my.js":296,"./ms.js":295,"./mt":297,"./mt.js":297,"./my":298,"./my.js":298,"./nb":299,"./nb.js":299,"./ne":300,"./ne.js":300,"./nl":301,"./nl-be":302,"./nl-be.js":302,"./nl.js":301,"./nn":303,"./nn.js":303,"./oc-lnc":304,"./oc-lnc.js":304,"./pa-in":305,"./pa-in.js":305,"./pl":306,"./pl.js":306,"./pt":307,"./pt-br":308,"./pt-br.js":308,"./pt.js":307,"./ro":309,"./ro.js":309,"./ru":310,"./ru.js":310,"./sd":311,"./sd.js":311,"./se":312,"./se.js":312,"./si":313,"./si.js":313,"./sk":314,"./sk.js":314,"./sl":315,"./sl.js":315,"./sq":316,"./sq.js":316,"./sr":317,"./sr-cyrl":318,"./sr-cyrl.js":318,"./sr.js":317,"./ss":319,"./ss.js":319,"./sv":320,"./sv.js":320,"./sw":321,"./sw.js":321,"./ta":322,"./ta.js":322,"./te":323,"./te.js":323,"./tet":324,"./tet.js":324,"./tg":325,"./tg.js":325,"./th":326,"./th.js":326,"./tk":327,"./tk.js":327,"./tl-ph":328,"./tl-ph.js":328,"./tlh":329,"./tlh.js":329,"./tr":330,"./tr.js":330,"./tzl":331,"./tzl.js":331,"./tzm":332,"./tzm-latn":333,"./tzm-latn.js":333,"./tzm.js":332,"./ug-cn":334,"./ug-cn.js":334,"./uk":335,"./uk.js":335,"./ur":336,"./ur.js":336,"./uz":337,"./uz-latn":338,"./uz-latn.js":338,"./uz.js":337,"./vi":339,"./vi.js":339,"./x-pseudo":340,"./x-pseudo.js":340,"./yo":341,"./yo.js":341,"./zh-cn":342,"./zh-cn.js":342,"./zh-hk":343,"./zh-hk.js":343,"./zh-mo":344,"./zh-mo.js":344,"./zh-tw":345,"./zh-tw.js":345};function n(t){var e=o(t);return r(e)}function o(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=o,t.exports=n,n.id=366},383:function(t,e,r){"use strict";r.r(e);var n=r(357),o=r(359),l={name:"DragonSelector",components:{DragonSelectorRichText:n.default,DragonSelectorSource:o.default},data:function(){return{isSourceSelectorMode:!0}}},c=r(34),component=Object(c.a)(l,(function(){var t=this,e=this,r=e.$createElement,n=e._self._c||r;return n("div",[e.isSourceSelectorMode?e._e():n("a",{staticClass:"cursor-pointer float-right bg-indigo-800 text-indigo-300 px-3 py-1 rounded-tr-lg rounded-bl-lg",on:{click:function(){return e.isSourceSelectorMode=!e.isSourceSelectorMode}}},[e._v("Swap Selector")]),e._v(" "),e.isSourceSelectorMode?e._e():n("DragonSelectorRichText",{on:{loaded:function(e){return t.$emit("loaded",e)}}}),e._v(" "),e.isSourceSelectorMode?n("DragonSelectorSource",{on:{loaded:function(e){return t.$emit("loaded",e)},swapSelectorMode:function(){return e.isSourceSelectorMode=!1}}}):e._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DragonSelectorRichText:r(357).default,DragonSelectorSource:r(359).default})}}]);