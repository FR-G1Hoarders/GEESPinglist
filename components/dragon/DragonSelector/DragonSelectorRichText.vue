<template>
  <div class="rounded-lg p-3 text-left" :class="textTheme">
    <h1 class="text-2xl font-light">Select Dragons</h1>
    <ol class="list-decimal ml-5 my-3">
      Copy your dragon's profile and paste it into the box below.
      <button class="cursor-pointer rounded-lg px-2" :class="buttonTheme" @click="() => showTutorial = !showTutorial">?</button>
    </ol>
    <div v-if="showTutorial" class="text-center m-2 p-5 rounded-lg" :class="highlightTheme">
      <img src="@/static/ref/dragon_selector_richtext.png" class="w-100 md:w-1/2 m-auto"/>
    </div>
    <div class="flex flex-col">
      <textarea :class="selectTheme" ref="dragonImportTextarea" rows="2" class="flex-1 rounded-lg p-2" @paste="loadDragon" @input="e => e.target.value = ''" style="resize:none;"></textarea>
      <div v-if="latestInfo" class="float-right p-2 mt-2 rounded-lg text-base" :class="highlightTheme">{{ latestInfo }}</div>
    </div>
    <div v-if="error" class="rounded-lg bg-pink-300 text-pink-800 p-3 mt-2 border-4 border-pink-400" v-html="error"></div>
  </div>
</template>

<script>
  import Dragon from "@/src/Dragon";
  import THEMES from "@/data/themes";
  const ERRORS = {
    GENERAL: "This does not look like a valid source. Please make sure you've followed the listed directions.<br/> It is possible you have not selected enough of the page - please click the question mark above for a guide.<br/> You can also copy paste the entire dragon's page.",
    G1: "This isn't a g1 :(",
  };

  export default {
    name: 'DragonSelectorRichText',
    props: {
		theme: {
			type: String,
			required: true,
		},
	},
    data() {
      return {
        error: '',
        showTutorial: false,
        latestInfo: '',
        
        infoTimer: null,
        errorTimer: null,
        ready: false,
      };
    },
    computed: {
		buttonTheme() {
			if (this.theme === "Light") return THEMES["Light"].button;
			else if (this.theme === "Dark") return THEMES["Dark"].button;
		},
		textTheme() {
			if (this.theme === "Light") return THEMES["Light"].text;
			else if (this.theme === "Dark") return THEMES["Dark"].text;
		},
		highlightTheme() {
			if (this.theme === "Light") return THEMES["Light"].highlightText;
			else if (this.theme === "Dark") return THEMES["Dark"].highlightText;
		},
		selectTheme() {
		  if (this.theme === "Light") return THEMES["Light"].select;
		  else if (this.theme === "Dark") return THEMES["Dark"].select;
	    },
	},
    methods: {
      loadDragon(e) {
        this.error = '';
        if (e.clipboardData.getData('text') === ":crogge:") {
			this.$emit('unlock');
			this.error = "Debug mode has been unlocked.";
		} else if (!this.ready) {
			this.error = "Still loading!";
		} else {
			
			let pastedText = '';
			try {
			  if (window.clipboardData && window.clipboardData.getData) { // IE
				pastedText = window.clipboardData.getData('Text');
			  } else if (e.clipboardData && e.clipboardData.getData) {
				pastedText = e.clipboardData.getData('text/html');
			  }
			  
			  this.processInput(pastedText);
			} catch(e) {
			  this.error = ERRORS.GENERAL;
			}
		}
      },
      processInput(t) {
        this.error = '';
		try {
			const [dragon] = Dragon.dragonLookup(t);
			if (!dragon) {
				this.error = ERRORS.GENERAL;
			} else if (!dragon.isFirstGen()) {
				this.error = ERRORS.G1;
			} else {
				this.$emit('loaded', [dragon]);
				this.$refs.dragonImportTextarea.value = '';
				this.latestInfo = dragon.name().concat(" (#", dragon.id(), ") has been added!");
				sessionStorage.setItem(dragon.id(), t);
				//console.log(dragon.id(), t);
			}
		} catch(e) {
			this.error = ERRORS.GENERAL;
		}
      },
      removeThis(id, name) {
		  this.latestInfo = name.concat(" (#", id, ") has been removed!");
		  sessionStorage.removeItem(id);
	  },
	  removeAll() {
		  this.latestInfo = "All dragons have been removed!";
		  sessionStorage.clear();
	  }
    },
    watch: {
		latestInfo: function() {
			if (this.infoTimer) clearTimeout(this.infoTimer);
			this.infoTimer = setTimeout(() => {
				this.latestInfo = '';
			}, 8000);
		},
		error: function() {
			if (this.errorTimer) clearTimeout(this.errorTimer);
			this.errorTimer = setTimeout(() => {
				this.error = '';
			}, 8000);
		},
		'$parent.$parent.isMounted': function(newVal) {
			if (newVal) {
				this.ready = true;
			} else {
				this.ready = false;
			}
		}
	}
  }
</script>
