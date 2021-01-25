const {User} = require('../User');
const Papa = require('papaparse');
const FAILS = require('@/data/pinglist_fails');

function PinglistItem() {
  let failReason = null;
  const dragonCache = {};
  return {
    user() {
      return User({name: this.data[1]});
    },
    wantedGender() {
      if (this.data[4] === 'Female only') return 'Female';
      if (this.data[4] === 'Male only') return 'Male';
      return null;
    },
    wantsGender(dragon) {
      if (!this.wantedGender()) return true;
      return this.wantedGender() === dragon.gender();
    },
    wantedUnbred() {
      if (this.data[5] === 'Unbred only') return true;
      return null;
    },
    wantsUnbred(dragon) {
      if (this.wantedUnbred() === null) return true;
      if (!dragon.isBred()) return true;
      if (dragon.breed() === 'Imperial') return true;
      return false;
    },
    wantedSilhouette() {
      if (this.data[6] === 'No pose change applied') return false;
      return null;
    },
    wantsSilhouette(dragon) {
      if (this.wantedSilhouette() === null) return true;
      return this.wantedSilhouette() === dragon.hasSilhouette();
    },
    dragonCacheOk(dragon, step) {
      if (!dragonCache[step]) dragonCache[step] = {FAIL: [], OK: []};
      dragonCache[step]['OK'].push(dragon);
      return true;
    },
    dragonCacheFail(dragon, step) {
      if (dragonCache[step] === undefined) dragonCache[step] = {FAIL: [], OK: []};
      if (dragonCache['PING'] === undefined) dragonCache['PING'] = {FAIL: [], OK: []};
      dragonCache[step]['FAIL'].push(dragon);
      dragonCache['PING']['FAIL'].push(dragon);
      return false;
    },
    dragonCache(step, status) {
      if (step === undefined && status === undefined) return dragonCache;
      if (dragonCache[step] === undefined) return [];
      if (dragonCache[step][status] === undefined) return [];
      return dragonCache[step][status];
    },
    wantsEverything() {
      return this.wantedSaleTypes().substr(0, 10) === 'Everything';
    },
    wantedSaleTypes() {
      return this.data[3];
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
      if (!wantedColorPatterns.length) return true;

      for (let i = 0; i < wantedColorPatterns.length; i ++) {
        if (dragon.colorPattern() === wantedColorPatterns[i]) return true;
        else if (wantedColorPatterns[i] === 'Near miss' && dragon.hasTag('Near Miss')) return true;
      }

      return false ;
    },
    wantsFlight(dragon) {
      if (!this.wantedFlights().length) return true;
      return this.wantedFlights().includes(dragon.flight());
    },
    multiGazeBlacklist() {
      return [];
    },
    primalBlacklist() {
      return [];
    },
    setFailReason(val) {
      failReason = val;
    },
    failReason() {
      return failReason;
    },
  };
}

function Pinglist() {
  return {
    pingsForSaleType(saleType) {
      this.resetItems();
      const pings = new Set;
      this.items().filter(x => x.wantsSaleType(saleType)).forEach(x => pings.add(x.toPing()));
      return pings;
    },
    pingsForDragons(saleType, dragons) {
      this.resetItems();
      const pings = new Set;

      const primals = dragons.filter(x => x.eyes() === 'Primal').map(x => x.flight());
      const multiGazes = dragons.filter(x => x.eyes() === 'Multi-Gaze').map(x => x.flight());

      const itemsAfterExclusions = this.items().filter(x => x.wantsSaleType(saleType)).filter(item => {
        if (item.primalBlacklist().length && primals.length) {
          if (item.primalBlacklist()[0] === '') item.setFailReason(FAILS.DNP_PRIMAL);
          else primals.forEach(x => {
            if (item.primalBlacklist().includes(x)) item.setFailReason(FAILS.DNP_PRIMAL);
          });
        }

        return !item.failReason();
      }).filter(item => {
        if (item.multiGazeBlacklist().length && multiGazes.length) {
          if (item.multiGazeBlacklist()[0] === '') item.setFailReason(FAILS.DNP_MULTIGAZE);
          else multiGazes.forEach(x => {
            if (item.multiGazeBlacklist().includes(x)) item.setFailReason(FAILS.DNP_MULTIGAZE);
          });
        }

        return !item.failReason();
      });

      dragons.forEach(dragon => itemsAfterExclusions.filter(x => x.wantsDragon(dragon)).forEach(x => pings.add(x.toPing())));
      return [...pings];
    },
  };
}

function parseCsv(data, takeHeader = false) {
  const parsedCsv = Papa.parse(data).data;
  return takeHeader ? parsedCsv : parsedCsv.slice(1);
}

module.exports = {
  parseCsv,
  PinglistItem,
  Pinglist,
};
