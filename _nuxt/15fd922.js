(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{203:function(t,e){t.exports={Light:{background:"#ebf8ff",button:"bg-gray-800 text-gray-100",text:"bg-indigo-300 text-gray-900 border-white",outText:"text-gray-800",highlightText:"bg-white text-gray-900 border-indigo-300",invalid:"bg-indigo-200 text-gray-500",select:"bg-gray-200 text-gray-900"},Dark:{background:"#1a202c",button:"bg-indigo-300 text-gray-800",text:"bg-gray-800 text-gray-300 border-gray-200",outText:"text-blue-100",highlightText:"bg-gray-200 text-gray-800 border-gray-800",invalid:"bg-gray-700 text-gray-800",select:"bg-gray-300 text-gray-900"}}},211:function(t,e,r){"use strict";r.r(e);var o=r(14),n=(r(79),r(35),r(58),r(208)),l=r(203),h=r.n(l),c="This does not look like a valid source. Please make sure you've followed the listed directions.<br/> It is possible you have not selected enough of the page - please click the question mark above for a guide.<br/> You can also copy paste the entire dragon's page.",d="This isn't a g1 :(",m={name:"DragonSelectorRichText",props:{theme:{type:String,required:!0}},data:function(){return{error:"",showTutorial:!1,latestInfo:"",infoTimer:null,errorTimer:null,ready:!1}},computed:{buttonTheme:function(){return"Light"===this.theme?h.a.Light.button:"Dark"===this.theme?h.a.Dark.button:void 0},textTheme:function(){return"Light"===this.theme?h.a.Light.text:"Dark"===this.theme?h.a.Dark.text:void 0},highlightTheme:function(){return"Light"===this.theme?h.a.Light.highlightText:"Dark"===this.theme?h.a.Dark.highlightText:void 0},selectTheme:function(){return"Light"===this.theme?h.a.Light.select:"Dark"===this.theme?h.a.Dark.select:void 0}},methods:{loadDragon:function(t){if(this.error="",":crogge:"===t.clipboardData.getData("text"))this.$emit("unlock"),this.error="Debug mode has been unlocked.";else if(this.ready){var e="";try{window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/html")),this.processInput(e)}catch(t){this.error=c}}else this.error="Still loading!"},processInput:function(t){this.error="";try{var e=Object(n.dragonLookup)(t),r=Object(o.a)(e,1)[0];r?r.isFirstGen()?(this.$emit("loaded",[r]),this.$refs.dragonImportTextarea.value="",this.latestInfo=r.name().concat(" (#",r.id(),") has been added!"),sessionStorage.setItem(r.id(),t)):this.error=d:this.error=c}catch(t){this.error=c}},removeThis:function(t,e){this.latestInfo=e.concat(" (#",t,") has been removed!"),sessionStorage.removeItem(t)},removeAll:function(){this.latestInfo="All dragons have been removed!",sessionStorage.clear()}},watch:{latestInfo:function(){var t=this;this.infoTimer&&clearTimeout(this.infoTimer),this.infoTimer=setTimeout((function(){t.latestInfo=""}),8e3)},error:function(){var t=this;this.errorTimer&&clearTimeout(this.errorTimer),this.errorTimer=setTimeout((function(){t.error=""}),8e3)},"$parent.$parent.isMounted":function(t){this.ready=!!t}}},f=r(34),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"rounded-lg p-3 text-left",class:t.textTheme},[r("h1",{staticClass:"text-2xl font-light"},[t._v("Select Dragons")]),t._v(" "),r("ol",{staticClass:"list-decimal ml-5 my-3"},[t._v("\n    Copy your dragon's profile and paste it into the box below.\n    "),r("button",{staticClass:"cursor-pointer rounded-lg px-2",class:t.buttonTheme,on:{click:function(){return t.showTutorial=!t.showTutorial}}},[t._v("?")])]),t._v(" "),t.showTutorial?r("div",{staticClass:"text-center m-2 p-5 rounded-lg",class:t.highlightTheme},[r("img",{staticClass:"w-100 md:w-1/2 m-auto",attrs:{src:"/GEESPinglist/ref/dragon_selector_richtext.png"}})]):t._e(),t._v(" "),r("div",{staticClass:"flex flex-col"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg p-2",class:t.selectTheme,staticStyle:{resize:"none"},attrs:{rows:"2"},on:{paste:t.loadDragon,input:function(t){return t.target.value=""}}}),t._v(" "),t.latestInfo?r("div",{staticClass:"float-right p-2 mt-2 rounded-lg text-base",class:t.highlightTheme},[t._v(t._s(t.latestInfo))]):t._e()]),t._v(" "),t.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:t._s(t.error)}}):t._e()])}),[],!1,null,null,null);e.default=component.exports}}]);