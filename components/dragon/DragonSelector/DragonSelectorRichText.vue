<template>
  <div class="bg-indigo-300 rounded-lg  p-3 text-left ring-4 ring-indigo-300">
    <h1 class="text-2xl text-indigo-800 font-light">Select Dragons</h1>
    <ol class="list-decimal ml-5 my-3">
      Copy your dragon's profile and paste it into the box below.
      <button class="cursor-pointer bg-indigo-800 text-indigo-300 rounded-lg px-2" @click="() => showTutorial = !showTutorial">?</button>
    </ol>
    <div v-if="showTutorial" class="bg-indigo-500 text-center m-2 p-5 rounded-lg">
      <img src="/GEESPinglist/ref/dragon_selector_richtext.png" class="w-100 md:w-1/2 m-auto"/>
    </div>
    <div class="flex flex-col">
      <textarea ref="dragonImportTextarea" rows="2" class="flex-1 rounded-lg p-2" @paste="loadDragon" @input="e => e.target.value = ''" style="resize:none;"></textarea>
      <div v-if="latestInfo" class="float-right bg-blue-100 text-indigo-800 p-2 mt-2 rounded-lg text-base">{{ latestInfo }}</div>
    </div>
    <div v-if="error" class="rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400" v-html="error"></div>
  </div>
</template>

<script>
  import {dragonLookup} from "@/src/Dragon";
  const ERRORS = {
    GENERAL: "This does not look like a valid source. Please make sure you've followed the listed directions.<br/> It is possible you have not selected enough of the page - please click the question mark above for a guide.<br/> You can also copy paste the entire dragon's page.",
    G1: "This isn't a g1 :(",
  };

  export default {
    name: 'DragonSelectorRichText',
    data() {
      return {
        error: '',
        showTutorial: false,
        latestInfo: '',
      };
    },
    methods: {
      loadDragon(e) {
        this.error = '';

        let pastedText = '';
        try {
          if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
          } else if (e.clipboardData && e.clipboardData.getData) {
            pastedText = e.clipboardData.getData('text/html');
          }

          const [dragon] = dragonLookup(pastedText);
          if (!dragon) {
            this.error = ERRORS.GENERAL;
          } else if (!dragon.isFirstGen()) {
            this.error = ERRORS.G1;
          } else {
            this.$emit('loaded', [dragon]);
            this.$refs.dragonImportTextarea.value = '';
            this.latestInfo = dragon.name().concat(" (#", dragon.id(), ") has been added!");
          }
        } catch(e) {
          this.error = ERRORS.GENERAL;
        }

      },
      removeThis(id, name) {
		  this.latestInfo = "#".concat(id, " (", name, ") has been removed!");
	  }
    }
  }
</script>
