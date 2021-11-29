const cheerio = require('cheerio');
const moment = require('moment');
const BREEDS = require('@/data/breeds');
const NORMAL_EYES = ['Common', 'Dark Sclera', 'Glowing', 'Innocent', 'Swirl', 'Uncommon', 'Unusual'];
const COLORS = require('@/data/colors');

function Dragon(data) {
  return {
    data,
    id() {
      return this.data.id;
    },
    name() {
      return this.data.name;
    },
    displayName() {
      return `${this.name()}#${this.id()}`;
    },
    gender() {
      return this.data.gender;
    },
    breed() {
      return this.data.breed;
    },
    flight() {
      return this.data.flight;
    },
    eyes() {
      return this.data.eyes;
    },
    hasNormalEyes() {
      return NORMAL_EYES.includes(this.eyes());
    },
    primaryColor() {
      return this.data.primaryColor;
    },
    primaryGene() {
      return this.data.primaryGene;
    },
    secondaryColor() {
      return this.data.secondaryColor;
    },
    secondaryGene() {
      return this.data.secondaryGene;
    },
    tertiaryColor() {
      return this.data.tertiaryColor;
    },
    tertiaryGene() {
      return this.data.tertiaryGene;
    },
    dateOfBirth() {
      return this.data.dateOfBirth;
    },
    isFirstGen() {
      return this.data.isFirstGen;
    },
    isBred() {
      return this.data.isBred;
    },
    isAncient() {
      return BREEDS.find(x => x.name === this.breed()).is_ancient;
    },
    hasSilhouette() {
      return this.data.hasSilhouette;
    },
    isPermababy() {
      return this.data.isPermababy;
    },
    thumbnailImageUrl() {
      return `https://www1.flightrising.com/rendern/avatars/${Math.ceil(this.data.id / 100)}/${this.data.id}.png`;
    },
    colorPattern() {
      return colorPattern(this.data.primaryColor, this.data.secondaryColor, this.data.tertiaryColor);
    },
    isNearMiss() {
      if (this.colorPattern() !== 'XYZ') return false;
      return isNearMiss(this.data.primaryColor, this.data.secondaryColor, this.data.tertiaryColor);
    },
    digits() {
      return Math.ceil(Math.log(this.data.id) / Math.log(10));
    },
    tags() {
      return this.data.tags;
    },
    hasTag(tag) {
      return this.data.tags.includes(tag);
    },
    pushTag(tag) {
      if (!this.data.tags) this.data.tags = [];
      if (this.data.tags.includes(tag))
		return false;
	  else {
		this.data.tags.push(tag);
		return true;
	  }
    },
    removeTag(idx) {
      if (this.data.tags) this.data.tags = [...this.data.tags.slice(0, idx), ...this.data.tags.slice(idx+1)];
    },
  };
}

function colorPattern(prim, sec, tert) {
  if (prim === sec && prim === tert) return 'XXX';
  if (prim === sec && prim !== tert) return 'XXY';
  if (prim !== sec && sec === tert) return 'XYY';
  if (prim === tert && prim !== sec) return 'XYX';
  return 'XYZ';
}

function isNearMiss(prim, sec, tert) {
	return (Math.abs(COLORS[prim] - COLORS[sec]) < 3 || Math.abs(COLORS[prim] - COLORS[tert]) < 3 || Math.abs(COLORS[sec] - COLORS[tert]) < 3);
}

