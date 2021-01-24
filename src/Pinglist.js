const axios = require('axios');
const {User} = require('./User');
const Papa = require('papaparse');
const moment = require('moment');

const PING_LISTS = require('@/data/pinglists');
const HOLIDAYS = require('@/data/holidays');
const FLIGHTS = ['Arcane', 'Earth', 'Fire', 'Ice', 'Light', 'Lightning', 'Nature', 'Plague', 'Shadow', 'Water', 'Wind'];
const NORMAL_EYES = ['Common', 'Dark Sclera', 'Glowing', 'Innocent', 'Swirl', 'Uncommon', 'Unusual'];

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

function GeneralPinglistItem(data) {
  const wantedEyeTypes = [];
  ['', ...FLIGHTS].forEach((flight, i) => {
    data[7 + i].split(', ').filter(x => x).forEach((eyeType, ii) => {
      eyeType = eyeType.search('Normal') !== -1 ? 'Normal' : eyeType;
      wantedEyeTypes.push(flight ? `${flight} ${eyeType}` : eyeType);
    });

    ['Multi-Gaze', 'Primal'].forEach((eyeType, ii) => {
      const idxOffset = !ii ? 19 : 31;
      const wants = data[idxOffset + i].search('specifics') !== -1;
      const wantsMatching = data[idxOffset + i].search('Matching') !== -1;
      if (wants) wantedEyeTypes.push(flight ? `${flight} ${eyeType}` : eyeType);
      else if (wantsMatching) wantedEyeTypes.push(flight ? `Matching ${flight} ${eyeType}` : 'Matching ${eyeType}');
    });
  });

  const multiGazeBlacklist = [];
  ['', ...FLIGHTS].forEach((flight, i) => {
    if (data[19 + i].search('Do not ping') !== -1) multiGazeBlacklist.push(flight);
  });

  const primalBlacklist = [];
  ['', ...FLIGHTS].forEach((flight, i) => {
    if (data[31 + i].search('Do not ping') !== -1) primalBlacklist.push(flight);
  });

  let wantedColorPatterns = [];
  data[43].split(', ').forEach(item => {
    if (item === 'Triples (XXX)') wantedColorPatterns.push('XXX');
    else if (item === 'All doubles (XXY/XYY/XYX)') wantedColorPatterns = wantedColorPatterns.concat(['XXY', 'XYX', 'XYY']);
    else if(item) wantedColorPatterns.push(item);
  });

  const wantedBreeds = [];
  data[44].split(', ').forEach(item  => {
    if (item === 'All moderns') wantedBreeds.push('Modern');
    else if (item === 'All ancients') wantedBreeds.push('Ancient');
    else if (item === 'New breed') wantedBreeds.push('New');
    else if (item) wantedBreeds.push(item);
  });

  const wantedTags = data[45].split(', ').filter(x => x);

  return {
    data,
    ...PinglistItem(),
    multiGazeBlacklist() {
      return multiGazeBlacklist;
    },
    primalBlacklist() {
      return primalBlacklist;
    },
    wantedEyeTypes() {
      return wantedEyeTypes;
    },
    wantsEyeType(dragon) {
      const wantedEyeTypes = this.wantedEyeTypes();
      if (!wantedEyeTypes.length) return true;

      const eyeType = `${dragon.flight()} ${NORMAL_EYES.includes(dragon.eyes()) ? 'Normal' : dragon.eyes()}`;

      for (let i = 0; i < wantedEyeTypes.length; i++) {
        if (wantedEyeTypes[i] === 'Matching eyes' && dragon.hasTag('Matching Eyes')) return true;
        else if (wantedEyeTypes[i].search('Matching eyes') !== -1 && dragon.hasTag('Matching Eyes') && wantedEyeTypes[i].split(' ')[0] === dragon.flight()) return true;
        else if (eyeType.search(wantedEyeTypes[i]) !== -1) return true;
      }

      return false;
    },
    wantedColorPatterns() {
      return wantedColorPatterns;
    },
    wantedBreeds() {
      return wantedBreeds;
    },
    wantsBreed(dragon) {
      const wantedBreeds = this.wantedBreeds();
      if (!wantedBreeds.length) return true;

      for (let i = 0; i < wantedBreeds.length; i ++) {
        if (dragon.breed() === wantedBreeds[i]) return true;
        else if (wantedBreeds[i] === 'Modern' && !dragon.isAncient()) return true;
        else if (wantedBreeds[i] === 'Ancient' && dragon.isAncient()) return true;
        else if (wantedBreeds[i] === 'Permababy' && dragon.isPermababy()) return true;
        else if (wantedBreeds[i] === 'Imperial (bred)' && dragon.breed() === 'Imperial' && dragon.isBred()) return true;
        else if (wantedBreeds[i] === 'Imperial (unbred)' && dragon.breed() === 'Imperial' && !dragon.isBred()) return true;
      }

      return false;
    },
    wantedTags() {
      return wantedTags;
    },
    wantsTag(dragon) {
      const wantedTags = this.wantedTags();
      if (!wantedTags.length) return true;

      for (let i = 0; i < wantedTags.length; i ++) {
        if (dragon.hasTag(wantedTags[i])) return true;
      }

      return false;
    },
    wantsDragon(dragon) {
      if (!this.wantsGender(dragon)) return this.dragonCacheFail(dragon, 'GENDER');
      if (!this.wantsUnbred(dragon)) return this.dragonCacheFail(dragon, 'BRED');
      if (!this.wantsSilhouette(dragon)) return this.dragonCacheFail(dragon, 'SILHOUETTE');
      if (!this.wantsColorPattern(dragon)) return this.dragonCacheFail(dragon, 'COLOR_PATTERN');

      if (dragon.eyes() === 'Primal') {
        if (this.primalBlacklist()[0] === '' || this.primalBlacklist().includes(dragon.flight())) return this.dragonCacheFail(dragon, 'PRIMAL_BLACKLIST');
      }

      if (dragon.eyes() === 'Multi-Gaze') {
        if (this.multiGazeBlacklist()[0] === '' || this.multiGazeBlacklist().includes(dragon.flight())) return this.dragonCacheFail(dragon, 'MULTIGAZE_BLACKLIST');
      }

      if (!this.wantsEyeType(dragon)) return this.dragonCacheFail(dragon, 'EYES');
      if (!this.wantsBreed(dragon)) return this.dragonCacheFail(dragon, 'BREED');
      if (!this.wantsTag(dragon)) return this.dragonCacheFail(dragon, 'TAGS');

      return this.dragonCacheOk(dragon, 'PING');
    },
  }
}

