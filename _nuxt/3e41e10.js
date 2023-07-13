(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{203:function(e,t){e.exports={Light:{background:"#ebf8ff",button:"bg-gray-800 text-gray-100",text:"bg-indigo-300 text-gray-900 border-white",outText:"text-gray-800",highlightText:"bg-white text-gray-900 border-indigo-300",invalid:"bg-indigo-200 text-gray-500",select:"bg-gray-200 text-gray-900"},Dark:{background:"#1a202c",button:"bg-indigo-300 text-gray-800",text:"bg-gray-800 text-gray-300 border-gray-200",outText:"text-blue-100",highlightText:"bg-gray-200 text-gray-800 border-gray-800",invalid:"bg-gray-700 text-gray-800",select:"bg-gray-300 text-gray-900"}}},232:function(e,t){e.exports=["Snowbellies","Pastels","Eyeburners","Pastel goths","Sweets","Tree","Natural","Autumn","Flags (countries)","Flags (LGBTQ+)","Holidays (Christmas)","Holidays (Halloween)","Reds","Oranges","Yellows","Greens","Blues","Purples","Pinks","Browns","Greyscale","Flight reps (all)","Flight reps (matching eyes)","2 Letter names","Roundsey triples","Roundsey doubles","Roundsey primals","Roundsey others","Near miss","Matching eyes","Lunar/solar events"]},237:function(e,t,r){"use strict";r.r(t);var n=r(232),o=r.n(n),d=r(203),l=r.n(d),c={name:"Dragon",props:{dragon:{type:Object,required:!0},theme:{type:String,required:!0},dragonImage:{required:!0}},data:function(){return{tags:o.a}},computed:{buttonTheme:function(){return"Light"===this.theme?l.a.Light.button:"Dark"===this.theme?l.a.Dark.button:void 0},textTheme:function(){return"Light"===this.theme?l.a.Light.text:"Dark"===this.theme?l.a.Dark.text:void 0},highlightTheme:function(){return"Light"===this.theme?l.a.Light.highlightText:"Dark"===this.theme?l.a.Dark.highlightText:void 0},invalidTheme:function(){return"Light"===this.theme?l.a.Light.invalid:"Dark"===this.theme?l.a.Dark.invalid:void 0},selectTheme:function(){return"Light"===this.theme?l.a.Light.select:"Dark"===this.theme?l.a.Dark.select:void 0}},methods:{addTag:function(e){var select=this.$refs.tagSelect,t=select.options[select.selectedIndex].text;"Add Tag"!==t&&this.dragon.pushTag(t),select.selectedIndex=0}}},h=r(34),component=Object(h.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mt-3 text-left rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-4",class:e.highlightTheme},[r("div",{staticClass:"justify-around flex-col w-full text-center sm:col-span-2 lg:col-span-1"},[r("div",{staticClass:"flex block rounded-xl items-stretch border-4",class:e.textTheme},[r("div",{staticClass:"p-1 flex-1 flex items-center"},[r("span",{staticClass:"w-full text-center"},[r("a",{attrs:{href:"https://www1.flightrising.com/dragon/"+e.dragon.id(),target:"_blank",rel:"noopener"}},[e._v(e._s(e.dragon.name())+" #"+e._s(e.dragon.id()))])])]),e._v(" "),r("button",{staticClass:"rounded-r-lg p-1 px-4 text-center lg:p-1 lg:px-2",class:e.buttonTheme,on:{click:function(t){return e.$emit("remove")}}},[e._v("\n        X\n      ")])]),e._v(" "),r("div",{staticClass:"p-1 py-2 hidden lg:inline-block"},[r("a",{attrs:{href:"https://www1.flightrising.com/dragon/"+e.dragon.id(),target:"_blank",rel:"noopener"}},[r("img",{attrs:{src:e.dragonImage}})])])]),e._v(" "),r("div",{staticClass:"pl-4 xl:pt-10 py-1 lg:pt-12 flex-col items-center"},[e._v("\n    "+e._s(e.dragon.gender())+" "+e._s(e.dragon.breed())),r("br"),e._v("\n    "+e._s(e.dragon.flight())+" "+e._s(e.dragon.eyes())),r("br"),e._v("\n    "+e._s(e.dragon.colorPattern())+" "+e._s(e.dragon.digits())+" Digits"),r("br"),e._v(" "),r("img",{attrs:{src:"/GEESPinglist/ref/"+e.dragon.flight()+".png"}})]),e._v(" "),r("div",{staticClass:"lg:pl-0 pl-4 py-1 xl:pt-10 lg:pt-12 flex-col items-center"},[r("span",{style:{backgroundColor:e.dragon.primaryHex()}},[e._v("  ")]),e._v(" \n    "+e._s(e.dragon.primaryColor())+" "+e._s(e.dragon.primaryGene())),r("br"),e._v(" "),r("span",{style:{backgroundColor:e.dragon.secondaryHex()}},[e._v("  ")]),e._v(" \n    "+e._s(e.dragon.secondaryColor())+" "+e._s(e.dragon.secondaryGene())),r("br"),e._v(" "),r("span",{style:{backgroundColor:e.dragon.tertiaryHex()}},[e._v("  ")]),e._v(" \n    "+e._s(e.dragon.tertiaryColor())+" "+e._s(e.dragon.tertiaryGene())),r("br")]),e._v(" "),r("div",{staticClass:"px-3 mt-2 sm:my-2"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.dragon.data.dateOfBirth,expression:"dragon.data.dateOfBirth"}],staticClass:"p-2 block w-full text-center",class:e.selectTheme,attrs:{type:"text",placeholder:"YYYY-MM-DD",disabled:""},domProps:{value:e.dragon.data.dateOfBirth},on:{input:function(t){t.target.composing||e.$set(e.dragon.data,"dateOfBirth",t.target.value)}}}),e._v(" "),r("label",{staticClass:"block my-1 p-1 px-2 rounded",class:e.textTheme},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.dragon.data.isBred,expression:"dragon.data.isBred"}],attrs:{type:"checkbox",disabled:""},domProps:{checked:Array.isArray(e.dragon.data.isBred)?e._i(e.dragon.data.isBred,null)>-1:e.dragon.data.isBred},on:{change:function(t){var r=e.dragon.data.isBred,n=t.target,o=!!n.checked;if(Array.isArray(r)){var d=e._i(r,null);n.checked?d<0&&e.$set(e.dragon.data,"isBred",r.concat([null])):d>-1&&e.$set(e.dragon.data,"isBred",r.slice(0,d).concat(r.slice(d+1)))}else e.$set(e.dragon.data,"isBred",o)}}}),e._v(" Bred\n    ")]),e._v(" "),r("label",{staticClass:"block my-1 p-1 px-2 rounded",class:e.textTheme},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.dragon.data.hasSilhouette,expression:"dragon.data.hasSilhouette"}],attrs:{type:"checkbox",disabled:""},domProps:{checked:Array.isArray(e.dragon.data.hasSilhouette)?e._i(e.dragon.data.hasSilhouette,null)>-1:e.dragon.data.hasSilhouette},on:{change:function(t){var r=e.dragon.data.hasSilhouette,n=t.target,o=!!n.checked;if(Array.isArray(r)){var d=e._i(r,null);n.checked?d<0&&e.$set(e.dragon.data,"hasSilhouette",r.concat([null])):d>-1&&e.$set(e.dragon.data,"hasSilhouette",r.slice(0,d).concat(r.slice(d+1)))}else e.$set(e.dragon.data,"hasSilhouette",o)}}}),e._v(" Silhouette\n    ")]),e._v(" "),r("label",{staticClass:"block my-1 p-1 px-2 rounded",class:e.textTheme},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.dragon.data.isPermababy,expression:"dragon.data.isPermababy"}],attrs:{type:"checkbox",disabled:""},domProps:{checked:Array.isArray(e.dragon.data.isPermababy)?e._i(e.dragon.data.isPermababy,null)>-1:e.dragon.data.isPermababy},on:{change:function(t){var r=e.dragon.data.isPermababy,n=t.target,o=!!n.checked;if(Array.isArray(r)){var d=e._i(r,null);n.checked?d<0&&e.$set(e.dragon.data,"isPermababy",r.concat([null])):d>-1&&e.$set(e.dragon.data,"isPermababy",r.slice(0,d).concat(r.slice(d+1)))}else e.$set(e.dragon.data,"isPermababy",o)}}}),e._v(" Permababy\n    ")])]),e._v(" "),r("div",{staticClass:"p-3"},[r("select",{ref:"tagSelect",staticClass:"block p-2 rounded-lg mb-2 w-full",class:e.selectTheme,on:{change:e.addTag}},[r("option",[e._v("Add Tag")]),e._v(" "),e._l(e.tags,(function(t,i){return r("option",{key:i},[e._v(e._s(t))])}))],2),e._v(" "),e._l(e.dragon.tags(),(function(t,i){return r("label",{key:i,staticClass:"block m-1 px-1 text-sm rounded cursor-pointer",class:e.textTheme,on:{click:function(t){return e.dragon.removeTag(i)}}},[e._v("\n      "+e._s(t)+"\n      "),r("span",{staticClass:"float-right"},[e._v("X")])])}))],2)])}),[],!1,null,null,null);t.default=component.exports}}]);