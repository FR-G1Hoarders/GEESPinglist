const moment = require('moment');
const HOLIDAYS = require('@/data/holidays');
const {parseCsv, Pinglist, PinglistItem} = require('./CommonPinglist');
const ITEM_STATUS = require('@/data/pinglist_item_status');
const SHEETDATA = require('@/data/columnIndexes');
const FLIGHTS = require('@/data/flights');

function DatesPinglistItem(data) {
  return {
    data,
    ...PinglistItem(),
    wantedHolidays() {
      return this.data[SHEETDATA.CD_Holidays].split(', ').filter(x => x);
    },
    wantedDateYear() {
      return this.data[SHEETDATA.CD_SpecificYesno].substr(0, 3) === 'Yes';
    },
    wantedDate() {
      return this.data[SHEETDATA.CD_Date] ? moment(this.data[SHEETDATA.CD_Date], "MM-DD-YYYY") : null;
    },
    wantedFlights() {
      const wantedFlights = this.data[SHEETDATA.CD_Flights].split(', ').filter(x => x);
      if (wantedFlights[0] === 'All/no preference') return ["All"];
      return wantedFlights;
    },
    wantsDateOfBirth(dragon) {
      /************************************************************
       * if the date of birth has not been filled for the dragon, auto fail
       ************************************************************/

      if (!dragon.dateOfBirth()) return false;

      /************************************************************
       * check against holidays
       * data for holidays is stored in /data/holidays.js
       ************************************************************/
      const wantedHolidays = this.wantedHolidays();
      for (let i = 0; i < wantedHolidays.length; i ++) {
        // if we don't know what the holiday is, ignore it
        if (HOLIDAYS[wantedHolidays[i]] === undefined) continue;

        // if the holiday has a date, we can check it against the dragon's date of birth
        // if there's no date (lunar holidays), we have to check if the dragon has the tag for it
        if (HOLIDAYS[wantedHolidays[i]] && dragon.dateOfBirth().substr(5) === HOLIDAYS[wantedHolidays[i]]) return true;
        else if (dragon.hasTag(wantedHolidays[i])) return true;
      }

      /************************************************************
       * check against custom date pings
       ************************************************************/
      if (this.wantedDate()) {
        if (this.wantedDateYear() && dragon.dateOfBirth() === this.wantedDate().format('YYYY-MM-DD')) return true;
        else if (!this.wantedDateYear() && dragon.dateOfBirth().substr(5) === this.wantedDate().format('MM-DD')) return true;
      }

      return false;
    },
    wantsDragon(dragon) {
      if (!this.wantsGender(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_GENDER, dragon);
      if (!this.wantsUnbred(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_BRED, dragon);
      if (!this.wantsSilhouette(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_SILHOUETTE, dragon);
      if (!this.wantsFlight(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_FLIGHT, dragon);
      if (!this.wantsDateOfBirth(dragon)) return this.setStatus(ITEM_STATUS.DNP_DRAGON_DATE, dragon);
      return this.setStatus(ITEM_STATUS.PING, dragon);
    },
  }
}

function DatesPinglist(blob) {
  let items;
  return {
    ...Pinglist(),
    resetItems() {
      items = parseCsv(blob).map(x => DatesPinglistItem(x)).filter(x => x.user().name());
    },
    items() {
      return items;
    },
  };
}

module.exports = {
  DatesPinglist,
  DatesPinglistItem,
};
