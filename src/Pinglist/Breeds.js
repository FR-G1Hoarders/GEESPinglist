const {parseCsv} = require('./CommonPinglist');

function Breeds(blob) {
  let items = parseCsv(blob);
  return items;
}

export default {
  Breeds,
};
