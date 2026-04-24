import {parseCsv} from './CommonPinglist';

export function Breeds(blob) {
  let items = parseCsv(blob);
  return items;
}

