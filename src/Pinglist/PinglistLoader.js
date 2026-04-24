import axios from 'axios';
import PING_LISTS from '@/data/pinglists';
import {DatesPinglist} from './DatesPinglist';
import {GeneralPinglist} from './GeneralPinglist';
import {SpecificsPinglist} from './SpecificsPinglist';
import {Breeds} from './Breeds';

export default {
  generalPinglist: () => axios(PING_LISTS.GENERAL).then(data => data.data).then(blob => GeneralPinglist(blob)),
  specificsPinglist: () => axios(PING_LISTS.SPECIFICS).then(data => data.data).then(blob => SpecificsPinglist(blob)),
  datesPinglist: () => axios(PING_LISTS.DATES).then(data => data.data).then(blob => DatesPinglist(blob)),
  breedsData: () => axios(PING_LISTS.BREEDS).then(data => data.data).then(blob => Breeds(blob)),
};
