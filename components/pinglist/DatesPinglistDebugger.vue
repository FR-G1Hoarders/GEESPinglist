<template>
  <table class="text-left text-sm">
    <tr v-for="(item, i) in this.pinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
      <td>
        {{ item.user().name() }}
        <hr/>
        <div class="bg-green-500 text-white p-1">
          {{ item.pingDragons().map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        {{ item.wantedSaleTypes() ? item.wantedSaleTypes() : 'Any Sale Type' }}
        <hr/>
        <div class="bg-red-500 text-white p-1" v-if="item.status() === ITEM_STATUS.DNP_SALE_TYPE">
          IGNORE
        </div>
      </td>
      <td>
        {{ item.wantedGender() || 'Any Gender' }}
        <hr/>
        <div class="bg-red-500 text-white p-1">
          {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_GENDER).map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        {{ item.wantedUnbred() ? 'Unbred' : 'Bred/Unbred' }}
        <hr/>
        <div class="bg-red-500 text-white p-1">
          {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_BRED).map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        {{ item.wantedSilhouette() === false ? 'No Silhouette' : 'Any Silhouette'}}
        <hr/>
        <div class="bg-red-500 text-white p-1">
          {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_SILHOUETTE).map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        {{ item.wantedFlights().length ? item.wantedFlights().join(', ') : 'Any Flight' }}
        <hr/>
        <div class="bg-red-500 text-white p-1">
          {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_FLIGHT).map(x => x.displayName()).join(', ') }}
        </div>
      </td>
      <td>
        {{ item.wantedHolidays().join(', ') }}
        <hr/>
        {{ item.wantedDate() ? item.wantedDate().format('YYYY-MM-DD') : '--' }}
        ({{ item.wantedDateYear() ? 'Year Specific' : 'Any Year' }})
        <hr/>
        <div class="bg-red-500 text-white p-1">
          {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_DATE).map(x => x.displayName()).join(', ') }}
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
  import ITEM_STATUS from '@/data/pinglist_item_status';
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
        ITEM_STATUS,
      };
    },
  }
</script>
