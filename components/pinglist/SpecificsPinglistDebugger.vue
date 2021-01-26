<template><table class="text-left text-sm">
  <tr v-for="(item, i) in pinglist.items()" :key="i" class="border-b-4 border-b-indigo-200">
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
      {{ item.wantedFlights().length ? item.wantedFlights().join(', ') : 'Any Flight' }}
      <hr/>
      <div class="bg-red-500 text-white p-1">
        {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_FLIGHT).map(x => x.displayName()).join(', ') }}
      </div>
    </td>
    <td>
      {{ item.wantedColorPatterns().length ? item.wantedColorPatterns().join(', ') : 'Any Color Pattern' }}
      <hr/>
      <div class="bg-red-500 text-white p-1">
        {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_COLOR_PATTERN).map(x => x.displayName()).join(', ') }}
      </div>
    </td>
    <td>
      {{ item.wantedPrimaries().length ? item.wantedPrimaries().join(', ') : 'Any Primary' }}
      <hr/>
      <div class="bg-red-500 text-white p-1">
        {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_PRIMARY).map(x => x.displayName()).join(', ') }}
      </div>
    </td>
    <td>
      {{ item.wantedSecondaries().length ? item.wantedSecondaries().join(', ') : 'Any Secondary' }}
      <hr/>
      <div class="bg-red-500 text-white p-1">
        {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_SECONDARY).map(x => x.displayName()).join(', ') }}
      </div>
    </td>
    <td>
      {{ item.wantedTertiaries().length ? item.wantedTertiaries().join(', ') : 'Any Tertiary' }}
      <hr/>
      <div class="bg-red-500 text-white p-1">
        {{ item.dnpDragons().filter(x => item.status(x) === ITEM_STATUS.DNP_DRAGON_TERTIARY).map(x => x.displayName()).join(', ') }}
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
