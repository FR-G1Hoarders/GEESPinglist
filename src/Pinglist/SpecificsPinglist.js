const {parseCsv, Pinglist, PinglistItem} = require('./CommonPinglist');
const ITEM_STATUS = require('@/data/pinglist_item_status');
const SHEETDATA = require('@/data/columnIndexes');

function SpecificsPinglistItem(COLORS, data) {
  let wantedPrimaries = [], wantedSecondaries = [], wantedTertiaries = [];

  /************************************************************
   * load whether we want to check prim/sec/tert at all from columns 6, 7, 8
   ************************************************************/
  const doSpecificPrimaries = data[SHEETDATA.CC_Primary] !== 'All colours/No specific preference';
  const doSpecificSecondaries = data[SHEETDATA.CC_Secondary] !== 'All colours/No specific preference';
  const doSpecificTertiaries = data[SHEETDATA.CC_Tertiary] !== 'All colours/No specific preference';

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
  let wantedColorPatterns = data[SHEETDATA.CC_Pattern].split(', ').filter(x => x);
  if (wantedColorPatterns[0] === 'All/No preference') wantedColorPatterns = [];

  /************************************************************
   * load wanted color patterns from column 196
   ************************************************************/
  let wantedFlights = data[SHEETDATA.CC_Flights].split(', ').filter(x => x);
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
      if (!this.wantsGender(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_GENDER, dragon);
      if (!this.wantsUnbred(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_BRED, dragon);
      if (!this.wantsFlight(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_FLIGHT, dragon);
      if (!this.wantsColorPattern(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_COLOR_PATTERN, dragon);
      if (!this.wantsPrimary(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_PRIMARY, dragon);
      if (!this.wantsSecondary(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_SECONDARY, dragon);
      if (!this.wantsTertiary(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_TERTIARY, dragon);
      return this.setStatus(ITEM_STATUS.PING, dragon);
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
  for (let i = SHEETDATA.CC_Greyscale; i < SHEETDATA.CC_Pattern; i ++) { //begins on index 9 which starts on Greyscale, ends right before the Pattern column
    const [_, colorGroup, color] = csv[0][i].match(/(.*) \[(.*)\]/); // don't mind the regex
    if (colorGroup && color) {
      COLORS.push({color, colorGroup, index: i});
    }
  }

  csv.shift(); // removes the header row

  return {
    ...Pinglist(),
    resetItems() {
      items = csv.map(x => SpecificsPinglistItem(COLORS, x)).filter(x => x.user().name());
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
