<template>
  <div>
    <h1 class="text-3xl text-indigo-500 font-light">G1 Pinglist</h1>

    <div class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-3 my-3 text-left">
      <h2 class="text-2xl font-light">Select sale type:</h2>
      <select v-model="saleType" class="w-full rounded-lg text-lg p-5 mt-3 cursor-pointer">
        <option v-for="(saleType, i) in SALE_TYPES" :key="i">{{saleType}}</option>
      </select>
    </div>

    <DragonSelector @loaded="addDragons"></DragonSelector>

    <Alert>
      <ul>
        <li>Lair/Den view will not load bred status or birth date.</li>
        <li><b>Check</b> your bred dragons.</li>
        <li><b>Fill in</b> birth date if you want special date pinglists.</li>
      </ul>
    </Alert>

    <DragonRow v-for="(dragon, i) in dragons" :key="i" :dragon="dragon" @remove="() => dragons = [...dragons.slice(0, i), ...dragons.slice(i+1)]"></DragonRow>

    <div v-if="status === STATUS.LOADING" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Loading
    </div>
    <div v-if="status === STATUS.GENERATING" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      <span class="animate-spin inline-block font-bold mr-5">.</span>
      Generating
    </div>
    <button @click="generate" v-if="canGenerate" class="w-full rounded-lg bg-indigo-800 text-indigo-300 p-5 my-3 text-lg">
      Generate Pinglist
    </button>

    <div v-if="status === STATUS.GENERATED">
      <h1 class="text-3xl text-indigo-500 font-light">Pinglist for {{ dragons.length }} Dragons [{{ saleType }}]</h1>
      <div class="w-full rounded-lg bg-indigo-300 text-indigo-800 p-5" v-if="status === STATUS.GENERATED">
        <div v-if="pings.size">
          <span v-for="(ping, i) in pings" :key="i">{{ ping }} </span>
        </div>
        <div v-if="!pings.size">
          Noone to ping.
        </div>
      </div>

      <label class="block w-full rounded-lg bg-indigo-100 text-indigo-500 p-2 mt-5 text-sm cursor-pointer">
        <input type="checkbox" v-model="isDebugMode"/> Debug Mode [LAG WARNING]
      </label>

      <div class="grid grid-cols-3 gap-2 mt-2" v-if="isDebugMode">
        <button :class="{'rounded-lg': true, 'bg-indigo-800': debugTab === DEBUG_TAB.GENERAL, 'bg-indigo-100': debugTab !== DEBUG_TAB.GENERAL, 'text-indigo-300': true, 'p-2': true,}" @click="debugTab = DEBUG_TAB.GENERAL">General</button>
        <button :class="{'rounded-lg': true, 'bg-indigo-800': debugTab === DEBUG_TAB.DATES, 'bg-indigo-100': debugTab !== DEBUG_TAB.DATES, 'text-indigo-300': true, 'p-2': true,}" @click="debugTab = DEBUG_TAB.DATES">Dates</button>
        <button :class="{'rounded-lg': true, 'bg-indigo-800': debugTab === DEBUG_TAB.SPECIFICS, 'bg-indigo-100': debugTab !== DEBUG_TAB.SPECIFICS, 'text-indigo-300': true, 'p-2': true,}" @click="debugTab = DEBUG_TAB.SPECIFICS">Specifics</button>
      </div>

      <table class="text-left text-sm" v-if="isDebugMode && debugTab === DEBUG_TAB.GENERAL">
        <tr v-for="(item, i) in this.generalPinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
          <td>
            {{ item.user().name() }}
            <hr/>
            <div class="bg-green-500 text-white p-1">
              {{ item.dragonCache('PING', 'OK').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedSaleTypes() ? item.wantedSaleTypes() : 'Any Sale Type' }}
            <hr/>
            <div class="bg-red-500 text-white p-1" v-if="!item.wantsSaleType(saleType)">
              IGNORE
            </div>
          </td>
          <td>
            {{ item.wantedGender() || 'Any Gender' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('GENDER', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedUnbred() ? 'Unbred' : 'Bred/Unbred' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('BRED', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedSilhouette() === false ? 'No Silhouette' : 'Any Silhouette'}}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('SILHOUETTE', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedColorPatterns().length ? item.wantedColorPatterns().join(', ') : 'Any Pattern' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('COLOR_PATTERN', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            <div>
              <strong>Desired Eyes:</strong> {{ item.wantedEyeTypes().join(', ') }}
              <hr/>
              <div class="bg-red-500 text-white p-1">
                {{ item.dragonCache('EYES', 'FAIL').map(x => x.displayName()).join(', ') }}
              </div>
            </div>
            <div v-if="item.multiGazeBlacklist().length">
              <strong>MultiGaze DNP:</strong> {{ item.multiGazeBlacklist().join(', ') }}
              <hr/>
              <div class="bg-red-500 text-white p-1">
                {{ item.dragonCache('MULTIGAZE_BLACKLIST', 'FAIL').map(x => x.displayName()).join(', ') }}
              </div>
            </div>
            <div v-if="item.primalBlacklist().length">
              <strong>Primal DNP:</strong> {{ item.primalBlacklist().join(', ') }}
              <hr/>
              <div class="bg-red-500 text-white p-1">
                {{ item.dragonCache('PRIMAL_BLACKLIST', 'FAIL').map(x => x.displayName()).join(', ') }}
              </div>
            </div>
          </td>
          <td>
            {{ item.wantedBreeds().length ? item.wantedBreeds().join(', ') : 'Any Breed' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('BREED', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            <strong>Tags:</strong>
            {{ item.wantedTags().length ? item.wantedTags().join(', ') : 'None' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('TAGS', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
        </tr>
      </table>

      <table class="text-left text-sm" v-if="isDebugMode && debugTab === DEBUG_TAB.DATES">
        <tr v-for="(item, i) in this.datesPinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
          <td>
            {{ item.user().name() }}
            <hr/>
            <div class="bg-green-500 text-white p-1">
              {{ item.dragonCache('PING', 'OK').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedSaleTypes() ? item.wantedSaleTypes() : 'Any Sale Type' }}
            <hr/>
            <div class="bg-red-500 text-white p-1" v-if="!item.wantsSaleType(saleType)">
              IGNORE
            </div>
          </td>
          <td>
            {{ item.wantedGender() || 'Any Gender' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('GENDER', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedUnbred() ? 'Unbred' : 'Bred/Unbred' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('BRED', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedSilhouette() === false ? 'No Silhouette' : 'Any Silhouette'}}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('SILHOUETTE', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedFlights().length ? item.wantedFlights().join(', ') : 'Any Flight' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('FLIGHT', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedHolidays().join(', ') }}
            <hr/>
            {{ item.wantedDate() ? item.wantedDate().format('YYYY-MM-DD') : '--' }}
            ({{ item.wantedDateYear() ? 'Year Specific' : 'Any Year' }})
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('DATE', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
        </tr>
      </table>

      <table class="text-left text-sm" v-if="isDebugMode && debugTab === DEBUG_TAB.SPECIFICS">
        <tr v-for="(item, i) in this.specificsPinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
          <td>
            {{ item.user().name() }}
            <hr/>
            <div class="bg-green-500 text-white p-1">
              {{ item.dragonCache('PING', 'OK').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedSaleTypes() ? item.wantedSaleTypes() : 'Any Sale Type' }}
            <hr/>
            <div class="bg-red-500 text-white p-1" v-if="!item.wantsSaleType(saleType)">
              IGNORE
            </div>
          </td>
          <td>
            {{ item.wantedGender() || 'Any Gender' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('GENDER', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedUnbred() ? 'Unbred' : 'Bred/Unbred' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('BRED', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedFlights().length ? item.wantedFlights().join(', ') : 'Any Flight' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('FLIGHT', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedColorPatterns().length ? item.wantedColorPatterns().join(', ') : 'Any Color Pattern' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('COLOR_PATTERN', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedPrimaries().length ? item.wantedPrimaries().join(', ') : 'Any Primary' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('PRIMARY', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedSecondaries().length ? item.wantedSecondaries().join(', ') : 'Any Secondary' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('SECONDARY', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
          <td>
            {{ item.wantedTertiaries().length ? item.wantedTertiaries().join(', ') : 'Any Tertiary' }}
            <hr/>
            <div class="bg-red-500 text-white p-1">
              {{ item.dragonCache('TERTIARY', 'FAIL').map(x => x.displayName()).join(', ') }}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import DragonSelector from "../components/dragon/DragonSelector";
  import DragonRow from "../components/dragon/DragonRow";
  import Alert from "../components/common/Alert";
  import PinglistLoader from "@/src/Pinglist/PinglistLoader";

  const SALE_TYPES = ['Flat sale', 'Auction', 'Offer', 'Interest check', 'Mass hatch', 'Contest', 'Raffle', 'Grab bags and other RNG'];
  const STATUS = {LOADING: 0, WAITING: 1, GENERATING: 2, GENERATED: 3};
  const DEBUG_TAB = {GENERAL: 0, DATES: 1, SPECIFICS: 2};

  export default {
    components: {DragonRow, DragonSelector, Alert},
    data() {
      return {
        dragons: [],
        isDebugMode: false,
        generalPinglist: null,
        datesPinglist: null,
        specificsPinglist: null,
        pings: new Set,

        debugTab: DEBUG_TAB.GENERAL,
        DEBUG_TAB,

        status: STATUS.LOADING,
        STATUS,

        saleType: SALE_TYPES[0],
        SALE_TYPES,
      };
    },
    watch: {
      saleType() {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
      }
    },
    computed: {
      canGenerate() {
        return [STATUS.WAITING, STATUS.GENERATED].includes(this.status);
      },
    },
    methods: {
      addDragons(dragons) {
        if (this.status === STATUS.GENERATED) this.status = STATUS.WAITING;
        dragons.forEach(x => this.dragons.push(x));
      },
      generate() {
        this.status = STATUS.GENERATING;

        this.pings = new Set([
          ...this.generalPinglist.pingsForDragons(this.saleType, this.dragons),
          ...this.datesPinglist.pingsForDragons(this.saleType, this.dragons),
          ...this.specificsPinglist.pingsForDragons(this.saleType, this.dragons),
        ]);

        this.status = STATUS.GENERATED;
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
