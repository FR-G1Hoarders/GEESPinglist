<template>
  <div class="bg-indigo-300 rounded-lg  p-3 text-left ring-4 ring-indigo-300">
    <h1 class="text-2xl text-indigo-800 font-light">Select Dragons</h1>
    <ol class="list-decimal ml-5 mb-3">
      <li>
        Go to your lair tab, hibden tab, or to the dragon's page.
      </li>
      <li>
        Add "view-source:" to the beginning of the url and follow the link, eg:
        <div class="ml-5"><u class="text-indigo-800">view-source:https://www1.flightrising.com/dragon/14833010</u></div>
        <div class="ml-5"><u class="text-indigo-800">view-source:https://www1.flightrising.com/lair/318564/1720336/1</u></div>
      </li>
      <li>
        Select the ENTIRE PAGE and copy paste it into the textbox below.
      </li>
      <li>
        Hit the add button to add the dragon(s) to your selection.
      </li>
    </ol>
    <div class="flex">
      <textarea ref="dragonImportTextarea" rows="2" class="flex-1 rounded-lg rounded-r-none p-2"></textarea>
      <button @click="loadDragons" type="button" class="block bg-indigo-800 py-1 px-3 rounded-lg rounded-l-none text-indigo-300">
        Add
      </button>
    </div>
    <div v-if="error" class="rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400" v-html="error"></div>
  </div>
</template>

<script>
  import {dragonLookup} from "@/src/Dragon";
  export default {
    name: 'DragonSelector',
    data() {
      return {
        error: '',
      };
    },
    methods: {
      loadDragons() {
        this.error = '';
        const data = this.$refs.dragonImportTextarea.value;
        const dragons = dragonLookup(data);
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
