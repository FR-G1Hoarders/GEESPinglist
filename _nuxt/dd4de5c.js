(window.webpackJsonp=window.webpackJsonp||[]).push([[8,6,9,10],{203:function(t,e){t.exports={Light:{background:"#ebf8ff",button:"bg-gray-800 text-gray-100",text:"bg-indigo-300 text-gray-900 border-white",outText:"text-gray-800",highlightText:"bg-white text-gray-900 border-indigo-300",invalid:"bg-indigo-200 text-gray-500",select:"bg-gray-200 text-gray-900"},Dark:{background:"#1a202c",button:"bg-indigo-300 text-gray-800",text:"bg-gray-800 text-gray-300 border-gray-200",outText:"text-blue-100",highlightText:"bg-gray-200 text-gray-800 border-gray-800",invalid:"bg-gray-700 text-gray-800",select:"bg-gray-300 text-gray-900"}}},211:function(t,e,r){"use strict";r.r(e);var o=r(14),n=(r(79),r(35),r(58),r(208)),l=r(203),c=r.n(l),d="This does not look like a valid source. Please make sure you've followed the listed directions.<br/> It is possible you have not selected enough of the page - please click the question mark above for a guide.<br/> You can also copy paste the entire dragon's page.",h="This isn't a g1 :(",f={name:"DragonSelectorRichText",props:{theme:{type:String,required:!0}},data:function(){return{error:"",showTutorial:!1,latestInfo:"",infoTimer:null,errorTimer:null}},computed:{buttonTheme:function(){return"Light"===this.theme?c.a.Light.button:"Dark"===this.theme?c.a.Dark.button:void 0},textTheme:function(){return"Light"===this.theme?c.a.Light.text:"Dark"===this.theme?c.a.Dark.text:void 0},highlightTheme:function(){return"Light"===this.theme?c.a.Light.highlightText:"Dark"===this.theme?c.a.Dark.highlightText:void 0},selectTheme:function(){return"Light"===this.theme?c.a.Light.select:"Dark"===this.theme?c.a.Dark.select:void 0}},methods:{loadDragon:function(t){if(this.error="",":crogge:"===t.clipboardData.getData("text"))this.$emit("unlock"),this.error="Debug mode has been unlocked.";else{var e="";try{window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/html")),this.processInput(e)}catch(t){this.error=d}}},processInput:function(t){this.error="";try{var e=Object(n.dragonLookup)(t),r=Object(o.a)(e,1)[0];r?r.isFirstGen()?(this.$emit("loaded",[r]),this.$refs.dragonImportTextarea.value="",this.latestInfo=r.name().concat(" (#",r.id(),") has been added!"),sessionStorage.setItem(r.id(),t)):this.error=h:this.error=d}catch(t){this.error=d}},removeThis:function(t,e){this.latestInfo=e.concat(" (#",t,") has been removed!"),sessionStorage.removeItem(t)},removeAll:function(){this.latestInfo="All dragons have been removed!",sessionStorage.clear()}},watch:{latestInfo:function(){var t=this;this.infoTimer&&clearTimeout(this.infoTimer),this.infoTimer=setTimeout((function(){t.latestInfo=""}),8e3)},error:function(){var t=this;this.errorTimer&&clearTimeout(this.errorTimer),this.errorTimer=setTimeout((function(){t.error=""}),8e3)}},mounted:function(){for(var i=0;i<sessionStorage.length;i++){var t=sessionStorage.key(i);this.processInput(sessionStorage.getItem(t))}}},m=r(34),component=Object(m.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"rounded-lg p-3 text-left",class:t.textTheme},[r("h1",{staticClass:"text-2xl font-light"},[t._v("Select Dragons")]),t._v(" "),r("ol",{staticClass:"list-decimal ml-5 my-3"},[t._v("\n    Copy your dragon's profile and paste it into the box below.\n    "),r("button",{staticClass:"cursor-pointer rounded-lg px-2",class:t.buttonTheme,on:{click:function(){return t.showTutorial=!t.showTutorial}}},[t._v("?")])]),t._v(" "),t.showTutorial?r("div",{staticClass:"text-center m-2 p-5 rounded-lg",class:t.highlightTheme},[r("img",{staticClass:"w-100 md:w-1/2 m-auto",attrs:{src:"/GEESPinglist/ref/dragon_selector_richtext.png"}})]):t._e(),t._v(" "),r("div",{staticClass:"flex flex-col"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg p-2",class:t.selectTheme,staticStyle:{resize:"none"},attrs:{rows:"2"},on:{paste:t.loadDragon,input:function(t){return t.target.value=""}}}),t._v(" "),t.latestInfo?r("div",{staticClass:"float-right p-2 mt-2 rounded-lg text-base",class:t.highlightTheme},[t._v(t._s(t.latestInfo))]):t._e()]),t._v(" "),t.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:t._s(t.error)}}):t._e()])}),[],!1,null,null,null);e.default=component.exports},212:function(t,e,r){"use strict";r.r(e);var o=r(213),n=r(208),l={name:"DragonSelectorSource",components:{Alert:o.default},data:function(){return{error:""}},methods:{loadDragons:function(t){var e;window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/plain")),this.error="";var r=Object(n.dragonLookup)(e);r?(this.$emit("loaded",r),this.$refs.dragonImportTextarea.value=""):"view-source:"===e.substr(0,12)?this.error="You have copied a URL instead of the page source.<br/> <b>COPY PASTE THIS URL INTO YOUR ADDRESS BAR</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box.":"https://"===e.substr(0,8)?this.error="You have copied a URL instead of the page source.<br/> Copy this into your address bar: <b>view-source:".concat(e,"</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box."):"<html "===e.substr(0,6)?this.error="Sorry, I don't recognise this page! Please use either the dragon's profile page, or a lair/den page.":this.error="This does not look like a valid source. Please make sure you've followed the listed directions."}}},c=r(34),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bg-indigo-300 rounded-lg p-3 text-left ring-4 ring-indigo-300"},[r("br"),t._v(" "),r("Alert",[r("h4",{staticClass:"text-2xl"},[t._v("WARNING!")]),t._v(" "),r("ul",[r("li",[t._v("You are in SOURCE SELECTOR mode.")]),t._v(" "),r("li",[t._v("This can be used for bulk imports, but is more difficult to use.")]),t._v(" "),r("li",[t._v("Unless you know what you're doing, we recommend use of the STANDARD SELECTOR.")])]),t._v(" "),r("button",{staticClass:"cursor-pointer bg-pink-800 text-pink-300 p-2 mt-2 font-bold rounded-lg px-5 block",on:{click:function(e){return t.$emit("swapSelectorMode")}}},[t._v("Swap Back!")])]),t._v(" "),r("h1",{staticClass:"text-2xl text-indigo-800 font-light mt-2"},[t._v("Select Dragons (Source Selector Mode)")]),t._v(" "),t._m(0),t._v(" "),r("div",{staticClass:"flex"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg rounded-r-none p-2",attrs:{rows:"2"},on:{paste:t.loadDragons,input:function(t){return t.target.value=""}}})]),t._v(" "),t.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:t._s(t.error)}}):t._e(),t._v(" "),r("Alert",[r("ul",[r("li",[t._v("Lair/Den view will not load bred status or birth date.")]),t._v(" "),r("li",[r("b",[t._v("Check")]),t._v(" your bred dragons.")]),t._v(" "),r("li",[r("b",[t._v("Fill in")]),t._v(" birth date if you want special date pinglists.")])])])],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ol",{staticClass:"list-decimal ml-5 mb-3"},[r("li",[t._v("\n      Go to your lair tab, hibden tab, or to the dragon's page.\n    ")]),t._v(" "),r("li",[t._v('\n      Add "view-source:" to the beginning of the url and follow the link, eg:\n      '),r("div",{staticClass:"ml-5"},[r("u",{staticClass:"text-indigo-800"},[t._v("view-source:https://www1.flightrising.com/lair/318564/1720336/1")])])]),t._v(" "),r("li",[t._v("\n      Select the ENTIRE PAGE and copy paste it into the textbox below.\n    ")])])}],!1,null,null,null);e.default=component.exports},213:function(t,e,r){"use strict";r.r(e);var o={name:"Alert"},n=r(34),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-3 bg-pink-700 text-pink-200 text-left rounded-lg flex border-pink-800"},[t._m(0),t._v(" "),r("div",{staticClass:"p-3 flex-1"},[t._t("default")],2)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-2xl bg-pink-800 text-pink-300 rounded-lg rounded-r-none font-bold p-5 flex items-center"},[r("span",[t._v("!")])])}],!1,null,null,null);e.default=component.exports},236:function(t,e,r){"use strict";r.r(e);var o=r(211),n=r(212),l={name:"DragonSelector",components:{DragonSelectorRichText:o.default,DragonSelectorSource:n.default},props:{theme:{type:String,required:!0}},data:function(){return{isSourceSelectorMode:!1}}},c=r(34),component=Object(c.a)(l,(function(){var t=this,e=this,r=e.$createElement,o=e._self._c||r;return o("div",[e.isSourceSelectorMode?e._e():o("DragonSelectorRichText",e._g({ref:"dsrt",attrs:{theme:e.theme},on:{loaded:function(e){return t.$emit("loaded",e)}}},e.$listeners)),e._v(" "),e.isSourceSelectorMode?o("DragonSelectorSource",{on:{loaded:function(e){return t.$emit("loaded",e)},swapSelectorMode:function(){return e.isSourceSelectorMode=!1}}}):e._e()],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{DragonSelectorRichText:r(211).default,DragonSelectorSource:r(212).default})}}]);