<template>
  <div>
    <h1 class="text-3xl text-indigo-500 font-light pb-4">G1 Pinglist</h1>

    <div v-if="isDescriptionShow" class="w-full rounded-lg bg-red-200 text-gray-700 p-6 my-5 text-left text-xl font-medium">
    <h1 class="font-semibold text-3xl">Description: Welcome to Hell!</h1>
    <br>
    <h2 class="text-2xl font-semibold">Rules:
    <center><b>YES</b></center></h2>
    <br>
    jk Everything in this box will be filled with actual content soon(tm)<br>
    <a v-if="isDescriptionShow" @click="() => isDescriptionShow = !isDescriptionShow" class="cursor-pointer float-right bg-red-500 text-white p-3 rounded-br-lg text-base font-semibold">Perish</a>
    <br>
    </div>
    <div class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-3 my-3 text-left">
      <h2 class="text-2xl font-light">Select sale type:</h2>
      <select v-model="saleType" class="w-full rounded-lg text-lg p-5 mt-3 cursor-pointer">
        <option v-for="(saleType, i) in SALE_TYPES.map(x => x.name)" :key="i">{{saleType}}</option>
      </select>
    </div>

    <DragonSelector @loaded="addDragons"></DragonSelector>
    <DragonRow v-for="(dragon, i) in dragons" :key="i" :dragon="dragon" @remove="removeDragon(i)"></DragonRow>

    <div v-if="status === STATUS.LOADING" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Loading
    </div>
    <div v-if="status === STATUS.GENERATING" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Generating
    </div>
    <button @click="generate" v-if="canGenerate" v-bind:class="[saleType === SALE_TYPES[0].name ? 'w-full rounded-lg bg-blue-300 text-indigo-200 p-5 my-3 text-lg' : 'w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg']" :disabled="buttonDisabled">
      Generate Pinglist
    </button>

    <div v-if="status === STATUS.GENERATED">
      <h1 class="text-3xl text-indigo-500 font-light">Pinglist for {{ dragons.length }} Dragons [{{ saleType }}]</h1>
      <textarea v-if="status === STATUS.GENERATED && hasPings"
          class="w-full rounded-lg bg-indigo-300 text-indigo-800 text-left p-1 overflow-auto h-32 text-sm cursor-pointer"
          @focus="selectPinglist"
          ref="pinglistTextarea">{{ formattedPinglist }}</textarea>
      <div v-if="status === STATUS.GENERATED && !hasPings" class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-5">
        Noone to ping.
      </div>

      <label class="block w-full rounded-lg bg-indigo-100 text-indigo-500 p-2 mt-5 text-sm cursor-pointer">
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

        saleType: SALE_TYPES[0].name,
        SALE_TYPES,
        
        isDescriptionShow: true,
      };
    },
    watch: {
      saleType() {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
      }
    },
    computed: {
	  buttonDisabled() {
		  return (this.saleType === SALE_TYPES[0].name);
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

        str += '[b]Please do not copy/paste pings from this post. (v3.1)[/b][br]';
        str += '[url=https://www1.flightrising.com/forums/drs/2942468#post_2942468]Click here for the full thread[/url][br]';
        str += '[url=https://docs.google.com/spreadsheets/d/15PsHGvicOsOdqOsntk1mZYfQx_C3ePp12JcJLqjh5yI/edit?usp=sharing]Click here for the pinglist generator[/url]';
        return str;
      },
    },
    methods: {
      addDragons(dragons) {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
        dragons.filter(x => !this.dragons.map(x => x.id()).includes(x.id())).forEach(x => this.dragons.push(x));
      },
      removeDragon(i) {
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
