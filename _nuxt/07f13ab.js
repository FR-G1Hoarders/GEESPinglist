(window.webpackJsonp=window.webpackJsonp||[]).push([[10,6],{212:function(t,e,r){"use strict";r.r(e);var o=r(213),n=r(208),l={name:"DragonSelectorSource",components:{Alert:o.default},data:function(){return{error:""}},methods:{loadDragons:function(t){var e;window.clipboardData&&window.clipboardData.getData?e=window.clipboardData.getData("Text"):t.clipboardData&&t.clipboardData.getData&&(e=t.clipboardData.getData("text/plain")),this.error="";var r=Object(n.dragonLookup)(e);r?(this.$emit("loaded",r),this.$refs.dragonImportTextarea.value=""):"view-source:"===e.substr(0,12)?this.error="You have copied a URL instead of the page source.<br/> <b>COPY PASTE THIS URL INTO YOUR ADDRESS BAR</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box.":"https://"===e.substr(0,8)?this.error="You have copied a URL instead of the page source.<br/> Copy this into your address bar: <b>view-source:".concat(e,"</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box."):"<html "===e.substr(0,6)?this.error="Sorry, I don't recognise this page! Please use either the dragon's profile page, or a lair/den page.":this.error="This does not look like a valid source. Please make sure you've followed the listed directions."}}},d=r(34),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bg-indigo-300 rounded-lg p-3 text-left ring-4 ring-indigo-300"},[r("br"),t._v(" "),r("Alert",[r("h4",{staticClass:"text-2xl"},[t._v("WARNING!")]),t._v(" "),r("ul",[r("li",[t._v("You are in SOURCE SELECTOR mode.")]),t._v(" "),r("li",[t._v("This can be used for bulk imports, but is more difficult to use.")]),t._v(" "),r("li",[t._v("Unless you know what you're doing, we recommend use of the STANDARD SELECTOR.")])]),t._v(" "),r("button",{staticClass:"cursor-pointer bg-pink-800 text-pink-300 p-2 mt-2 font-bold rounded-lg px-5 block",on:{click:function(e){return t.$emit("swapSelectorMode")}}},[t._v("Swap Back!")])]),t._v(" "),r("h1",{staticClass:"text-2xl text-indigo-800 font-light mt-2"},[t._v("Select Dragons (Source Selector Mode)")]),t._v(" "),t._m(0),t._v(" "),r("div",{staticClass:"flex"},[r("textarea",{ref:"dragonImportTextarea",staticClass:"flex-1 rounded-lg rounded-r-none p-2",attrs:{rows:"2"},on:{paste:t.loadDragons,input:function(t){return t.target.value=""}}})]),t._v(" "),t.error?r("div",{staticClass:"rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400",domProps:{innerHTML:t._s(t.error)}}):t._e(),t._v(" "),r("Alert",[r("ul",[r("li",[t._v("Lair/Den view will not load bred status or birth date.")]),t._v(" "),r("li",[r("b",[t._v("Check")]),t._v(" your bred dragons.")]),t._v(" "),r("li",[r("b",[t._v("Fill in")]),t._v(" birth date if you want special date pinglists.")])])])],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ol",{staticClass:"list-decimal ml-5 mb-3"},[r("li",[t._v("\n      Go to your lair tab, hibden tab, or to the dragon's page.\n    ")]),t._v(" "),r("li",[t._v('\n      Add "view-source:" to the beginning of the url and follow the link, eg:\n      '),r("div",{staticClass:"ml-5"},[r("u",{staticClass:"text-indigo-800"},[t._v("view-source:https://www1.flightrising.com/lair/318564/1720336/1")])])]),t._v(" "),r("li",[t._v("\n      Select the ENTIRE PAGE and copy paste it into the textbox below.\n    ")])])}],!1,null,null,null);e.default=component.exports},213:function(t,e,r){"use strict";r.r(e);var o={name:"Alert"},n=r(34),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-3 bg-pink-700 text-pink-200 text-left rounded-lg flex border-pink-800"},[t._m(0),t._v(" "),r("div",{staticClass:"p-3 flex-1"},[t._t("default")],2)])}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"text-2xl bg-pink-800 text-pink-300 rounded-lg rounded-r-none font-bold p-5 flex items-center"},[r("span",[t._v("!")])])}],!1,null,null,null);e.default=component.exports}}]);