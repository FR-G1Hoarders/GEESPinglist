<template @apply>
  <div>
    <h1 class="text-5xl font-light p-1" :class="outTextTheme">G1 Pinglist</h1>
    
    <div class="w-full text-indigo-800 p-2 my-2 text-xl flex justify-center">
      <div class="topLink">
      <button class="cursor-pointer p-2 rounded-lg text-sm font-light" :class="buttonTheme"><a href="https://www1.flightrising.com/forums/drs/2942468#post_2942468" target="_blank" :class="buttonTheme">Main Thread</a></button>
      </div>
      <div class="topLink">
      <button class="cursor-pointer p-2 rounded-lg text-sm font-light" :class="buttonTheme"><a href="https://www1.flightrising.com/forums/gde/2944215/1#post_2944215" target="_blank" :class="buttonTheme">Colour Criteria Masterpost</a></button>
      </div>
      <div class="topLink">
      <button @click="toggleTheme" class="cursor-pointer p-2 rounded-lg text-sm font-light" :class="buttonTheme">{{ themeToggleText }}</button>
      </div>
    </div>

    <div class="w-full rounded-lg p-6 my-8 text-left text-base" :class="textTheme">
    <h1 class="text-2xl font-light">Rules: <a @click="toggleDesc" class="cursor-pointer float-right p-2 rounded-lg text-base font-semibold" :class="buttonTheme">{{ buttonText }}</a> </h1>
    <transition name="perish">
    <div v-if="isDescriptionShow"><ul><li>
    The G1 Pinglists are only to be used for the sales/trades of 
    <b>first generation (gen1) dragons</b>.
    </li><li>
    <b>Always generate a new pinglist</b> each time and copy directly from this page. 
    Please do not use a pinglist from a previous post. 
    Names are being constantly added/removed so this is the only source of up-to-date names.
    </li><li>
    Please be mindful of other users and 
    <b>avoid pinging the lists more than three times within a 24 hour period</b>. 
    If you have multiple dragons that you wish to ping for, please consider 
    grouping them into one single thread where possible.
    </li><li>
    There is <b>no limit on the number of dragons</b> that can be added to an individual pinglist. 
    However, we would recommend restricting to pinging for 20-30 highlighted dragons 
    rather than 100+ at once as it can make the forum post lengthy and thus 
    more likely to be skipped over.
    </li><li>
    If you have issues with generating a pinglist from the website or 
    problems with the dragons you are being pinged for, 
    please reach out to a member of the admin team.
    </li><li>
    For a video tutorial on how to use the website, please see 
    <a href="https://youtu.be/ScHUHxNwMOw" target="_blank" class="underline">here</a> 
    for the desktop version and 
    <a href="https://youtu.be/eJ54oCRnjS8" target="_blank" class="underline">here</a> 
    for the mobile version. 
    Please note that there are expected to be some small differences between browsers, 
    but the overall functionality should remain the same.
    </li><li>
    You are free to add tags that meet the criteria for the dragons, 
    but please make sure to check the appropriateness of the tags you select to avoid unwanted pings. 
    If you would like some informal guidance, please see the criteria masterpost.
    </li><li>
    <b>If you have any further questions or suggestions, please reach out to a member of the admin team.</b>
    </li></ul></div>
    </transition>
    </div>
    
    
    <div class="w-full rounded-lg p-3 my-3 text-left" :class="textTheme">
      <h2 class="text-2xl font-light">Select sale type:
      
      </h2>
      <div class="w-full flex flex-col items-center">
        <select v-model="saleType"  class="w-full rounded-lg text-lg p-5 m-3 cursor-pointer" :class="selectTheme">
          <option :key="0" disabled hidden>{{ defaultOption }}</option>
          <option v-for="(saleType, i) in SALE_TYPES.map(x => x.name)" :key="i+1">{{saleType}}</option>
        </select>
        <div v-if="seeDetails" class="w-full p-3 rounded-lg text-base" :class="highlightTheme">{{ showSaleDesc }}</div>
      </div>
    </div>

    <DragonSelector id="DragonSelector" @loaded="addDragons" @unlock="unlockDebug" ref="ds" :theme="theme"></DragonSelector>
    <DragonRow v-for="(dragon, i) in dragons" :key="i" :dragon="dragon" :theme="theme" :dragonImage="dragonImages[i]" @remove="removeDragon(i)" ref="dr"></DragonRow>
    <button v-if="this.dragons.length > 0" @click="removeAll" class="rounded p-1 px-5 my-5 text-center bg-pink-300 text-pink-800 border-pink-400">
		Clear All
	</button>

    <div v-if="status === STATUS.LOADING" class="w-full rounded-lg p-5 my-3 text-lg" :class="buttonTheme">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Loading
    </div>
    <div v-if="status === STATUS.GENERATING" class="w-full rounded-lg p-5 my-3 text-lg" :class="buttonTheme">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Generating
    </div>
    <button @click="generate" v-if="canGenerate" v-bind:class="[saleType === defaultOption ? 'w-full rounded-lg p-5 my-3 text-lg '.concat(invalidTheme) : 'w-full rounded-lg p-5 my-3 text-lg '.concat(buttonTheme)]" :disabled="buttonDisabled">
      Generate Pinglist
    </button>

    <div v-if="status === STATUS.GENERATED">
      <h1 class="text-3xl font-light" :class="outTextTheme">Pinglist for {{ dragons.length }} Dragons [{{ saleType }}]</h1>
      <div class="text-sm font-light" :class="outTextTheme">(Click on the box below to copy the text)</div>
      <textarea v-if="status === STATUS.GENERATED && hasPings"
          class="w-full rounded-lg text-left p-1 overflow-auto h-32 text-sm cursor-pointer" :class="textTheme"
          @focus="selectPinglist"
          ref="pinglistTextarea">{{ formattedPinglist }}</textarea>
      <div v-if="status === STATUS.GENERATED && !hasPings" class="w-full rounded-lg p-5" :class="textTheme">
        Please enter dragon info above to generate a list using this sales type.
      </div>

      <label v-if="unlockDebugMode" class="block w-full rounded-lg p-2 mt-5 text-sm cursor-pointer" :class="outTextTheme">
        <input type="checkbox" v-model="isDebugMode"/> Debug Mode [LAG WARNING]
      </label>

      <div class="grid grid-cols-3 gap-2 mt-2" v-if="isDebugMode">
        <button :class="{'rounded-lg': true, 'bg-indigo-800': debugTab === DEBUG_TAB.GENERAL, 'bg-indigo-100': debugTab !== DEBUG_TAB.GENERAL, 'text-indigo-300': true, 'p-2': true,}" @click="debugTab = DEBUG_TAB.GENERAL">General</button>
        <button :class="{'rounded-lg': true, 'bg-indigo-800': debugTab === DEBUG_TAB.DATES, 'bg-indigo-100': debugTab !== DEBUG_TAB.DATES, 'text-indigo-300': true, 'p-2': true,}" @click="debugTab = DEBUG_TAB.DATES">Dates</button>
        <button :class="{'rounded-lg': true, 'bg-indigo-800': debugTab === DEBUG_TAB.SPECIFICS, 'bg-indigo-100': debugTab !== DEBUG_TAB.SPECIFICS, 'text-indigo-300': true, 'p-2': true,}" @click="debugTab = DEBUG_TAB.SPECIFICS">Specifics</button>
      </div>


      <GeneralPinglistDebugger :pinglist="generalPinglist" :dragons="dragons" v-if="isDebugMode && debugTab === DEBUG_TAB.GENERAL"></GeneralPinglistDebugger>
      <DatesPinglistDebugger :pinglist="datesPinglist" :dragons="dragons" v-if="isDebugMode && debugTab === DEBUG_TAB.DATES"></DatesPinglistDebugger>
      <SpecificsPinglistDebugger :pinglist="specificsPinglist" :dragons="dragons" v-if="isDebugMode && debugTab === DEBUG_TAB.SPECIFICS"></SpecificsPinglistDebugger>
    </div>
    <div class="text-xs font-light" :class="outTextTheme">
    <br>
    Credits to linnet (#86) for the original code framework and BlueLatios (#565671) for the continued coding support.<br>
    Brought to you by the G1 Hoarders admin team. For any issues, <a href="https://www1.flightrising.com/forums/drs/2942468#post_45554302" target="_blank" class="underline">please contact a member of the team here</a>.<br>
    <a href="www1.flightrising.com" target="_blank" rel=noopener class="italic">Flight Rising</a> is © by Stormlight Workshop, LLC.
    </div>
  </div>
</template>

<script>
  import DragonSelector from "../components/dragon/DragonSelector/DragonSelector";
  import DragonRow from "../components/dragon/DragonRow";
  import GeneralPinglistDebugger from "../components/pinglist/GeneralPinglistDebugger";
  import DatesPinglistDebugger from "../components/pinglist/DatesPinglistDebugger";
  import SpecificsPinglistDebugger from "../components/pinglist/SpecificsPinglistDebugger";
  import PinglistLoader from "@/src/Pinglist/PinglistLoader";
  import SALE_TYPES from "@/data/sale_types";
  import THEMES from "@/data/themes";
  const STATUS = {LOADING: 0, WAITING: 1, GENERATING: 2, GENERATED: 3};
  const DEBUG_TAB = {GENERAL: 0, DATES: 1, SPECIFICS: 2};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

  export default {
    components: {GeneralPinglistDebugger, DatesPinglistDebugger, SpecificsPinglistDebugger, DragonRow, DragonSelector},
    data() {
      return {
        dragons: [],
        dragonImages: [],
        unlockDebugMode: false,
        isDebugMode: false,
        generalPinglist: null,
        datesPinglist: null,
        specificsPinglist: null,
        generalPings: [],
        datesPings: [],
        specificsPings: [],
        breeds: [],

        debugTab: DEBUG_TAB.GENERAL,
        DEBUG_TAB,

        status: STATUS.LOADING,
        STATUS,

        defaultOption: 'Select a sale type',
        saleType: 'Select a sale type',
        SALE_TYPES,
        seeDetails: true,
        
        isDescriptionShow: true,
        buttonText: "Hide",
        
        theme: 'Light',
        isMounted: false,
      };
    },
    created() {
		document.body.style.backgroundColor = THEMES["Light"].background;
	},
    watch: {
      saleType() {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
      }
    },
    computed: {
	  buttonDisabled() {
		  return (this.saleType === this.defaultOption);
	  },
      canGenerate() {
        return [STATUS.WAITING, STATUS.GENERATED].includes(this.status);
      },
      hasPings() {
        return this.generalPings.length || this.datesPings.length || this.specificsPings.length;
      },
      formattedPinglist() {
        if (this.status !== STATUS.GENERATED) return '';
        if (!SALE_TYPES.find(x => x.name === this.saleType).do_require_dragons && this.dragons.length) return 'Do not include dragons on this sales type!';
        let str = '';
        str = `[b]General pinglists:[/b] ${this.saleType}[br][b]Ping for:[/b] `;

        const includedColorPatterns = [...new Set(this.dragons.map(x => x.colorPattern()))];
        const includedEyeTypes = [...new Set(this.dragons.map(x => x.hasNormalEyes() ? `${x.flight()} Normal Eyes` : `${x.flight()} ${x.eyes()}`))];
        const includedTags = [...new Set(this.dragons.reduce((a, b) => [...a, ...b.tags()], []))];
        const includedBreeds = [...new Set(this.dragons.map(x => x.breed()))];
        const includedBreedTypes = [...new Set(this.dragons.map(x => {
			let isAncient = this.breeds.filter(a => a[0] === x.breed())[0][1];
			return isAncient === 'Y' ? 'Ancient' : 'Modern';
		}))];
        const includedPermababy = this.dragons.find(x => x.isPermababy()) ? ['Permababy'] : [];
        str += [...includedColorPatterns, ...includedEyeTypes, ...includedBreedTypes, ...includedPermababy, ...includedBreeds, ...includedTags].join(', ');
        str += '[br]';

        const excluded = [...new Set(this.dragons.filter(x => x.eyes() === 'Primal' || x.eyes() === 'Multi-Gaze').map(x => `${x.flight()} ${x.eyes()}`))];
        if (excluded.length) str += `[b]Exclude:[/b] ${excluded.join(', ')}[br]`;

        str += `[br]-Pings auto hidden-[br]`;
        str += `[size=0][size=0][size=0][size=0][size=0][size=0]`;
        this.generalPings.forEach(x => str += x + ' ');
        str += `[/size][/size][/size][/size][/size][/size][br][br]`;

        str += `[b]Color and Date specifics:[/b][br]`;
        this.dragons.forEach((dragon, i) => {
          str += `[size=2][b][url=https://www1.flightrising.com/dragon/${dragon.id()}]Dragon ${i + 1} #${dragon.id()}[/url][/b] (${dragon.flight()} ${dragon.eyes()}) (${dragon.primaryColor()}/${dragon.secondaryColor()}/${dragon.tertiaryColor()}) ${dragon.dateOfBirth()}[/size][br]`
          str += '[size=1]Date pings: ' + this.datesPinglist.items().filter(x => x.isStatusPing(dragon)).map(x => x.toPing()).filter(onlyUnique).join(' ') + '[br]';
          str += 'Specific pings: ' + this.specificsPinglist.items().filter(x => x.isStatusPing(dragon)).map(x => x.toPing()).filter(onlyUnique).join(' ') + '[/size][br][br]';
        });

        str += '[center][b]Please do not copy/paste pings from this post. (V4.1)[/b][br]';
        str += 'Click [url=https://www1.flightrising.com/forums/drs/2942468#post_2942468]here for the full thread[/url] and [url=https://fr-g1hoarders.github.io/GEESPinglist/g1-pinglist/]here for the website[/url][br][br][/center]';
        return str;
      },
	  showSaleDesc() {
		  if (SALE_TYPES.find(x => x.name === this.saleType))
		    return SALE_TYPES.find(x => x.name === this.saleType).desc;
		  return "Please select a sale type from one of the options in the dropdown above.";
	  },
	  themeToggleText() {
		  if (this.theme === "Light") return 'Switch to Dark Mode';
		  else if (this.theme === "Dark") return 'Switch to Light Mode';
	  },
	  buttonTheme() {
		  if (this.theme === "Light") return THEMES["Light"].button;
		  else if (this.theme === "Dark") return THEMES["Dark"].button;
	  },
	  textTheme() {
		  if (this.theme === "Light") return THEMES["Light"].text;
		  else if (this.theme === "Dark") return THEMES["Dark"].text;
	  },
	  outTextTheme() {
		  if (this.theme === "Light") return THEMES["Light"].outText;
		  else if (this.theme === "Dark") return THEMES["Dark"].outText;
	  },
	  highlightTheme() {
		  if (this.theme === "Light") return THEMES["Light"].highlightText;
		  else if (this.theme === "Dark") return THEMES["Dark"].highlightText;
	  },
	  invalidTheme() {
		  if (this.theme === "Light") return THEMES["Light"].invalid;
		  else if (this.theme === "Dark") return THEMES["Dark"].invalid;
	  },
	  selectTheme() {
		  if (this.theme === "Light") return THEMES["Light"].select;
		  else if (this.theme === "Dark") return THEMES["Dark"].select;
	  },
    },
    methods: {
      addDragons(dragons) {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
        dragons.filter(x => !this.dragons.map(x => x.id()).includes(x.id())).forEach(x => {
			this.dragons.push(x);
			let b = this.breeds.find(k => k[0] === x.breed());
			this.dragonImages.push(x.isBaby() ? b[4] : (x.gender() == "Male" ? b[2] : b[3]));
		});
      },
      removeDragon(i) {
		  this.$refs.ds.$refs.dsrt.removeThis(this.dragons[i].id(), this.dragons[i].name());
		  this.dragons = [...this.dragons.slice(0, i), ...this.dragons.slice(i+1)];
		  this.dragonImages = [...this.dragonImages.slice(0, i), ...this.dragonImages.slice(i+1)];
		  this.status = STATUS.WAITING;
	  },
	  removeAll() {
		  if (confirm("This will remove all dragons entered.") == true) {
			  this.$refs.ds.$refs.dsrt.removeAll();
			  this.dragons = [];
			  this.status = STATUS.WAITING;
		  }
	  },
      generate() {
        this.status = STATUS.GENERATING;

        if (SALE_TYPES.find(x => x.name === this.saleType).do_require_dragons) {
          this.generalPings = this.generalPinglist.pingsForDragons(this.saleType, this.dragons, this.breeds);
          this.datesPings = this.datesPinglist.pingsForDragons(this.saleType, this.dragons);
          this.specificsPings = this.specificsPinglist.pingsForDragons(this.saleType, this.dragons);
        } else {
          this.generalPings = this.generalPinglist.pingsForSaleType(this.saleType);
          this.datesPings = [];
          this.specificsPings = [];
        }

        this.status = STATUS.GENERATED;
      },
      selectPinglist() {
        this.$refs.pinglistTextarea.select();
        document.execCommand('copy');
        //this.$refs.ds.$refs.dsrt.latestInfo = "Pinglist text copied to clipboard!";
        this.$refs.pinglistTextarea.blur();
        alert("Pinglist text copied to clipboard!");
      },
      scrollToDragonAdd() {
		const infobox = document.getElementById("DragonSelector").getBoundingClientRect().top;
        console.log(infobox + window.pageYOffset)
        window.scrollTo(0, infobox + window.pageYOffset);  
	  },
      toggleDesc() {
        if (this.isDescriptionShow) {
			this.buttonText = "Unhide";
		} else {
			this.buttonText = "Hide";
		}
		
		this.isDescriptionShow = !this.isDescriptionShow;
      },
      unlockDebug() {
		  this.unlockDebugMode = true;
	  },
	  toggleTheme() {
		  if (this.theme === 'Light') {
			  this.theme = 'Dark';
			  document.body.style.backgroundColor = THEMES["Dark"].background;
		  } else {
			  this.theme = 'Light';
			  document.body.style.backgroundColor = THEMES["Light"].background;
		  }
	  },
    },
    mounted() {
      Promise.all([PinglistLoader.generalPinglist(), PinglistLoader.datesPinglist(), PinglistLoader.specificsPinglist(), PinglistLoader.breedsData()])
      .then(([generalPingList, datesPinglist, specificsPinglist, breedsData]) => {
        this.generalPinglist = generalPingList;
        this.datesPinglist = datesPinglist;
        this.specificsPinglist = specificsPinglist;
        this.breeds = breedsData;
        this.status = STATUS.WAITING;
      }).then(() => {
		  for (let i = 0; i < sessionStorage.length; i++) {
			const key = sessionStorage.key(i);
			//console.log(`${key}: ${sessionStorage.getItem(key)}`);
			this.$refs.ds.$refs.dsrt.processInput(sessionStorage.getItem(key));
		  }
		  this.isMounted = true;
		});
    },

  }
</script>

<style>
.perish-enter-active, .perish-leave-active {
	transition: opacity 0.5s;
}
.perish-leave-to, .perish-enter {
	opacity: 0;
}

ul {
	list-style-type: disc;
	padding: 10px;
}
li {
	margin-top: 7px;
}
.topLink {
	padding-left: 9px;
	padding-right: 9px;
}

</style>
