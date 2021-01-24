<template>
  <div class="bg-indigo-300 rounded-lg  p-3 text-left ring-4 ring-indigo-300">
    <div class="rounded-lg bg-pink-300 text-pink-800 p-3 my-2 border-4 border-pink-400 text-center">
      <h4 class="text-2xl">WARNING!</h4>
      You are in SOURCE SELECTOR mode.<br/>
      This can be used for bulk imports, but is more difficult to use.<br/>
      Unless you know what you're doing, we recommend use of the STANDARD SELECTOR.<br/>
      <button class="cursor-pointer bg-pink-800 text-pink-300 p-2 mt-2 rounded-lg" @click="$emit('swapSelectorMode')">Swap Back!</button>
    </div>
    <h1 class="text-2xl text-indigo-800 font-light">Select Dragons (Source Selector Mode)</h1>
    <ol class="list-decimal ml-5 mb-3">
      <li>
        Go to your lair tab, hibden tab, or to the dragon's page.
      </li>
      <li>
        Add "view-source:" to the beginning of the url and follow the link, eg:
        <div class="ml-5"><u class="text-indigo-800">view-source:https://www1.flightrising.com/lair/318564/1720336/1</u></div>
      </li>
      <li>
        Select the ENTIRE PAGE and copy paste it into the textbox below.
      </li>
    </ol>
    <div class="flex">
      <textarea ref="dragonImportTextarea" rows="2" class="flex-1 rounded-lg rounded-r-none p-2" @paste="loadDragons" @input="e => e.target.value = ''"></textarea>
    </div>
    <div v-if="error" class="rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400" v-html="error"></div>
  </div>
</template>

<script>
  import {dragonLookup} from "@/src/Dragon";
  export default {
    name: 'DragonSelectorSource',
    data() {
      return {
        error: '',
      };
    },
    methods: {
      loadDragons(e) {
        let pastedText;
        if (window.clipboardData && window.clipboardData.getData) { // IE
          pastedText = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) {
          pastedText = e.clipboardData.getData('text/plain');
        }

        this.error = '';
        const dragons = dragonLookup(pastedText);
        if (dragons) {
          this.$emit('loaded', dragons);
          this.$refs.dragonImportTextarea.value = '';
        } else if (data.substr(0, 12) === 'view-source:') {
          this.error = "You have copied a URL instead of the page source.<br/> <b>COPY PASTE THIS URL INTO YOUR ADDRESS BAR</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box.";
        } else if (data.substr(0, 8) === 'https://') {
          this.error = `You have copied a URL instead of the page source.<br/> Copy this into your address bar: <b>view-source:${data}</b><br/> Then copy paste the <b>PAGE CONTENTS</b> into this box.`;
        } else if (data.substr(0, 6) === '<html ') {
          this.error = `Sorry, I don't recognise this page! Please use either the dragon's profile page, or a lair/den page.`
        } else {
          this.error = "This does not look like a valid source. Please make sure you've followed the listed directions.";
        }
      },
    }
  }
</script>
