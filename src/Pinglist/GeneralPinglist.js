const FLIGHTS = ['Arcane', 'Earth', 'Fire', 'Ice', 'Light', 'Lightning', 'Nature', 'Plague', 'Shadow', 'Water', 'Wind'];
const {parseCsv, Pinglist, PinglistItem} = require('./CommonPinglist');
const ITEM_STATUS = require('@/data/pinglist_item_status');

function GeneralPinglistItem(data) {
  const wantedEyeTypes = [];
  ['', ...FLIGHTS].forEach((flight, i) => {
    data[7 + i].split(', ').filter(x => x).forEach((eyeType, ii) => {
      eyeType = eyeType.search('Normal') !== -1 ? 'Normal' : eyeType;
      wantedEyeTypes.push(flight ? `${flight} ${eyeType}` : eyeType);
    });

    ['Multi-Gaze', 'Primal'].forEach((eyeType, ii) => {
      const idxOffset = !ii ? 19 : 31; //19 is all MG column, 31 is all Primal column
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

  const wantedTagsPartial = data[45].split(', ').filter(x => x);
  const wantedTags = wantedTagsPartial.concat(data[47].split(', ').filter(x => x));

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

      const eyeType = `${dragon.flight()} ${dragon.hasNormalEyes() ? 'Normal' : dragon.eyes()}`;

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
      if (this.wantsEverything()) return this.setStatus(ITEM_STATUS.PING, dragon);

      if (!this.wantsGender(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_GENDER, dragon);
      if (!this.wantsUnbred(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_BRED, dragon);
      if (!this.wantsSilhouette(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_SILHOUETTE, dragon);

      if (this.wantsEyeType(dragon)) return this.setStatus(ITEM_STATUS.PING_DRAGON_EYES, dragon);
      if (this.wantsBreed(dragon)) return this.setStatus(ITEM_STATUS.PING_DRAGON_BREED, dragon);
      if (this.wantsTag(dragon)) return this.setStatus(ITEM_STATUS.PING_DRAGON_TAGS, dragon);
      if (this.wantsColorPattern(dragon)) return this.setStatus(ITEM_STATUS.PING_DRAGON_COLOR_PATTERN, dragon);

      return this.setStatus(ITEM_STATUS.DNP, dragon);
    },
  }
}

function GeneralPinglist(blob) {
  let items;
  return {
    ...Pinglist(),
    resetItems() {
      items = parseCsv(blob).map(x => GeneralPinglistItem(x)).filter(x => x.user().name());
    },
    items() {
      return items;
    },
  };
}

module.exports = {
  GeneralPinglist,
  GeneralPinglistItem,
};
