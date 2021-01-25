<template>
  <table class="text-left text-sm">
    <tr v-for="(item, i) in this.pinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
      <td>
        {{ item.user().name() }}
        <hr/>
        <div class="bg-red-500 text-white p-1">
          {{ item.dragonCache('PING', 'FAIL').map(x => x.displayName()).join(', ') }}
        </div>
        <div class="bg-green-500 text-white p-1">
          {{ item.dragonCache('PING', 'OK').map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        {{ item.wantsEverything() ? 'Everything' : item.wantedSaleTypes() }}
        <div class="bg-red-500 text-white p-1" v-if="item.failReason() === FAILS.SALE_TYPE">IGNORE</div>
        <div class="bg-green-500 text-white p-1" v-else>OK</div>
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
        <div class="bg-green-500 text-white p-1">
          {{ item.dragonCache('COLOR_PATTERN', 'OK').map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        <div>
          <strong>Desired Eyes:</strong> {{ item.wantedEyeTypes().join(', ') }}
          <hr/>
          <div class="bg-green-500 text-white p-1">
            {{ item.dragonCache('EYES', 'OK').map(x => x.displayName()).join(', ') }}
          </div>
        </div>
        <div v-if="item.multiGazeBlacklist().length">
          <strong>MultiGaze DNP:</strong> {{ item.multiGazeBlacklist().join(', ') }}
          <hr/>
          <div class="bg-red-500 text-white p-1" v-if="item.failReason() === FAILS.DNP_MULTIGAZE">
            IGNORE
          </div>
        </div>
        <div v-if="item.primalBlacklist().length">
          <strong>Primal DNP:</strong> {{ item.primalBlacklist().join(', ') }}
          <hr/>
          <div class="bg-red-500 text-white p-1" v-if="item.failReason() === FAILS.DNP_PRIMAL">
            IGNORE
          </div>
        </div>
      </td>
      <td>
        {{ item.wantedBreeds().length ? item.wantedBreeds().join(', ') : 'Any Breed' }}
        <hr/>
        <div class="bg-green-500 text-white p-1">
          {{ item.dragonCache('BREED', 'OK').map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        <strong>Tags:</strong>
        {{ item.wantedTags().length ? item.wantedTags().join(', ') : 'None' }}
        <hr/>
        <div class="bg-green-500 text-white p-1">
          {{ item.dragonCache('TAGS', 'OK').map(x => x.displayName()).join(', ') }}
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
  import FAILS from '@/data/pinglist_fails';
  export default {
    props: {
      pinglist: {
        type: Array,
        required: true,
      },
      dragons: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        FAILS,
      };
    },
  }
</script>
