(window.webpackJsonp=window.webpackJsonp||[]).push([[9,5,7],{202:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r},e.exports.default=e.exports,e.exports.__esModule=!0},203:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},205:function(e,t,r){var n=r(211),o=r(212),l=r(206),c=r(213);e.exports=function(e){return n(e)||o(e)||l(e)||c()},e.exports.default=e.exports,e.exports.__esModule=!0},206:function(e,t,r){var n=r(202);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},209:function(e,t,r){"use strict";var n=r(2),o=r(58).find,l=r(109),c=r(38),d="find",h=!0,f=c(d);d in[]&&Array(1).find((function(){h=!1})),n({target:"Array",proto:!0,forced:h||!f},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),l(d)},211:function(e,t,r){var n=r(202);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.default=e.exports,e.exports.__esModule=!0},212:function(e,t){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.default=e.exports,e.exports.__esModule=!0},213:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},214:function(e,t,r){var n=r(15),o="["+r(203)+"]",l=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),d=function(e){return function(t){var r=String(n(t));return 1&e&&(r=r.replace(l,"")),2&e&&(r=r.replace(c,"")),r}};e.exports={start:d(1),end:d(2),trim:d(3)}},215:function(e,t,r){var n=r(4),o=r(203);e.exports=function(e){return n((function(){return!!o[e]()||"​᠎"!="​᠎"[e]()||o[e].name!==e}))}},217:function(e,t,r){var n=r(205);r(35),r(80),r(56),r(209),r(11),r(57),r(45),r(218),r(24),r(152),r(108),r(36);var o=r(364),l=r(198),c=r(358),d=["Common","Dark Sclera","Glowing","Innocent","Swirl","Uncommon","Unusual"],h=r(359);function f(data){return{data:data,id:function(){return this.data.id},name:function(){return this.data.name},displayName:function(){return"".concat(this.name(),"#").concat(this.id())},gender:function(){return this.data.gender},breed:function(){return this.data.breed},flight:function(){return this.data.flight},eyes:function(){return this.data.eyes},hasNormalEyes:function(){return d.includes(this.eyes())},primaryColor:function(){return this.data.primaryColor},primaryGene:function(){return this.data.primaryGene},secondaryColor:function(){return this.data.secondaryColor},secondaryGene:function(){return this.data.secondaryGene},tertiaryColor:function(){return this.data.tertiaryColor},tertiaryGene:function(){return this.data.tertiaryGene},dateOfBirth:function(){return this.data.dateOfBirth},isFirstGen:function(){return this.data.isFirstGen},isBred:function(){return this.data.isBred},isAncient:function(){var e=this;return c.find((function(t){return t.name===e.breed()})).is_ancient},hasSilhouette:function(){return this.data.hasSilhouette},isPermababy:function(){return this.data.isPermababy},thumbnailImageUrl:function(){return"https://www1.flightrising.com/rendern/avatars/".concat(Math.ceil(this.data.id/100),"/").concat(this.data.id,".png")},colorPattern:function(){return e=this.data.primaryColor,t=this.data.secondaryColor,r=this.data.tertiaryColor,e===t&&e===r?"XXX":e===t&&e!==r?"XXY":e!==t&&t===r?"XYY":e===r&&e!==t?"XYX":"XYZ";var e,t,r},isNearMiss:function(){return"XYZ"===this.colorPattern()&&(e=this.data.primaryColor,t=this.data.secondaryColor,r=this.data.tertiaryColor,Math.abs(h[e]-h[t])<3||Math.abs(h[e]-h[r])<3||Math.abs(h[t]-h[r])<3||Math.abs(h[e]-h[t])>174||Math.abs(h[e]-h[r])>174||Math.abs(h[t]-h[r])>174);var e,t,r},digits:function(){return Math.ceil(Math.log(this.data.id)/Math.log(10))},tags:function(){return this.data.tags},hasTag:function(e){return this.data.tags.includes(e)},pushTag:function(e){return this.data.tags||(this.data.tags=[]),!this.data.tags.includes(e)&&(this.data.tags.push(e),!0)},removeTag:function(e){this.data.tags&&(this.data.tags=[].concat(n(this.data.tags.slice(0,e)),n(this.data.tags.slice(e+1))))}}}function m(e){var t=function(t,r){var n=e(".dragon-profile-stat-icon-value")[t];return r?e(n).html().split("<")[0].trim():e("strong",n).html()},r=e(".dragon-profile-header-number").html(),n=f({id:parseInt(r.substr(0,r.length-1).substr(2)),name:e(".dragon-profile-header-name").html(),gender:-1===e('[data-tooltip-source="#dragon-profile-icon-sex-tooltip"] img').attr("src").search("female")?"Male":"Female",isFirstGen:!e(".dragon-profile-lineage-parents a")[0],isBred:!!e(".dragon-profile-lineage-offspring a")[0],hasSilhouette:!!e('[data-tooltip-source="#dragon-profile-icon-silhouette-tooltip"]')[0],isPermababy:!!e('[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]')[0],primaryColor:t(0,!0),primaryGene:t(0,!1),secondaryColor:t(1,!0),secondaryGene:t(1,!1),tertiaryColor:t(2,!0),tertiaryGene:t(2,!1),breed:t(4,!1),flight:t(5,!0),eyes:t(5,!1),dateOfBirth:l(t(3,!1),"MMM DD, YYYY").format("YYYY-MM-DD"),tags:[]});return e(".dragon-profile-lineage-parents em")[0]&&"none (Raffle Prize)"===e(".dragon-profile-lineage-parents em").text()&&("XXX"===n.colorPattern()&&n.pushTag("Roundsey triples"),"XYZ"!==n.colorPattern()&&n.pushTag("Roundsey doubles"),"Primal"===n.eyes()&&n.pushTag("Roundsey primals"),"XYZ"===n.colorPattern()&&"Primal"!==n.eyes()&&n.pushTag("Roundsey others")),n.name().length<3&&n.pushTag("2 Letter names"),n.isNearMiss()&&n.pushTag("Near miss"),n}function j(e){return e(".lair-page-dragon").map((function(i){return function(e,t){var r=e(".lair-page-dragon-tumbnail",t).attr("rel"),n=e(r),o=f({id:parseInt(r.split("-")[1]),name:e("div",n).eq(1).text(),gender:e("div",n).eq(2).text().split(" ")[1],isFirstGen:"First Generation"===e("span",n).eq(2).text(),isBred:null,hasSilhouette:!!e('[data-tooltip-source="#icon-silhouette-tooltip"]',t)[0],isPermababy:!!e('[data-tooltip-source="#icon-eternal-youth-tooltip"]',t)[0],primaryColor:e("div",n).eq(8).text().split(" ")[2],primaryGene:e("div",n).eq(8).text().split(" ")[3],secondaryColor:e("div",n).eq(9).text().split(" ")[2],secondaryGene:e("div",n).eq(9).text().split(" ")[3],tertiaryColor:e("div",n).eq(10).text().split(" ")[2],tertiaryGene:e("div",n).eq(10).text().split(" ")[3],breed:e("div",n).eq(2).text().split(" ")[0],flight:e("div",n).eq(11).text().split(" ")[2],eyes:e("div",n).eq(11).text().split(" ")[3],dateOfBirth:null,tags:[]});o.name().length<3&&o.pushTag("2 Letter names");return o}(e,e(".lair-page-dragon").eq(i))})).toArray()}e.exports={Dragon:f,dragonLookup:function(e){try{var t=o.load(e),r=[];if(t("#error-404")[0])return null;if(t('meta[property="og:url"]')[0]&&"https://www1.flightrising.com/dragon/"===t('meta[property="og:url"]').attr("content").substr(0,37))r.push(m(t));else if(t("#lair-view-page")[0])r=r.concat(j(t));else{if(!t(".dragon-profile-header-title")[0]||!t(".dragon-profile-lineage-offspring")[0])return null;r.push(m(t))}return r}catch(e){}return null}}},218:function(e,t,r){"use strict";var n=r(2),o=r(214).trim;n({target:"String",proto:!0,forced:r(215)("trim")},{trim:function(){return o(this)}})},358:function(e,t){e.exports=[{name:"Banescale",is_ancient:!0},{name:"Bogsneak",is_ancient:!1},{name:"Coatl",is_ancient:!1},{name:"Fae",is_ancient:!1},{name:"Gaoler",is_ancient:!0},{name:"Guardian",is_ancient:!1},{name:"Imperial",is_ancient:!1},{name:"Mirror",is_ancient:!1},{name:"Nocturne",is_ancient:!1},{name:"Obelisk",is_ancient:!1},{name:"Pearlcatcher",is_ancient:!1},{name:"Ridgeback",is_ancient:!1},{name:"Skydancer",is_ancient:!1},{name:"Snapper",is_ancient:!1},{name:"Spiral",is_ancient:!1},{name:"Tundra",is_ancient:!1},{name:"Veilspun",is_ancient:!0},{name:"Wildclaw",is_ancient:!1}]},359:function(e,t){e.exports={Maize:0,Cream:1,Antique:2,White:3,Moon:4,Ice:5,Orca:6,Platinum:7,Silver:8,Dust:9,Grey:10,Smoke:11,Gloom:12,Lead:13,Shale:14,Flint:15,Charcoal:16,Coal:17,Oilslick:18,Black:19,Obsidian:20,Eldritch:21,Midnight:22,Shadow:23,Blackberry:24,Mulberry:25,Plum:26,Wisteria:27,Thistle:28,Fog:29,Mist:30,Lavender:31,Heather:32,Purple:33,Orchid:34,Amethyst:35,Nightshade:36,Violet:37,Grape:38,Royal:39,Eggplant:40,Iris:41,Storm:42,Twilight:43,Indigo:44,Sapphire:45,Navy:46,Cobalt:47,Ultramarine:48,Blue:49,Periwinkle:50,Lapis:51,Splash:52,Cornflower:53,Sky:54,Stonewash:55,Overcast:56,Steel:57,Denim:58,Abyss:59,Phthalo:60,Azure:61,Caribbean:62,Teal:63,Cerulean:64,Cyan:65,Robin:66,Aqua:67,Turquoise:68,Spruce:69,Pistachio:70,Seafoam:71,Mint:72,Jade:73,Spearmint:74,Thicket:75,Peacock:76,Emerald:77,Shamrock:78,Jungle:79,Hunter:80,Forest:81,Camo:82,Algae:83,Swamp:84,Avocado:85,Green:86,Fern:87,Mantis:88,Pear:89,Leaf:90,Radioactive:91,Honeydew:92,Peridot:93,Chartreuse:94,Spring:95,Crocodile:96,Olive:97,Murk:98,Moss:99,Goldenrod:100,Amber:101,Honey:102,Lemon:103,Yellow:104,Grapefruit:105,Banana:106,Sanddollar:107,Flaxen:108,Ivory:109,Buttercup:110,Gold:111,Metals:112,Marigold:113,Sunshine:114,Saffron:115,Sunset:116,Peach:117,Cantaloupe:118,Orange:119,Bronze:120,Terracotta:121,Carrot:122,Fire:123,Pumpkin:124,Tangerine:125,Cinnamon:126,Caramel:127,Sand:128,Tan:129,Beige:130,Stone:131,Taupe:132,Slate:133,Driftwood:134,Latte:135,Dirt:136,Clay:137,Sable:138,Umber:139,Soil:140,Hickory:141,Tarnish:142,Ginger:143,Brown:144,Chocolate:145,Auburn:146,Copper:147,Rust:148,Tomato:149,Vermilion:150,Ruby:151,Cherry:152,Crimson:153,Garnet:154,Sanguine:155,Blood:156,Maroon:157,Berry:158,Red:159,Strawberry:160,Cerise:161,Carmine:162,Brick:163,Coral:164,Blush:165,Cottoncandy:166,Watermelon:167,Magenta:168,Fuchsia:169,Raspberry:170,Wine:171,Mauve:172,Pink:173,Bubblegum:174,Rose:175,Pearl:176}},362:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},363:function(e,t,r){"use strict";r.r(t);var n={name:"Alert"},o=r(34),component=Object(o.a)(n,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mt-3 bg-pink-700 text-pink-200 text-left rounded-lg flex border-pink-800"},[e._m(0),e._v(" "),r("div",{staticClass:"p-3 flex-1"},[e._t("default")],2)])}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"text-2xl bg-pink-800 text-pink-300 rounded-lg rounded-r-none font-bold p-5 flex items-center"},[r("span",[e._v("!")])])}],!1,null,null,null);t.default=component.exports},376:function(e,t,r){var map={"./af":221,"./af.js":221,"./ar":222,"./ar-dz":223,"./ar-dz.js":223,"./ar-kw":224,"./ar-kw.js":224,"./ar-ly":225,"./ar-ly.js":225,"./ar-ma":226,"./ar-ma.js":226,"./ar-sa":227,"./ar-sa.js":227,"./ar-tn":228,"./ar-tn.js":228,"./ar.js":222,"./az":229,"./az.js":229,"./be":230,"./be.js":230,"./bg":231,"./bg.js":231,"./bm":232,"./bm.js":232,"./bn":233,"./bn-bd":234,"./bn-bd.js":234,"./bn.js":233,"./bo":235,"./bo.js":235,"./br":236,"./br.js":236,"./bs":237,"./bs.js":237,"./ca":238,"./ca.js":238,"./cs":239,"./cs.js":239,"./cv":240,"./cv.js":240,"./cy":241,"./cy.js":241,"./da":242,"./da.js":242,"./de":243,"./de-at":244,"./de-at.js":244,"./de-ch":245,"./de-ch.js":245,"./de.js":243,"./dv":246,"./dv.js":246,"./el":247,"./el.js":247,"./en-au":248,"./en-au.js":248,"./en-ca":249,"./en-ca.js":249,"./en-gb":250,"./en-gb.js":250,"./en-ie":251,"./en-ie.js":251,"./en-il":252,"./en-il.js":252,"./en-in":253,"./en-in.js":253,"./en-nz":254,"./en-nz.js":254,"./en-sg":255,"./en-sg.js":255,"./eo":256,"./eo.js":256,"./es":257,"./es-do":258,"./es-do.js":258,"./es-mx":259,"./es-mx.js":259,"./es-us":260,"./es-us.js":260,"./es.js":257,"./et":261,"./et.js":261,"./eu":262,"./eu.js":262,"./fa":263,"./fa.js":263,"./fi":264,"./fi.js":264,"./fil":265,"./fil.js":265,"./fo":266,"./fo.js":266,"./fr":267,"./fr-ca":268,"./fr-ca.js":268,"./fr-ch":269,"./fr-ch.js":269,"./fr.js":267,"./fy":270,"./fy.js":270,"./ga":271,"./ga.js":271,"./gd":272,"./gd.js":272,"./gl":273,"./gl.js":273,"./gom-deva":274,"./gom-deva.js":274,"./gom-latn":275,"./gom-latn.js":275,"./gu":276,"./gu.js":276,"./he":277,"./he.js":277,"./hi":278,"./hi.js":278,"./hr":279,"./hr.js":279,"./hu":280,"./hu.js":280,"./hy-am":281,"./hy-am.js":281,"./id":282,"./id.js":282,"./is":283,"./is.js":283,"./it":284,"./it-ch":285,"./it-ch.js":285,"./it.js":284,"./ja":286,"./ja.js":286,"./jv":287,"./jv.js":287,"./ka":288,"./ka.js":288,"./kk":289,"./kk.js":289,"./km":290,"./km.js":290,"./kn":291,"./kn.js":291,"./ko":292,"./ko.js":292,"./ku":293,"./ku.js":293,"./ky":294,"./ky.js":294,"./lb":295,"./lb.js":295,"./lo":296,"./lo.js":296,"./lt":297,"./lt.js":297,"./lv":298,"./lv.js":298,"./me":299,"./me.js":299,"./mi":300,"./mi.js":300,"./mk":301,"./mk.js":301,"./ml":302,"./ml.js":302,"./mn":303,"./mn.js":303,"./mr":304,"./mr.js":304,"./ms":305,"./ms-my":306,"./ms-my.js":306,"./ms.js":305,"./mt":307,"./mt.js":307,"./my":308,"./my.js":308,"./nb":309,"./nb.js":309,"./ne":310,"./ne.js":310,"./nl":311,"./nl-be":312,"./nl-be.js":312,"./nl.js":311,"./nn":313,"./nn.js":313,"./oc-lnc":314,"./oc-lnc.js":314,"./pa-in":315,"./pa-in.js":315,"./pl":316,"./pl.js":316,"./pt":317,"./pt-br":318,"./pt-br.js":318,"./pt.js":317,"./ro":319,"./ro.js":319,"./ru":320,"./ru.js":320,"./sd":321,"./sd.js":321,"./se":322,"./se.js":322,"./si":323,"./si.js":323,"./sk":324,"./sk.js":324,"./sl":325,"./sl.js":325,"./sq":326,"./sq.js":326,"./sr":327,"./sr-cyrl":328,"./sr-cyrl.js":328,"./sr.js":327,"./ss":329,"./ss.js":329,"./sv":330,"./sv.js":330,"./sw":331,"./sw.js":331,"./ta":332,"./ta.js":332,"./te":333,"./te.js":333,"./tet":334,"./tet.js":334,"./tg":335,"./tg.js":335,"./th":336,"./th.js":336,"./tk":337,"./tk.js":337,"./tl-ph":338,"./tl-ph.js":338,"./tlh":339,"./tlh.js":339,"./tr":340,"./tr.js":340,"./tzl":341,"./tzl.js":341,"./tzm":342,"./tzm-latn":343,"./tzm-latn.js":343,"./tzm.js":342,"./ug-cn":344,"./ug-cn.js":344,"./uk":345,"./uk.js":345,"./ur":346,"./ur.js":346,"./uz":347,"./uz-latn":348,"./uz-latn.js":348,"./uz.js":347,"./vi":349,"./vi.js":349,"./x-pseudo":350,"./x-pseudo.js":350,"./yo":351,"./yo.js":351,"./zh-cn":352,"./zh-cn.js":352,"./zh-hk":353,"./zh-hk.js":353,"./zh-mo":354,"./zh-mo.js":354,"./zh-tw":355,"./zh-tw.js":355};function n(e){var t=o(e);return r(t)}function o(e){if(!r.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}n.keys=function(){return Object.keys(map)},n.resolve=o,e.exports=n,n.id=376},383:function(e,t,r){"use strict";r.r(t);var n=r(363),o=r(217),l={name:"DragonSelectorSource",components:{Alert:n.default},data:function(){return{error:""}},methods:{loadDragons:function(e){var t;window.clipboardData&&window.clipboardData.getData?t=window.clipboardData.getData("Text"):e.clipboardData&&e.clipboardData.getData&&(t=e.clipboardData.getData("text/plain")),this.error="";var r=Object(o.dragonLookup)(t);r?(this.$emit("loaded",r),this.$refs.dragonImportTextarea.value=""):"view-source:"===t.substr(0,12)?this.error="You have copied a URL instead of the page source.<br/> <b>COPY PASTE THIS URL INTO YOUR ADDRESS BAR</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box.":"https://"===t.substr(0,8)?this.error="You have copied a URL instead of the page source.<br/> Copy this into your address bar: <b>view-source:".concat(t,"</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box."):"<html "===t.substr(0,6)?this.error="Sorry, I don't recognise this page! Please use either the dragon's profile page, or a lair/den page.":this.error="This does not look like a valid source. Please make sure you've followed the listed directions."}}},c=r(34),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"bg-indigo-300 rounded-lg p-3 text-left ring-4 ring-indigo-300"},[r("br"),e._v(" "),r("Alert",[r("h4",{staticClass:"text-2xl"},[e._v("WARNING!")]),e._v(" "),r("ul",[r("li",[e._v("You are in SOURCE SELECTOR mode.")]),e._v(" "),r("li",[e._v("This can be used for bulk imports, but is more difficult to use.")]),e._v(" "),r("li",[e._v("Unless you know what you're doing, we recommend use of the STANDARD SELECTOR.")])]),e._v(" "),r("button",{staticClass:"cursor-pointer bg-pink-800 text-pink-300 p-2 mt-2 font-bold rounded-lg px-5 block",on:{click:function(t){return e.$emit("swapSelectorMode")}}},[e._v("Swap Back!")])]),e._v(" "),r("h1",{staticClass:"text-2xl text-indigo-800 font-light mt-2"},[e._v("Select Dragons (Source Selector Mode)")]),e._v(" "),e._m(0),e._v(" "),r("div",{staticClass:"flex"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg rounded-r-none p-2",attrs:{rows:"2"},on:{paste:e.loadDragons,input:function(e){return e.target.value=""}}})]),e._v(" "),e.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:e._s(e.error)}}):e._e(),e._v(" "),r("Alert",[r("ul",[r("li",[e._v("Lair/Den view will not load bred status or birth date.")]),e._v(" "),r("li",[r("b",[e._v("Check")]),e._v(" your bred dragons.")]),e._v(" "),r("li",[r("b",[e._v("Fill in")]),e._v(" birth date if you want special date pinglists.")])])])],1)}),[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ol",{staticClass:"list-decimal ml-5 mb-3"},[r("li",[e._v("\n      Go to your lair tab, hibden tab, or to the dragon's page.\n    ")]),e._v(" "),r("li",[e._v('\n      Add "view-source:" to the beginning of the url and follow the link, eg:\n      '),r("div",{staticClass:"ml-5"},[r("u",{staticClass:"text-indigo-800"},[e._v("view-source:https://www1.flightrising.com/lair/318564/1720336/1")])])]),e._v(" "),r("li",[e._v("\n      Select the ENTIRE PAGE and copy paste it into the textbox below.\n    ")])])}],!1,null,null,null);t.default=component.exports}}]);