function importDragonFromDragonBlob($) {
  const stat = (index, take_first) => {
    const item = $('.dragon-profile-stat-icon-value')[index];
    return take_first ? $(item).html().split('<')[0].trim() : $('strong', item).html();
  };

  const idSelector = $('.dragon-profile-header-number').html();
  const dragon = Dragon({
    id: parseInt(idSelector.substr(0, idSelector.length - 1).substr(2)),
    name: $('.dragon-profile-header-name').html(),
    gender: $('[data-tooltip-source="#dragon-profile-icon-sex-tooltip"] img').attr('src').search('female') === -1 ? 'Male' : 'Female',
    isFirstGen: !$('.dragon-profile-lineage-parents a')[0],
    isBred: !!$('.dragon-profile-lineage-offspring a')[0],
    hasSilhouette: !!$('[data-tooltip-source="#dragon-profile-icon-silhouette-tooltip"]')[0],
    isPermababy: !!$('[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]')[0],
    primaryColor: stat(0, true),
    primaryGene: stat(0, false),
    secondaryColor: stat(1, true),
    secondaryGene: stat(1, false),
    tertiaryColor: stat(2, true),
    tertiaryGene: stat(2, false),
    breed: stat(4, false),
    flight: stat(5, true),
    eyes: stat(5, false),
    dateOfBirth: moment(stat(3, false), 'MMM DD, YYYY').format('YYYY-MM-DD'),
    tags: [],
  });

  /************************************************
   * Adding additional tags
   ************************************************/
  if ($('.dragon-profile-lineage-parents em')[0] && $('.dragon-profile-lineage-parents em').text() === 'none (Raffle Prize)') {
    if (dragon.colorPattern() === 'XXX') dragon.pushTag('Roundsey triples');
    if (dragon.colorPattern() !== 'XYZ') dragon.pushTag('Roundsey doubles');
    if (dragon.eyes() === 'Primal') dragon.pushTag('Roundsey primals');
    if (dragon.colorPattern() === 'XYZ' && dragon.eyes() !== 'Primal') dragon.pushTag('Roundsey others');
  }

  if (dragon.name().length < 3) {
    dragon.pushTag('2 Letter names');
  }
  
  //Check near miss logic here
  if (dragon.isNearMiss()) {
	  dragon.pushTag("Near miss");
  }

  return dragon;
}

/**Functions to use source, to be decided another day. Haven't been worked on again **/

function importDragonsFromLairBlob($) {
  return $('.lair-page-dragon').map((i) => importDragonFromLairBlob($, $('.lair-page-dragon').eq(i))).toArray();
}

function importDragonFromLairBlob($, det) {
  const tipId = $('.lair-page-dragon-tumbnail', det).attr('rel');
  const tip = $(tipId);
  const dragon = Dragon({
    id: parseInt(tipId.split('-')[1]),
    name: $('div', tip).eq(1).text(),
    gender: $('div', tip).eq(2).text().split(' ')[1],
    isFirstGen: $('span', tip).eq(2).text() === 'First Generation',
    isBred: null,
    hasSilhouette: !!$('[data-tooltip-source="#icon-silhouette-tooltip"]', det)[0],
    isPermababy: !!$('[data-tooltip-source="#icon-eternal-youth-tooltip"]', det)[0],
    primaryColor: $('div', tip).eq(8).text().split(' ')[2],
    primaryGene: $('div', tip).eq(8).text().split(' ')[3],
    secondaryColor: $('div', tip).eq(9).text().split(' ')[2],
    secondaryGene: $('div', tip).eq(9).text().split(' ')[3],
    tertiaryColor: $('div', tip).eq(10).text().split(' ')[2],
    tertiaryGene: $('div', tip).eq(10).text().split(' ')[3],
    breed: $('div', tip).eq(2).text().split(' ')[0],
    flight: $('div', tip).eq(11).text().split(' ')[2],
    eyes: $('div', tip).eq(11).text().split(' ')[3],
    dateOfBirth: null,
    tags: [],
  });

  /************************************************
   * Adding additional tags
   ************************************************/
  if (dragon.name().length < 3) {
    dragon.pushTag('2 Letter names');
  }

  return dragon;
};

/** end of import from source **/

module.exports = {
  Dragon,
  dragonLookup: (payload) => {
    try {
      const $ = cheerio.load(payload);

      let dragons = [];

      if ($('#error-404')[0]) {
        return null;
      } else if ($('meta[property="og:url"]')[0] && $('meta[property="og:url"]').attr('content').substr(0, 37) === 'https://www1.flightrising.com/dragon/') {
        dragons.push(importDragonFromDragonBlob($));
      } else if ($('#lair-view-page')[0]) {
        dragons = dragons.concat(importDragonsFromLairBlob($));
      } else if ($('.dragon-profile-header-title')[0] && $('.dragon-profile-lineage-offspring')[0]) {
        dragons.push(importDragonFromDragonBlob($));
      }  else {
        return null;
      }

      return dragons;
    } catch (e) {}

    return null;
  },
};
