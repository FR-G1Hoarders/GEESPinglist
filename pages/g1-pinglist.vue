<template>
  <div>
    <h1 class="text-5xl text-indigo-500 font-light p-4">G1 Pinglist</h1>
    
    <div class="w-full text-yellow-600 p-6 my-5 text-xl flex justify-center">
      <div class="topLink">
      <a href="https://www1.flightrising.com/forums/drs/2942468#post_2942468">Main Thread</a>
      </div>
      <div class="topLink">
      <a href="https://www1.flightrising.com/forums/drs/2942468#post_45554302">Admin Team</a>
      </div>
      <div class="topLink">
      <a href="https://www1.flightrising.com/forums/drs/2942468#post_45554269">Submission Forms</a>
      </div>
      <div class="topLinkRight">
      <a href="https://www1.flightrising.com/forums/gde/2944215/1#post_2944215">Colour Criteria Masterpost</a>
      </div>
    </div>

    <div class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-6 my-5 text-left text-base">
    <h1 class="text-2xl font-light">Rules: <a @click="toggleDesc" class="cursor-pointer float-right bg-indigo-800 text-indigo-300 p-3 rounded-tr-lg rounded-br-lg text-base font-semibold">{{ buttonText }}</a> </h1>
    <transition name="perish">
    <div v-if="isDescriptionShow"><ul><li>
    The G1 Pinglists are only to be used for the sales/trades of 
    <b>first generation (gen1) dragons</b>.
    </li><li>
    <b>Always generate a new pinglist</b> each time and copy directly from this page. 
    Please do not use a pinglist from a previous post. 
    Names are being constantly added/removed so this is the only source of up-to-date names.
    </li><li>
    If you have issues with generating a pinglist from the website or 
    problems with the dragons you are being pinged for, 
    please reach out to a member of the admin team.
    </li><li>
    For a video tutorial on how to use the website, please see 
    <a href="https://cdn.discordapp.com/emojis/858102423759749191.png?size=44" class="underline">here</a> 
    for the desktop version and 
    <a href="https://cdn.discordapp.com/emojis/858102423759749191.png?size=44" class="underline">here</a> 
    for the mobile version. 
    Please note that there are expected to be some small differences between browsers, 
    but the overall functionality should remain the same.
    </li><li>
    There is <b>no limit on the number of dragons</b> that can be added to an individual pinglist. 
    However, we would recommend restricting to pinging for 20-30 highlighted dragons 
    rather than 100+ at once as it can make the forum post lengthy and thus 
    more likely to be skipped over.
    </li><li>
    There is <b>no limit on the frequency</b> between which you can ping the lists 
    but we ask that you please be mindful of other users and 
    <b>exercise your own judgement on what could be deemed as spam</b>.
    </li><li>
    You are free to add tags that meet the criteria for the dragons, 
    but please make sure to check the appropriateness of the tags you select to avoid unwanted pings. 
    If you would like some informal guidance, please see the criteria masterpost.
    </li><li>
    <b>If you have any further questions or suggestions, please reach out to a member of the admin team.</b>
    </li></ul></div>
    </transition>
    </div>
    
    
    <div class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-3 my-3 text-left">
      <h2 class="text-2xl font-light">Select sale type:
      <a @click="() => seeDetails = !seeDetails" class="cursor-pointer float-right bg-indigo-800 text-indigo-300 p-2 rounded-lg text-base font-semibold">Details</a>
      </h2>
      <div class="w-full flex flex-col items-center">
        <select v-model="saleType"  class="w-full rounded-lg text-lg p-5 m-3 cursor-pointer">
          <option :key="0" disabled hidden>{{ defaultOption }}</option>
          <option v-for="(saleType, i) in SALE_TYPES.map(x => x.name)" :key="i+1">{{saleType}}</option>
        </select>
        <div v-if="seeDetails" class="w-full p-3 bg-blue-100 rounded-lg text-base">{{ showSaleDesc }}</div>
      </div>
    </div>

    <DragonSelector @loaded="addDragons" @unlock="unlockDebug" ref="ds"></DragonSelector>
    <DragonRow v-for="(dragon, i) in dragons" :key="i" :dragon="dragon" @remove="removeDragon(i)"></DragonRow>

    <div v-if="status === STATUS.LOADING" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Loading
    </div>
    <div v-if="status === STATUS.GENERATING" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Generating
    </div>
    <button @click="generate" v-if="canGenerate" v-bind:class="[saleType === defaultOption ? 'w-full rounded-lg bg-blue-300 text-indigo-200 p-5 my-3 text-lg' : 'w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg']" :disabled="buttonDisabled">
      Generate Pinglist
    </button>

    <div v-if="status === STATUS.GENERATED">
      <h1 class="text-3xl text-indigo-500 font-light">Pinglist for {{ dragons.length }} Dragons [{{ saleType }}]</h1>
      <div class="text-sm text-indigo-500 font-light">(Click on the box below to copy the text)</div>
      <textarea v-if="status === STATUS.GENERATED && hasPings"
          class="w-full rounded-lg bg-indigo-300 text-indigo-800 text-left p-1 overflow-auto h-32 text-sm cursor-pointer"
          @focus="selectPinglist"
          ref="pinglistTextarea">{{ formattedPinglist }}</textarea>
      <div v-if="status === STATUS.GENERATED && !hasPings" class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-5">
        Noone to ping.
      </div>

      <label v-if="unlockDebugMode" class="block w-full rounded-lg bg-indigo-100 text-indigo-500 p-2 mt-5 text-sm cursor-pointer">
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
    <div class="text-xs text-indigo-500 font-light">
    Credits to linnet (#86) for the original code framework and BlueLatios (#565671) for the continued coding support<br>
    Brought to you by the G1 Hoarders admin team. For any issues, <a href="https://www1.flightrising.com/forums/drs/2942468#post_45554302" class="underline">please contact a member of the team here</a>.
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
  const STATUS = {LOADING: 0, WAITING: 1, GENERATING: 2, GENERATED: 3};
  const DEBUG_TAB = {GENERAL: 0, DATES: 1, SPECIFICS: 2};

  export default {
    components: {GeneralPinglistDebugger, DatesPinglistDebugger, SpecificsPinglistDebugger, DragonRow, DragonSelector},
    data() {
      return {
        dragons: [],
        unlockDebugMode: false,
        isDebugMode: false,
        generalPinglist: null,
        datesPinglist: null,
        specificsPinglist: null,
        generalPings: [],
        datesPings: [],
        specificsPings: [],

        debugTab: DEBUG_TAB.GENERAL,
        DEBUG_TAB,

        status: STATUS.LOADING,
        STATUS,

        defaultOption: 'Select a sale type',
        saleType: 'Select a sale type',
        SALE_TYPES,
        seeDetails: false,
        
        isDescriptionShow: true,
        buttonText: "Hide",
      };
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
        const includedBreedTypes = [...new Set(this.dragons.map(x => x.isAncient() ? 'Ancient' : 'Modern'))];
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
          str += '[size=1]Date pings: ' + this.datesPinglist.items().filter(x => x.isStatusPing(dragon)).map(x => x.toPing()).join(' ') + '[br]';
          str += 'Specific pings: ' + this.specificsPinglist.items().filter(x => x.isStatusPing(dragon)).map(x => x.toPing()).join(' ') + '[/size][br][br]';
        });

        str += '[center][b]Please do not copy/paste pings from this post. (V4.1)[/b][br]';
        str += 'Click [url=https://www1.flightrising.com/forums/drs/2942468#post_2942468]here for the full thread[/url] and [url=https://fr-g1hoarders.github.io/GEESPinglist/g1-pinglist/]here for the website[/url][br][br]';
        str += '[b]Please note that we have recently transitioned to the new website meaning that the pinglist is running on new code. Please let us know in the thread if you experience any issues or incorrect pings[/b][/center]';
        return str;
      },
	  showSaleDesc() {
		  if (SALE_TYPES.find(x => x.name === this.saleType))
		    return SALE_TYPES.find(x => x.name === this.saleType).desc;
		  return "Please select a sale type from one of the options in the dropdown above.";
	  }
    },
    methods: {
      addDragons(dragons) {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
        dragons.filter(x => !this.dragons.map(x => x.id()).includes(x.id())).forEach(x => this.dragons.push(x));
      },
      removeDragon(i) {
		  this.$refs.ds.$refs.dsrt.removeThis(this.dragons[i].id(), this.dragons[i].name());
		  this.dragons = [...this.dragons.slice(0, i), ...this.dragons.slice(i+1)];
		  this.status = STATUS.WAITING;
	  },
      generate() {
        this.status = STATUS.GENERATING;

        if (SALE_TYPES.find(x => x.name === this.saleType).do_require_dragons) {
          this.generalPings = this.generalPinglist.pingsForDragons(this.saleType, this.dragons);
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
        this.$refs.ds.$refs.dsrt.latestInfo = "Pinglist text copied!";
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
	  }
    },
    mounted() {
      Promise.all([PinglistLoader.generalPinglist(), PinglistLoader.datesPinglist(), PinglistLoader.specificsPinglist()]).then(([generalPingList, datesPinglist, specificsPinglist]) => {
        this.generalPinglist = generalPingList;
        this.datesPinglist = datesPinglist;
        this.specificsPinglist = specificsPinglist;
        this.status = STATUS.WAITING;
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
.topLink, .topLinkRight {
	padding-left: 9px;
	padding-right: 9px;
}
.topLink {
	border-right: 1px solid #000000;
}
</style>