function DatesPinglistItem(data) {
  return {
    data,
    ...PinglistItem(),
    wantedHolidays() {
      return this.data[7].split(', ').filter(x => x);
    },
    wantedDateYear() {
      return this.data[8].substr(0, 3) === 'Yes';
    },
    wantedDate() {
      return this.data[9] ? moment(this.data[9]) : null;
    },
    wantedFlights() {
      const wantedFlights = this.data[10].split(', ').filter(x => x);
      if (wantedFlights[0] === 'All/no preference') return [];
      return wantedFlights;
    },
    wantsDateOfBirth(dragon) {
      if (!dragon.dateOfBirth()) return false;

      const wantedHolidays = this.wantedHolidays();
      for (let i = 0; i < wantedHolidays.length; i ++) {
        if (HOLIDAYS[wantedHolidays[i]] === undefined) continue;
        if (HOLIDAYS[wantedHolidays[i]] && dragon.dateOfBirth().substr(5) === HOLIDAYS[wantedHolidays[i]]) return true;
        else if (dragon.hasTag(wantedHolidays[i])) return true;
      }

      if (this.wantedDate()) {
        if (this.wantedDateYear() && dragon.dateOfBirth() === this.wantedDate().format('YYYY-MM-DD')) return true;
        else if (!this.wantedDateYear() && dragon.dateOfBirth().substr(5) === this.wantedDate().format('MM-DD')) return true;
      }

      return false;
    },
    wantsDragon(dragon) {
      if (!this.wantsGender(dragon)) return this.dragonCacheFail(dragon, 'GENDER');
      if (!this.wantsUnbred(dragon)) return this.dragonCacheFail(dragon, 'BRED');
      if (!this.wantsSilhouette(dragon)) return this.dragonCacheFail(dragon, 'SILHOUETTE');
      if (!this.wantsFlight(dragon)) return this.dragonCacheFail(dragon, 'FLIGHT');
      if (!this.wantsDateOfBirth(dragon)) return this.dragonCacheFail(dragon, 'DATE');
      return this.dragonCacheOk(dragon, 'PING');
    },
  }
}

