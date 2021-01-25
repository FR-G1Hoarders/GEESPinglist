<template>
  <table class="text-left text-sm">
    <tr v-for="(item, i) in this.pinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
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
        <div class="bg-red-500 text-white p-1" v-if="item.failReason() === FAILS.SALE_TYPE">
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
