const {parseCsv} = require('./CommonPinglist');

function Breeds(blob) {
  let items;
  items = parseCsv(blob);
  return {
    items() {
      return items;
    },
  };
}

module.exports = {
  Breeds,
};
