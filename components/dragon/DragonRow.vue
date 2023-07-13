<template>
  <div class="mt-3 text-left rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-4" :class="highlightTheme">
    <div class="justify-around flex-col w-full text-center sm:col-span-2 lg:col-span-1">
      <div class="flex block rounded-xl items-stretch border-4" :class="textTheme">
        <div class="p-1 flex-1 flex items-center">
          <span class="w-full text-center">
            <a :href="('https://www1.flightrising.com/dragon/' + dragon.id())" target="_blank" rel=noopener>{{ dragon.name() }} #{{ dragon.id() }}</a>
          </span>
        </div>
        <button @click="$emit('remove')" class="rounded-r-lg p-1 px-4 text-center lg:p-1 lg:px-2" :class="buttonTheme">
          X
        </button>
      </div>
      <div class="p-1 py-2 hidden lg:inline-block">
        <a :href="('https://www1.flightrising.com/dragon/' + dragon.id())" target="_blank" rel=noopener><img :src="dragonImage"/></a>
      </div>
    </div>
    <div class="pl-4 xl:pt-10 py-1 lg:pt-12 flex-col items-center">
      {{ dragon.gender() }} {{ dragon.breed() }}<br/>
      {{ dragon.flight() }} {{ dragon.eyes() }}<br/>
      {{ dragon.colorPattern() }} {{ dragon.digits() }} Digits<br/>
      <img v-bind:src="'/GEESPinglist/ref/' + dragon.flight() + '.png'" />
    </div>
    <div class="lg:pl-0 pl-4 py-1 xl:pt-10 lg:pt-12 flex-col items-center">
      <span :style="{backgroundColor:dragon.primaryHex()}">&nbsp;&nbsp;</span>&nbsp;
      {{ dragon.primaryColor() }} {{ dragon.primaryGene() }}<br/>
      <span :style="{backgroundColor:dragon.secondaryHex()}">&nbsp;&nbsp;</span>&nbsp;
      {{ dragon.secondaryColor() }} {{ dragon.secondaryGene() }}<br/>
      <span :style="{backgroundColor:dragon.tertiaryHex()}">&nbsp;&nbsp;</span>&nbsp;
      {{ dragon.tertiaryColor() }} {{ dragon.tertiaryGene() }}<br/>
    </div>
    <div class="px-3 mt-2 sm:my-2">
      <input type="text" placeholder="YYYY-MM-DD" v-model="dragon.data.dateOfBirth" class="p-2 block w-full text-center" :class="selectTheme" disabled />
      <label class="block my-1 p-1 px-2 rounded" :class="textTheme">
        <input type="checkbox" v-model="dragon.data.isBred" disabled /> Bred
      </label>
      <label class="block my-1 p-1 px-2 rounded" :class="textTheme">
        <input type="checkbox" v-model="dragon.data.hasSilhouette" disabled /> Silhouette
      </label>
      <label class="block my-1 p-1 px-2 rounded" :class="textTheme">
        <input type="checkbox" v-model="dragon.data.isPermababy" disabled /> Permababy
      </label>
    </div>
    <div class="p-3">
      <select @change="addTag" ref="tagSelect" class="block p-2 rounded-lg mb-2 w-full" :class="selectTheme">
        <option>Add Tag</option>
        <option v-for="(tag, i) in tags" :key="i">{{tag}}</option>
      </select>
      <label v-for="(tag, i) in dragon.tags()" :key="i" @click="dragon.removeTag(i)" class="block m-1 px-1 text-sm rounded cursor-pointer" :class="textTheme">
        {{tag}}
        <span class="float-right">X</span>
      </label>
    </div>
  </div>
</template>

<script>
  import tags from '@/data/tags';
  import THEMES from '@/data/themes';
  export default {
    name: 'Dragon',
    props: {
      dragon: {
        type: Object,
        required: true,
      },
      theme: {
		type: String,
		required: true,
	  },
	  dragonImage: {
		required: true,
	  },
    },
    data() {
      return {
        tags,
      }
    },
	computed: {
		buttonTheme() {
			if (this.theme === "Light") return THEMES["Light"].button;
			else if (this.theme === "Dark") return THEMES["Dark"].button;
		},
		textTheme() {
			if (this.theme === "Light") return THEMES["Light"].text;
			else if (this.theme === "Dark") return THEMES["Dark"].text;
		},
		highlightTheme() {
			if (this.theme === "Light") return THEMES["Light"].highlightText;
			else if (this.theme === "Dark") return THEMES["Dark"].highlightText;
		},
		invalidTheme() {
			if (this.theme === "Light") return THEMES["Light"].invalid;
			else if (this.theme === "Dark") return THEMES["Dark"].invalid;
		},
		selectTheme() {
		  if (this.theme === "Light") return THEMES["Light"].select;
		  else if (this.theme === "Dark") return THEMES["Dark"].select;
	    },
	},
    methods: {
      addTag(e) {
        const select = this.$refs.tagSelect;
        const tag = select.options[select.selectedIndex].text;
        if (tag !== 'Add Tag') {
          this.dragon.pushTag(tag);
        }

        select.selectedIndex = 0;
      },
    },
  }
</script>
