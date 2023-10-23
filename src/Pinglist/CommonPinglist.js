const {User} = require('../User');
const Papa = require('papaparse');
const ITEM_STATUS = require('@/data/pinglist_item_status');
const SHEETDATA = require('@/data/columnIndexes');

function PinglistItem() {
  let status = null;
  const dragon2Status = {};
  const dnpDragons = [];
  const pingDragons = [];
  return {
    user() {
      return User({name: this.data[SHEETDATA.CI_Username]});
    },
    wantedGender() {
      if (this.data[SHEETDATA.CI_Gender] === 'Female only') return 'Female';
      if (this.data[SHEETDATA.CI_Gender] === 'Male only') return 'Male';
      return null;
    },
    wantsGender(dragon) {
      if (!this.wantedGender()) return true;
      return this.wantedGender() === dragon.gender();
    },
    wantedUnbred() {
      if (this.data[SHEETDATA.CI_BredYesno] === 'Unbred only') return true;
      return null;
    },
    wantsUnbred(dragon) {
      if (this.wantedUnbred() === null) return true;
      if (!dragon.isBred()) return true;
      if (dragon.breed() === 'Imperial') return true;
      return false;
    },
    wantedSilhouette() {
      if (this.data[SHEETDATA.CG_PoseChange] === 'No pose change applied') return false;
      return null;
    },
    wantsSilhouette(dragon) {
      if (this.wantedSilhouette() === null) return true;
      return this.wantedSilhouette() === dragon.hasSilhouette();
    },
    setStatus(inStatus, dragon) {
      if (dragon) {
        if (inStatus < 2000) pingDragons.push(dragon);
        else dnpDragons.push(dragon);

        dragon2Status[dragon.id()] = inStatus;
      } else {
        status = inStatus;
      }

      return inStatus < 2000;
    },
    status(dragon) {
      if (status || !dragon) {
        return status;
      }

      return dragon2Status[dragon.id()];
    },
    pingDragons() {
      return pingDragons;
    },
    dnpDragons() {
      return dnpDragons;
    },
    isStatusDnp(dragon) {
      const checkStatus = dragon ? dragon2Status[dragon.id()] : status;
      return checkStatus && checkStatus >= 2000;
    },
    isStatusPing(dragon) {
      const checkStatus = dragon ? dragon2Status[dragon.id()] : status;
      return checkStatus && checkStatus < 2000;
    },
    wantsEverything() {
      return this.wantedSaleTypes().substr(0, 10) === 'Everything';
    },
    wantedSaleTypes() {
      return this.data[SHEETDATA.CI_SalesType];
    },
    wantsSaleType(saleType) {
      if (this.wantsEverything()) return true;
      return this.wantedSaleTypes().search(saleType) !== -1;
    },
    toPing() {
      return this.user().toPing();
    },
    wantsColorPattern(dragon) {
      const wantedColorPatterns = this.wantedColorPatterns();
      //if (!wantedColorPatterns.length) return true; //could be altered to suit SpecificsPinglist.js

      for (let i = 0; i < wantedColorPatterns.length; i ++) {
        if (dragon.colorPattern() === wantedColorPatterns[i]) return true;
        else if (wantedColorPatterns[i] === 'Near miss' && dragon.hasTag('Near Miss')) return true;
      }

      return false ;
    },
    wantsFlight(dragon) {
      if (this.wantedFlights()[0] === "All") return true;
      return this.wantedFlights().includes(dragon.flight());
    },
    multiGazeBlacklist() {
      return [];
    },
    primalBlacklist() {
      return [];
    },
  };
}

function Pinglist() {
  return {
    pingsForSaleType(saleType) {
      this.resetItems();
      const pings = new Set;
      this.items().filter(x => x.wantsSaleType(saleType)).forEach(x => pings.add(x.toPing()));
      this.items().filter(x => !x.wantsSaleType(saleType)).forEach(item => item.setStatus(ITEM_STATUS.DNP_SALE_TYPE));
      return [...pings];
    },
    pingsForDragons(saleType, dragons, breeds=null) {
      this.resetItems();
      const pings = new Set;

      const primals = dragons.filter(x => x.eyes() === 'Primal').map(x => x.flight());
      const multiGazes = dragons.filter(x => x.eyes() === 'Multi-Gaze').map(x => x.flight());
      
      this.items().filter(x => !x.wantsSaleType(saleType)).forEach(item => item.setStatus(ITEM_STATUS.DNP_SALE_TYPE));
      const itemsAfterExclusions = this.items().filter(x => x.wantsSaleType(saleType)).filter(item => {
        if (item.primalBlacklist().length && primals.length) {
          if (item.primalBlacklist()[0] === '') item.setStatus(ITEM_STATUS.DNP_PRIMAL);
          else primals.forEach(x => {
            if (item.primalBlacklist().includes(x)) item.setStatus(ITEM_STATUS.DNP_PRIMAL);
          });
        }

        return !item.isStatusDnp();
      }).filter(item => {
        if (item.multiGazeBlacklist().length && multiGazes.length) {
          if (item.multiGazeBlacklist()[0] === '') item.setStatus(ITEM_STATUS.DNP_MULTIGAZE);
          else multiGazes.forEach(x => {
            if (item.multiGazeBlacklist().includes(x)) item.setStatus(ITEM_STATUS.DNP_MULTIGAZE);
          });
        }

        return !item.isStatusDnp();
      });
      
      if (!breeds) //so never?
		dragons.forEach(dragon => itemsAfterExclusions.filter(x => x.wantsDragon(dragon)).forEach(x => pings.add(x.toPing())));
	  else
	    dragons.forEach(dragon => itemsAfterExclusions.filter(x => x.wantsDragonG(dragon, breeds)).forEach(x => pings.add(x.toPing())));
      return [...pings];
    },
  };
}

function parseCsv(data, takeHeader = false) {
  const parsedCsv = Papa.parse(data).data;
  return takeHeader ? parsedCsv : parsedCsv.slice(1);
}

//It is technically possible to load the header, and from there, automatically search which column contains which data
//But because of how multigaze and primal blacklists are coded right now, I fear an impact on speed performance if those columns were to not be together

module.exports = {
  parseCsv,
  PinglistItem,
  Pinglist,
};
