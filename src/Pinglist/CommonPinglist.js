const {User} = require('../User');
const Papa = require('papaparse');

function PinglistItem() {
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
    wantedSaleTypes() {
      return this.data[3].substr(0, 10) === 'Everything' ? '' : this.data[3];
    },
    wantsSaleType(saleType) {
      if (!this.wantedSaleTypes()) return true;
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
  };
}

function Pinglist() {
  return {
    itemsForDragon(salesType, dragon) {
      return this.items().filter(x => x.wantsSaleType(salesType)).filter(x => x.wantsDragon(dragon));
    },
    pingsForDragons(salesType, dragons) {
      this.resetItems();
      const pings = new Set;
      dragons.forEach(dragon => this.itemsForDragon(salesType, dragon).forEach(x => pings.add(x.toPing())));
      return pings;
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
