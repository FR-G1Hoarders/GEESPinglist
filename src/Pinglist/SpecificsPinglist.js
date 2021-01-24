const {parseCsv, Pinglist, PinglistItem} = require('./CommonPinglist');

function SpecificsPinglistItem(COLORS, data) {
  let wantedPrimaries = [], wantedSecondaries = [], wantedTertiaries = [];

  /************************************************************
   * load whether we want to check prim/sec/tert at all from columns 6, 7, 8
   ************************************************************/
  const doSpecificPrimaries = data[6] !== 'All colours/No specific preference';
  const doSpecificSecondaries = data[7] !== 'All colours/No specific preference';
  const doSpecificTertiaries = data[8] !== 'All colours/No specific preference';

  /************************************************************
   * prefill what primary/secondary/tert colors this user wants
   ************************************************************/
  COLORS.forEach(color => {
    // get the selections for this color; the column looks like "Primary, Secondary, Tertiary"
    const selections = data[color.index].split(', ');

    // if the color name is "All", colorSelections will be an array containing all colors in that color group
    // otherwise, colorSelections is an array containing a single color name
    let colorSelections;
    if (color.color.substr(0, 3) === 'All') {
      colorSelections = COLORS.filter(x => x.colorGroup === color.colorGroup).map(x => x.color);
    } else {
      colorSelections = [color.color];
    }

    if (doSpecificPrimaries && selections.includes('Primary')) {
      wantedPrimaries = [...wantedPrimaries, ...colorSelections];
    }

    if (doSpecificSecondaries && selections.includes('Secondary')) {
      wantedSecondaries = [...wantedSecondaries, ...colorSelections];
    }

    if (doSpecificTertiaries && selections.includes('Tertiary')) {
      wantedTertiaries = [...wantedTertiaries, ...colorSelections];
    }
  });

  /************************************************************
   * load wanted color patterns from column 195
   * in the case that there is no preference, wantedColorPatterns will be an empty array
   * this means that the check against color pattern will be ignored later
   ************************************************************/
  let wantedColorPatterns = data[195].split(', ').filter(x => x);
  if (wantedColorPatterns[0] === 'All/No preference') wantedColorPatterns = [];

  /************************************************************
   * load wanted color patterns from column 196
   ************************************************************/
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

function SpecificsPinglist(blob) {
  let items;
  const csv = parseCsv(blob, true);

  /************************************************************
   * load a list of colors & color groups out of the header row
   ************************************************************/
  const COLORS = [];
  for (let i = 9; i <= 194; i ++) {
    const [_, colorGroup, color] = csv[0][i].match(/(.*) \[(.*)\]/); // don't mind the regex
    if (colorGroup && color) {
      COLORS.push({color, colorGroup, index: i});
    }
  }

  csv.shift(); // removes the header row

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

module.exports = {
  SpecificsPinglist,
  SpecificsPinglistItem,
};