function SpecificsPinglistItem(COLORS, data) {
  let wantedPrimaries = [], wantedSecondaries = [], wantedTertiaries = [];
  const doSpecificPrimaries = data[6] !== 'All colours/No specific preference';
  const doSpecificSecondaries = data[7] !== 'All colours/No specific preference';
  const doSpecificTertiaries = data[8] !== 'All colours/No specific preference';

  COLORS.forEach(color => {
    const selections = data[color.index].split(', ');
    const colorSelection = color.color.substr(0, 3) === 'All' ? COLORS.filter(x => x.colorGroup === color.colorGroup).map(x => x.color) : [color.color];
    if (doSpecificPrimaries && selections.includes('Primary')) wantedPrimaries = [...wantedPrimaries, ...colorSelection];
    if (doSpecificSecondaries && selections.includes('Secondary')) wantedSecondaries = [...wantedSecondaries, ...colorSelection];
    if (doSpecificTertiaries && selections.includes('Tertiary')) wantedTertiaries = [...wantedTertiaries, ...colorSelection];
  });

  let wantedColorPatterns = data[195].split(', ').filter(x => x);
  if (wantedColorPatterns[0] === 'All/No preference') wantedColorPatterns = [];

  let wantedFlights = data[196].split(', ').filter(x => x);
  if (wantedFlights[0] === 'All/No preference') wantedFlights = [];

  return {
    data,
    ...PinglistItem(),
    wantedPrimaries() {
      return wantedPrimaries;
    },
    wantsPrimary(dragon) {
      if (!this.wantedPrimaries().length) return true;
      return this.wantedPrimaries().includes(dragon.primaryColor());
    },
    wantedSecondaries() {
      return wantedSecondaries;
    },
    wantsSecondary(dragon) {
      if (!this.wantedSecondaries().length) return true;
      return this.wantedSecondaries().includes(dragon.secondaryColor());
    },
    wantedTertiaries() {
      return wantedTertiaries;
    },
    wantsTertiary(dragon) {
      if (!this.wantedTertiaries().length) return true;
      return this.wantedTertiaries().includes(dragon.tertiaryColor());
    },
    wantedColorPatterns() {
      return wantedColorPatterns;
    },
    wantedFlights() {
      return wantedFlights;
    },
    wantsDragon(dragon) {
      if (!this.wantsGender(dragon)) return this.dragonCacheFail(dragon, 'GENDER');
      if (!this.wantsUnbred(dragon)) return this.dragonCacheFail(dragon, 'BRED');
      if (!this.wantsFlight(dragon)) return this.dragonCacheFail(dragon, 'FLIGHT');
      if (!this.wantsColorPattern(dragon)) return this.dragonCacheFail(dragon, 'COLOR_PATTERN');
      if (!this.wantsPrimary(dragon)) return this.dragonCacheFail(dragon, 'PRIMARY');
      if (!this.wantsSecondary(dragon)) return this.dragonCacheFail(dragon, 'SECONDARY');
      if (!this.wantsTertiary(dragon)) return this.dragonCacheFail(dragon, 'TERTIARY');
      return this.dragonCacheOk(dragon, 'PING');
    },
  }
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

function GeneralPinglist(blob) {
  let items;
  return {
    ...Pinglist(),
    resetItems() {
      items = parseCsv(blob).map(x => GeneralPinglistItem(x));
    },
    items() {
      return items;
    },
  };
}

function DatesPinglist(blob) {
  let items;
  return {
    ...Pinglist(),
    resetItems() {
      items = parseCsv(blob).map(x => DatesPinglistItem(x));
    },
    items() {
      return items;
    },
  };
}

function SpecificsPinglist(blob) {
  let items;

  const csv = parseCsv(blob, true);
  const COLORS = [];
  for (let i = 9; i <= 194; i ++) {
    const [_, colorGroup, color] = csv[0][i].match(/(.*) \[(.*)\]/);
    if (colorGroup && color) {
      COLORS.push({color, colorGroup, index: i});
    }
  }

  csv.shift();

  return {
    ...Pinglist(),
    resetItems() {
      items = csv.map(x => SpecificsPinglistItem(COLORS, x));
    },
    items() {
      return items;
    },
  };
}

function parseCsv(data, takeHeader = false) {
  const parsedCsv = Papa.parse(data).data;
  return takeHeader ? parsedCsv : parsedCsv.slice(1);
}

module.exports = {
  generalPinglist: () => axios(PING_LISTS.GENERAL).then(data => data.data).then(blob => GeneralPinglist(blob)),
  specificsPinglist: () => axios(PING_LISTS.SPECIFICS).then(data => data.data).then(blob => SpecificsPinglist(blob)),
  datesPinglist: () => axios(PING_LISTS.DATES).then(data => data.data).then(blob => DatesPinglist(blob)),
};
